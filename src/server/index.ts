import express from 'express';
import { InitResponse, JuryVotingInitResponse, DefenseSubmissionRequest, DefenseSubmissionResponse, VoteSubmissionRequest, VoteSubmissionResponse, VoteData, Case, LeaderboardResponse } from '../shared/types/api';
import { redis, reddit, createServer, context, getServerPort } from '@devvit/web/server';
import { createPost, createDefensePost } from './core/post';
import { getDailyCases, getCaseById } from './data/caseLibrary';
import { getAttorneyLeaderboard, getJurorLeaderboard } from './core/scoring';

const app = express();

// Middleware for JSON body parsing
app.use(express.json());
// Middleware for URL-encoded body parsing
app.use(express.urlencoded({ extended: true }));
// Middleware for plain text body parsing
app.use(express.text());

const router = express.Router();

// Get daily cases
router.get<{}, Case[] | { status: string; message: string }>(
  '/api/daily-cases',
  async (_req, res): Promise<void> => {
    try {
      const dailyCases = await getDailyCases(5);
      res.json(dailyCases);
    } catch (error) {
      console.error('Daily cases fetch error:', error);
      res.status(500).json({
        status: 'error',
        message: 'Failed to fetch daily cases',
      });
    }
  }
);

// Initialize game data
router.get<{ postId: string }, InitResponse | { status: string; message: string }>(
  '/api/init',
  async (_req, res): Promise<void> => {
    const { postId, postData } = context;

    if (!postId) {
      console.error('API Init Error: postId not found in devvit context');
      res.status(400).json({
        status: 'error',
        message: 'postId is required but missing from context',
      });
      return;
    }

    try {
      const username = await reddit.getCurrentUsername();

      // Check if this is a jury voting post
      if (postData && postData.gameState === 'jury_voting') {
        // Return jury voting specific data
        const juryResponse: JuryVotingInitResponse = {
          type: 'jury_voting_init',
          postId: postId,
          username: username ?? 'anonymous',
          caseData: {
            id: postData.caseId as string,
            title: postData.caseTitle as string,
            crime: postData.caseCrime as string,
            category: postData.caseCategory as string,
            difficulty: postData.caseDifficulty as 'easy' | 'medium' | 'hard',
          },
          defenseText: postData.defenseText as string,
          authorUsername: postData.authorUsername as string,
          defenseId: postData.defenseId as string,
          // No voting end time - using live scoring
        };
        res.json(juryResponse as any);
        return;
      }

      // Default: main game initialization
      // Get daily cases (5 random cases based on today's date)
      const dailyCases = await getDailyCases(5);

      res.json({
        type: 'init',
        postId: postId,
        username: username ?? 'anonymous',
        dailyCases,
      });
    } catch (error) {
      console.error(`API Init Error for post ${postId}:`, error);
      let errorMessage = 'Unknown error during initialization';
      if (error instanceof Error) {
        errorMessage = `Initialization failed: ${error.message}`;
      }
      res.status(400).json({ status: 'error', message: errorMessage });
    }
  }
);

// Submit defense for a case
router.post<{ postId: string }, DefenseSubmissionResponse | { status: string; message: string }, DefenseSubmissionRequest>(
  '/api/submit-defense',
  async (req, res): Promise<void> => {
    const { postId } = context;
    if (!postId) {
      res.status(400).json({
        status: 'error',
        message: 'postId is required',
      });
      return;
    }

    try {
      const { caseId, defenseText } = req.body;
      
      if (!caseId || !defenseText || defenseText.length > 250 || defenseText.trim().length === 0) {
        res.status(400).json({
          status: 'error',
          message: 'Invalid defense submission',
        });
        return;
      }

      // Get case data
      const caseData = getCaseById(caseId);
      if (!caseData) {
        res.status(400).json({
          status: 'error',
          message: 'Case not found',
        });
        return;
      }

      const username = await reddit.getCurrentUsername();
      
      // Store defense submission
      const defenseId = `defense_${postId}_${Date.now()}`;
      await redis.hSet(`defense:${defenseId}`, {
        caseId,
        defenseText: defenseText.trim(),
        authorId: context.userId || 'anonymous',
        authorUsername: username || 'anonymous',
        timestamp: Date.now().toString(),
        // No voting end time - live scoring
      });

      // Create custom post for jury voting
      const defensePost = await createDefensePost(
        caseData,
        defenseText.trim(),
        username || 'anonymous',
        defenseId
      );

      // Store the post ID for reference
      await redis.hSet(`defense:${defenseId}`, {
        postId: defensePost.id,
      });

      // No need to schedule voting closure - using live scoring

      res.json({
        type: 'defense_submitted',
        postId: defensePost.id,
        success: true,
      });
    } catch (error) {
      console.error(`Defense submission error for post ${postId}:`, error);
      res.status(500).json({
        status: 'error',
        message: 'Failed to submit defense',
      });
    }
  }
);

