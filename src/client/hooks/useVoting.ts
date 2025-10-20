import { useCallback, useState } from 'react';
import type { VoteSubmissionRequest, VoteSubmissionResponse, VoteData } from '../../shared/types/api';

export const useVoting = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitVote = useCallback(async (vote: 'guilty' | 'not_guilty'): Promise<VoteData | null> => {
    setLoading(true);
    setError(null);

    try {
      const request: VoteSubmissionRequest = { vote };

      const res = await fetch('/api/vote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(request),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      
      const data: VoteSubmissionResponse = await res.json();
      
      if (data.type !== 'vote_submitted') {
        throw new Error('Unexpected response type');
      }

      return data.success ? data.currentVotes : null;
    } catch (err) {
      console.error('Failed to submit vote', err);
      setError(err instanceof Error ? err.message : 'Failed to submit vote');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchVotes = useCallback(async (): Promise<VoteData | null> => {
    try {
      const res = await fetch('/api/votes');
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      
      const data: VoteData = await res.json();
      return data;
    } catch (err) {
      console.error('Failed to fetch votes', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch votes');
      return null;
    }
  }, []);

  return {
    submitVote,
    fetchVotes,
    loading,
    error,
  } as const;
};
