import React from 'react';
import type { LeaderboardEntry } from '../../../shared/types/api';

type LeaderboardProps = {
  attorneys: LeaderboardEntry[];
  jurors: LeaderboardEntry[];
  loading?: boolean;
};

export const Leaderboard: React.FC<LeaderboardProps> = ({ attorneys, jurors, loading = false }) => {
  // TODO: Implement leaderboard component in later tasks
  
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl">Loading leaderboards...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-900 to-blue-900 p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white text-center mb-8">Leaderboards</h1>
        
        <div className="grid gap-6 md:grid-cols-2">
          {/* Top Attorneys */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Top Attorneys</h2>
            {/* TODO: Implement attorney leaderboard display */}
          </div>

          {/* Top Jurors */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Top Jurors</h2>
            {/* TODO: Implement juror leaderboard display */}
          </div>
        </div>
      </div>
    </div>
  );
};
