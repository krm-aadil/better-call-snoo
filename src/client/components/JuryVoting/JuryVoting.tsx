import React, { useMemo, useEffect } from 'react';
import type { Case } from '../../../shared/types/api';
import type { CharacterPose } from '../../../shared/types/game';
import { useJuryVoting } from '../../hooks/useJuryVoting';

import { VotingButtons } from './VotingButtons';
import { ScalesOfJustice } from '../ScalesOfJustice';
import { VoteUpdateIndicator } from '../VoteUpdateIndicator';
import { audioManager } from '../../utils/audioUtils';

type JuryVotingProps = {
  caseData: Case;
  defenseText: string;
  authorUsername: string;
};

export const JuryVoting: React.FC<JuryVotingProps> = ({
  caseData,
  defenseText,
  authorUsername,
}) => {
  const { votes, loading, error, hasVoted, submitVote, connectionStatus } =
    useJuryVoting();

  // Initialize audio system on component mount
  useEffect(() => {
    const initAudio = async () => {
      try {
        await audioManager.initialize();
        const status = audioManager.getStatus();
        console.log('Audio system status:', status);
      } catch (err) {
        console.warn('Audio initialization failed:', err);
      }
    };

    // Initialize audio after a short delay to ensure user interaction
    const timer = setTimeout(initAudio, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Character poses are no longer needed since we removed the character sprites

  const handleVote = async (vote: 'guilty' | 'not_guilty') => {
    const success = await submitVote(vote);
    if (success) {
      // Vote submitted successfully, the component will update via the hook
    }
  };

  if (loading && votes.totalVotes === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-yellow-800 via-orange-800 to-red-900 flex items-center justify-center">
        <div className="text-white text-2xl ace-attorney-text">Loading Courtroom...</div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-no-repeat overflow-y-auto"
      style={{ backgroundImage: 'url(/court/court-background.png)' }}
    >
      {/* Skip link for accessibility */}
      <a href="#main-courtroom" className="skip-link">
        Skip to courtroom content
      </a>

      {/* Vote Update Indicator */}
      <VoteUpdateIndicator totalVotes={votes.totalVotes} />

      <div className="min-h-screen flex flex-col p-4">
        {/* Header */}
        <header className="text-center mb-6">
          <h1
            id="main-courtroom"
            className="text-3xl sm:text-4xl font-bold text-white mb-4 bg-black bg-opacity-70 rounded-lg p-4"
            tabIndex={-1}
          >
            COURTROOM
          </h1>
          <div className="bg-white bg-opacity-95 border-4 border-black rounded-lg shadow-xl p-4 max-w-2xl mx-auto">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
              {caseData.title}
            </h2>
            <p className="text-base sm:text-lg text-red-600 font-semibold">
              <span className="sr-only">Accused crime: </span>Crime: {caseData.crime}
            </p>
          </div>
        </header>

        {/* Main Content Area - Scrollable */}
        <div className="flex-1 flex flex-col gap-6 pb-32">
          {/* Defense Argument Section */}
          <div className="bg-white bg-opacity-95 border-4 border-black rounded-lg shadow-xl p-6 max-w-4xl mx-auto w-full">
            <h3 className="text-xl font-bold text-blue-600 mb-4 text-center">
              DEFENSE ARGUMENT
            </h3>
            <div className="bg-blue-50 rounded-lg p-4 border-2 border-blue-300">
              <blockquote className="text-base text-gray-800 italic leading-relaxed">
                <span className="sr-only">Defense argument by {authorUsername}: </span>
                "{defenseText}"
              </blockquote>
              <p className="text-sm text-gray-600 mt-3 text-right font-semibold">- Attorney {authorUsername}</p>
            </div>
          </div>

          {/* Characters Section */}
          <div className="flex flex-col lg:flex-row gap-6 max-w-6xl mx-auto w-full">
            {/* Left - Jury */}
            <div className="lg:w-1/2 bg-white bg-opacity-95 border-4 border-black rounded-lg shadow-xl p-6 text-center">
              <h3 className="text-xl font-bold text-gray-800 mb-4">THE JURY</h3>
              <div className="flex justify-center mb-4">
                <img
                  src="/lawyers/jury.png"
                  alt="The Jury"
                  className="w-32 h-32 sm:w-40 sm:h-40 object-contain"
                />
              </div>
              <p className="text-sm text-gray-600">You are part of the jury. Cast your verdict!</p>
            </div>

            {/* Right - Prisoner */}
            <div className="lg:w-1/2 bg-white bg-opacity-95 border-4 border-black rounded-lg shadow-xl p-6 text-center">
              <h3 className="text-xl font-bold text-gray-800 mb-4">THE ACCUSED</h3>
              <div className="flex justify-center mb-4">
                <img
                  src={`/prisoners/${Math.abs(caseData.id.split('_')[1]?.charCodeAt(0) || 1) % 6 + 1}.png`}
                  alt="The Accused"
                  className="w-32 h-32 sm:w-40 sm:h-40 object-contain border-2 border-gray-300 rounded-lg"
                />
              </div>
              <p className="text-sm text-gray-600">Awaiting your judgment</p>
            </div>
          </div>

          {/* Live Results Section */}
          <div className="bg-white bg-opacity-95 border-4 border-black rounded-lg shadow-xl p-6 max-w-2xl mx-auto w-full">
            <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
              LIVE VOTING RESULTS
            </h3>
            <div className="flex items-center justify-center">
              <ScalesOfJustice
                votes={votes}
                animated={true}
                showLiveIndicator={connectionStatus === 'connected'}
              />
            </div>
            
            {/* Vote Counts */}
            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="text-center bg-red-50 border-2 border-red-300 rounded-lg p-3">
                <div className="text-2xl font-bold text-red-600">{votes.guilty}</div>
                <div className="text-sm text-red-800">Guilty Votes</div>
              </div>
              <div className="text-center bg-green-50 border-2 border-green-300 rounded-lg p-3">
                <div className="text-2xl font-bold text-green-600">{votes.notGuilty}</div>
                <div className="text-sm text-green-800">Not Guilty Votes</div>
              </div>
            </div>
            
            <div className="text-center mt-4">
              <div className="text-lg font-semibold text-gray-700">
                Total Votes: {votes.totalVotes}
              </div>
            </div>
          </div>

          {/* User's Vote Display */}
          {hasVoted && (
            <div className="bg-white bg-opacity-95 border-4 border-black rounded-lg shadow-xl p-6 max-w-md mx-auto w-full text-center">
              <h3 className="text-lg font-bold text-gray-800 mb-3">Your Verdict</h3>
              <p className="text-2xl font-bold mb-2">
                <span className={`${votes.userVote === 'guilty' ? 'text-red-600' : 'text-green-600'}`}>
                  {votes.userVote === 'guilty' ? 'GUILTY' : 'NOT GUILTY'}
                </span>
              </p>
              <p className="text-sm text-gray-600">Thank you for serving as a juror!</p>
            </div>
          )}

          {/* Connection Status */}
          <div className="text-center">
            <div
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold border-2 border-black shadow-lg ${
                connectionStatus === 'connected'
                  ? 'bg-green-100 text-green-800'
                  : connectionStatus === 'connecting'
                    ? 'bg-yellow-100 text-yellow-800'
                    : connectionStatus === 'error'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-gray-100 text-gray-800'
              }`}
            >
              <div
                className={`w-2 h-2 rounded-full ${
                  connectionStatus === 'connected'
                    ? 'bg-green-500 animate-pulse'
                    : connectionStatus === 'connecting'
                      ? 'bg-yellow-500 animate-spin'
                      : connectionStatus === 'error'
                        ? 'bg-red-500'
                        : 'bg-gray-500'
                }`}
              ></div>
              {connectionStatus === 'connected' && 'Live Voting'}
              {connectionStatus === 'connecting' && 'Connecting...'}
              {connectionStatus === 'error' && 'Connection Error'}
              {connectionStatus === 'disconnected' && 'Offline'}
            </div>
          </div>

          {/* Error Display */}
          {error && (
            <div
              className="bg-red-100 border-4 border-red-500 text-red-800 p-4 rounded-lg max-w-2xl mx-auto w-full text-center font-bold"
              role="alert"
              aria-live="assertive"
            >
              <span className="sr-only">Error: </span>
              {error}
            </div>
          )}
        </div>

        {/* Fixed Bottom Voting Buttons */}
        {!hasVoted && (
          <div className="fixed bottom-0 left-0 right-0 bg-white bg-opacity-95 border-t-4 border-black p-4 shadow-2xl">
            <div className="max-w-2xl mx-auto">
              <h3 className="text-lg font-bold text-gray-800 mb-4 text-center">
                CAST YOUR VERDICT
              </h3>
              <VotingButtons onVote={handleVote} loading={loading} disabled={hasVoted} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
