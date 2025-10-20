import { useCallback, useEffect, useState } from 'react';
import type { InitResponse, Case } from '../../shared/types/api';
import type { GameState } from '../../shared/types/game';

type GameHookState = {
  gameState: GameState;
  cases: Case[];
  selectedCase: Case | null;
  username: string | null;
  loading: boolean;
  error: string | null;
};

export const useGame = () => {
  const [state, setState] = useState<GameHookState>({
    gameState: 'daily_docket',
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
        const data: InitResponse = await res.json();
        if (data.type !== 'init') throw new Error('Unexpected response');
        
        setState(prev => ({
          ...prev,
          cases: data.dailyCases,
          username: data.username,
          loading: false,
        }));
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

  return {
    ...state,
    selectCase,
    backToDocket,
    setGameState,
  } as const;
};
