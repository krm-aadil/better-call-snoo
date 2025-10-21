import React, { useMemo, useEffect } from 'react';
import type { Case } from '../../../shared/types/api';
import type { CharacterPose } from '../../../shared/types/game';
import { useJuryVoting } from '../../hooks/useJuryVoting';
import { CourtRoomCharacters } from './CharacterSprites';
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
  authorUsername 
}) => {
  const { votes, loading, error, hasVoted, submitVote, connectionStatus, lastUpdateTime } = useJuryVoting();

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

  // Determine character poses based on vote percentages
  const { victimPose, lawyerPose } = useMemo((): { victimPose: CharacterPose; lawyerPose: CharacterPose } => {
    if (votes.totalVotes === 0) {
      return { victimPose: 'neutral', lawyerPose: 'neutral' };
    }

    const guiltyPercentage = (votes.guilty / votes.totalVotes) * 100;
    const notGuiltyPercentage = (votes.notGuilty / votes.totalVotes) * 100;

    let victimPose: CharacterPose = 'neutral';
    let lawyerPose: CharacterPose = 'neutral';

    if (notGuiltyPercentage > 60) {
      victimPose = 'celebrating';
      lawyerPose = 'celebrating';
    } else if (guiltyPercentage > 60) {
      victimPose = 'defeated';
      lawyerPose = 'defeated';
    } else if (notGuiltyPercentage > guiltyPercentage) {
      victimPose = 'confident';
      lawyerPose = 'confident';
    } else if (guiltyPercentage > notGuiltyPercentage) {
      victimPose = 'worried';
      lawyerPose = 'worried';
    }

    return { victimPose, lawyerPose };
  }, [votes]);

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
    <div className="min-h-screen bg-gradient-to-b from-yellow-800 via-orange-800 to-red-900 p-4">
      {/* Skip link for accessibility */}
      <a href="#main-courtroom" className="skip-link">
        Skip to courtroom content
      </a>
      
      {/* Vote Update Indicator */}
      <VoteUpdateIndicator totalVotes={votes.totalVotes} />
      
      <div className="max-w-6xl mx-auto">
        {/* Courtroom Header */}
        <header className="text-center mb-8">
          <h1 
            id="main-courtroom"
            className="text-5xl font-bold text-white ace-attorney-text mb-4 animate-text-reveal mobile-text"
            tabIndex={-1}
          >
            COURTROOM
          </h1>
          <div className="bg-gradient-to-r from-yellow-600 to-yellow-800 rounded-lg shadow-2xl p-4 border-4 border-yellow-500 mobile-spacing animate-scale-in" style={{ animationDelay: '0.5s' }}>
            <div className="bg-white rounded-lg p-4">
              <h2 className="text-2xl font-bold ace-attorney-text text-gray-800 mb-2 mobile-text">
                {caseData.title}
              </h2>
              <p className="text-lg text-gray-600 font-semibold mobile-text">
                <span className="sr-only">Accused crime: </span>Crime: {caseData.crime}
              </p>
            </div>
          </div>
        </header>

        {/* Character Sprites */}
        <CourtRoomCharacters
          victimPose={victimPose}
          lawyerPose={lawyerPose}
          authorUsername={authorUsername}
        />

        {/* Defense Argument Display */}
        <section 
          className="bg-gradient-to-r from-blue-800 to-blue-900 rounded-lg shadow-2xl p-6 mb-8 border-4 border-blue-600 mobile-spacing animate-slide-in-left"
          aria-labelledby="defense-heading"
          style={{ animationDelay: '0.8s' }}
        >
          <h2 id="defense-heading" className="text-2xl font-bold text-center mb-4 ace-attorney-text text-white mobile-text">
            DEFENSE ARGUMENT
          </h2>
          <div className="bg-white rounded-lg p-6 shadow-inner">
            <div className="relative">
              <div className="absolute -top-2 -left-2 text-4xl text-blue-600" aria-hidden="true">"</div>
              <blockquote className="text-xl italic text-gray-800 font-semibold px-6 mobile-text">
                <span className="sr-only">Defense argument by {authorUsername}: </span>
                {defenseText}
              </blockquote>
              <div className="absolute -bottom-2 -right-2 text-4xl text-blue-600" aria-hidden="true">"</div>
            </div>
          </div>
        </section>

        {/* Voting Section */}
        {!hasVoted && (
          <VotingButtons
            onVote={handleVote}
            loading={loading}
            disabled={hasVoted}
          />
        )}

        {/* Error Display */}
        {error && (
          <div 
            className="bg-red-600 text-white p-4 rounded-lg mb-6 text-center font-bold mobile-spacing mobile-text" 
            role="alert"
            aria-live="assertive"
          >
            <span className="sr-only">Error: </span>{error}
          </div>
        )}

        {/* Scales of Justice */}
        <section 
          className="bg-gradient-to-r from-purple-800 to-purple-900 rounded-lg shadow-2xl p-6 border-4 border-purple-600 mobile-spacing animate-slide-in-right"
          aria-labelledby="scales-heading"
          style={{ animationDelay: '1.2s' }}
        >
          <h2 id="scales-heading" className="text-3xl font-bold text-center mb-6 ace-attorney-text text-white mobile-text">
            SCALES OF JUSTICE
          </h2>
          <ScalesOfJustice 
            votes={votes} 
            animated={true} 
            showLiveIndicator={connectionStatus === 'connected'} 
          />
          
          {hasVoted && (
            <div className="mt-6 text-center bg-white rounded-lg p-4 mobile-spacing" role="status" aria-live="polite">
              <p className="text-xl font-bold mobile-text">
                <span className="sr-only">You voted: </span>Your Verdict: <span className={`ace-attorney-text ${votes.userVote === 'guilty' ? 'text-red-600' : 'text-green-600'}`}>
                  {votes.userVote === 'guilty' ? 'GUILTY' : 'NOT GUILTY'}
                </span>
              </p>
              <p className="text-gray-600 mt-2 mobile-text">
                Thank you for serving on the jury!
              </p>
            </div>
          )}
        </section>

        {/* Real-Time Connection Status */}
        <div className="text-center mt-4">
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold ${
            connectionStatus === 'connected' 
              ? 'bg-green-100 text-green-800 border border-green-300' 
              : connectionStatus === 'connecting'
                ? 'bg-yellow-100 text-yellow-800 border border-yellow-300'
                : connectionStatus === 'error'
                  ? 'bg-red-100 text-red-800 border border-red-300'
                  : 'bg-gray-100 text-gray-800 border border-gray-300'
          }`}>
            <div className={`w-2 h-2 rounded-full ${
              connectionStatus === 'connected' 
                ? 'bg-green-500 animate-pulse' 
                : connectionStatus === 'connecting'
                  ? 'bg-yellow-500 animate-spin'
                  : connectionStatus === 'error'
                    ? 'bg-red-500'
                    : 'bg-gray-500'
            }`}></div>
            {connectionStatus === 'connected' && '🔄 Live Updates Active'}
            {connectionStatus === 'connecting' && '⏳ Connecting...'}
            {connectionStatus === 'error' && '⚠️ Connection Issues'}
            {connectionStatus === 'disconnected' && '📡 Disconnected'}
          </div>
          {lastUpdateTime && connectionStatus === 'connected' && (
            <p className="text-yellow-200 text-xs mt-1">
              Last updated: {new Date(lastUpdateTime).toLocaleTimeString()}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
