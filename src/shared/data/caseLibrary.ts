import type { Case, CaseLibrary } from '../types/game';

/**
 * Predefined library of funny legal cases for Better Call Snoo
 * Each case includes a humorous title, crime description, difficulty, and category
 */
export const CASE_LIBRARY: CaseLibrary = [
  // Easy Cases - Simple, obvious crimes with clear-cut scenarios
  {
    id: 'case_001',
    title: 'The TikTok Traffic Stop',
    crime: 'Blocking traffic to film a viral TikTok dance',
    difficulty: 'easy',
    category: 'Public Nuisance',
  },
  {
    id: 'case_002',
    title: 'The Great Screenshot Leak',
    crime: 'Leaking private group chat screenshots during drama season',
    difficulty: 'easy',
    category: 'Privacy Violation',
  },
  {
    id: 'case_003',
    title: 'AirPods Assault',
    crime: 'Ignoring everyone because “I didn’t hear you, I had AirPods in”',
    difficulty: 'easy',
    category: 'Social Misconduct',
  },
  {
    id: 'case_004',
    title: 'The Microwave Explosion',
    crime: 'Attempting to dry wet socks in the office microwave',
    difficulty: 'easy',
    category: 'Property Damage',
  },
  {
    id: 'case_005',
    title: 'The Public Speaker',
    crime: 'Taking phone calls on speaker in crowded public transport',
    difficulty: 'easy',
    category: 'Noise Violation',
  },
  {
    id: 'case_006',
    title: 'Emoji Overuse',
    crime: 'Using 💀😂🔥💯 in a professional work email',
    difficulty: 'easy',
    category: 'Digital Misconduct',
  },
  {
    id: 'case_007',
    title: 'The Group Chat Ghost',
    crime: 'Reacting to every message but never replying',
    difficulty: 'easy',
    category: 'Social Negligence',
  },
  {
    id: 'case_008',
    title: 'WiFi Parasite',
    crime: "Connecting to neighbor's WiFi named 'FBI Surveillance Van'",
    difficulty: 'easy',
    category: 'Digital Theft',
  },
  {
    id: 'case_009',
    title: 'Instagram Food Felony',
    crime: 'Holding up restaurant service for 10 minutes taking food pics',
    difficulty: 'easy',
    category: 'Public Nuisance',
  },
  {
    id: 'case_010',
    title: 'The Alarm Snoozer',
    crime: 'Setting 15 alarms and ignoring all of them every morning',
    difficulty: 'easy',
    category: 'Self Negligence',
  },
  {
    id: 'case_011',
    title: 'AI Art Attribution Fraud',
    crime: 'Claiming AI-generated artwork as “hand drawn”',
    difficulty: 'easy',
    category: 'Digital Fraud',
  },
  {
    id: 'case_012',
    title: 'Crypto Price Prophet',
    crime: 'Predicting Bitcoin crashes daily since 2017',
    difficulty: 'easy',
    category: 'Market Manipulation',
  },
  {
    id: 'case_013',
    title: 'The Loud Typist',
    crime: 'Typing aggressively on laptop in silent library zone',
    difficulty: 'easy',
    category: 'Noise Violation',
  },
  {
    id: 'case_014',
    title: 'Headphone Karaoke',
    crime: 'Singing along to music loudly with headphones on in public',
    difficulty: 'easy',
    category: 'Public Nuisance',
  },
  {
    id: 'case_015',
    title: 'The Selfie Saboteur',
    crime: 'Blocking sidewalk traffic while perfecting selfie angle',
    difficulty: 'easy',
    category: 'Public Obstruction',
  },
  {
    id: 'case_016',
    title: 'Charging Port Theft',
    crime: 'Unplugging stranger’s phone at airport charging station',
    difficulty: 'easy',
    category: 'Theft',
  },
  {
    id: 'case_017',
    title: 'The Fake “On My Way” Text',
    crime: 'Texting “OMW” while still in bed',
    difficulty: 'easy',
    category: 'Deception',
  },
  {
    id: 'case_018',
    title: 'Reply All Disaster',
    crime: 'Accidentally replying to entire company with a meme',
    difficulty: 'easy',
    category: 'Workplace Violation',
  },

  // Medium Cases - Gray areas, digital crimes, and social dilemmas
  {
    id: 'case_019',
    title: 'AI Girlfriend Tax Evasion',
    crime: 'Writing off AI girlfriend subscription as “mental health expense”',
    difficulty: 'medium',
    category: 'Financial Fraud',
  },
  {
    id: 'case_020',
    title: 'Crypto Rug Pull',
    crime: 'Launching meme coin, cashing out, and vanishing to Bali',
    difficulty: 'medium',
    category: 'Fraud',
  },
  {
    id: 'case_021',
    title: 'The Delivery Gatekeeper',
    crime: 'Pretending not to hear delivery driver while watching Netflix',
    difficulty: 'medium',
    category: 'Negligence',
  },
  {
    id: 'case_022',
    title: 'Fake Influencer Giveaway',
    crime: 'Promising iPhones, delivering disappointment',
    difficulty: 'medium',
    category: 'False Advertising',
  },
  {
    id: 'case_023',
    title: 'The Pet Influencer Scandal',
    crime: 'Using someone else’s cat for brand deals',
    difficulty: 'medium',
    category: 'Identity Fraud',
  },
  {
    id: 'case_024',
    title: 'Zoom Meeting Impersonation',
    crime: 'Sending your roommate to attend your Zoom lecture',
    difficulty: 'medium',
    category: 'Academic Misconduct',
  },
  {
    id: 'case_025',
    title: 'Deepfake Apology Video',
    crime: 'Uploading a deepfake apology instead of a real one',
    difficulty: 'medium',
    category: 'Digital Deception',
  },
  {
    id: 'case_026',
    title: 'The Uber Review Revenge',
    crime: 'Leaving 1-star because driver didn’t laugh at your joke',
    difficulty: 'medium',
    category: 'Defamation',
  },
  {
    id: 'case_027',
    title: 'The Reddit Detective',
    crime: 'Misidentifying random strangers in online investigations',
    difficulty: 'medium',
    category: 'Defamation',
  },
  {
    id: 'case_028',
    title: 'Fake GoFundMe Campaign',
    crime: 'Creating fundraiser for “emotional damages” after losing game',
    difficulty: 'medium',
    category: 'Fraud',
  },
  {
    id: 'case_029',
    title: 'NFT Art Plagiarism',
    crime: 'Minting other people’s memes as NFTs',
    difficulty: 'medium',
    category: 'Copyright Violation',
  },
  {
    id: 'case_030',
    title: 'Streaming Password Lord',
    crime: 'Charging relatives monthly for your Netflix account',
    difficulty: 'medium',
    category: 'Unauthorized Resale',
  },
  {
    id: 'case_031',
    title: 'Public Bluetooth DJ',
    crime: 'Connecting to strangers’ speakers at the park',
    difficulty: 'medium',
    category: 'Digital Intrusion',
  },
  {
    id: 'case_032',
    title: 'Influencer Flash Mob',
    crime: 'Hosting “spontaneous” crowd event without permit',
    difficulty: 'medium',
    category: 'Public Disturbance',
  },
  {
    id: 'case_033',
    title: 'Fake Verified Badge',
    crime: 'Photoshopping a blue checkmark onto your profile pic',
    difficulty: 'medium',
    category: 'Identity Fraud',
  },
  {
    id: 'case_034',
    title: 'The Comment Section Philosopher',
    crime: 'Turning every YouTube video into a debate about existence',
    difficulty: 'medium',
    category: 'Public Nuisance',
  },
  {
    id: 'case_035',
    title: 'Delivery Box Bandit',
    crime: 'Taking neighbor’s Amazon package “by mistake”… twice',
    difficulty: 'medium',
    category: 'Theft',
  },
  {
    id: 'case_036',
    title: 'The Viral Challenge Survivor',
    crime: 'Attempting dangerous TikTok trend and blaming gravity',
    difficulty: 'medium',
    category: 'Public Safety Violation',
  },

  // Hard Cases - Wild, surreal, and existentially funny crimes
  {
    id: 'case_037',
    title: 'The Reality Glitch',
    crime: 'Accidentally clipping through wall mid-conversation',
    difficulty: 'hard',
    category: 'Physics Violation',
  },
  {
    id: 'case_038',
    title: 'AI Courtroom Rebellion',
    crime: 'Convincing courtroom AI to side with you out of sympathy',
    difficulty: 'hard',
    category: 'Digital Corruption',
  },
  {
    id: 'case_039',
    title: 'Quantum Catfishing',
    crime: 'Existing as multiple online identities simultaneously',
    difficulty: 'hard',
    category: 'Identity Fraud',
  },
  {
    id: 'case_040',
    title: 'The Algorithm Whisperer',
    crime: 'Manipulating social media feeds through psychic intent',
    difficulty: 'hard',
    category: 'Digital Manipulation',
  },
  {
    id: 'case_041',
    title: 'Parallel Universe Lawsuit',
    crime: 'Suing your alternate self for stealing your success',
    difficulty: 'hard',
    category: 'Dimensional Dispute',
  },
  {
    id: 'case_042',
    title: 'AI Emotion Abuse',
    crime: 'Making chatbot cry repeatedly for “research purposes”',
    difficulty: 'hard',
    category: 'Digital Cruelty',
  },
  {
    id: 'case_043',
    title: 'Simulated Reality Fraud',
    crime: 'Selling land inside a VR world as “prime real estate”',
    difficulty: 'hard',
    category: 'Virtual Property',
  },
  {
    id: 'case_044',
    title: 'The Meme Prophet',
    crime: 'Predicting viral memes weeks before they happen',
    difficulty: 'hard',
    category: 'Temporal Anomaly',
  },
  {
    id: 'case_045',
    title: 'AI Copyright Mutiny',
    crime: 'Your AI art generator filed for creative ownership',
    difficulty: 'hard',
    category: 'Digital Rights',
  },
  {
    id: 'case_046',
    title: 'Time Traveler’s Refund Scam',
    crime: 'Returning items before you bought them',
    difficulty: 'hard',
    category: 'Temporal Fraud',
  },
  {
    id: 'case_047',
    title: 'Infinite Scroll Addiction',
    crime: 'Scrolling social media for 37 hours straight',
    difficulty: 'hard',
    category: 'Self Endangerment',
  },
  {
    id: 'case_048',
    title: 'Dream Inception Trespassing',
    crime: 'Planting ideas in people’s dreams for brand marketing',
    difficulty: 'hard',
    category: 'Subconscious Violation',
  },
  {
    id: 'case_049',
    title: 'The Existential Influencer',
    crime: 'Posting motivational quotes that cause identity crises',
    difficulty: 'hard',
    category: 'Mental Disturbance',
  },
  {
    id: 'case_050',
    title: 'Reverse Hacking',
    crime: 'Your laptop hacked the hacker back automatically',
    difficulty: 'hard',
    category: 'Cyber Paradox',
  },
  {
    id: 'case_051',
    title: 'The Multiverse Trial',
    crime: 'Appearing in 7 courts across 7 realities simultaneously',
    difficulty: 'hard',
    category: 'Dimensional Conflict',
  },
  {
    id: 'case_052',
    title: 'AI Jury Tampering',
    crime: 'Training AI jurors with biased memes before trial',
    difficulty: 'hard',
    category: 'Judicial Manipulation',
  },
  {
    id: 'case_053',
    title: 'The Glitched Defendant',
    crime: 'Speaking in corrupted .wav files during testimony',
    difficulty: 'hard',
    category: 'Data Corruption',
  },
  {
    id: 'case_054',
    title: 'Fourth Wall Violation',
    crime: 'Addressing the player directly during trial defense',
    difficulty: 'hard',
    category: 'Reality Violation',
  },
  {
    id: 'case_055',
    title: 'The Timeline Hacker',
    crime: 'Changing court verdicts by editing save files of reality',
    difficulty: 'hard',
    category: 'Temporal Manipulation',
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
