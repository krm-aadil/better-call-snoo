import express from 'express';
import { InitResponse, DefenseSubmissionRequest, DefenseSubmissionResponse, VoteSubmissionRequest, VoteSubmissionResponse, VoteData } from '../shared/types/api';
import { redis, reddit, createServer, context, getServerPort } from '@devvit/web/server';
import { createPost } from './core/post';
import { getRandomCases } from './data/caseLibrary';

const app = express();

// Middleware for JSON body parsing
app.use(express.json());
// Middleware for URL-encoded body parsing
app.use(express.urlencoded({ extended: true }));
// Middleware for plain text body parsing
app.use(express.text());

const router = express.Router();

// Initialize game data
router.get<{ postId: string }, InitResponse | { status: string; message: string }>(
  '/api/init',
  async (_req, res): Promise<void> => {
    const { postId } = context;

    if (!postId) {
      console.error('API Init Error: postId not found in devvit context');
      res.status(400).json({
        status: 'error',
        message: 'postId is required but missing from context',
      });
      return;
    }

    try {
      const [username] = await Promise.all([
        reddit.getCurrentUsername(),
      ]);

      // Get daily cases (5 random cases based on today's date)
      const dailyCases = getRandomCases(5);

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
      
      if (!caseId || !defenseText || defenseText.length > 250) {
        res.status(400).json({
          status: 'error',
          message: 'Invalid defense submission',
        });
        return;
      }

      const username = await reddit.getCurrentUsername();
      
      // Store defense submission
      const defenseId = `defense_${postId}_${Date.now()}`;
      await redis.hset(`defense:${defenseId}`, {
        caseId,
        defenseText,
        authorId: context.userId || 'anonymous',
        authorUsername: username || 'anonymous',
        timestamp: Date.now().toString(),
        votingEndTime: (Date.now() + 24 * 60 * 60 * 1000).toString(), // 24 hours from now
      });

      // TODO: Create custom post for jury voting (will be implemented in later tasks)

      res.json({
        type: 'defense_submitted',
        postId,
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
    const { postId } = context;
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

      // Check if user already voted
      const existingVote = await redis.get(`user_vote:${postId}:${userId}`);
      if (existingVote) {
        res.status(400).json({
          status: 'error',
          message: 'User has already voted',
        });
        return;
      }

      // Record vote
      await redis.set(`user_vote:${postId}:${userId}`, vote);
      await redis.hincrby(`votes:${postId}`, vote === 'guilty' ? 'guilty' : 'notGuilty', 1);

      // Get current vote counts
      const voteData = await redis.hmget(`votes:${postId}`, 'guilty', 'notGuilty');
      const guilty = parseInt(voteData[0] || '0');
      const notGuilty = parseInt(voteData[1] || '0');

      const currentVotes: VoteData = {
        guilty,
        notGuilty,
        totalVotes: guilty + notGuilty,
        userVote: vote,
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
      
      // Get vote counts and user's vote
      const [voteData, userVote] = await Promise.all([
        redis.hmget(`votes:${postId}`, 'guilty', 'notGuilty'),
        redis.get(`user_vote:${postId}:${userId}`)
      ]);

      const guilty = parseInt(voteData[0] || '0');
      const notGuilty = parseInt(voteData[1] || '0');

      const votes: VoteData = {
        guilty,
        notGuilty,
        totalVotes: guilty + notGuilty,
        userVote: userVote as 'guilty' | 'not_guilty' | undefined,
      };

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
