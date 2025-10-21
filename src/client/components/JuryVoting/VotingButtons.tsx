import React, { useCallback, useState } from 'react';
import { playGavelSound } from '../../utils/audioUtils';

type VotingButtonsProps = {
  onVote: (vote: 'guilty' | 'not_guilty') => void;
  loading: boolean;
  disabled: boolean;
};

export const VotingButtons: React.FC<VotingButtonsProps> = ({ onVote, loading, disabled }) => {
  const [gavelAnimation, setGavelAnimation] = useState(false);

  const handleVoteClick = useCallback(async (vote: 'guilty' | 'not_guilty') => {
    // Trigger gavel animation
    setGavelAnimation(true);
    
    // Play gavel sound effect
    const audioResult = await playGavelSound();
    
    if (audioResult.fallbackUsed) {
      console.log('Gavel sound fallback used (visual feedback shown)');
    } else if (audioResult.played) {
      console.log('Gavel sound played successfully');
    }
    
    // Submit the vote
    onVote(vote);
    
    // Reset animation after delay
    setTimeout(() => setGavelAnimation(false), 600);
  }, [onVote]);
  return (
    <section 
      className="bg-gradient-to-r from-yellow-800 to-yellow-900 rounded-lg shadow-2xl p-8 mb-8 border-4 border-yellow-600 mobile-spacing"
      aria-labelledby="voting-heading"
    >
      <h2 id="voting-heading" className="text-3xl font-bold text-center mb-6 ace-attorney-text text-white flex items-center justify-center gap-4 mobile-text">
        <span className={`text-4xl ${gavelAnimation ? 'animate-gavel-strike' : ''}`} aria-hidden="true">⚖️</span>
        CAST YOUR VERDICT
        <span className={`text-4xl ${gavelAnimation ? 'animate-gavel-strike' : ''}`} aria-hidden="true">🔨</span>
      </h2>
      <div className="flex gap-6 justify-center flex-col sm:flex-row">
        <button
          onClick={() => handleVoteClick('guilty')}
          disabled={loading || disabled}
          className="group relative bg-gradient-to-b from-red-500 to-red-700 text-white px-12 py-6 rounded-lg text-2xl font-bold ace-attorney-text
                     smooth-hover smooth-transition
                     hover:from-red-400 hover:to-red-600 focus:from-red-400 focus:to-red-600
                     disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
                     border-4 border-red-800 shadow-lg mobile-touch-target no-select
                     animate-slide-in-left"
          aria-label="Vote guilty - defendant is guilty of the crime"
          aria-describedby={loading ? 'voting-status' : undefined}
          style={{ animationDelay: '0.2s' }}
        >
          <span className="relative z-10">GUILTY</span>
          <div className="absolute inset-0 bg-gradient-to-b from-red-400 to-red-600 rounded-lg opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-300" />
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
              <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
            </div>
          )}
        </button>
        
        <button
          onClick={() => handleVoteClick('not_guilty')}
          disabled={loading || disabled}
          className="group relative bg-gradient-to-b from-green-500 to-green-700 text-white px-12 py-6 rounded-lg text-2xl font-bold ace-attorney-text
                     smooth-hover smooth-transition
                     hover:from-green-400 hover:to-green-600 focus:from-green-400 focus:to-green-600
                     disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
                     border-4 border-green-800 shadow-lg mobile-touch-target no-select
                     animate-slide-in-right"
          aria-label="Vote not guilty - defendant is innocent of the crime"
          aria-describedby={loading ? 'voting-status' : undefined}
          style={{ animationDelay: '0.4s' }}
        >
          <span className="relative z-10">NOT GUILTY</span>
          <div className="absolute inset-0 bg-gradient-to-b from-green-400 to-green-600 rounded-lg opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-300" />
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
              <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
            </div>
          )}
        </button>
      </div>
      
      {loading && (
        <div id="voting-status" className="sr-only" aria-live="polite">
          Processing your vote...
        </div>
      )}
      
      {disabled && (
        <p className="text-center text-yellow-200 mt-4 text-lg font-semibold mobile-text" role="status" aria-live="polite">
          You have already cast your vote
        </p>
      )}
    </section>
  );
};