// Submit vote on a defense
router.post<{ postId: string }, VoteSubmissionResponse | { status: string; message: string }, VoteSubmissionRequest>(
  '/api/vote',
  async (req, res): Promise<void> => {
    const { postId, postData } = context;
    if (!postId) {
      res.status(400).json({
        status: 'error',
        message: 'postId is required',
      });
      return;
    }

    try {
      const { vote } = req.body;
      const userId = context.userId || 'anonymous';
      
      if (!vote || (vote !== 'guilty' && vote !== 'not_guilty')) {
        res.status(400).json({
          status: 'error',
          message: 'Invalid vote',
        });
        return;
      }

      // Check if voting was already closed by previous processing
      const alreadyProcessed = await redis.hGet(`votes:${postId}`, 'votingClosed');
      if (alreadyProcessed === 'true') {
        res.status(400).json({
          status: 'error',
          message: 'Voting has been processed for this case',
        });
        return;
      }
      
      // Validate user can vote (check for duplicate votes)
      const { validateUserCanVote } = await import('./core/voteUtils');
      const validation = await validateUserCanVote(postId, userId);
      if (!validation.canVote) {
        res.status(400).json({
          status: 'error',
          message: validation.reason || 'Cannot vote',
        });
        return;
      }

      // Use atomic transaction to prevent race conditions and duplicate votes
      const voteKey = `votes:${postId}`;
      const userVoteKey = `user_vote:${postId}:${userId}`;
      const votersSetKey = `voters:${postId}`;
      
      // Double-check if user already voted (race condition protection)
      const existingVote = await redis.hGet(userVoteKey, 'vote');
      if (existingVote) {
        res.status(400).json({
          status: 'error',
          message: 'User has already voted',
        });
        return;
      }

      // Get username for juror scoring
      const username = await reddit.getCurrentUsername();
      
      // Record the user's vote with timestamp
      await redis.hSet(userVoteKey, {
        vote: vote,
        timestamp: Date.now().toString(),
        postId: postId,
        username: username || 'anonymous',
      });
      
      // Add user to voters hash (for tracking unique voters)
      await redis.hSet(votersSetKey, { [userId]: '1' });
      
      // Increment vote count
      const voteField = vote === 'guilty' ? 'guilty' : 'notGuilty';
      await redis.hIncrBy(voteKey, voteField, 1);
      
      // Update last vote timestamp
      await redis.hSet(voteKey, { lastVoteAt: Date.now().toString() });
      
      // Set expiration for vote data (30 days)
      const expireTime = 30 * 24 * 60 * 60;
      await redis.expire(userVoteKey, expireTime);
      await redis.expire(votersSetKey, expireTime);
      await redis.expire(voteKey, expireTime);

      // Get current vote counts
      const voteData = await redis.hMGet(voteKey, ['guilty', 'notGuilty', 'votingClosed']);
      const guilty = parseInt(voteData[0] || '0');
      const notGuilty = parseInt(voteData[1] || '0');
      const votingClosed = voteData[2] === 'true';

      // Process scores immediumiately after each vote (live scoring)
      if (postData && postData.defenseId && !votingClosed) {
        try {
          const { processLiveScoring } = await import('./core/scoring');
          await processLiveScoring(postId, postData.defenseId as string);
          console.log(`Live score processing completed for post ${postId}`);
        } catch (scoreError) {
          console.error(`Live score processing failed for post ${postId}:`, scoreError);
          // Don't fail the vote submission if score processing fails
        }
      }

      const currentVotes: VoteData = {
        guilty,
        notGuilty,
        totalVotes: guilty + notGuilty,
        userVote: vote,
        votingClosed: true, // Mark as closed since we process scores immediumiately
      };

      res.json({
        type: 'vote_submitted',
        success: true,
        currentVotes,
      });
    } catch (error) {
      console.error(`Vote submission error for post ${postId}:`, error);
      res.status(500).json({
        status: 'error',
        message: 'Failed to submit vote',
      });
    }
  }
);

