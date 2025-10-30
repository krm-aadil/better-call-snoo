import { useCallback, useEffect, useState } from 'react';
import type { VoteData, VoteSubmissionRequest, VoteSubmissionResponse } from '../../shared/types/api';
import { useRealTimeUpdates } from './useRealTimeUpdates';

type JuryVotingHookState = {
  votes: VoteData;
  loading: boolean;
  error: string | null;
  hasVoted: boolean;
};

export const useJuryVoting = () => {
  const [state, setState] = useState<JuryVotingHookState>({
    votes: {
      guilty: 0,
      notGuilty: 0,
      totalVotes: 0,
    },
    loading: true,
    error: null,
    hasVoted: false,
  });

  // Real-time vote updates function
  const updateVotes = useCallback(async () => {
    try {
      const res = await fetch('/api/votes');
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP ${res.status}`);
      }
      const data: VoteData = await res.json();
      
      setState(prev => {
        // Only update if there's actually a change to prevent unnecessary re-renders
        if (prev.votes.guilty !== data.guilty || 
            prev.votes.notGuilty !== data.notGuilty || 
            prev.votes.votingClosed !== data.votingClosed) {
          return {
            ...prev,
            votes: data,
            hasVoted: !!data.userVote,
            loading: false,
            error: null,
          };
        }
        return { ...prev, loading: false, error: null };
      });
    } catch (error) {
      console.error('Failed to fetch votes:', error);
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to fetch voting data',
      }));
    }
  }, []);

  // Use real-time updates hook
  const { 
    connectionStatus, 
    lastUpdateTime, 
    startPolling, 
    forceUpdate 
  } = useRealTimeUpdates(updateVotes, 2000);

  // Start real-time polling on component mount
  useEffect(() => {
    startPolling();
  }, [startPolling]);

  const submitVote = useCallback(async (vote: 'guilty' | 'not_guilty'): Promise<boolean> => {
    if (state.hasVoted) return false;

    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const requestBody: VoteSubmissionRequest = { vote };
      const res = await fetch('/api/vote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || `HTTP ${res.status}`);
      }

      const data: VoteSubmissionResponse = await res.json();
      if (data.type !== 'vote_submitted' || !data.success) {
        throw new Error('Vote submission failed');
      }

      // Immediately update with the response data
      setState(prev => ({
        ...prev,
        votes: data.currentVotes,
        hasVoted: true,
        loading: false,
      }));

      // Force an additional update after a short delay to ensure we have the latest data
      setTimeout(() => {
        forceUpdate().catch(err => console.warn('Failed to force update after vote:', err));
      }, 500);

      return true;
    } catch (err) {
      console.error('Failed to submit vote', err);
      setState(prev => ({
        ...prev,
        loading: false,
        error: err instanceof Error ? err.message : 'Failed to submit vote',
      }));
      return false;
    }
  }, [state.hasVoted, forceUpdate]);

  // Handle connection status errors
  useEffect(() => {
    if (connectionStatus === 'error') {
      setState(prev => ({
        ...prev,
        error: 'Connection lost. Vote updates may be delayed.',
      }));
    } else if (connectionStatus === 'connected') {
      setState(prev => ({
        ...prev,
        error: null,
      }));
    }
  }, [connectionStatus]);

  return {
    ...state,
    submitVote,
    connectionStatus,
    lastUpdateTime,
  } as const;
};
