// Scoring service for attorney and juror score calculations
// These functions implement the scoring formulas from the requirements

/**
 * Calculate attorney score based on voting results
 * Formula from requirements: (Total 'Not GUILTY' Votes * 2) - (Total 'GUILTY' Votes) + 500 bonus if majority Not Guilty
 */
export const calculateAttorneyScore = (votes: { guilty: number; notGuilty: number }): number => {
  // Base score calculation
  const baseScore = (votes.notGuilty * 2) - votes.guilty;
  
  // Add +500 bonus if majority Not Guilty (>50%)
  const winBonus = votes.notGuilty > votes.guilty ? 500 : 0;
  
  return baseScore + winBonus;
};

/**
 * Calculate juror score based on vote accuracy
 * Formula from requirements: +10 points if vote matches final verdict, 0 points otherwise
 */
export const calculateJurorScore = (userVote: string, finalVerdict: string): number => {
  return userVote === finalVerdict ? 10 : 0;
};