// Get current vote data
router.get<{ postId: string }, VoteData | { status: string; message: string }>(
  '/api/votes',
  async (_req, res): Promise<void> => {
    const { postId } = context;
    if (!postId) {
      res.status(400).json({
        status: 'error',
        message: 'postId is required',
      });
      return;
    }

    try {
      const userId = context.userId || 'anonymous';
      
      // No need to check voting expiration - using live scoring
      
      // Get vote counts, user's vote, and voting status
      const [voteData, userVoteData, votersData] = await Promise.all([
        redis.hMGet(`votes:${postId}`, ['guilty', 'notGuilty', 'votingClosed']),
        redis.hGet(`user_vote:${postId}:${userId}`, 'vote'),
        redis.hGetAll(`voters:${postId}`)
      ]);

      const guilty = parseInt(voteData[0] || '0');
      const notGuilty = parseInt(voteData[1] || '0');
      const votingClosed = voteData[2] === 'true';

      const votes: VoteData = {
        guilty,
        notGuilty,
        totalVotes: guilty + notGuilty,
        ...(userVoteData && { userVote: userVoteData as 'guilty' | 'not_guilty' }),
        votingClosed,
      };

      // Verify vote count integrity
      const actualTotalVotes = Object.keys(votersData || {}).length;
      if (Math.abs(votes.totalVotes - actualTotalVotes) > 1) {
        console.warn(`Vote count mismatch for post ${postId}: calculated=${votes.totalVotes}, actual=${actualTotalVotes}`);
      }

      res.json(votes);
    } catch (error) {
      console.error(`Vote fetch error for post ${postId}:`, error);
      res.status(500).json({
        status: 'error',
        message: 'Failed to fetch votes',
      });
    }
  }
);

// Get leaderboards
router.get<{}, LeaderboardResponse | { status: string; message: string }>(
  '/api/leaderboards',
  async (_req, res): Promise<void> => {
    try {
      const [attorneys, jurors] = await Promise.all([
        getAttorneyLeaderboard(10),
        getJurorLeaderboard(10)
      ]);

      // Convert to the expected format
      const attorneyEntries = attorneys.map((attorney, index) => ({
        username: attorney.username,
        score: attorney.totalScore,
        rank: index + 1,
      }));

      const jurorEntries = jurors.map((juror, index) => ({
        username: juror.username,
        score: juror.totalPoints,
        rank: index + 1,
      }));

      res.json({
        type: 'leaderboard',
        attorneys: attorneyEntries,
        jurors: jurorEntries,
      });
    } catch (error) {
      console.error('Leaderboard fetch error:', error);
      res.status(500).json({
        status: 'error',
        message: 'Failed to fetch leaderboards',
      });
    }
  }
);



// Get user's personal scores
router.get<{}, { status: string; data?: any; message?: string }>(
  '/api/user-scores',
  async (_req, res): Promise<void> => {
    try {
      const userId = context.userId || 'anonymous';
      const username = await reddit.getCurrentUsername();

      console.log(`Fetching user scores for userId: ${userId}, username: ${username}`);

      // Get attorney score data
      const attorneyData = await redis.hMGet(`attorney:${userId}`, ['totalScore', 'casesDefended', 'casesWon']);
      console.log(`Attorney data for ${userId}:`, attorneyData);
      
      const attorneyScore = {
        totalScore: parseInt(attorneyData[0] || '0'),
        casesDefended: parseInt(attorneyData[1] || '0'),
        casesWon: parseInt(attorneyData[2] || '0'),
        winRate: 0,
      };
      if (attorneyScore.casesDefended > 0) {
        attorneyScore.winRate = Math.round((attorneyScore.casesWon / attorneyScore.casesDefended) * 10000) / 100;
      }

      // Get juror score data
      const jurorData = await redis.hMGet(`juror:${userId}`, ['totalPoints', 'casesJudged', 'correctVotes']);
      console.log(`Juror data for ${userId}:`, jurorData);
      
      const jurorScore = {
        totalPoints: parseInt(jurorData[0] || '0'),
        casesJudged: parseInt(jurorData[1] || '0'),
        correctVotes: parseInt(jurorData[2] || '0'),
        accuracy: 0,
      };
      if (jurorScore.casesJudged > 0) {
        jurorScore.accuracy = Math.round((jurorScore.correctVotes / jurorScore.casesJudged) * 10000) / 100;
      }

      // Get ranks from leaderboards
      const [attorneyRank, jurorRank] = await Promise.all([
        redis.zRank('leaderboard:attorneys', userId),
        redis.zRank('leaderboard:jurors', userId)
      ]);

      console.log(`Ranks for ${userId}: attorney=${attorneyRank}, juror=${jurorRank}`);

      res.json({
        status: 'success',
        data: {
          username: username || 'anonymous',
          userId: userId, // Add userId for debugging
          attorney: {
            ...attorneyScore,
            rank: attorneyRank !== null && attorneyRank !== undefined ? attorneyRank + 1 : null,
          },
          juror: {
            ...jurorScore,
            rank: jurorRank !== null && jurorRank !== undefined ? jurorRank + 1 : null,
          },
        },
      });
    } catch (error) {
      console.error('User scores fetch error:', error);
      res.status(500).json({
        status: 'error',
        message: 'Failed to fetch user scores',
      });
    }
  }
);

