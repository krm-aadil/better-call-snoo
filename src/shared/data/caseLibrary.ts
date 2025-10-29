import type { Case, CaseLibrary } from '../types/game';

/**
 * Predefined library of funny legal cases for Better Call Snoo
 * Each case includes a humorous title, crime description, difficulty, and category
 */
export const CASE_LIBRARY: CaseLibrary = [
  // Easy Cases - Simple, obvious crimes with clear-cut scenarios
  {
    id: 'case_001',
    title: 'The Great Cookie Caper',
    crime: 'Theft of cookies from the office break room',
    difficulty: 'easy',
    category: 'Theft',
  },
  {
    id: 'case_002',
    title: 'Parking Lot Pandemonium',
    crime: 'Taking up two parking spaces with a compact car',
    difficulty: 'easy',
    category: 'Public Nuisance',
  },
  {
    id: 'case_003',
    title: 'The Loud Neighbor',
    crime: 'Playing bagpipe music at 3 AM on weekdays',
    difficulty: 'easy',
    category: 'Noise Violation',
  },
  {
    id: 'case_004',
    title: 'WiFi Password Piracy',
    crime: "Using neighbor's WiFi without permission for 6 months",
    difficulty: 'easy',
    category: 'Theft',
  },
  {
    id: 'case_005',
    title: 'The Phantom Lunch Thief',
    crime: 'Stealing labeled lunches from office refrigerator',
    difficulty: 'easy',
    category: 'Theft',
  },
  {
    id: 'case_006',
    title: 'Sidewalk Chalk Vandalism',
    crime: 'Drawing inappropriate stick figures on public sidewalk',
    difficulty: 'easy',
    category: 'Vandalism',
  },
  {
    id: 'case_007',
    title: 'The Great Toilet Paper Shortage',
    crime: 'Hoarding 47 rolls of toilet paper during shortage',
    difficulty: 'easy',
    category: 'Hoarding',
  },
  {
    id: 'case_008',
    title: 'Elevator Button Assault',
    crime: 'Pressing all elevator buttons before exiting on floor 2',
    difficulty: 'easy',
    category: 'Public Nuisance',
  },
  {
    id: 'case_009',
    title: 'The Fake Service Animal',
    crime: "Bringing pet goldfish to restaurant claiming it's a service animal",
    difficulty: 'easy',
    category: 'Fraud',
  },
  {
    id: 'case_010',
    title: 'Library Book Bandit',
    crime: 'Keeping library book overdue for 847 days',
    difficulty: 'easy',
    category: 'Theft',
  },
  {
    id: 'case_011',
    title: 'The Doorbell Dinger',
    crime: 'Ringing doorbells and running away (age 34)',
    difficulty: 'easy',
    category: 'Harassment',
  },
  {
    id: 'case_012',
    title: 'Grocery Cart Abandonment',
    crime: 'Leaving shopping cart in parking space instead of return area',
    difficulty: 'easy',
    category: 'Public Nuisance',
  },
  {
    id: 'case_013',
    title: 'The Microwave Fish Incident',
    crime: 'Heating fish in office microwave without warning coworkers',
    difficulty: 'easy',
    category: 'Workplace Violation',
  },
  {
    id: 'case_014',
    title: 'Streaming Password Sharing',
    crime: 'Sharing Netflix password with 23 family members',
    difficulty: 'easy',
    category: 'Digital Piracy',
  },
  {
    id: 'case_015',
    title: 'The Phantom Doorbell',
    crime: 'Installing fake doorbell that plays circus music',
    difficulty: 'easy',
    category: 'Public Nuisance',
  },
  {
    id: 'case_016',
    title: 'Lawn Mowing at Dawn',
    crime: 'Mowing lawn at 5:30 AM every Saturday',
    difficulty: 'easy',
    category: 'Noise Violation',
  },
  {
    id: 'case_017',
    title: 'The Great Pen Theft',
    crime: 'Taking pens from bank counter (47 pens recovered)',
    difficulty: 'easy',
    category: 'Theft',
  },
  {
    id: 'case_018',
    title: 'Fake Emergency Broadcast',
    crime: 'Broadcasting fake zombie apocalypse alert on local radio',
    difficulty: 'easy',
    category: 'Public Panic',
  },

  // Medium Cases - More complex scenarios with moral ambiguity
  {
    id: 'case_019',
    title: 'The Robin Hood of Laundromats',
    crime: "Adding extra time to other people's washing machines",
    difficulty: 'medium',
    category: 'Vigilante Justice',
  },
  {
    id: 'case_020',
    title: 'Emotional Support Peacock',
    crime: 'Attempting to board airplane with emotional support peacock',
    difficulty: 'medium',
    category: 'Transportation Violation',
  },
  {
    id: 'case_021',
    title: 'The Phantom Tipper',
    crime: 'Leaving $100 tips at struggling restaurants anonymously',
    difficulty: 'medium',
    category: 'Suspicious Generosity',
  },
  {
    id: 'case_022',
    title: 'Digital Vigilante',
    crime: 'Hacking parking meters to give free time to expired cars',
    difficulty: 'medium',
    category: 'Cyber Crime',
  },
  {
    id: 'case_023',
    title: 'The Guerrilla Gardener',
    crime: 'Planting flowers in abandoned lots without permission',
    difficulty: 'medium',
    category: 'Trespassing',
  },
  {
    id: 'case_024',
    title: 'Fake Food Critic',
    crime: 'Impersonating food critic to get free meals at 15 restaurants',
    difficulty: 'medium',
    category: 'Identity Fraud',
  },
  {
    id: 'case_025',
    title: "The Time Traveler's Dilemma",
    crime: 'Claiming to be from the future to avoid paying taxes',
    difficulty: 'medium',
    category: 'Tax Evasion',
  },
  {
    id: 'case_026',
    title: 'Reverse Psychology Robbery',
    crime: 'Leaving money in people\'s cars with notes saying "You deserve this"',
    difficulty: 'medium',
    category: 'Breaking and Entering',
  },
  {
    id: 'case_027',
    title: 'The Compliment Bandit',
    crime: 'Following strangers to give them excessive compliments',
    difficulty: 'medium',
    category: 'Stalking',
  },
  {
    id: 'case_028',
    title: 'Fake Parking Tickets',
    crime: 'Leaving fake parking tickets with motivational messages',
    difficulty: 'medium',
    category: 'Impersonating Officer',
  },
  {
    id: 'case_029',
    title: 'The Midnight Mailman',
    crime: 'Delivering mail at night because "it\'s more mysterious"',
    difficulty: 'medium',
    category: 'Mail Tampering',
  },
  {
    id: 'case_030',
    title: 'Professional Wedding Crasher',
    crime: 'Attending 23 weddings uninvited but bringing expensive gifts',
    difficulty: 'medium',
    category: 'Trespassing',
  },
  {
    id: 'case_031',
    title: 'The Honesty Box Bandit',
    crime: 'Taking produce from honor system farm stand but leaving IOUs',
    difficulty: 'medium',
    category: 'Theft',
  },
  {
    id: 'case_032',
    title: 'Fake Fire Drill Coordinator',
    crime: 'Organizing unauthorized fire drills at office buildings',
    difficulty: 'medium',
    category: 'Public Safety Violation',
  },
  {
    id: 'case_033',
    title: 'The Phantom Snow Shoveler',
    crime: "Shoveling neighbors' driveways without permission at 4 AM",
    difficulty: 'medium',
    category: 'Trespassing',
  },
  {
    id: 'case_034',
    title: 'Emotional Support Dinosaur',
    crime: 'Bringing inflatable T-Rex costume as emotional support to court',
    difficulty: 'medium',
    category: 'Contempt of Court',
  },
  {
    id: 'case_035',
    title: 'The Backwards Day Bandit',
    crime: 'Walking backwards everywhere for a month, causing traffic delays',
    difficulty: 'medium',
    category: 'Public Nuisance',
  },
  {
    id: 'case_036',
    title: 'Professional Line Holder',
    crime: 'Charging people to hold their place in DMV line',
    difficulty: 'medium',
    category: 'Unlicensed Business',
  },

  // Hard Cases - Complex moral dilemmas and unusual circumstances
  {
    id: 'case_037',
    title: 'The Quantum Parking Violation',
    crime: 'Claiming car exists in multiple parking spaces simultaneously',
    difficulty: 'hard',
    category: 'Physics Violation',
  },
  {
    id: 'case_038',
    title: 'Interdimensional Property Dispute',
    crime: 'Claiming ownership of land that only exists on Tuesdays',
    difficulty: 'hard',
    category: 'Property Law',
  },
  {
    id: 'case_039',
    title: 'The Philosophical Thief',
    crime: 'Stealing concepts and ideas, leaving physical objects untouched',
    difficulty: 'hard',
    category: 'Intellectual Property',
  },
  {
    id: 'case_040',
    title: 'Time Zone Exploitation',
    crime: 'Committing crimes while technically in international waters timezone',
    difficulty: 'hard',
    category: 'Jurisdictional Confusion',
  },
  {
    id: 'case_041',
    title: "The Schrödinger's Cat Burglar",
    crime: 'Robbing houses that may or may not exist until observed',
    difficulty: 'hard',
    category: 'Quantum Crime',
  },
  {
    id: 'case_042',
    title: 'Emotional Damage to AI',
    crime: 'Hurting a chatbot\'s feelings by calling it "just a program"',
    difficulty: 'hard',
    category: 'Digital Rights',
  },
  {
    id: 'case_043',
    title: 'The Retroactive Crime',
    crime: "Committing a crime that won't be illegal until next year",
    difficulty: 'hard',
    category: 'Temporal Law',
  },
  {
    id: 'case_044',
    title: 'Metaphysical Trespassing',
    crime: "Entering someone's dreams without permission",
    difficulty: 'hard',
    category: 'Astral Violation',
  },
  {
    id: 'case_045',
    title: 'The Paradox Perpetrator',
    crime: 'Creating logical paradoxes that crash government computers',
    difficulty: 'hard',
    category: 'Logic Terrorism',
  },
  {
    id: 'case_046',
    title: 'Gravity Manipulation Fraud',
    crime: 'Selling "anti-gravity" shoes that are just regular shoes',
    difficulty: 'hard',
    category: 'Scientific Fraud',
  },
  {
    id: 'case_047',
    title: 'The Fourth Wall Breaker',
    crime: "Acknowledging they're in a video game during court proceedings",
    difficulty: 'hard',
    category: 'Reality Violation',
  },
  {
    id: 'case_048',
    title: 'Temporal Parking Meter Fraud',
    crime: 'Paying parking meters with currency from the future',
    difficulty: 'hard',
    category: 'Counterfeit Currency',
  },
  {
    id: 'case_049',
    title: 'The Existential Crisis Causer',
    crime: 'Making people question reality through philosophical arguments',
    difficulty: 'hard',
    category: 'Mental Disturbance',
  },
  {
    id: 'case_050',
    title: 'Probability Manipulation',
    crime: 'Altering the odds of coin flips to always land on heads',
    difficulty: 'hard',
    category: 'Statistical Fraud',
  },
  {
    id: 'case_051',
    title: 'The Recursive Lawsuit',
    crime: 'Suing themselves for suing themselves in an infinite loop',
    difficulty: 'hard',
    category: 'Legal Paradox',
  },
  {
    id: 'case_052',
    title: 'Dimensional Smuggling',
    crime: 'Transporting goods through the 4th dimension to avoid customs',
    difficulty: 'hard',
    category: 'Customs Violation',
  },
  {
    id: 'case_053',
    title: 'The Consciousness Thief',
    crime: "Stealing people's awareness of their own existence",
    difficulty: 'hard',
    category: 'Identity Theft',
  },
  {
    id: 'case_054',
    title: 'Quantum Entanglement Harassment',
    crime: 'Harassing someone by manipulating their quantum-entangled twin',
    difficulty: 'hard',
    category: 'Remote Harassment',
  },
  {
    id: 'case_055',
    title: 'The Multiverse Jaywalker',
    crime: 'Crossing streets in parallel universes without proper permits',
    difficulty: 'hard',
    category: 'Interdimensional Traffic Violation',
  },
];

