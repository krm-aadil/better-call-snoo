// Core game state types
export type GameState = 'daily_docket' | 'defense_submission' | 'jury_voting' | 'results' | 'leaderboard';

// Case library and management
export type CaseLibrary = Case[];

export type Case = {
  id: string;
  title: string;
  crime: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
};

// Defense submission data
export type DefenseSubmission = {
  id: string;
  caseId: string;
  defenseText: string;
  authorId: string;
  authorUsername: string;
  timestamp: number;
  votingEndTime: number;
};

// Voting and jury system
export type Vote = {
  userId: string;
  vote: 'guilty' | 'not_guilty';
  timestamp: number;
};

export type VoteData = {
  guilty: number;
  notGuilty: number;
  totalVotes: number;
  userVote?: 'guilty' | 'not_guilty';
  finalVerdict?: 'guilty' | 'not_guilty';
  votingClosed: boolean;
};

// Scoring system
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

// UI component states
export type JuryVotingState = {
  caseData: Case;
  defenseText: string;
  authorUsername: string;
  votes: VoteData;
  votingClosed: boolean;
};

export type ScalesState = {
  guiltyPercentage: number;
  notGuiltyPercentage: number;
  totalVotes: number;
  scaleRotation: number; // -45° to +45° based on balance
};

// Character poses for Snoo sprites
export type CharacterPose = 'neutral' | 'confident' | 'worried' | 'celebrating' | 'defeated';

export type CharacterState = {
  victimSnoo: CharacterPose;
  lawyerSnoo: CharacterPose;
};
