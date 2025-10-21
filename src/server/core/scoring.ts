import { redis } from '@devvit/web/server';

export type AttorneyScore = {
  userId: string;
  username: string;
  totalScore: number;
  casesDefended: number;
  casesWon: number;
  winRate: number;
};

export type JurorScore = {
  userId: string;
  username: string;
  totalPoints: number;
  casesJudged: number;
  correctVotes: number;
  accuracy: number;
};

export type VotingResult = {
  guilty: number;
  notGuilty: number;
  finalVerdict: 'guilty' | 'not_guilty';
  totalVotes: number;
};

/**
 * Calculate attorney score based on voting results
 * Formula: (Not Guilty votes × 2) - (Guilty votes) + 500 bonus if majority Not Guilty
 */
export function calculateAttorneyScore(votingResult: VotingResult): number {
  const { guilty, notGuilty } = votingResult;
  
  // Base score calculation
  const baseScore = (notGuilty * 2) - guilty;
  
  // Win bonus if majority voted Not Guilty
  const winBonus = notGuilty > guilty ? 500 : 0;
  
  return baseScore + winBonus;
}

/**
 * Determine final verdict based on vote counts
 */
export function determineFinalVerdict(guilty: number, notGuilty: number): 'guilty' | 'not_guilty' {
  return notGuilty > guilty ? 'not_guilty' : 'guilty';
}

/**
 * Calculate juror score for a single case
 * +10 points if vote matches final verdict, 0 otherwise
 */
export function calculateJurorScore(userVote: 'guilty' | 'not_guilty', finalVerdict: 'guilty' | 'not_guilty'): number {
  return userVote === finalVerdict ? 10 : 0;
}

/**
 * Process voting period end and calculate scores
 */
export async function processVotingPeriodEnd(postId: string, defenseId: string): Promise<void> {
  try {
    // Get voting results
    const voteData = await redis.hMGet(`votes:${postId}`, ['guilty', 'notGuilty', 'votingClosed']);
    const guilty = parseInt(voteData[0] || '0');
    const notGuilty = parseInt(voteData[1] || '0');
    const votingClosed = voteData[2] === 'true';

    // Skip if already processed
    if (votingClosed) {
      return;
    }

    // Get defense data
    const defenseData = await redis.hGetAll(`defense:${defenseId}`);
    if (!defenseData.authorId) {
      console.error(`Defense data not found for ${defenseId}`);
      return;
    }

    const finalVerdict = determineFinalVerdict(guilty, notGuilty);
    const votingResult: VotingResult = {
      guilty,
      notGuilty,
      finalVerdict,
      totalVotes: guilty + notGuilty,
    };

    // Calculate attorney score
    const attorneyScore = calculateAttorneyScore(votingResult);
    
    // Update attorney's total score
    await updateAttorneyScore(defenseData.authorId!, defenseData.authorUsername || defenseData.authorId!, attorneyScore, finalVerdict === 'not_guilty');

    // Process juror scores
    await processJurorScores(postId, finalVerdict);

    // Mark voting as closed and store final results
    await redis.hSet(`votes:${postId}`, {
      votingClosed: 'true',
      finalVerdict,
      attorneyScore: attorneyScore.toString(),
      processedAt: Date.now().toString(),
    });

    // Store case result for defense
    await redis.hSet(`defense:${defenseId}`, {
      finalVerdict,
      attorneyScore: attorneyScore.toString(),
      votingClosed: 'true',
    });

    console.log(`Processed voting period end for post ${postId}: verdict=${finalVerdict}, attorneyScore=${attorneyScore}`);
  } catch (error) {
    console.error(`Error processing voting period end for post ${postId}:`, error);
  }
}

/**
 * Update attorney's total score and statistics
 */
async function updateAttorneyScore(userId: string, username: string, scoreChange: number, won: boolean): Promise<void> {
  const attorneyKey = `attorney:${userId}`;
  
  // Update attorney scores
  await redis.hIncrBy(attorneyKey, 'totalScore', scoreChange);
  await redis.hIncrBy(attorneyKey, 'casesDefended', 1);
  
  if (won) {
    await redis.hIncrBy(attorneyKey, 'casesWon', 1);
  }
  
  await redis.hSet(attorneyKey, {
    username: username,
    lastActivity: Date.now().toString(),
  });
  
  // Set expiration (90 days)
  await redis.expire(attorneyKey, 90 * 24 * 60 * 60);
  
  // Update leaderboard sorted set
  const newTotalScore = await redis.hGet(attorneyKey, 'totalScore');
  if (newTotalScore) {
    await redis.zAdd('leaderboard:attorneys', { member: userId, score: parseInt(newTotalScore) });
  }
}

/**
 * Process scores for all jurors who voted on this case
 */
