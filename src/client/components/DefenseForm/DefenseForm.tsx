import React, { useState } from 'react';
import type { Case } from '../../../shared/types/game';

type DefenseFormProps = {
  case_: Case;
  onSubmit: (defenseText: string) => Promise<void>;
  onBack: () => void;
  loading?: boolean;
  error?: string | null;
};

export const DefenseForm: React.FC<DefenseFormProps> = ({ case_, onSubmit, onBack, loading = false, error }) => {
  const [defenseText, setDefenseText] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const maxLength = 250;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (defenseText.trim() && defenseText.length <= maxLength) {
      try {
        await onSubmit(defenseText.trim());
        setSubmitSuccess(true);
        // Clear form after successful submission
        setDefenseText('');
      } catch (err) {
        // Error handling is managed by parent component
        console.error('Defense submission failed:', err);
      }
    }
  };

  const characterCount = defenseText.length;
  const isValid = defenseText.trim().length > 0 && characterCount <= maxLength;

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 to-red-900 p-4">
      {/* Skip link for accessibility */}
      <a href="#defense-form" className="skip-link">
        Skip to defense form
      </a>
      
      <div className="max-w-2xl mx-auto">
        <nav className="mb-6" aria-label="Breadcrumb navigation">
          <button
            onClick={onBack}
            className="text-white hover:text-gray-300 focus:text-gray-300 transition-colors mobile-touch-target"
            aria-label="Go back to Daily Docket"
          >
            ← Back to Daily Docket
          </button>
        </nav>
        
        <section className="bg-white rounded-lg shadow-lg p-6 mb-6 mobile-spacing animate-slide-in-left" aria-labelledby="case-details-heading">
          <h1 id="case-details-heading" className="text-2xl font-bold mb-4 mobile-text animate-text-reveal">Case Details</h1>
          <h2 className="text-xl font-semibold mb-2 mobile-text animate-fade-in-up" style={{ animationDelay: '0.3s' }}>{case_.title}</h2>
          <p className="text-gray-600 mb-4 mobile-text animate-fade-in-up" style={{ animationDelay: '0.5s' }}>{case_.crime}</p>
          <div className="flex gap-2 flex-wrap">
            <span 
              className={`px-2 py-1 rounded text-sm font-medium ${
                case_.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                case_.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}
              role="status"
              aria-label={`Difficulty: ${case_.difficulty}`}
            >
              {case_.difficulty}
            </span>
            <span 
              className="px-2 py-1 rounded text-sm font-medium bg-blue-100 text-blue-800"
              role="status"
              aria-label={`Category: ${case_.category}`}
            >
              {case_.category}
            </span>
          </div>
        </section>

        <form 
          onSubmit={handleSubmit} 
          className="bg-white rounded-lg shadow-lg p-6 mobile-spacing animate-slide-in-right"
          id="defense-form"
          aria-labelledby="defense-form-heading"
          style={{ animationDelay: '0.2s' }}
        >
          <h2 id="defense-form-heading" className="text-2xl font-bold mb-4 mobile-text">Your Defense</h2>
          
          {/* Success Message */}
          {submitSuccess && (
            <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div>
                  <p className="font-semibold">Defense Submitted Successfully!</p>
                  <p className="text-sm">Your case has been posted for jury voting. The community will now vote on your defense!</p>
                </div>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <div>
                  <p className="font-semibold">Submission Failed</p>
                  <p className="text-sm">{error}</p>
                </div>
              </div>
            </div>
          )}
          
          <div className="mb-4">
            <label htmlFor="defense-textarea" className="sr-only">
              Defense argument (maximum {maxLength} characters)
            </label>
            <textarea
              id="defense-textarea"
              value={defenseText}
              onChange={(e) => setDefenseText(e.target.value)}
              placeholder="Enter your creative defense argument..."
              className="w-full h-32 p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent mobile-text"
              maxLength={maxLength}
              disabled={loading}
              aria-describedby="character-count defense-help"
              aria-invalid={characterCount === 0 ? 'true' : 'false'}
              required
            />
            <div className="flex justify-between items-center mt-2 flex-wrap gap-2">
              <span 
                id="character-count"
                className={`text-sm ${
                  characterCount > maxLength * 0.9 ? 'text-red-600' :
                  characterCount > maxLength * 0.7 ? 'text-yellow-600' :
                  'text-gray-500'
                }`}
                role="status"
                aria-live="polite"
              >
                {characterCount}/{maxLength} characters
              </span>
              {characterCount === 0 && (
                <span id="defense-help" className="text-sm text-gray-400" role="alert">
                  Defense cannot be empty
                </span>
              )}
            </div>
          </div>
          
          <div className="flex gap-3 flex-col sm:flex-row">
            <button
              type="button"
              onClick={onBack}
              disabled={loading}
              className="flex-1 py-3 px-6 rounded-lg font-semibold border border-gray-300 text-gray-700 hover:bg-gray-50 focus:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mobile-touch-target mobile-text"
              aria-label="Go back to case selection"
            >
              Back to Cases
            </button>
            <button
              type="submit"
              disabled={!isValid || loading}
              className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-colors mobile-touch-target mobile-text ${
                isValid && !loading
                  ? 'bg-green-600 text-white hover:bg-green-700 focus:bg-green-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
              aria-describedby={!isValid ? 'submit-help' : undefined}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <svg 
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Submitting...</span>
                </div>
              ) : (
                'Submit Defense'
              )}
            </button>
            {!isValid && (
              <div id="submit-help" className="sr-only">
                Please enter a defense argument to submit
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
