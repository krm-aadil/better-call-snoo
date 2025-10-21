import { context, reddit } from '@devvit/web/server';
import type { Case } from '../../shared/types/api';

export const createPost = async () => {
  const { subredditName } = context;
  if (!subredditName) {
    throw new Error('subredditName is required');
  }

  return await reddit.submitCustomPost({
    splash: {
      // Splash Screen Configuration
      appDisplayName: 'Better Call Snoo',
      backgroundUri: 'default-splash.png',
      buttonLabel: 'Enter Courtroom',
      description: 'Defend quirky cases and vote as jury in this Ace Attorney-inspired legal game!',
      heading: 'Better Call Snoo',
      appIconUri: 'default-icon.png',
    },
    postData: {
      gameType: 'better-call-snoo',
      gameState: 'daily_docket',
    },
    subredditName: subredditName,
    title: 'Better Call Snoo - Daily Legal Defense Game',
  });
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

  const postTitle = `Better Call Snoo: ${caseData.title}`;
  const postDescription = `${authorUsername} defends: "${caseData.crime}" - Vote as jury!`;

  return await reddit.submitCustomPost({
    splash: {
      appDisplayName: 'Better Call Snoo - Jury Voting',
      backgroundUri: 'default-splash.png',
      buttonLabel: 'Enter Courtroom',
      description: postDescription,
      heading: 'Jury Voting',
      appIconUri: 'default-icon.png',
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
      votingEndTime: Date.now() + 24 * 60 * 60 * 1000, // 24 hours from now
    },
    subredditName: subredditName,
    title: postTitle,
  });
};
