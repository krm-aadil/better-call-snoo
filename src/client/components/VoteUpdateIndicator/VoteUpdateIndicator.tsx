import React, { useEffect, useState } from 'react';

type VoteUpdateIndicatorProps = {
  totalVotes: number;
  className?: string;
};

export const VoteUpdateIndicator: React.FC<VoteUpdateIndicatorProps> = ({ 
  totalVotes, 
  className = '' 
}) => {
  const [previousTotal, setPreviousTotal] = useState(totalVotes);
  const [showUpdate, setShowUpdate] = useState(false);
  const [newVoteCount, setNewVoteCount] = useState(0);

  useEffect(() => {
    if (totalVotes > previousTotal) {
      const newVotes = totalVotes - previousTotal;
      setNewVoteCount(newVotes);
      setShowUpdate(true);
      setPreviousTotal(totalVotes);

      // Hide the indicator after 3 seconds
      const timer = setTimeout(() => {
        setShowUpdate(false);
      }, 3000);

      return () => clearTimeout(timer);
    } else if (totalVotes !== previousTotal) {
      setPreviousTotal(totalVotes);
    }
  }, [totalVotes, previousTotal]);

  if (!showUpdate || newVoteCount === 0) {
    return null;
  }

  return (
    <div 
      className={`fixed top-4 right-4 z-50 ${className}`}
      role="status"
      aria-live="polite"
      aria-label={`${newVoteCount} new vote${newVoteCount !== 1 ? 's' : ''} received`}
    >
      <div className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg border-2 border-blue-400 animate-bounce mobile-spacing">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-white rounded-full animate-pulse" aria-hidden="true"></div>
          <span className="font-bold mobile-text">
            +{newVoteCount} New Vote{newVoteCount !== 1 ? 's' : ''}!
          </span>
        </div>
      </div>
    </div>
  );
};
