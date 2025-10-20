import React, { useState } from 'react';
import type { Case } from '../../../shared/types/game';

type DefenseFormProps = {
  case_: Case;
  onSubmit: (defenseText: string) => void;
  onBack: () => void;
  loading?: boolean;
};

export const DefenseForm: React.FC<DefenseFormProps> = ({ case_, onSubmit, onBack, loading = false }) => {
  const [defenseText, setDefenseText] = useState('');
  const maxLength = 250;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (defenseText.trim() && defenseText.length <= maxLength) {
      onSubmit(defenseText.trim());
    }
  };

  const characterCount = defenseText.length;
  const isValid = defenseText.trim().length > 0 && characterCount <= maxLength;

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 to-red-900 p-4">
      <div className="max-w-2xl mx-auto">
        <button
          onClick={onBack}
          className="mb-6 text-white hover:text-gray-300 transition-colors"
        >
          ← Back to Daily Docket
        </button>
        
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-bold mb-4">Case Details</h2>
          <h3 className="text-xl font-semibold mb-2">{case_.title}</h3>
          <p className="text-gray-600 mb-4">{case_.crime}</p>
          <div className="flex gap-2">
            <span className={`px-2 py-1 rounded text-sm font-medium ${
              case_.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
              case_.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
              'bg-red-100 text-red-800'
            }`}>
              {case_.difficulty}
            </span>
            <span className="px-2 py-1 rounded text-sm font-medium bg-blue-100 text-blue-800">
              {case_.category}
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Your Defense</h2>
          <div className="mb-4">
            <textarea
              value={defenseText}
              onChange={(e) => setDefenseText(e.target.value)}
              placeholder="Enter your creative defense argument..."
              className="w-full h-32 p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              maxLength={maxLength}
            />
            <div className="flex justify-between items-center mt-2">
              <span className={`text-sm ${
                characterCount > maxLength * 0.9 ? 'text-red-600' :
                characterCount > maxLength * 0.7 ? 'text-yellow-600' :
                'text-gray-500'
              }`}>
                {characterCount}/{maxLength} characters
              </span>
            </div>
          </div>
          
          <button
            type="submit"
            disabled={!isValid || loading}
            className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${
              isValid && !loading
                ? 'bg-green-600 text-white hover:bg-green-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {loading ? 'Submitting...' : 'Submit Defense'}
          </button>
        </form>
      </div>
    </div>
  );
};
