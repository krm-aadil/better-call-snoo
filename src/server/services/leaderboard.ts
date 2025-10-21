// Leaderboard service for managing attorney and juror rankings
import { getAttorneyLeaderboard, getJurorLeaderboard } from '../core/scoring';

/**
 * Get top attorneys from the leaderboard
 */
export const getTopAttorneys = async (limit: number = 10) => {
  return await getAttorneyLeaderboard(limit);
};

/**
 * Get top jurors from the leaderboard
 */
export const getTopJurors = async (limit: number = 10) => {
  return await getJurorLeaderboard(limit);
};
