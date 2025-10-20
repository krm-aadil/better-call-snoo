import React from 'react';
import type { VoteData } from '../../../shared/types/api';

type ScalesOfJusticeProps = {
  votes: VoteData;
  animated?: boolean;
};

export const ScalesOfJustice: React.FC<ScalesOfJusticeProps> = ({ votes, animated = true }) => {
  const guiltyPercentage = votes.totalVotes > 0 ? Math.round((votes.guilty / votes.totalVotes) * 100) : 0;
  const notGuiltyPercentage = votes.totalVotes > 0 ? Math.round((votes.notGuilty / votes.totalVotes) * 100) : 0;
  
  // Calculate scale rotation based on vote balance (-45° to +45°)
  const balance = votes.totalVotes > 0 ? (votes.notGuilty - votes.guilty) / votes.totalVotes : 0;
  const scaleRotation = Math.max(-45, Math.min(45, balance * 45));

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4 text-center">Scales of Justice</h3>
      <div className="flex justify-center items-center gap-8">
        <div className="text-center">
          <div className="text-3xl font-bold text-red-600">
            {guiltyPercentage}%
          </div>
          <div className="text-red-600 font-semibold">GUILTY</div>
          <div className="text-sm text-gray-500">{votes.guilty} votes</div>
        </div>
        
        <div 
          className={`text-6xl ${animated ? 'transition-transform duration-500' : ''}`}
          style={{ transform: `rotate(${scaleRotation}deg)` }}
        >
          ⚖️
        </div>
        
        <div className="text-center">
          <div className="text-3xl font-bold text-green-600">
            {notGuiltyPercentage}%
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
  );
};
