import React from 'react';
import { useLeaderboard } from '../../hooks/useLeaderboard';
import { Avatar } from '../Avatar';

type LeaderboardEntryProps = {
  entry: {
    username: string;
    score: number;
    rank: number;
  };
  type: 'attorney' | 'juror';
};

const LeaderboardEntryComponent: React.FC<LeaderboardEntryProps> = ({ entry, type }) => {
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return '🥇';
      case 2:
        return '🥈';
      case 3:
        return '🥉';
      default:
        return `#${rank}`;
    }
  };

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return 'text-yellow-600';
      case 2:
        return 'text-gray-500';
      case 3:
        return 'text-amber-600';
      default:
        return 'text-gray-700';
    }
  };

  return (
    <div
      className={`flex items-center justify-between p-3 rounded-2xl border-2 border-black mobile-spacing transition-all duration-200 hover:scale-105 hover:shadow-lg ${
        entry.rank <= 3
          ? 'bg-gradient-to-r from-yellow-50 to-amber-50 shadow-md'
          : 'bg-blue-50 hover:bg-blue-100'
      }`}
      role="listitem"
      aria-label={`Rank ${entry.rank}: ${entry.username} with ${entry.score} points`}
    >
      <div className="flex items-center space-x-3">
        <Avatar username={entry.username} size="medium" />
        <div className="flex flex-col">
          <span
            className={`text-sm font-bold ${getRankColor(entry.rank)}`}
            aria-label={`Rank ${entry.rank}`}
          >
            {getRankIcon(entry.rank)}
          </span>
          <span className="font-semibold text-gray-800 truncate max-w-32 mobile-text text-sm">
            {entry.username}
          </span>
        </div>
      </div>
      <div className="text-right">
        <span className="font-bold text-lg text-blue-600 mobile-text">{entry.score}</span>
        <span className="text-xs text-gray-600 ml-1">
          <span className="sr-only">{type === 'attorney' ? 'points' : 'points'}</span>
          <span aria-hidden="true">pts</span>
        </span>
      </div>
    </div>
  );
};

type LeaderboardProps = {
  onBack?: () => void;
};

