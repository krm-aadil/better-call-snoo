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
      <div className="min-h-screen bg-white flex justify-center items-center p-4">
        <div className="bg-white border-2 border-black rounded-lg p-4 sm:p-8 text-center max-w-sm w-full shadow-lg">
          <div className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">
            ⚖️ LOADING DOCKET ⚖️
          </div>
          <div className="text-gray-600 text-base sm:text-lg animate-pulse">
            Preparing today's cases...
          </div>
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

      {/* Main Content Area (flex-grow pushes footer down) */}
      <main className="flex-grow flex flex-col lg:flex-row items-center lg:items-stretch overflow-hidden relative pt-4 lg:pt-0">
        {/* Left Side - Lawyer Image (Positioned absolutely on large screens for fine control) */}
        <div className="w-full lg:absolute lg:left-0 lg:bottom-16 lg:w-1/3 flex items-center lg:items-end justify-center px-4 pt-4 lg:pt-0 lg:px-8 order-2 lg:order-1">
          <img
            src="/lawyers/arms-crossed.png"
            alt="Lawyer Character"
            // Increased size, especially on larger screens, positioned towards bottom
            className="w-40 sm:w-56 md:w-72 lg:w-96 h-auto object-contain max-h-[25vh] sm:max-h-[35vh] lg:max-h-[60vh] drop-shadow-lg"
          />
        </div>

        {/* Right Side - Case Carousel */}
        <div className="w-full lg:w-2/3 lg:ml-auto flex flex-col justify-center items-center p-4 sm:p-6 lg:p-12 order-1 lg:order-2">
          {currentCase ? (
            // Added perspective for a slight 3D effect on hover
            <div className="[perspective:1000px] w-full max-w-xs sm:max-w-sm">
              <div
                className="bg-white border-2 border-black rounded-lg p-4 sm:p-5 shadow-xl w-full mx-auto 
                            hover:shadow-2xl transition-all duration-300 hover:scale-[1.03] transform hover:-rotate-y-1"
              >
                {/* Case Header */}
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <div className="bg-blue-600 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-bold shadow-sm">
                    CASE FILE #{currentCase.id.split('_')[1] || currentCaseIndex + 1}
                  </div>
                  <div
                    className={`px-2 py-1 rounded text-xs font-bold text-white shadow-sm ${getDifficultyColor(currentCase.difficulty)}`}
                  >
                    {currentCase.difficulty.toUpperCase()}
                  </div>
                </div>

                {/* Prisoner Image - Square container */}
                <div className="text-center mb-3 sm:mb-4">
                  {/* Aspect ratio 1/1 forces square, object-cover fills it */}
                  <div className="aspect-square w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 mx-auto border-2 border-gray-400 rounded-lg overflow-hidden shadow-inner bg-gray-100">
                    <img
                      // Dynamic prisoner image based on index, looping through 1-6
                      src={`/prisoners/${(currentCaseIndex % 6) + 1}.png`}
                      alt={`Mugshot for Case #${currentCase.id.split('_')[1] || currentCaseIndex + 1}`}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                      // Add error handling for images
                      onError={(e) =>
                        (e.currentTarget.src =
                          'https://placehold.co/144x144/cccccc/333333?text=Mugshot')
                      }
                    />
                  </div>
                </div>

                {/* Case Title */}
                <h3 className="text-base sm:text-lg font-bold mb-2 sm:mb-3 text-center text-gray-800 leading-tight font-serif">
                  {currentCase.title}
                </h3>

                {/* Accused Of Section */}
                <div className="bg-red-50 border-l-4 border-red-500 text-red-900 px-3 py-2 mb-3 sm:mb-4 rounded-r-md shadow-sm">
                  <p className="font-bold text-xs sm:text-sm uppercase tracking-wide">
                    Accused Of:
                  </p>
                  <p className="text-xs sm:text-sm leading-snug mt-1">{currentCase.crime}</p>
                </div>

                {/* Category/Violation Type */}
                <div className="mb-4 sm:mb-5 text-center">
                  <p className="text-xs sm:text-sm text-gray-600 italic">{currentCase.category}</p>
                </div>

                {/* Defend Button - Blue */}
                <div className="text-center mb-3 sm:mb-4">
                  <button
                    onClick={() => handleCaseClick(currentCase.id)}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-6 sm:px-8 rounded-md transition-all duration-200 hover:scale-105 shadow-md hover:shadow-lg text-sm sm:text-base w-full sm:w-auto transform active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
                  >
                    DEFEND
                  </button>
                </div>

                {/* Carousel Navigation */}
                {cases.length > 1 && (
                  <div className="flex justify-between items-center border-t border-gray-200 pt-3 mt-3">
                    <button
                      onClick={prevCase}
                      aria-label="Previous Case"
                      className="text-gray-500 hover:text-gray-800 text-2xl sm:text-3xl hover:scale-125 transition-all duration-200 p-1 rounded-full hover:bg-gray-200 touch-manipulation focus:outline-none focus:ring-1 focus:ring-gray-400"
                    >
                      ‹{/* Left arrow */}
                    </button>
                    <div className="text-xs sm:text-sm text-gray-600 font-medium tabular-nums">
                      {currentCaseIndex + 1} / {cases.length}
                    </div>
                    <button
                      onClick={nextCase}
                      aria-label="Next Case"
                      className="text-gray-500 hover:text-gray-800 text-2xl sm:text-3xl hover:scale-125 transition-all duration-200 p-1 rounded-full hover:bg-gray-200 touch-manipulation focus:outline-none focus:ring-1 focus:ring-gray-400"
                    >
                      ›{/* Right arrow */}
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            // Display if no cases are loaded
            <div className="text-center text-gray-600 bg-white p-6 rounded-lg shadow-md">
              No cases available today. Check back tomorrow!
            </div>
          )}
        </div>
      </main>

      {/* Footer - Hall of Justice Button (Fixed at bottom) */}
      <footer className="fixed bottom-0 left-0 right-0 p-2 sm:p-4 z-20">
        {onLeaderboardClick && (
          <button
            onClick={onLeaderboardClick}
            className="w-full bg-white border-2 border-black text-blue-700 font-bold py-3 sm:py-4 rounded-lg text-base sm:text-lg 
                       hover:bg-gray-100 hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 
                       shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 touch-manipulation"
          >
            🏛️ Hall of Justice
          </button>
        )}
      </footer>
    </div>
  );
};
