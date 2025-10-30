import React from 'react';
import type { VoteData } from '../../../shared/types/api';

type ScalesOfJusticeProps = {
  votes: VoteData;
  animated?: boolean;
  showLiveIndicator?: boolean;
};

export const ScalesOfJustice: React.FC<ScalesOfJusticeProps> = ({
  votes,
  showLiveIndicator = true,
}) => {
  // Determine which side is winning
  const guiltyWinning = votes.guilty > votes.notGuilty;
  const notGuiltyWinning = votes.notGuilty > votes.guilty;
  const isTied = votes.guilty === votes.notGuilty && votes.totalVotes > 0;

  return (
    <div
      className="bg-white border-4 border-black rounded-lg shadow-xl p-6 relative"
      role="region"
      aria-labelledby="scales-status"
      aria-live="polite"
    >
      {/* Live Indicator */}
      {showLiveIndicator && votes.totalVotes > 0 && (
        <div
          className="absolute top-4 right-4 flex items-center gap-2 bg-blue-600 text-white px-3 py-1 rounded-lg text-xs font-bold shadow-lg border-2 border-black"
          role="status"
          aria-label="Live voting updates active"
        >
          <div className="w-2 h-2 bg-white rounded-full animate-pulse" aria-hidden="true"></div>
          LIVE
        </div>
      )}

      {/* Current Verdict Indicator */}
      {votes.totalVotes > 0 && (
        <div
          id="scales-status"
          className={`text-center p-4 rounded-lg border-4 border-black mb-6 ${
            isTied ? 'bg-yellow-100' : guiltyWinning ? 'bg-red-100' : 'bg-blue-100'
          }`}
          role="status"
          aria-live="polite"
        >
          <div className="text-lg font-bold text-black">
            <span className="sr-only">Current jury verdict: </span>
            CURRENT VERDICT:{' '}
            <span
              className={`${
                isTied ? 'text-yellow-700' : guiltyWinning ? 'text-red-700' : 'text-blue-700'
              }`}
            >
              {isTied ? 'TIED' : guiltyWinning ? 'GUILTY' : 'NOT GUILTY'}
            </span>
          </div>
          {!isTied && (
            <div className={`text-sm ${guiltyWinning ? 'text-red-600' : 'text-blue-600'}`}>
              Leading by {Math.abs(votes.notGuilty - votes.guilty)} vote
              {Math.abs(votes.notGuilty - votes.guilty) !== 1 ? 's' : ''}
            </div>
          )}
        </div>
      )}

      {/* No Votes State */}
      {votes.totalVotes === 0 && (
        <div className="text-center p-4 bg-white rounded-lg border-4 border-black" role="status">
          <div className="text-lg font-bold text-gray-800">AWAITING JURY DECISION</div>
          <div className="text-sm text-gray-600 mt-2">Be the first to cast your vote!</div>
        </div>
      )}
    </div>
  );
};
