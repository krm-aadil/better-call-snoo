import React, { useState, useEffect } from 'react';
import type { Case } from '../../../shared/types/game';

type DailyDocketProps = {
  cases: Case[];
  onCaseSelect: (caseId: string) => void;
  onLeaderboardClick?: () => void;
  loading?: boolean;
};

export const DailyDocket: React.FC<DailyDocketProps> = ({
  cases,
  onCaseSelect,
  onLeaderboardClick,
  loading = false,
}) => {
  const [currentCaseIndex, setCurrentCaseIndex] = useState(0);
  const [currentDate, setCurrentDate] = useState<string>('');
  const [currentTime, setCurrentTime] = useState<string>('');

  useEffect(() => {
    // Set current date and time
    const updateDateTime = () => {
      const now = new Date();
      // Short month, day, year format
      const dateOptions: Intl.DateTimeFormatOptions = {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      };
      // Simple HH:MM AM/PM format
      const timeOptions: Intl.DateTimeFormatOptions = {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      };
      setCurrentDate(now.toLocaleDateString('en-US', dateOptions));
      setCurrentTime(now.toLocaleTimeString('en-US', timeOptions));
    };

    updateDateTime();
    // Update time every second for a live clock feel
    const interval = setInterval(updateDateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleCaseClick = (caseId: string) => {
    onCaseSelect(caseId);
  };

  const nextCase = () => {
    setCurrentCaseIndex((prev) => (prev + 1) % (cases.length || 1));
  };

  const prevCase = () => {
    setCurrentCaseIndex((prev) => (prev - 1 + (cases.length || 1)) % (cases.length || 1));
  };

  // Determines the background color based on difficulty for the badge
  const getDifficultyColor = (difficulty: Case['difficulty']) => {
    switch (difficulty) {
      case 'easy':
        return 'bg-green-500'; // Green for easy
      case 'medium':
        return 'bg-yellow-500'; // Yellow for medium
      case 'hard':
        return 'bg-red-500'; // Red for hard
      default:
        return 'bg-gray-500'; // Gray fallback
    }
  };

  const currentCase = cases[currentCaseIndex];

  // Loading state remains simple, focusing on getting to the game
  if (loading) {
    return (
      <div
        className="flex justify-center items-center min-h-screen bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/New-Loading-Screen.png')`,
        }}
      >
        <div
          className="text-white text-2xl bg-blue-300 bg-opacity-70 p-6 rounded-lg shadow-xl border-2 border-white"
          role="status"
          aria-live="polite"
        >
          <div className="text-xl sm:text-2xl font-bold mb-4">
            <span className="sr-only">Loading docket: </span>⚖️ LOADING DOCKET ⚖️
          </div>
          <div className="text-base sm:text-lg animate-pulse">Preparing today's cases...</div>
        </div>
      </div>
    );
  }

  // Main polished UI
  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat flex flex-col"
      // Apply the court background image
      style={{ backgroundImage: 'url(/court/court-background.png)' }}
    >
      {/* Header Section */}
      <header className="flex justify-between items-center p-2 sm:p-4 border-b-2 border-black bg-white bg-opacity-80 shadow-md backdrop-blur-sm">
        <div className="text-xs sm:text-sm text-gray-700 font-semibold">{currentDate}</div>
        <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 font-serif tracking-wider">
          BetterCallSnoo
        </h1>
        <div className="text-xs sm:text-sm text-gray-700 font-semibold">{currentTime}</div>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow flex items-center justify-center relative pt-4 pb-20 px-4">
        <div className="flex flex-col items-center justify-center max-w-4xl mx-auto">
          {currentCase ? (
            <div className="flex flex-col items-center gap-6">
              {/* Case Details Form - Above prisoner */}
              <div className="max-w-sm lg:max-w-md">
                <div className="bg-white border-4 border-blue-600 rounded-lg p-6 shadow-xl">
                  {/* Case File Number */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-sm">
                      CASE FILE #{currentCase.id.split('_')[1] || currentCaseIndex + 1}
                    </div>
                    <div
                      className={`px-3 py-1 rounded text-sm font-bold text-white shadow-sm ${getDifficultyColor(currentCase.difficulty)}`}
                    >
                      {currentCase.difficulty.toUpperCase()}
                    </div>
                  </div>

                  {/* Case Title/Heading */}
                  <h3 className="text-xl lg:text-2xl font-bold text-center text-gray-800 leading-tight font-serif">
                    {currentCase.title}
                  </h3>
                </div>
              </div>

              {/* Prisoner Image - Centered */}
              <div className="flex flex-col items-center">
                <div className="mb-6">
                  <img
                    src={`/prisoners/${(currentCaseIndex % 6) + 1}.png`}
                    alt={`Accused for Case #${currentCase.id.split('_')[1] || currentCaseIndex + 1}`}
                    className="w-56 sm:w-64 lg:w-72 xl:w-80 h-auto object-contain drop-shadow-lg"
                    onError={(e) =>
                      (e.currentTarget.src =
                        'https://placehold.co/300x400/cccccc/333333?text=Accused')
                    }
                  />
                </div>

                {/* Defend Button - Below prisoner image */}
                <button
                  onClick={() => handleCaseClick(currentCase.id)}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl text-lg transform active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
                >
                  DEFEND
                </button>
              </div>
            </div>
          ) : (
            // Display if no cases are loaded
            <div className="text-center text-gray-600 bg-white p-8 rounded-lg shadow-md border-4 border-blue-600">
              <h3 className="text-xl font-bold mb-2">No Cases Available</h3>
              <p>Check back tomorrow for new cases!</p>
            </div>
          )}
        </div>

        {/* Navigation Controls - Text with arrows */}
        {currentCase && cases.length > 1 && (
          <div className="absolute bottom-36 left-1/2 transform -translate-x-1/2">
            <div className="flex items-center gap-4">
              <button
                onClick={prevCase}
                aria-label="Previous Case"
                className="bg-blue-600 hover:bg-blue-700 border-2 border-black text-white font-bold py-2 px-4 rounded-lg transition-all duration-200 hover:scale-105 shadow-lg focus:outline-none focus:ring-2 focus:ring-white"
              >
                ← Previous
              </button>
              <div className="bg-white border-2 border-black px-4 py-2 rounded-lg font-medium text-gray-800">
                {currentCaseIndex + 1} / {cases.length}
              </div>
              <button
                onClick={nextCase}
                aria-label="Next Case"
                className="bg-blue-600 hover:bg-blue-700 border-2 border-black text-white font-bold py-2 px-4 rounded-lg transition-all duration-200 hover:scale-105 shadow-lg focus:outline-none focus:ring-2 focus:ring-white"
              >
                Next →
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Footer - Hall of Justice Button (Fixed at bottom) */}
      <footer className="fixed bottom-0 left-0 right-0 p-2 sm:p-4 z-20">
        {onLeaderboardClick && (
          <button
            onClick={onLeaderboardClick}
            className="w-full bg-blue-600 border-4 border-black text-white font-bold py-3 sm:py-4 rounded-lg text-base sm:text-lg 
                       hover:bg-blue-700 hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 
                       shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 touch-manipulation"
          >
            🏛️ Hall of Justice
          </button>
        )}
      </footer>
    </div>
  );
};
