// API types
export type {
  InitResponse,
  JuryVotingInitResponse,
  Case as ApiCase,
  DefenseSubmissionRequest,
  DefenseSubmissionResponse,
  VoteSubmissionRequest,
  VoteSubmissionResponse,
  VoteData as ApiVoteData,
  LeaderboardEntry,
  LeaderboardResponse,
} from './api';

// Game types
export type {
  GameState,
  CaseLibrary,
  Case,
  DefenseSubmission,
  Vote,
  VoteData,
  AttorneyScore,
  JurorScore,
  JuryVotingState,
  ScalesState,
  CharacterPose,
  CharacterState,
} from './game';
