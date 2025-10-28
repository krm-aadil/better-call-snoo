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
      description: 'Defend the most ridiculous cases on Reddit! Choose your case, craft your defense, and let the community vote as your jury in this Ace Attorney-inspired legal game.',
      heading: ' ',
      appIconUri: 'default-icon.png',
    },
    postData: {
      gameType: 'better-call-snoo',
      gameState: 'daily_docket',
    },
    subredditName: subredditName,
    title: '⚖️ Better Call Snoo - Daily Legal Defense Game',
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

  const postTitle = `⚖️ Better Call Snoo: ${caseData.title}`;
  const postDescription = `Attorney ${authorUsername} presents their defense for "${caseData.crime}". Will justice prevail? Cast your vote as a juror in this Ace Attorney-inspired courtroom drama!`;

  return await reddit.submitCustomPost({
    splash: {
      appDisplayName: 'Better Call Snoo',
      backgroundUri: 'default-splash.png',
      buttonLabel: '👨‍⚖️ Enter Jury Box 👨‍⚖️',
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