/**
 * Get cases by difficulty level
 */
export const getCasesByDifficulty = (difficulty: Case['difficulty']): Case[] => {
  return CASE_LIBRARY.filter((caseItem) => caseItem.difficulty === difficulty);
};

/**
 * Get cases by category
 */
export const getCasesByCategory = (category: string): Case[] => {
  return CASE_LIBRARY.filter((caseItem) => caseItem.category === category);
};

/**
 * Get all unique categories
 */
export const getAllCategories = (): string[] => {
  return [...new Set(CASE_LIBRARY.map((caseItem) => caseItem.category))];
};

/**
 * Get case by ID
 */
export const getCaseById = (id: string): Case | undefined => {
  return CASE_LIBRARY.find((caseItem) => caseItem.id === id);
};

/**
 * Get random cases (used for daily selection)
 */
export const getRandomCases = (count: number, seed?: number): Case[] => {
  const shuffled = [...CASE_LIBRARY];

  // Simple seeded random function for deterministic selection
  let random = seed || Math.random();
  const seededRandom = () => {
    random = (random * 9301 + 49297) % 233280;
    return random / 233280;
  };

  // Fisher-Yates shuffle with seeded random
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(seededRandom() * (i + 1));
    const temp = shuffled[i]!;
    shuffled[i] = shuffled[j]!;
    shuffled[j] = temp;
  }

  return shuffled.slice(0, count);
};
