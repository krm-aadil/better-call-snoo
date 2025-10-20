import React from 'react';
import type { Case } from '../../../shared/types/game';

type DailyDocketProps = {
  cases: Case[];
  onCaseSelect: (caseId: string) => void;
  loading?: boolean;
};

export const DailyDocket: React.FC<DailyDocketProps> = ({ cases, onCaseSelect, loading = false }) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl">Loading daily cases...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-purple-900 p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white text-center mb-8">Daily Docket</h1>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {cases.map((case_) => (
            <div
              key={case_.id}
              className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer"
              onClick={() => onCaseSelect(case_.id)}
            >
              <h3 className="text-xl font-bold mb-2">{case_.title}</h3>
              <p className="text-gray-600 mb-4">{case_.crime}</p>
              <div className="flex justify-between items-center">
                <span className={`px-2 py-1 rounded text-sm font-medium ${
                  case_.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                  case_.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {case_.difficulty}
                </span>
                <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
                  Defend
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
