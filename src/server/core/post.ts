import { context, reddit } from '@devvit/web/server';
import type { Case } from '../../shared/types/api';

export const createPost = async () => {
  const { subredditName } = context;
  if (!subredditName) {
    throw new Error('subredditName is required');
  }

  //post splash screen
  return await reddit.submitCustomPost({
    splash: {
      // Splash Screen Configuration
      appDisplayName: 'Better Call Snoo',
      backgroundUri: 'default-splash.png',
      buttonLabel: 'PLAY NOW',
      description: ' ',
      heading: ' ',
      appIconUri: 'default-icon.png',
    },
    postData: {
      gameType: 'better-call-snoo',
      gameState: 'daily_docket',
    },
    subredditName: subredditName,
    title: 'Better Call Snoo - Main Court',
  });
};

// Dynamic splash screen configuration based on case data
const getDynamicSplashConfig = (caseData: Case, authorUsername: string) => {
  // Randomly select from 5 court background images
  const getBackgroundByCase = (caseData: Case) => {
    const backgrounds = [
      'court/court-background1.png',
      'court/court-background2.png',
      'court/court-background3.png',
      'court/court-background4.png',
      'court/court-background5.png',
    ];

    // Use case ID to deterministically select background (same case = same background)
    const caseIdHash = caseData.id.split('').reduce((hash, char) => {
      return hash + char.charCodeAt(0);
    }, 0);

    return backgrounds[caseIdHash % backgrounds.length];
  };

  // Dynamic button label based on difficulty
  const getButtonLabel = (difficulty: Case['difficulty']) => {
    switch (difficulty) {
      case 'easy':
        return '⚖️ GUILTY | NOT-GUILTY ⚖️';
      case 'medium':
        return '👨‍⚖️ GUILTY | NOT-GUILTY 👨‍⚖️';
      case 'hard':
        return '🔥 GUILTY | NOT-GUILTY 🔥';
      default:
        return '👨‍⚖️ GUILTY | NOT-GUILTY 👨‍⚖️';
    }
  };

  // Dynamic heading based on case data
  const getHeading = (caseData: Case) => {
    return `${caseData.difficulty.toUpperCase()} CASE: ${caseData.category}`;
  };

  // Dynamic description
  const getDescription = (caseData: Case, authorUsername: string) => {
    const difficultyEmoji = {
      easy: '🟢',
      medium: '🟡',
      hard: '🔴',
    };

    return `${difficultyEmoji[caseData.difficulty]} Attorney ${authorUsername} presents their defense for "${caseData.crime}".Be The Judge Cast Your Vote!`;
  };

  return {
    backgroundUri: getBackgroundByCase(caseData) || 'default-splash.png',
    buttonLabel: getButtonLabel(caseData.difficulty),
    heading: getHeading(caseData),
    description: getDescription(caseData, authorUsername),
  } as const;
};

export const createDefensePost = async (
  caseData: Case,
  defenseText: string,
  authorUsername: string,
  defenseId: string
) => {
  const { subredditName } = context;
  if (!subredditName) {
    throw new Error('subredditName is required');
  }

  const postTitle = `⚖️ Better Call Snoo: ${caseData.title}`;

  // Get dynamic splash configuration
  const splashConfig = getDynamicSplashConfig(caseData, authorUsername);

  return await reddit.submitCustomPost({
    splash: {
      appDisplayName: 'Better Call Snoo',
      backgroundUri: splashConfig.backgroundUri,
      buttonLabel: splashConfig.buttonLabel,
      description: splashConfig.description,
      heading: splashConfig.heading,
      appIconUri: 'default-icon.png', // Use default icon
    },
    postData: {
      gameType: 'better-call-snoo',
      gameState: 'jury_voting',
      caseId: caseData.id,
      caseTitle: caseData.title,
      caseCrime: caseData.crime,
      caseCategory: caseData.category,
      caseDifficulty: caseData.difficulty,
      defenseText: defenseText,
      authorUsername: authorUsername,
      defenseId: defenseId,
      // No voting end time - using live scoring
    },
    subredditName: subredditName,
    title: postTitle,
  });
};
