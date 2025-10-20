import React from 'react';
import { useGame } from './hooks/useGame';
import { useDefenseSubmission } from './hooks/useDefenseSubmission';
import { DailyDocket } from './components/DailyDocket';
import { DefenseForm } from './components/DefenseForm';

export const App = () => {
  const { gameState, cases, selectedCase, username, loading, error, selectCase, backToDocket, setGameState } = useGame();
  const { submitDefense, loading: submissionLoading } = useDefenseSubmission();

  const handleDefenseSubmit = async (defenseText: string) => {
    if (!selectedCase) return;
    
    const success = await submitDefense(selectedCase.id, defenseText);
    if (success) {
      // Navigate to success state or back to docket
      backToDocket();
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-blue-900 to-purple-900">
        <div className="text-white text-2xl">Loading Better Call Snoo...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-red-900 to-purple-900">
        <div className="text-white text-xl text-center">
          <h1 className="text-2xl font-bold mb-4">Error</h1>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  switch (gameState) {
    case 'daily_docket':
      return (
        <DailyDocket
          cases={cases}
          onCaseSelect={selectCase}
          loading={loading}
        />
      );

    case 'defense_submission':
      if (!selectedCase) {
        backToDocket();
        return null;
      }
      return (
        <DefenseForm
          case_={selectedCase}
          onSubmit={handleDefenseSubmit}
          onBack={backToDocket}
          loading={submissionLoading}
        />
      );

    default:
      return (
        <div className="flex justify-center items-center min-h-screen">
          <div className="text-xl">Game state not implemented: {gameState}</div>
        </div>
      );
  }
};