// Get vote statistics (for debugging/admin purposes)
router.get<{ postId: string }, { status: string; data?: any; message?: string }>(
  '/api/vote-stats',
  async (_req, res): Promise<void> => {
    const { postId } = context;
    if (!postId) {
      res.status(400).json({
        status: 'error',
        message: 'postId is required',
      });
      return;
    }

    try {
      const [voteData, votersData] = await Promise.all([
        redis.hGetAll(`votes:${postId}`),
        redis.hGetAll(`voters:${postId}`)
      ]);

      res.json({
        status: 'success',
        data: {
          voteData,
          uniqueVoters: Object.keys(votersData || {}).length,
          votersList: Object.keys(votersData || {}).slice(0, 10), // Only show first 10 for privacy
          totalVotersInList: Object.keys(votersData || {}).length,
        },
      });
    } catch (error) {
      console.error(`Vote stats error for post ${postId}:`, error);
      res.status(500).json({
        status: 'error',
        message: 'Failed to fetch vote statistics',
      });
    }
  }
);



// Debug endpoint to check defense and voting data
router.get<{ postId: string }, { status: string; data?: any; message?: string }>(
  '/api/debug-case',
  async (_req, res): Promise<void> => {
    const { postId, postData } = context;
    if (!postId) {
      res.status(400).json({
        status: 'error',
        message: 'postId is required',
      });
      return;
    }

    try {
      // Get all relevant data for debugging
      const [voteData, votersData, postDefenseData] = await Promise.all([
        redis.hGetAll(`votes:${postId}`),
        redis.hGetAll(`voters:${postId}`),
        redis.hGetAll(`post_defense:${postId}`)
      ]);

      let defenseData = {};
      if (postDefenseData.defenseId) {
        defenseData = await redis.hGetAll(`defense:${postDefenseData.defenseId}`);
      }

      res.json({
        status: 'success',
        data: {
          postId,
          postData,
          voteData,
          votersCount: Object.keys(votersData || {}).length,
          postDefenseData,
          defenseData,
          currentTime: Date.now(),
        },
      });
    } catch (error) {
      console.error(`Debug case error for post ${postId}:`, error);
      res.status(500).json({
        status: 'error',
        message: 'Failed to fetch debug data',
      });
    }
  }
);

router.post('/internal/on-app-install', async (_req, res): Promise<void> => {
  try {
    const post = await createPost();

    res.json({
      status: 'success',
      message: `Post created in subreddit ${context.subredditName} with id ${post.id}`,
    });
  } catch (error) {
    console.error(`Error creating post: ${error}`);
    res.status(400).json({
      status: 'error',
      message: 'Failed to create post',
    });
  }
});

router.post('/internal/menu/post-create', async (_req, res): Promise<void> => {
  try {
    const post = await createPost();

    res.json({
      navigateTo: `https://reddit.com/r/${context.subredditName}/comments/${post.id}`,
    });
  } catch (error) {
    console.error(`Error creating post: ${error}`);
    res.status(400).json({
      status: 'error',
      message: 'Failed to create post',
    });
  }
});

// Use router middleware
app.use(router);

// Get port from environment variable with fallback
const port = getServerPort();

const server = createServer(app);
server.on('error', (err) => console.error(`server error; ${err.stack}`));
server.listen(port);
