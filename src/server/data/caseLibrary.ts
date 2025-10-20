import type { Case } from '../../shared/types/game';

export const CASE_LIBRARY: Case[] = [
  {
    id: 'case_001',
    title: 'The Great Banana Heist',
    crime: 'Accused of stealing 47 bananas from a grocery store to feed an army of monkeys',
    difficulty: 'easy',
    category: 'theft'
  },
  {
    id: 'case_002',
    title: 'The Midnight Sock Conspiracy',
    crime: 'Charged with organizing a secret society that steals only left socks',
    difficulty: 'medium',
    category: 'conspiracy'
  },
  {
    id: 'case_003',
    title: 'The Pizza Topping Terrorism',
    crime: 'Accused of putting pineapple on pizza in a no-pineapple zone',
    difficulty: 'hard',
    category: 'food crimes'
  },
  {
    id: 'case_004',
    title: 'The Rubber Duck Racket',
    crime: 'Running an illegal rubber duck racing ring in public fountains',
    difficulty: 'easy',
    category: 'gambling'
  },
  {
    id: 'case_005',
    title: 'The Invisible Ink Incident',
    crime: 'Writing threatening letters with invisible ink that nobody can read',
    difficulty: 'medium',
    category: 'harassment'
  },
  {
    id: 'case_006',
    title: 'The Backwards Walking Bandit',
    crime: 'Robbing banks while walking backwards to confuse security cameras',
    difficulty: 'hard',
    category: 'robbery'
  },
  {
    id: 'case_007',
    title: 'The Bubble Wrap Burglar',
    crime: 'Breaking into houses just to pop all the bubble wrap',
    difficulty: 'easy',
    category: 'breaking and entering'
  },
  {
    id: 'case_008',
    title: 'The Karaoke Kidnapper',
    crime: 'Holding people hostage until they sing their favorite song',
    difficulty: 'medium',
    category: 'kidnapping'
  },
  {
    id: 'case_009',
    title: 'The Lawn Flamingo Liberation Front',
    crime: 'Leading a movement to free all plastic lawn flamingos',
    difficulty: 'hard',
    category: 'activism'
  },
  {
    id: 'case_010',
    title: 'The Elevator Music Menace',
    crime: 'Hacking elevator systems to play death metal instead of smooth jazz',
    difficulty: 'medium',
    category: 'cyber crime'
  },
  {
    id: 'case_011',
    title: 'The Sandwich Saboteur',
    crime: 'Replacing all sandwich fillings with tofu without telling anyone',
    difficulty: 'easy',
    category: 'food tampering'
  },
  {
    id: 'case_012',
    title: 'The Time Travel Tax Evasion',
    crime: 'Using a time machine to avoid paying taxes in multiple decades',
    difficulty: 'hard',
    category: 'tax evasion'
  },
  {
    id: 'case_013',
    title: 'The Mime Escape Artist',
    crime: 'Breaking out of invisible boxes that were never locked',
    difficulty: 'easy',
    category: 'escape'
  },
  {
    id: 'case_014',
    title: 'The Weather Forecast Fraud',
    crime: 'Predicting sunny weather while secretly controlling rain clouds',
    difficulty: 'medium',
    category: 'fraud'
  },
  {
    id: 'case_015',
    title: 'The Alphabet Soup Anarchist',
    crime: 'Rearranging alphabet soup to spell inappropriate words',
    difficulty: 'easy',
    category: 'vandalism'
  },
  {
    id: 'case_016',
    title: 'The Professional Procrastinator',
    crime: 'Delaying important court cases by being too good at procrastinating',
    difficulty: 'medium',
    category: 'obstruction'
  },
  {
    id: 'case_017',
    title: 'The Reverse Psychology Robber',
    crime: 'Convincing people to give away their money by telling them not to',
    difficulty: 'hard',
    category: 'psychological manipulation'
  },
  {
    id: 'case_018',
    title: 'The Doorbell Ditch Mastermind',
    crime: 'Organizing elaborate doorbell ditching schemes across the city',
    difficulty: 'easy',
    category: 'pranks'
  },
  {
    id: 'case_019',
    title: 'The Gravity Defying Graffiti Artist',
    crime: 'Spray painting while floating in mid-air without permission',
    difficulty: 'hard',
    category: 'vandalism'
  },
  {
    id: 'case_020',
    title: 'The Sock Puppet Senate',
    crime: 'Running for political office using only sock puppets as campaign staff',
    difficulty: 'medium',
    category: 'election fraud'
  }
];

// Function to get random cases for daily selection
export const getRandomCases = (count: number, seed?: string): Case[] => {
  // Use date-based seed for deterministic daily selection
  const today = seed || new Date().toISOString().split('T')[0];
  let hash = 0;
  for (let i = 0; i < today.length; i++) {
    const char = today.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  
  // Simple seeded random function
  const seededRandom = (seed: number) => {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
  };
  
  const shuffled = [...CASE_LIBRARY];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(seededRandom(hash + i) * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  
  return shuffled.slice(0, count);
};