export const Leaderboard: React.FC<LeaderboardProps> = ({ onBack }) => {
  const { attorneys, jurors, userScores, loading, error, refreshLeaderboards } = useLeaderboard();

  if (loading) {
    return (
      <div
        className="flex justify-center items-center min-h-screen bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/New-Loading-Screen.png')`,
        }}
      >
        <div
          className="text-white text-2xl ace-attorney-text bg-blue-300 bg-opacity-70 p-6 rounded-lg shadow-xl border-2 border-white"
          role="status"
          aria-live="polite"
        >
          <span className="sr-only">Loading leaderboard: </span>Loading Hall of Justice...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-b from-red-900 to-purple-900 p-4">
        <div className="text-white text-xl text-center mb-4">
          <h1 className="text-2xl font-bold mb-4 ace-attorney-text">Error Loading Leaderboards</h1>
          <p className="mb-4">{error}</p>
          <button
            onClick={refreshLeaderboards}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg border-4 border-black transition-all duration-200 hover:scale-105 shadow-lg"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat p-4"
      style={{ backgroundImage: 'url(/New-Loading-Screen.png)' }}
    >
      {/* Skip link for accessibility */}
      <a href="#leaderboard-content" className="skip-link">
        Skip to leaderboard content
      </a>

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="text-center mb-8">
          <h1
            id="leaderboard-content"
            className="text-4xl sm:text-5xl font-bold text-gray-800 mb-2 mobile-text"
            tabIndex={-1}
          >
            Hall of Justice
          </h1>
          <p className="text-lg sm:text-xl text-white mobile-text">
            The finest attorneys and most discerning jurors in the land
          </p>
          <nav
            className="mt-4 space-x-4 flex flex-wrap justify-center gap-4"
            aria-label="Leaderboard navigation"
          >
            {onBack && (
              <button
                onClick={onBack}
                className="bg-blue-600 hover:bg-blue-700 focus:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg border-4 border-black transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl mobile-touch-target mobile-text"
                aria-label="Go back to Daily Docket"
              >
                ← Back to Docket
              </button>
            )}
            <button
              onClick={refreshLeaderboards}
              className="bg-blue-600 hover:bg-blue-700 focus:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg border-4 border-black transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl mobile-touch-target mobile-text"
              aria-label="Refresh leaderboard rankings"
            >
              <span aria-hidden="true">🔄</span> Refresh Rankings
            </button>
          </nav>
        </header>

        {/* User's Personal Scores */}
        {userScores && (
          <section
            className="bg-blue-600 rounded-3xl p-6 mb-8 border-4 border-black shadow-xl mobile-spacing"
            aria-labelledby="user-performance-heading"
          >
            <h2
              id="user-performance-heading"
              className="text-2xl sm:text-3xl font-bold text-white mb-6 text-center mobile-text"
            >
              Your Performance
            </h2>
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Left Side - Player Avatar */}
              <div className="flex flex-col items-center lg:w-1/3">
                <div className="shadow-lg mb-4">
                  <Avatar
                    username={userScores?.username || 'Player'}
                    size="large"
                    className="w-24 h-24 sm:w-32 sm:h-32 border-4 border-white"
                  />
                </div>
                <p className="text-white font-bold text-lg text-center">Your Stats</p>
              </div>

              {/* Right Side - Performance Stats */}
              <div className="lg:w-2/3 grid gap-4 md:grid-cols-2">
                {/* User Attorney Stats */}
                <div className="bg-white rounded-2xl border-4 border-blue-600 p-4 shadow-xl mobile-spacing">
                  <h3 className="text-lg font-bold text-blue-600 mb-3 mobile-text">As Attorney</h3>
                  <dl className="space-y-2 text-gray-800">
                    <div className="flex justify-between mobile-text">
                      <dt>Total Score:</dt>
                      <dd className="font-bold text-blue-600">{userScores.attorney.totalScore}</dd>
                    </div>
                    <div className="flex justify-between mobile-text">
                      <dt>Cases Defended:</dt>
                      <dd>{userScores.attorney.casesDefended}</dd>
                    </div>
                    <div className="flex justify-between mobile-text">
                      <dt>Cases Won:</dt>
                      <dd>{userScores.attorney.casesWon}</dd>
                    </div>
                    <div className="flex justify-between mobile-text">
                      <dt>Win Rate:</dt>
                      <dd>{userScores.attorney.winRate.toFixed(1)}%</dd>
                    </div>
                    <div className="flex justify-between mobile-text">
                      <dt>Rank:</dt>
                      <dd className="font-bold text-orange-500">
                        {userScores.attorney.rank ? `#${userScores.attorney.rank}` : 'Unranked'}
                      </dd>
                    </div>
                  </dl>
                </div>

                {/* User Juror Stats */}
                <div className="bg-white rounded-2xl border-4 border-blue-600 p-4 shadow-xl mobile-spacing">
                  <h3 className="text-lg font-bold text-blue-600 mb-3 mobile-text">As Juror</h3>
                  <dl className="space-y-2 text-gray-800">
                    <div className="flex justify-between mobile-text">
                      <dt>Total Points:</dt>
                      <dd className="font-bold text-blue-600">{userScores.juror.totalPoints}</dd>
                    </div>
                    <div className="flex justify-between mobile-text">
                      <dt>Cases Judged:</dt>
                      <dd>{userScores.juror.casesJudged}</dd>
                    </div>
                    <div className="flex justify-between mobile-text">
                      <dt>Correct Votes:</dt>
                      <dd>{userScores.juror.correctVotes}</dd>
                    </div>
                    <div className="flex justify-between mobile-text">
                      <dt>Accuracy:</dt>
                      <dd>{userScores.juror.accuracy.toFixed(1)}%</dd>
                    </div>
                    <div className="flex justify-between mobile-text">
                      <dt>Rank:</dt>
                      <dd className="font-bold text-orange-500">
                        {userScores.juror.rank ? `#${userScores.juror.rank}` : 'Unranked'}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Leaderboards */}
        <main className="grid gap-8 lg:grid-cols-2">
          {/* Top Attorneys */}
          <section
            className="bg-white rounded-3xl border-4 border-black shadow-xl overflow-hidden"
            aria-labelledby="attorneys-heading"
          >
            <header className="bg-blue-600 p-6 flex items-center justify-center gap-4">
              <img
                src="/lawyers/smirk-jurybox.png"
                alt="Attorney"
                className="w-16 h-16 object-contain"
              />
              <div className="text-center">
                <h2
                  id="attorneys-heading"
                  className="text-2xl sm:text-3xl font-bold text-white mobile-text"
                >
                  Top Attorneys
                </h2>
                <p className="text-blue-100 mt-1 mobile-text">Masters of legal defense</p>
              </div>
            </header>
            <div className="p-6">
              {attorneys.length > 0 ? (
                <ol className="space-y-3" role="list" aria-label="Top attorneys leaderboard">
                  {attorneys.map((attorney) => (
                    <LeaderboardEntryComponent
                      key={attorney.username}
                      entry={attorney}
                      type="attorney"
                    />
                  ))}
                </ol>
              ) : (
                <div className="text-center text-gray-500 py-8 mobile-spacing">
                  <p className="text-lg mobile-text">No attorneys ranked yet</p>
                  <p className="text-sm mobile-text">Submit your first defense to get started!</p>
                </div>
              )}
            </div>
          </section>

          {/* Top Jurors */}
          <section
            className="bg-white rounded-3xl border-4 border-black shadow-xl overflow-hidden"
            aria-labelledby="jurors-heading"
          >
            <header className="bg-blue-600 p-6 flex items-center justify-center gap-4">
              <img src="/lawyers/jury.png" alt="Jury" className="w-16 h-16 object-contain" />
              <div className="text-center">
                <h2
                  id="jurors-heading"
                  className="text-2xl sm:text-3xl font-bold text-white mobile-text"
                >
                  Top Jurors
                </h2>
                <p className="text-blue-100 mt-1 mobile-text">Keepers of community justice</p>
              </div>
            </header>
            <div className="p-6">
              {jurors.length > 0 ? (
                <ol className="space-y-3" role="list" aria-label="Top jurors leaderboard">
                  {jurors.map((juror) => (
                    <LeaderboardEntryComponent key={juror.username} entry={juror} type="juror" />
                  ))}
                </ol>
              ) : (
                <div className="text-center text-gray-500 py-8 mobile-spacing">
                  <p className="text-lg mobile-text">No jurors ranked yet</p>
                  <p className="text-sm mobile-text">Vote on cases to join the ranks!</p>
                </div>
              )}
            </div>
          </section>
        </main>

        {/* Scoring Information */}
        <aside
          className="mt-8 bg-white rounded-3xl border-4 border-black p-6 shadow-xl mobile-spacing"
          aria-labelledby="scoring-info-heading"
        >
          <h3
            id="scoring-info-heading"
            className="text-xl sm:text-2xl font-bold text-blue-600 mb-6 text-center mobile-text"
          >
            How Scoring Works
          </h3>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="bg-white rounded-2xl border-4 border-blue-600 p-4 shadow-lg">
              <h4 className="font-bold text-blue-600 mb-3 text-lg mobile-text">
                Attorney Scoring:
              </h4>
              <ul className="text-sm space-y-2 text-gray-700 mobile-text">
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  Base Score: (Not Guilty votes × 2) - (Guilty votes)
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  Win Bonus: +500 points for majority Not Guilty verdict
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  Defend cases to climb the rankings!
                </li>
              </ul>
            </div>
            <div className="bg-white rounded-2xl border-4 border-blue-600 p-4 shadow-lg">
              <h4 className="font-bold text-blue-600 mb-3 text-lg mobile-text">Juror Scoring:</h4>
              <ul className="text-sm space-y-2 text-gray-700 mobile-text">
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  +10 points for matching the majority vote
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>0 points for voting with the minority
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  Vote wisely to maximize your accuracy!
                </li>
              </ul>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};
