import React, { useState } from 'react';
import type { Case } from '../../../shared/types/game';

type DailyDocketProps = {
  cases: Case[];
  onCaseSelect: (caseId: string) => void;
  onLeaderboardClick?: () => void;
  loading?: boolean;
};

export const DailyDocket: React.FC<DailyDocketProps> = ({ cases, onCaseSelect, onLeaderboardClick, loading = false }) => {
  const [selectedCase, setSelectedCase] = useState<string | null>(null);

  const handleCaseClick = (caseId: string) => {
    setSelectedCase(caseId);
    // Add a small delay for the selection animation
    setTimeout(() => {
      onCaseSelect(caseId);
    }, 200);
  };

  const getDifficultyColor = (difficulty: Case['difficulty']) => {
    switch (difficulty) {
      case 'easy':
        return 'bg-emerald-500 text-white';
      case 'medium':
        return 'bg-amber-500 text-white';
      case 'hard':
        return 'bg-red-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const getCategoryIcon = (category: string) => {
    // Simple icon mapping based on category
    const icons: Record<string, string> = {
      'Theft': '🔓',
      'Fraud': '💰',
      'Vandalism': '🎨',
      'Harassment': '📢',
      'Trespassing': '🚪',
      'Public Nuisance': '🔊',
      'Cyber Crime': '💻',
      'Transportation Violation': '🚗',
      'Physics Violation': '⚛️',
      'Temporal Law': '⏰',
      'Digital Rights': '🤖',
      'Property Law': '🏠',
      'Intellectual Property': '💡',
      'Jurisdictional Confusion': '🌍',
      'Quantum Crime': '🔬',
      'Logic Terrorism': '🧠',
      'Scientific Fraud': '🧪',
      'Reality Violation': '🌀',
      'Counterfeit Currency': '💵',
      'Mental Disturbance': '🧩',
      'Statistical Fraud': '📊',
      'Legal Paradox': '⚖️',
      'Customs Violation': '📦',
      'Identity Theft': '👤',
      'Remote Harassment': '📡',
      'Interdimensional Traffic Violation': '🚦'
    };
    return icons[category] || '⚖️';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex justify-center items-center">
        <div className="bg-black bg-opacity-80 border-4 border-yellow-400 rounded-lg p-8 text-center">
          <div className="text-2xl font-bold text-yellow-400 mb-4">⚖️ LOADING DOCKET ⚖️</div>
          <div className="text-white text-lg animate-pulse">Preparing today's cases...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 overflow-hidden">
      {/* Skip link for accessibility */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      
      {/* Courtroom Background Elements - decorative only */}
      <div className="absolute inset-0 opacity-10" aria-hidden="true">
        <div className="absolute top-10 left-10 text-6xl">⚖️</div>
        <div className="absolute top-20 right-20 text-4xl">🏛️</div>
        <div className="absolute bottom-20 left-20 text-5xl">📜</div>
        <div className="absolute bottom-10 right-10 text-3xl">🔨</div>
      </div>

      <div className="relative z-10 p-4 max-w-6xl mx-auto">
        {/* Header */}
        <header className="text-center mb-8 pt-4">
          <div className="bg-black bg-opacity-80 border-4 border-yellow-400 rounded-lg p-6 mb-6">
            <h1 
              id="main-content"
              className="text-4xl md:text-6xl font-bold text-yellow-400 mb-2 font-serif"
              tabIndex={-1}
            >
              <span aria-hidden="true">📋</span> DAILY DOCKET <span aria-hidden="true">📋</span>
            </h1>
            <p className="text-white text-lg md:text-xl mobile-text">
              Choose your case and prepare your defense!
            </p>
            <div className="text-yellow-300 text-sm mt-2" role="status" aria-live="polite">
              <span className="sr-only">Today's date: </span>
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </div>
            
            {/* Navigation Buttons */}
            {onLeaderboardClick && (
              <nav className="mt-4" aria-label="Main navigation">
                <button
                  onClick={onLeaderboardClick}
                  className="
                    bg-gradient-to-r from-amber-600 to-amber-700 
                    text-white font-bold px-6 py-3 rounded-lg
                    hover:from-amber-700 hover:to-amber-800
                    focus:from-amber-700 focus:to-amber-800
                    transform hover:scale-105 focus:scale-105 transition-all duration-200
                    shadow-lg hover:shadow-xl focus:shadow-xl
                    text-sm md:text-base mobile-touch-target
                  "
                  aria-label="View Hall of Justice leaderboards"
                >
                  <span aria-hidden="true">🏆</span> Hall of Justice
                </button>
              </nav>
            )}
          </div>
        </header>

        {/* Cases Grid - Mobile Optimized */}
        <main>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {cases.map((case_, index) => (
              <article
                key={case_.id}
                className={`
                  relative bg-gradient-to-br from-amber-50 to-amber-100 
                  border-4 border-amber-600 rounded-lg shadow-2xl 
                  smooth-hover smooth-transition
                  cursor-pointer min-h-[200px] p-4 mobile-spacing
                  ${selectedCase === case_.id ? 'scale-105 border-yellow-400 shadow-3xl animate-pulse-glow' : ''}
                  animate-fade-in keyboard-nav
                `}
                style={{ animationDelay: `${index * 150}ms` }}
                role="button"
                tabIndex={0}
                aria-label={`Case: ${case_.title}. Crime: ${case_.crime}. Difficulty: ${case_.difficulty}. Category: ${case_.category}. Press Enter or Space to defend this case.`}
                onClick={() => handleCaseClick(case_.id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleCaseClick(case_.id);
                  }
                }}
              >
                {/* Case File Header */}
                <header className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl" aria-hidden="true">{getCategoryIcon(case_.category)}</span>
                    <span className="text-xs font-bold text-amber-800 uppercase tracking-wide">
                      Case File #{case_.id.split('_')[1]}
                    </span>
                  </div>
                  <div 
                    className={`px-2 py-1 rounded-full text-xs font-bold uppercase ${getDifficultyColor(case_.difficulty)}`}
                    role="status"
                    aria-label={`Difficulty level: ${case_.difficulty}`}
                  >
                    {case_.difficulty}
                  </div>
                </header>

                {/* Case Title */}
                <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-3 leading-tight font-serif mobile-text">
                  {case_.title}
                </h2>

                {/* Crime Description */}
                <div className="bg-red-50 border-l-4 border-red-400 p-3 mb-4 rounded-r" role="region" aria-label="Crime details">
                  <p className="text-sm text-gray-800 leading-relaxed mobile-text">
                    <span className="font-bold text-red-600">ACCUSED OF:</span><br />
                    {case_.crime}
                  </p>
                </div>

                {/* Category Badge and Defend Button */}
                <footer className="flex items-center justify-between">
                  <span 
                    className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium"
                    role="status"
                    aria-label={`Category: ${case_.category}`}
                  >
                    {case_.category}
                  </span>
                  
                  {/* Defend Button */}
                  <button 
                    className="
                      bg-gradient-to-r from-green-600 to-green-700 
                      text-white font-bold px-4 py-2 rounded-lg
                      hover:from-green-700 hover:to-green-800
                      focus:from-green-700 focus:to-green-800
                      transform hover:scale-105 focus:scale-105 transition-all duration-200
                      shadow-lg hover:shadow-xl focus:shadow-xl
                      text-sm md:text-base mobile-touch-target
                      min-w-[80px]
                    "
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCaseClick(case_.id);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        e.stopPropagation();
                        handleCaseClick(case_.id);
                      }
                    }}
                    aria-label={`Defend case: ${case_.title}`}
                  >
                    <span aria-hidden="true">⚖️</span> DEFEND
                  </button>
                </footer>

                {/* Selection Overlay */}
                {selectedCase === case_.id && (
                  <div 
                    className="absolute inset-0 bg-yellow-400 bg-opacity-20 rounded-lg border-4 border-yellow-400 animate-pulse" 
                    aria-hidden="true"
                  />
                )}
              </article>
            ))}
          </div>
        </main>

        {/* Footer */}
        <footer className="text-center mt-8 pb-4">
          <div className="bg-black bg-opacity-60 border-2 border-gray-400 rounded-lg p-4 text-white text-sm mobile-spacing" role="complementary">
            <p className="mobile-text">
              <span aria-hidden="true">💡</span> <strong>Tip:</strong> Choose wisely! Each case has different difficulty levels and scoring potential.
            </p>
          </div>
        </footer>
      </div>


    </div>
  );
};
