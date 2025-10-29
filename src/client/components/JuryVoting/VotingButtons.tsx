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
    <div className="flex gap-2 sm:gap-4 flex-col sm:flex-row">
      <button
        onClick={() => handleVoteClick('guilty')}
        disabled={loading || disabled}
        className="group relative bg-red-500 hover:bg-red-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg text-sm sm:text-lg font-bold
                   border-2 border-black shadow-lg transition-all duration-200 hover:scale-105
                   disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
                   mobile-touch-target"
        aria-label="Vote guilty - defendant is guilty of the crime"
        aria-describedby={loading ? 'voting-status' : undefined}
      >
        <span className="relative z-10 flex items-center justify-center gap-2">
          <span className={`${gavelAnimation ? 'animate-bounce' : ''}`} aria-hidden="true">⚖️</span>
          GUILTY
        </span>
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          </div>
        )}
      </button>
      
      <button
        onClick={() => handleVoteClick('not_guilty')}
        disabled={loading || disabled}
        className="group relative bg-green-500 hover:bg-green-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg text-sm sm:text-lg font-bold
                   border-2 border-black shadow-lg transition-all duration-200 hover:scale-105
                   disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
                   mobile-touch-target"
        aria-label="Vote not guilty - defendant is innocent of the crime"
        aria-describedby={loading ? 'voting-status' : undefined}
      >
        <span className="relative z-10 flex items-center justify-center gap-2">
          <span className={`${gavelAnimation ? 'animate-bounce' : ''}`} aria-hidden="true">🔨</span>
          NOT GUILTY
        </span>
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          </div>
        )}
      </button>
      
      {loading && (
        <div id="voting-status" className="sr-only" aria-live="polite">
          Processing your vote...
        </div>
      )}
      
      {disabled && (
        <p className="text-center text-gray-600 mt-2 text-sm font-semibold" role="status" aria-live="polite">
          You have already cast your vote
        </p>
      )}
    </div>
  );
};
