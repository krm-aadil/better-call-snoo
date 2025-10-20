import React from 'react';
import type { JuryVotingState } from '../../../shared/types/game';

type JuryVotingProps = {
  state: JuryVotingState;
  onVote: (vote: 'guilty' | 'not_guilty') => void;
  loading?: boolean;
};

export const JuryVoting: React.FC<JuryVotingProps> = ({ state, onVote, loading = false }) => {
  const { caseData, defenseText, authorUsername, votes, votingClosed } = state;

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-800 to-orange-900 p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white text-center mb-8">Courtroom</h1>
        
        {/* Case Banner */}
        <div className="bg-white rounded-lg shadow-lg p-4 mb-6">
          <h2 className="text-xl font-bold">{caseData.title}</h2>
          <p className="text-gray-600">{caseData.crime}</p>
        </div>

        {/* Courtroom Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Victim Snoo */}
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <div className="w-32 h-32 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
              <span className="text-4xl">😰</span>
            </div>
            <h3 className="text-lg font-bold">Victim Snoo</h3>
            <p className="text-gray-600">The Defendant</p>
          </div>

          {/* Lawyer Snoo */}
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <div className="w-32 h-32 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
              <span className="text-4xl">⚖️</span>
            </div>
            <h3 className="text-lg font-bold">Lawyer Snoo</h3>
            <p className="text-gray-600">Defense Attorney: {authorUsername}</p>
          </div>
        </div>

        {/* Defense Argument */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h3 className="text-xl font-bold mb-4">Defense Argument</h3>
          <div className="bg-gray-100 p-4 rounded-lg">
            <p className="text-lg italic">"{defenseText}"</p>
          </div>
        </div>

        {/* Voting Section */}
        {!votingClosed && !votes.userVote && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <h3 className="text-xl font-bold mb-4 text-center">Cast Your Verdict</h3>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => onVote('guilty')}
                disabled={loading}
                className="bg-red-600 text-white px-8 py-4 rounded-lg text-xl font-bold hover:bg-red-700 transition-colors disabled:opacity-50"
              >
                GUILTY
              </button>
              <button
                onClick={() => onVote('not_guilty')}
                disabled={loading}
                className="bg-green-600 text-white px-8 py-4 rounded-lg text-xl font-bold hover:bg-green-700 transition-colors disabled:opacity-50"
              >
                NOT GUILTY
              </button>
            </div>
          </div>
        )}

        {/* Scales of Justice - Vote Results */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-bold mb-4 text-center">Scales of Justice</h3>
          <div className="flex justify-center items-center gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600">
                {votes.totalVotes > 0 ? Math.round((votes.guilty / votes.totalVotes) * 100) : 0}%
              </div>
              <div className="text-red-600 font-semibold">GUILTY</div>
              <div className="text-sm text-gray-500">{votes.guilty} votes</div>
            </div>
            
            <div className="text-6xl">⚖️</div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">
                {votes.totalVotes > 0 ? Math.round((votes.notGuilty / votes.totalVotes) * 100) : 0}%
              </div>
              <div className="text-green-600 font-semibold">NOT GUILTY</div>
              <div className="text-sm text-gray-500">{votes.notGuilty} votes</div>
            </div>
          </div>
          
          {votes.userVote && (
            <div className="mt-4 text-center">
              <p className="text-lg">
                You voted: <span className={`font-bold ${votes.userVote === 'guilty' ? 'text-red-600' : 'text-green-600'}`}>
                  {votes.userVote === 'guilty' ? 'GUILTY' : 'NOT GUILTY'}
                </span>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