async function processJurorScores(postId: string, finalVerdict: 'guilty' | 'not_guilty'): Promise<void> {
  // Get all voters for this post
  const votersData = await redis.hGetAll(`voters:${postId}`);
  const voters = Object.keys(votersData);
  
  for (const userId of voters) {
    try {
      // Get user's vote
      const userVoteData = await redis.hGet(`user_vote:${postId}:${userId}`, 'vote');
      if (!userVoteData) continue;
      
      const userVote = userVoteData as 'guilty' | 'not_guilty';
      const jurorScore = calculateJurorScore(userVote, finalVerdict);
      
      // Get username from user vote data or use userId as fallback
      const usernameData = await redis.hGet(`user_vote:${postId}:${userId}`, 'username');
      const username = usernameData || userId;
      
      // Update juror score
      await updateJurorScore(userId, username, jurorScore, userVote === finalVerdict);
      
      // Store the final verdict in user's vote record for reference
      await redis.hSet(`user_vote:${postId}:${userId}`, {
        finalVerdict,
        jurorScore: jurorScore.toString(),
        processed: 'true',
      });
    } catch (error) {
      console.error(`Error processing juror score for user ${userId} on post ${postId}:`, error);
    }
  }
}

/**
 * Update juror's total score and statistics
 */
async function updateJurorScore(userId: string, username: string, scoreChange: number, correct: boolean): Promise<void> {
  const jurorKey = `juror:${userId}`;
  
  // Update juror scores
  await redis.hIncrBy(jurorKey, 'totalPoints', scoreChange);
  await redis.hIncrBy(jurorKey, 'casesJudged', 1);
  
  if (correct) {
    await redis.hIncrBy(jurorKey, 'correctVotes', 1);
  }
  
  await redis.hSet(jurorKey, {
    username: username,
    lastActivity: Date.now().toString(),
  });
  
  // Set expiration (90 days)
  await redis.expire(jurorKey, 90 * 24 * 60 * 60);
  
  // Update leaderboard sorted set
  const newTotalPoints = await redis.hGet(jurorKey, 'totalPoints');
  if (newTotalPoints) {
    await redis.zAdd('leaderboard:jurors', { member: userId, score: parseInt(newTotalPoints) });
  }
}

/**
 * Check if voting period has expired and process if needed
 */
export async function checkAndProcessExpiredVoting(postId: string, votingEndTime: number): Promise<boolean> {
  const now = Date.now();
  
  if (now >= votingEndTime) {
    // Check if already processed
    const votingClosed = await redis.hGet(`votes:${postId}`, 'votingClosed');
    if (votingClosed !== 'true') {
      // Get defense ID from post data
      const defenseId = await redis.hGet(`post_defense:${postId}`, 'defenseId');
      if (defenseId) {
        await processVotingPeriodEnd(postId, defenseId);
      }
    }
    return true;
  }
  
  return false;
}

/**
 * Get attorney leaderboard
 */
export async function getAttorneyLeaderboard(limit: number = 10): Promise<AttorneyScore[]> {
  // Get top attorneys by score (descending order)
  const topAttorneys = await redis.zRange('leaderboard:attorneys', 0, limit - 1, { by: 'rank', reverse: true });
  
  const leaderboard: AttorneyScore[] = [];
  
  for (const entry of topAttorneys) {
    const userId = entry.member;
    const totalScore = entry.score;
    
    // Get attorney details
    const attorneyData = await redis.hMGet(`attorney:${userId}`, ['username', 'casesDefended', 'casesWon']);
    const username = attorneyData[0] || userId;
    const casesDefended = parseInt(attorneyData[1] || '0');
    const casesWon = parseInt(attorneyData[2] || '0');
    const winRate = casesDefended > 0 ? (casesWon / casesDefended) * 100 : 0;
    
    leaderboard.push({
      userId,
      username,
      totalScore,
      casesDefended,
      casesWon,
      winRate: Math.round(winRate * 100) / 100, // Round to 2 decimal places
    });
  }
  
  return leaderboard;
}

/**
 * Get juror leaderboard
 */
export async function getJurorLeaderboard(limit: number = 10): Promise<JurorScore[]> {
  // Get top jurors by points (descending order)
  const topJurors = await redis.zRange('leaderboard:jurors', 0, limit - 1, { by: 'rank', reverse: true });
  
  const leaderboard: JurorScore[] = [];
  
  for (const entry of topJurors) {
    const userId = entry.member;
    const totalPoints = entry.score;
    
    // Get juror details
    const jurorData = await redis.hMGet(`juror:${userId}`, ['username', 'casesJudged', 'correctVotes']);
    const username = jurorData[0] || userId;
    const casesJudged = parseInt(jurorData[1] || '0');
    const correctVotes = parseInt(jurorData[2] || '0');
    const accuracy = casesJudged > 0 ? (correctVotes / casesJudged) * 100 : 0;
    
    leaderboard.push({
      userId,
      username,
      totalPoints,
      casesJudged,
      correctVotes,
      accuracy: Math.round(accuracy * 100) / 100, // Round to 2 decimal places
    });
  }
  
  return leaderboard;
}
