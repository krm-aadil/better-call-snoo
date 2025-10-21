import React, { useEffect, useState } from 'react';
import type { VoteData } from '../../../shared/types/api';

type ScalesOfJusticeProps = {
  votes: VoteData;
  animated?: boolean;
  showLiveIndicator?: boolean;
};

export const ScalesOfJustice: React.FC<ScalesOfJusticeProps> = ({ votes, animated = true, showLiveIndicator = true }) => {
  const [previousVotes, setPreviousVotes] = useState<VoteData>(votes);
  const [isAnimating, setIsAnimating] = useState(false);

  // Calculate percentages with proper rounding
  const guiltyPercentage = votes.totalVotes > 0 ? Math.round((votes.guilty / votes.totalVotes) * 100) : 0;
  const notGuiltyPercentage = votes.totalVotes > 0 ? Math.round((votes.notGuilty / votes.totalVotes) * 100) : 0;
  
  // Calculate scale rotation based on vote balance (-45° to +45°)
  const balance = votes.totalVotes > 0 ? (votes.notGuilty - votes.guilty) / votes.totalVotes : 0;
  const scaleRotation = Math.max(-45, Math.min(45, balance * 90)); // Increased sensitivity for more dramatic tipping

  // Detect vote changes for animation triggers
  useEffect(() => {
    if (votes.totalVotes !== previousVotes.totalVotes) {
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), 800);
      setPreviousVotes(votes);
      return () => clearTimeout(timer);
    }
  }, [votes, previousVotes]);

  // Determine which side is winning for visual emphasis
  const guiltyWinning = votes.guilty > votes.notGuilty;
  const notGuiltyWinning = votes.notGuilty > votes.guilty;
  const isTied = votes.guilty === votes.notGuilty && votes.totalVotes > 0;

  return (
    <div 
      className="bg-gradient-to-br from-amber-50 to-yellow-100 rounded-xl shadow-2xl p-4 md:p-8 border-4 border-amber-300 relative mobile-spacing"
      role="region"
      aria-labelledby="scales-status"
      aria-live="polite"
    >
      {/* Live Indicator */}
      {showLiveIndicator && votes.totalVotes > 0 && (
        <div 
          className="absolute top-4 right-4 flex items-center gap-2 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg"
          role="status"
          aria-label="Live voting updates active"
        >
          <div className="w-2 h-2 bg-white rounded-full animate-pulse" aria-hidden="true"></div>
          LIVE
        </div>
      )}

      {/* Enhanced Visual Scale Display */}
      <div className="relative flex justify-center items-end mb-4 md:mb-8 overflow-hidden">
        {/* Scale Base */}
        <div className="absolute bottom-0 w-4 h-24 md:h-32 bg-gradient-to-t from-amber-800 to-amber-600 rounded-t-lg shadow-lg" aria-hidden="true"></div>
        
        {/* Scale Beam */}
        <div 
          className={`relative w-64 md:w-80 h-3 bg-gradient-to-r from-amber-700 to-amber-600 rounded-full shadow-lg origin-center ${
            animated ? 'transition-transform duration-700 ease-in-out' : ''
          } ${isAnimating ? 'animate-pulse' : ''}`}
          style={{ 
            transform: `rotate(${scaleRotation}deg)`,
            marginBottom: '96px'
          }}
          aria-hidden="true"
        >
          {/* Left Scale Pan (Guilty) */}
          <div 
            className={`absolute -left-4 -top-8 w-20 h-14 md:w-24 md:h-16 rounded-full border-4 ${
              guiltyWinning ? 'border-red-500 bg-red-100' : 'border-red-400 bg-red-50'
            } shadow-lg flex flex-col items-center justify-center ${
              animated ? 'transition-all duration-700' : ''
            }`}
            aria-label={`Guilty votes: ${guiltyPercentage} percent`}
          >
            <div className={`text-sm md:text-lg font-bold ${guiltyWinning ? 'text-red-700' : 'text-red-600'} mobile-text`}>
              {guiltyPercentage}%
            </div>
            <div className={`text-xs font-semibold ${guiltyWinning ? 'text-red-700' : 'text-red-500'}`}>
              GUILTY
            </div>
          </div>

          {/* Right Scale Pan (Not Guilty) */}
          <div 
            className={`absolute -right-4 -top-8 w-20 h-14 md:w-24 md:h-16 rounded-full border-4 ${
              notGuiltyWinning ? 'border-green-500 bg-green-100' : 'border-green-400 bg-green-50'
            } shadow-lg flex flex-col items-center justify-center ${
              animated ? 'transition-all duration-700' : ''
            }`}
            aria-label={`Not guilty votes: ${notGuiltyPercentage} percent`}
          >
            <div className={`text-sm md:text-lg font-bold ${notGuiltyWinning ? 'text-green-700' : 'text-green-600'} mobile-text`}>
              {notGuiltyPercentage}%
            </div>
            <div className={`text-xs font-semibold ${notGuiltyWinning ? 'text-green-700' : 'text-green-500'}`}>
              NOT GUILTY
            </div>
          </div>

          {/* Scale Chains */}
          <div className="absolute -left-2 -top-6 w-1 h-6 bg-amber-800 rounded-full"></div>
          <div className="absolute -right-2 -top-6 w-1 h-6 bg-amber-800 rounded-full"></div>
        </div>
      </div>

      {/* Vote Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4 mb-4 md:mb-6">
        <div 
          className={`text-center p-3 md:p-4 rounded-lg ${
            guiltyWinning ? 'bg-red-100 border-2 border-red-300' : 'bg-red-50 border border-red-200'
          } ${animated ? 'transition-all duration-500' : ''}`}
          role="status"
          aria-label={`${votes.guilty} guilty votes`}
        >
          <div className={`text-xl md:text-2xl font-bold ${guiltyWinning ? 'text-red-700' : 'text-red-600'} mobile-text`}>
            {votes.guilty}
          </div>
          <div className={`text-sm font-semibold ${guiltyWinning ? 'text-red-700' : 'text-red-500'}`}>
            Guilty Votes
          </div>
        </div>

        <div 
          className={`text-center p-3 md:p-4 rounded-lg ${
            isTied ? 'bg-yellow-100 border-2 border-yellow-400' : 'bg-gray-50 border border-gray-200'
          } ${animated ? 'transition-all duration-500' : ''}`}
          role="status"
          aria-label={`${votes.totalVotes} total votes`}
        >
          <div className={`text-xl md:text-2xl font-bold ${isTied ? 'text-yellow-700' : 'text-gray-700'} mobile-text`}>
            {votes.totalVotes}
          </div>
          <div className={`text-sm font-semibold ${isTied ? 'text-yellow-600' : 'text-gray-600'}`}>
            Total Votes
          </div>
        </div>

        <div 
          className={`text-center p-3 md:p-4 rounded-lg ${
            notGuiltyWinning ? 'bg-green-100 border-2 border-green-300' : 'bg-green-50 border border-green-200'
          } ${animated ? 'transition-all duration-500' : ''}`}
          role="status"
          aria-label={`${votes.notGuilty} not guilty votes`}
        >
          <div className={`text-xl md:text-2xl font-bold ${notGuiltyWinning ? 'text-green-700' : 'text-green-600'} mobile-text`}>
            {votes.notGuilty}
          </div>
          <div className={`text-sm font-semibold ${notGuiltyWinning ? 'text-green-700' : 'text-green-500'}`}>
            Not Guilty Votes
          </div>
        </div>
      </div>

      {/* Current Verdict Indicator */}
      {votes.totalVotes > 0 && (
        <div 
          id="scales-status"
          className={`text-center p-3 md:p-4 rounded-lg border-2 mobile-spacing ${
            isTied 
              ? 'bg-yellow-100 border-yellow-400' 
              : guiltyWinning 
                ? 'bg-red-100 border-red-400' 
                : 'bg-green-100 border-green-400'
          } ${animated ? 'transition-all duration-500' : ''} ${isAnimating ? 'animate-bounce' : ''}`}
          role="status"
          aria-live="polite"
        >
          <div className="text-base md:text-lg font-bold ace-attorney-text mobile-text">
            <span className="sr-only">Current jury verdict: </span>
            CURRENT VERDICT: <span className={`${
              isTied 
                ? 'text-yellow-700' 
                : guiltyWinning 
                  ? 'text-red-700' 
                  : 'text-green-700'
            }`}>
              {isTied ? 'TIED' : guiltyWinning ? 'GUILTY' : 'NOT GUILTY'}
            </span>
          </div>
          {!isTied && (
            <div className={`text-sm mobile-text ${
              guiltyWinning ? 'text-red-600' : 'text-green-600'
            }`}>
              Leading by {Math.abs(votes.notGuilty - votes.guilty)} vote{Math.abs(votes.notGuilty - votes.guilty) !== 1 ? 's' : ''}
            </div>
          )}
        </div>
      )}

      {/* User Vote Display */}
      {votes.userVote && (
        <div className="mt-4 md:mt-6 text-center p-3 md:p-4 bg-white rounded-lg border-2 border-blue-300 shadow-inner mobile-spacing" role="status">
          <p className="text-base md:text-lg font-semibold text-gray-700 mobile-text">
            <span className="sr-only">You voted: </span>
            Your Verdict: <span className={`font-bold ace-attorney-text ${
              votes.userVote === 'guilty' ? 'text-red-600' : 'text-green-600'
            }`}>
              {votes.userVote === 'guilty' ? 'GUILTY' : 'NOT GUILTY'}
            </span>
          </p>
        </div>
      )}

      {/* No Votes State */}
      {votes.totalVotes === 0 && (
        <div className="text-center p-4 md:p-6 bg-gray-100 rounded-lg border-2 border-gray-300 mobile-spacing" role="status">
          <div className="text-lg md:text-xl font-semibold text-gray-600 ace-attorney-text mobile-text">
            AWAITING JURY DECISION
          </div>
          <div className="text-sm text-gray-500 mt-2 mobile-text">
            Be the first to cast your vote!
          </div>
        </div>
      )}
    </div>
  );
};
