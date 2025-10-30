import { useCallback, useEffect, useState } from 'react';
import type { InitResponse, JuryVotingInitResponse, Case } from '../../shared/types/api';
import type { GameState } from '../../shared/types/game';

type GameHookState = {
  gameState: GameState;
  cases: Case[];
  selectedCase: Case | null;
  username: string | null;
  loading: boolean;
  error: string | null;
  // Jury voting specific data
  juryVotingData?: {
    caseData: Case;
    defenseText: string;
    authorUsername: string;
    defenseId: string;
  };
};

export const useGame = () => {
  const [state, setState] = useState<GameHookState>({
    gameState: 'role_selection',
    cases: [],
    selectedCase: null,
    username: null,
    loading: true,
    error: null,
  });

  // Initialize game data
  useEffect(() => {
    const init = async () => {
      try {
        const res = await fetch('/api/init');
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data: InitResponse | JuryVotingInitResponse = await res.json();
        
        if (data.type === 'jury_voting_init') {
          // This is a jury voting post - skip splash and go directly to jury voting
          setState(prev => ({
            ...prev,
            gameState: 'jury_voting',
            username: data.username,
            juryVotingData: {
              caseData: data.caseData,
              defenseText: data.defenseText,
              authorUsername: data.authorUsername,
              defenseId: data.defenseId,
            },
            loading: false,
          }));
        } else if (data.type === 'init') {
          // This is the main game post - load data and go directly to daily docket
          setState(prev => ({
            ...prev,
            cases: data.dailyCases,
            username: data.username,
            gameState: 'daily_docket',
            loading: false,
          }));
        } else {
          throw new Error('Unexpected response type');
        }
      } catch (err) {
        console.error('Failed to initialize game', err);
        setState(prev => ({
          ...prev,
          loading: false,
          error: err instanceof Error ? err.message : 'Failed to load game',
        }));
      }
    };
    void init();
  }, []);

  const selectCase = useCallback((caseId: string) => {
    const case_ = state.cases.find(c => c.id === caseId);
    if (case_) {
      setState(prev => ({
        ...prev,
        selectedCase: case_,
        gameState: 'defense_submission',
      }));
    }
  }, [state.cases]);

  const backToDocket = useCallback(() => {
    setState(prev => ({
      ...prev,
      selectedCase: null,
      gameState: 'daily_docket',
    }));
  }, []);

  const setGameState = useCallback((newState: GameState) => {
    setState(prev => ({ ...prev, gameState: newState }));
  }, []);

  const selectJudgeRole = useCallback(() => {
    setState(prev => ({ ...prev, gameState: 'judge_panel' }));
  }, []);

  const selectDefendantRole = useCallback(() => {
    setState(prev => ({ ...prev, gameState: 'daily_docket' }));
  }, []);

  const backToRoleSelection = useCallback(() => {
    setState(prev => ({ ...prev, gameState: 'role_selection' }));
  }, []);

  const selectDefendantPost = useCallback((postId: string) => {
    // This would redirect to the specific jury voting post
    // For now, we'll just log it - in a real implementation, 
    // you'd navigate to that specific post URL
    console.log('Navigating to defendant post:', postId);
    // In Devvit, you'd typically use reddit.navigateTo() or similar
    // window.open(`/r/${subreddit}/comments/${postId}`, '_blank');
  }, []);

  return {
    ...state,
    selectCase,
    backToDocket,
    setGameState,
    selectJudgeRole,
    selectDefendantRole,
    backToRoleSelection,
    selectDefendantPost,
  } as const;
};
