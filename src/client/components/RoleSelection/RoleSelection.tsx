import React from 'react';

type RoleSelectionProps = {
  onJudgeSelect: () => void;
  onDefendantSelect: () => void;
};

export const RoleSelection: React.FC<RoleSelectionProps> = ({
  onJudgeSelect,
  onDefendantSelect,
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-purple-900 flex flex-col">
      {/* Header */}
      <div className="text-center py-8">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 animate-fade-in-up">
          Choose Your Role
        </h1>
        <p className="text-xl md:text-2xl text-gray-200 animate-fade-in-up delay-200">
          How will you serve justice today?
        </p>
      </div>

      {/* Role Selection Cards */}
      <div className="flex-1 flex flex-col">
        {/* Judge Option - Upper Half */}
        <div 
          className="flex-1 relative cursor-pointer group transition-all duration-300 hover:scale-105 animate-slide-in-left"
          onClick={onJudgeSelect}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onJudgeSelect();
            }
          }}
          aria-label="Be the Judge - View defendant posts and vote on cases"
        >
          {/* Background Image - Replace with your "upper half" image */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('/be-the-judge.png')`, // Update this path to your actual image
            }}
          >
            {/* Overlay for better text readability */}
            <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-20 transition-all duration-300" />
          </div>
          
          {/* Content Overlay */}
          <div className="relative z-10 h-full flex items-center justify-center">
            <div className="text-center text-white">
              <h2 className="text-3xl md:text-5xl font-bold mb-4 drop-shadow-lg">
                BE THE JUDGE
              </h2>
              <p className="text-lg md:text-xl drop-shadow-md">
                Review cases and deliver verdicts
              </p>
              <div className="mt-4 px-6 py-2 bg-yellow-500 bg-opacity-80 rounded-full text-black font-semibold group-hover:bg-opacity-100 transition-all duration-300">
                Click to Judge Cases
              </div>
            </div>
          </div>
        </div>

        {/* Defendant Option - Bottom Half */}
        <div 
          className="flex-1 relative cursor-pointer group transition-all duration-300 hover:scale-105 animate-slide-in-right"
          onClick={onDefendantSelect}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onDefendantSelect();
            }
          }}
          aria-label="Be the Defendant - Submit your defense for daily cases"
        >
          {/* Background Image - Replace with your "bottom half" image */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('/be-the-defendant.png')`, // Update this path to your actual image
            }}
          >
            {/* Overlay for better text readability */}
            <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-20 transition-all duration-300" />
          </div>
          
          {/* Content Overlay */}
          <div className="relative z-10 h-full flex items-center justify-center">
            <div className="text-center text-white">
              <h2 className="text-3xl md:text-5xl font-bold mb-4 drop-shadow-lg">
                BE THE DEFENDANT
              </h2>
              <p className="text-lg md:text-xl drop-shadow-md">
                Defend yourself in court
              </p>
              <div className="mt-4 px-6 py-2 bg-red-500 bg-opacity-80 rounded-full text-white font-semibold group-hover:bg-opacity-100 transition-all duration-300">
                Click to Submit Defense
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
