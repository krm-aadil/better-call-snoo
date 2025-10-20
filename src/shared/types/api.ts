// Game initialization response
export type InitResponse = {
  type: 'init';
  postId: string;
  username: string;
  dailyCases: Case[];
};

// Case data structure
export type Case = {
  id: string;
  title: string;
  crime: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
};

// Defense submission request/response
export type DefenseSubmissionRequest = {
  caseId: string;
  defenseText: string;
};

export type DefenseSubmissionResponse = {
  type: 'defense_submitted';
  postId: string;
  success: boolean;
};

// Vote submission request/response
export type VoteSubmissionRequest = {
  vote: 'guilty' | 'not_guilty';
};

export type VoteSubmissionResponse = {
  type: 'vote_submitted';
  success: boolean;
  currentVotes: VoteData;
};

// Vote data structure
export type VoteData = {
  guilty: number;
  notGuilty: number;
  totalVotes: number;
  userVote?: 'guilty' | 'not_guilty';
};

// Leaderboard data
export type LeaderboardEntry = {
  username: string;
  score: number;
  rank: number;
};

export type LeaderboardResponse = {
  type: 'leaderboard';
  attorneys: LeaderboardEntry[];
  jurors: LeaderboardEntry[];
};
