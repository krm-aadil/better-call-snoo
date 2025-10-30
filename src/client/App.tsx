import { useGame } from './hooks/useGame';
import { useDefenseSubmission } from './hooks/useDefenseSubmission';
import { RoleSelection } from './components/RoleSelection';
import { JudgePanel } from './components/JudgePanel';
import { DailyDocket } from './components/DailyDocket';
import { DefenseForm } from './components/DefenseForm';
import { JuryVoting } from './components/JuryVoting';
import { Leaderboard } from './components/Leaderboard';

export const App = () => {
  const {
    gameState,
    cases,
    selectedCase,
    loading,
    error,
    juryVotingData,
    selectCase,
    backToDocket,
    setGameState,
    selectJudgeRole,
    selectDefendantRole,
    backToRoleSelection,
    selectDefendantPost,
  } = useGame();
  const {
    submitDefense,
    loading: submissionLoading,
    error: submissionError,
  } = useDefenseSubmission();

  const handleDefenseSubmit = async (defenseText: string) => {
    if (!selectedCase) return;

    const success = await submitDefense(selectedCase.id, defenseText);
    if (success) {
      // Show success message briefly, then navigate back to docket
      setTimeout(() => {
        backToDocket();
      }, 3000); // Show success message for 3 seconds
    }
  };

  const handleLeaderboardClick = () => {
    setGameState('leaderboard');
  };

  const handleBackFromLeaderboard = () => {
    setGameState('daily_docket');
  };

  if (loading) {
    return (
      // Corrected the background image path as per your instruction
      <div
        className="flex justify-center items-center min-h-screen bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/New-Loading-Screen.png')`,
        }}
      >
        <div
          className="text-white text-2xl mobile-text bg-blue-300 bg-opacity-70 p-6 rounded-lg shadow-xl border-2 border-white" // Kept enhanced readability styles
          role="status"
          aria-live="polite"
        >
          <span className="sr-only">Loading application: </span>Loading Better Call Snoo...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-red-900 to-purple-900">
        <div className="text-white text-xl text-center mobile-spacing" role="alert">
          <h1 className="text-2xl font-bold mb-4 mobile-text">Error</h1>
          <p className="mobile-text">{error}</p>
        </div>
      </div>
    );
  }

  switch (gameState) {
    case 'role_selection':
      return (
        <div className="animate-fade-in-up">
          <RoleSelection
            onJudgeSelect={selectJudgeRole}
            onDefendantSelect={selectDefendantRole}
          />
        </div>
      );

    case 'judge_panel':
      return (
        <div className="animate-scale-in">
          <JudgePanel
            onBackToRoleSelection={backToRoleSelection}
            onSelectDefendantPost={selectDefendantPost}
          />
        </div>
      );

    case 'daily_docket':
      return (
        <div className="animate-scale-in">
          <DailyDocket
            cases={cases}
            onCaseSelect={selectCase}
            onLeaderboardClick={handleLeaderboardClick}
            loading={loading}
          />
        </div>
      );

    case 'defense_submission':
      if (!selectedCase) {
        backToDocket();
        return null;
      }
      return (
        <div className="animate-slide-in-right">
          <DefenseForm
            case_={selectedCase}
            onSubmit={handleDefenseSubmit}
            onBack={backToDocket}
            loading={submissionLoading}
            error={submissionError}
          />
        </div>
      );

    case 'jury_voting':
      if (!juryVotingData) {
        return (
          <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-red-900 to-purple-900 animate-fade-in-up">
            <div className="text-white text-xl text-center mobile-spacing" role="alert">
              <h1 className="text-2xl font-bold mb-4 mobile-text">Error</h1>
              <p className="mobile-text">Jury voting data not available</p>
            </div>
          </div>
        );
      }
      return (
        <div className="animate-slide-in-left">
          <JuryVoting
            caseData={juryVotingData.caseData}
            defenseText={juryVotingData.defenseText}
            authorUsername={juryVotingData.authorUsername}
          />
        </div>
      );

    case 'leaderboard':
      return (
        <div className="animate-scale-in">
          <Leaderboard onBack={handleBackFromLeaderboard} />
        </div>
      );

    default:
      return (
        <div className="flex justify-center items-center min-h-screen animate-fade-in-up">
          <div className="text-xl mobile-text" role="alert">
            Game state not implemented: {gameState}
          </div>
        </div>
      );
  }
};
