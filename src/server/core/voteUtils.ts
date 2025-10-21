import { redis } from '@devvit/web/server';
import { checkAndProcessExpiredVoting } from './scoring';

export type VoteValidation = {
  canVote: boolean;
  reason?: string;
};

/**
 * Check if voting period has expired for a post
 */
export async function checkVotingExpiration(postId: string, votingEndTime: number): Promise<boolean> {
  const now = Date.now();
  
  if (now >= votingEndTime) {
    // Process expired voting if not already done
    await checkAndProcessExpiredVoting(postId, votingEndTime);
    return true;
  }
  
  return false;
}

/**
 * Validate if a user can vote on a post
 */
export async function validateUserCanVote(postId: string, userId: string): Promise<VoteValidation> {
  // Check if user has already voted
  const existingVote = await redis.hGet(`user_vote:${postId}:${userId}`, 'vote');
  if (existingVote) {
    return {
      canVote: false,
      reason: 'User has already voted on this case',
    };
  }
  
  // Check if voting is closed
  const votingClosed = await redis.hGet(`votes:${postId}`, 'votingClosed');
  if (votingClosed === 'true') {
    return {
      canVote: false,
      reason: 'Voting period has ended',
    };
  }
  
  return {
    canVote: true,
  };
}

/**
 * Get time remaining in voting period
 */
export async function getVotingTimeRemaining(votingEndTime: number): Promise<number> {
  const now = Date.now();
  const remaining = votingEndTime - now;
  return Math.max(0, remaining);
}

/**
 * Schedule automatic voting period closure (called when defense is submitted)
 */
export async function scheduleVotingClosure(postId: string, defenseId: string, votingEndTime: number): Promise<void> {
  // Store the mapping between post and defense for later processing
  await redis.hSet(`post_defense:${postId}`, {
    defenseId,
    votingEndTime: votingEndTime.toString(),
    scheduled: Date.now().toString(),
  });
  
  // Set expiration for cleanup (31 days)
  await redis.expire(`post_defense:${postId}`, 31 * 24 * 60 * 60);
}

/**
 * Process all expired voting periods (can be called periodically)
 */
export async function processExpiredVotingPeriods(): Promise<void> {
  try {
    // This would typically be called by a scheduled job
    // For now, we process expired votes when they are accessed
    console.log('Processing expired voting periods...');
    
    // In a production system, you might want to:
    // 1. Keep a sorted set of voting end times
    // 2. Use a background job to process expired votes
    // 3. Or process them on-demand when posts are accessed
    
    // For this implementation, we rely on on-demand processing
    // when votes are accessed or submitted
  } catch (error) {
    console.error('Error processing expired voting periods:', error);
  }
}
