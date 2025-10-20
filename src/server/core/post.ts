import { context, reddit } from '@devvit/web/server';

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
      entryUri: 'index.html',
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
