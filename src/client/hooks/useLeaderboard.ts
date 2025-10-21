import { useState, useEffect } from 'react';
import type { LeaderboardResponse, LeaderboardEntry } from '../../shared/types/api';

type UserScores = {
  username: string;
  attorney: {
    totalScore: number;
    casesDefended: number;
    casesWon: number;
    winRate: number;
    rank: number | null;
  };
  juror: {
    totalPoints: number;
    casesJudged: number;
    correctVotes: number;
    accuracy: number;
    rank: number | null;
  };
};

export const useLeaderboard = () => {
  const [attorneys, setAttorneys] = useState<LeaderboardEntry[]>([]);
  const [jurors, setJurors] = useState<LeaderboardEntry[]>([]);
  const [userScores, setUserScores] = useState<UserScores | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLeaderboards = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/leaderboards');
      if (!response.ok) {
        throw new Error(`Failed to fetch leaderboards: ${response.status}`);
      }

      const data: LeaderboardResponse = await response.json();
      
      if (data.type === 'leaderboard') {
        setAttorneys(data.attorneys);
        setJurors(data.jurors);
      } else {
        throw new Error('Invalid leaderboard response format');
      }
    } catch (err) {
      console.error('Leaderboard fetch error:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch leaderboards');
    } finally {
      setLoading(false);
    }
  };

  const fetchUserScores = async () => {
    try {
      const response = await fetch('/api/user-scores');
      if (!response.ok) {
        throw new Error(`Failed to fetch user scores: ${response.status}`);
      }

      const result = await response.json();
      
      if (result.status === 'success' && result.data) {
        setUserScores(result.data);
      } else {
        console.warn('User scores not available:', result.message);
      }
    } catch (err) {
      console.error('User scores fetch error:', err);
      // Don't set error for user scores as it's not critical
    }
  };

  const refreshLeaderboards = () => {
    fetchLeaderboards();
    fetchUserScores();
  };

  useEffect(() => {
    refreshLeaderboards();
  }, []);

  return {
    attorneys,
    jurors,
    userScores,
    loading,
    error,
    refreshLeaderboards,
  };
};
