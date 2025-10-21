import React from 'react';
import type { CharacterPose } from '../../../shared/types/game';

type CharacterSpriteProps = {
  type: 'victim' | 'lawyer';
  pose: CharacterPose;
  className?: string;
};

export const CharacterSprite: React.FC<CharacterSpriteProps> = ({ type, pose, className = '' }) => {
  const getCharacterEmoji = () => {
    if (type === 'victim') {
      switch (pose) {
        case 'worried':
          return '😰';
        case 'defeated':
          return '😭';
        case 'celebrating':
          return '😅';
        case 'confident':
          return '😤';
        default:
          return '😐';
      }
    } else {
      switch (pose) {
        case 'confident':
          return '😎';
        case 'celebrating':
          return '🎉';
        case 'worried':
          return '😬';
        case 'defeated':
          return '😞';
        default:
          return '⚖️';
      }
    }
  };

  const getPoseAnimation = () => {
    switch (pose) {
      case 'celebrating':
        return 'animate-character-celebrating';
      case 'worried':
        return 'animate-character-worried';
      case 'confident':
        return 'animate-character-confident';
      case 'defeated':
        return 'animate-character-defeated';
      default:
        return 'smooth-transition';
    }
  };

  const getCharacterName = () => {
    return type === 'victim' ? 'Victim Snoo' : 'Lawyer Snoo';
  };

  const getCharacterRole = () => {
    return type === 'victim' ? 'The Defendant' : 'Defense Attorney';
  };

  return (
    <div 
      className={`text-center ${className}`}
      role="img"
      aria-label={`${getCharacterName()}, ${getCharacterRole()}, currently ${pose}`}
    >
      <div 
        className={`w-24 h-24 md:w-32 md:h-32 mx-auto mb-4 bg-gradient-to-br ${
          type === 'victim' 
            ? 'from-orange-200 to-orange-400' 
            : 'from-blue-200 to-blue-400'
        } rounded-full flex items-center justify-center shadow-lg ${getPoseAnimation()}`}
        aria-hidden="true"
      >
        <span className="text-4xl md:text-6xl">{getCharacterEmoji()}</span>
      </div>
      <h3 className="text-lg md:text-xl font-bold ace-attorney-text text-white mb-1 mobile-text">
        {getCharacterName()}
      </h3>
      <p className="text-yellow-200 font-semibold text-sm md:text-base">
        {getCharacterRole()}
      </p>
    </div>
  );
};

type CourtRoomCharactersProps = {
  victimPose: CharacterPose;
  lawyerPose: CharacterPose;
  authorUsername: string;
};

export const CourtRoomCharacters: React.FC<CourtRoomCharactersProps> = ({
  victimPose,
  lawyerPose,
  authorUsername,
}) => {
  return (
    <section 
      className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 mb-6 md:mb-8 mobile-spacing"
      aria-labelledby="courtroom-characters-heading"
    >
      <div className="sr-only">
        <h2 id="courtroom-characters-heading">Courtroom Characters</h2>
      </div>
      
      <CharacterSprite 
        type="victim" 
        pose={victimPose}
        className="transform hover:scale-105 focus-within:scale-105 transition-transform duration-300"
      />
      
      <div className="text-center">
        <CharacterSprite 
          type="lawyer" 
          pose={lawyerPose}
          className="transform hover:scale-105 focus-within:scale-105 transition-transform duration-300"
        />
        <p className="text-yellow-300 text-sm mt-2 font-semibold mobile-text">
          <span className="sr-only">Defense </span>Attorney: {authorUsername}
        </p>
      </div>
    </section>
  );
};
