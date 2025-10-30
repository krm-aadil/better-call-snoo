import React, { useEffect } from 'react';
import type { Case } from '../../../shared/types/api';
import { useJuryVoting } from '../../hooks/useJuryVoting';

import { VotingButtons } from './VotingButtons';
import { ScalesOfJustice } from '../ScalesOfJustice';
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
  const { votes, loading, error, hasVoted, submitVote, connectionStatus } = useJuryVoting();

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
          <span className="sr-only">Loading courtroom: </span>Loading Courtroom...
        </div>
      </div>
    );
  }

  // Show live voting results only after user has voted
  if (hasVoted) {
    // Determine the verdict based on majority vote
    const isGuiltyVerdict = votes.guilty > votes.notGuilty;
    const verdictImage = isGuiltyVerdict ? '/guilty.png' : '/not-guilty.png';
    const verdictText = isGuiltyVerdict ? 'GUILTY' : 'NOT GUILTY';
    const verdictColor = isGuiltyVerdict ? 'text-red-600' : 'text-blue-600';

    return (
      <div
        className="min-h-screen bg-cover bg-center bg-no-repeat overflow-y-auto"
        style={{ backgroundImage: 'url(/judge-background.png)' }}
      >
        {/* Skip link for accessibility */}
        <a href="#voting-results" className="skip-link">
          Skip to voting results
        </a>

        {/* Connection Status - Top Right Corner */}
        <div className="fixed top-4 right-4 z-10">
          <div
            className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold border-4 border-black shadow-lg ${
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
            {connectionStatus === 'connected' && 'Live'}
            {connectionStatus === 'connecting' && 'Connecting'}
            {connectionStatus === 'error' && 'Error'}
            {connectionStatus === 'disconnected' && 'Offline'}
          </div>
        </div>

        <div className="min-h-screen flex flex-col p-4">
          {/* Header */}
          <header className="text-center mb-8">
            <h1
              id="voting-results"
              className="text-3xl sm:text-4xl font-bold text-white mb-4 bg-black bg-opacity-70 rounded-lg p-4"
              tabIndex={-1}
            >
              VOTING RESULTS
            </h1>
          </header>

          {/* Verdict Image */}
          <div className="flex justify-center mb-8">
            <img
              src={verdictImage}
              alt={`Verdict: ${verdictText}`}
              className="w-64 sm:w-80 lg:w-96 h-auto object-contain drop-shadow-2xl"
            />
          </div>

          {/* Verdict Text */}
          <div className="text-center mb-8">
            <h2
              className={`text-4xl sm:text-5xl lg:text-6xl font-bold ${verdictColor} drop-shadow-lg`}
            >
              {verdictText}
            </h2>
          </div>

          {/* Live Results Section */}
          <div className="bg-white border-4 border-black rounded-lg shadow-xl p-6 max-w-2xl mx-auto w-full mb-6">
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
              <div className="text-center bg-red-800 border-4 border-black rounded-lg p-4 shadow-lg">
                <div className="text-3xl font-bold text-white mb-2">{votes.guilty}</div>
                <div className="text-sm font-semibold text-red-100">Guilty Votes</div>
              </div>
              <div className="text-center bg-green-800 border-4 border-black rounded-lg p-4 shadow-lg">
                <div className="text-3xl font-bold text-white mb-2">{votes.notGuilty}</div>
                <div className="text-sm font-semibold text-green-100">Not Guilty Votes</div>
              </div>
            </div>

            <div className="text-center mt-4">
              <div className="text-lg font-semibold text-gray-700">
                Total Votes: {votes.totalVotes}
              </div>
            </div>
          </div>

          {/* User's Vote Display */}
          <div className="bg-blue-600 border-4 border-black rounded-lg shadow-xl p-6 max-w-md mx-auto w-full text-center">
            <h3 className="text-lg font-bold text-black mb-3">Your Vote</h3>
            <p className="text-2xl font-bold mb-2 text-white">
              {votes.userVote === 'guilty' ? 'GUILTY' : 'NOT GUILTY'}
            </p>
            <p className="text-sm text-blue-100">Thank you for serving as a juror!</p>
          </div>

          {/* Error Display */}
          {error && (
            <div
              className="bg-red-100 border-4 border-red-500 text-red-800 p-4 rounded-lg max-w-2xl mx-auto w-full text-center font-bold mt-6"
              role="alert"
              aria-live="assertive"
            >
              <span className="sr-only">Error: </span>
              {error}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat overflow-y-auto"
      style={{ backgroundImage: 'url(/TEST-BACKGROUND.png)' }}
    >
      {/* Skip link for accessibility */}
      <a href="#main-courtroom" className="skip-link">
        Skip to courtroom content
      </a>

      {/* Connection Status - Top Right Corner */}
      <div className="fixed top-4 right-4 z-10">
        <div
          className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold border-2 border-black shadow-lg ${
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
          {connectionStatus === 'connected' && 'Live'}
          {connectionStatus === 'connecting' && 'Connecting'}
          {connectionStatus === 'error' && 'Error'}
          {connectionStatus === 'disconnected' && 'Offline'}
        </div>
      </div>

      <div className="min-h-screen flex flex-col p-4 pb-32">
        {/* Header - Case Details */}
        <header className="text-center mb-8">
          <h1
            id="main-courtroom"
            className="text-3xl sm:text-4xl font-bold text-white mb-4 bg-black bg-opacity-70 rounded-lg p-4"
            tabIndex={-1}
          >
            COURTROOM
          </h1>
          <div className="bg-white border-4 border-blue-600 rounded-lg shadow-xl p-4 max-w-2xl mx-auto">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">{caseData.title}</h2>
            <p className="text-base sm:text-lg text-red-600 font-semibold">
              <span className="sr-only">Accused crime: </span>Crime: {caseData.crime}
            </p>
          </div>
        </header>

        {/* Characters Section - Just Images */}
        <div className="flex justify-center items-center gap-12 lg:gap-24 mb-8">
          {/* Left - Jury Image Only */}
          <div className="flex justify-center">
            <img
              src="/lawyers/jury.png"
              alt="The Jury"
              className="w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 object-contain drop-shadow-lg"
            />
          </div>

          {/* Right - Accused Image Only */}
          <div className="flex justify-center">
            <img
              src={`/prisoners/${(Math.abs(caseData.id.split('_')[1]?.charCodeAt(0) || 1) % 6) + 1}.png`}
              alt="The Accused"
              className="w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 object-contain drop-shadow-lg"
            />
          </div>
        </div>

        {/* Defense Argument Section */}
        <div className="bg-blue-600 border-4 border-black rounded-lg shadow-xl p-6 max-w-4xl mx-auto w-full mb-8">
          <h3 className="text-lg font-bold text-black mb-4">Defense Statement</h3>
          <blockquote className="text-base sm:text-lg text-white leading-relaxed text-center">
            <span className="sr-only">Defense argument by {authorUsername}: </span>"{defenseText}"
          </blockquote>
          <p className="text-sm text-blue-100 mt-4 text-right font-semibold">
            - Attorney {authorUsername}
          </p>
        </div>

        {/* Error Display */}
        {error && (
          <div
            className="bg-red-100 border-4 border-red-500 text-red-800 p-4 rounded-lg max-w-2xl mx-auto w-full text-center font-bold mb-8"
            role="alert"
            aria-live="assertive"
          >
            <span className="sr-only">Error: </span>
            {error}
          </div>
        )}
      </div>

      {/* Fixed Bottom Voting Buttons */}
      <div className="fixed bottom-0 left-0 right-0 bg-white bg-opacity-95 border-t-4 border-black p-4 shadow-2xl">
        <div className="max-w-4xl mx-auto flex justify-center">
          <VotingButtons onVote={handleVote} loading={loading} disabled={hasVoted} />
        </div>
      </div>
    </div>
  );
};
