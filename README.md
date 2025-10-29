# Better Call Snoo

**Better Call Snoo** is an Ace Attorney-inspired legal defense game built for Reddit using the Devvit platform. This interactive React.js application transforms Reddit into a virtual courtroom where players defend quirky cases with creative arguments while the community acts as jury.

> **🎮 GAME STATUS**: **FULLY FUNCTIONAL & PRODUCTION-READY** - Complete implementation with all features working including daily case carousel, defense submission, immersive jury voting, real-time updates, scoring algorithms, and competitive leaderboards.

## Current Game State Analysis

Based on the latest client code analysis, Better Call Snoo is a fully functional React.js game with the following core architecture:

**🎮 Main Game Flow:**
- **Entry Point**: `main.tsx` renders the main `App` component in React StrictMode
- **Central Hub**: `App.tsx` manages game state routing between Daily Docket, Defense Form, Jury Voting, and Leaderboard
- **Loading Experience**: Custom loading screen with "New-Loading-Screen.png" background and professional styling
- **Intelligent Routing**: Automatic detection of post type (main game vs jury voting) for seamless user experience

**🏛️ Core Components:**
- **Daily Docket**: Interactive case carousel with courtroom background, real-time date/time, prisoner mugshots, and difficulty badges
- **Defense Form**: 250-character defense writing interface with real-time validation and character counting
- **Jury Voting**: Immersive courtroom experience with live voting, animated Scales of Justice, and character reactions
- **Leaderboard**: Hall of Justice rankings with personal performance dashboards and trophy recognition
- **Real-Time Updates**: Live vote polling every 2 seconds with connection status indicators and vote notifications

## What is Better Call Snoo?

Better Call Snoo is a revolutionary social gaming experience that transforms Reddit into an interactive courtroom where creativity meets community judgment. Players take on dual roles as both defense attorneys and jury members in a self-sustaining content ecosystem.

**🎯 The Game Concept:**
Better Call Snoo is a unique legal defense game where players become attorneys defending absurd criminal cases with creative 250-character arguments. The community then acts as jury, voting GUILTY or NOT GUILTY on each defense in an immersive Ace Attorney-style courtroom experience.

**🎮 How It Works:**
1. **Browse Daily Cases**: View 5 randomly selected absurd legal cases from a library of 50+ scenarios
2. **Write Your Defense**: Craft a creative 250-character defense argument for any case
3. **Community Voting**: Your defense becomes a new Reddit post where the community votes
4. **Earn Points**: Score points as both attorney (for persuasive defenses) and juror (for accurate voting)
5. **Compete**: Climb the Hall of Justice leaderboards in both attorney and juror categories

**What Makes It Special:**
- **Self-Sustaining Content**: Every defense creates a new Reddit post, generating infinite community-driven gameplay
- **Native Reddit Experience**: Runs entirely within Reddit posts - no downloads or external apps needed
- **Real-Time Drama**: Watch Reddit Snoo characters react to votes with authentic gavel sound effects and animated Scales of Justice
- **Dual Scoring System**: Sophisticated algorithms reward both creative defense writing and accurate jury voting

## What Makes This Game Innovative?

**🚀 Revolutionary Game Design:**

1. **Self-Sustaining Content Ecosystem**: Each defense submission automatically generates a new Reddit post for community voting, creating an infinite content loop where players become both creators and consumers. This revolutionary approach turns the entire community into active content generators, ensuring fresh material and sustained engagement without requiring constant developer intervention.

2. **Seamless Reddit Integration**: Runs entirely within Reddit posts using Devvit's web platform with zero external dependencies. The game creates a native Reddit experience with automatic user authentication, post creation, and community integration that requires no additional accounts or downloads.

3. **Dual-Role Gameplay**: Players simultaneously participate as attorneys (creating defenses) and jurors (voting on others' defenses), creating multiple engagement pathways that accommodate different skill sets and participation preferences.

**🎭 Immersive Courtroom Experience:**

4. **Dynamic Character System**: Reddit Snoo characters change poses based on real-time vote percentages with five distinct emotional states: neutral, confident, worried, celebrating, and defeated. Characters react instantly to vote changes with smooth CSS animations.

5. **Authentic Ace Attorney Recreation**: Complete visual and audio recreation of the beloved courtroom game series, featuring custom Reddit Snoo character sprites, authentic gavel sound effects using Web Audio API, professional courtroom backgrounds, and engaging typography.

6. **Real-Time Social Voting**: Live vote updates every 5 seconds with dramatically animated Scales of Justice that tip based on community sentiment. The sophisticated visual feedback system includes connection status indicators, update timestamps, and smooth animations.

The game features over 50 hilarious legal scenarios ranging from "Quantum Cat Burglary" to "Interdimensional Traffic Violations", each with unique difficulty levels and categories. Every defense submission automatically creates a new Reddit post for community voting, generating infinite user-driven content.

## How to Play Better Call Snoo

**🎮 Step-by-Step Gameplay Guide:**

### Getting Started
1. **Find the Game**: Look for "Better Call Snoo - Main Court" posts in participating subreddits
2. **Launch**: Click the "PLAY NOW" button on the splash screen to enter the game
3. **Loading**: The game loads with an immersive courtroom background and welcome message

### Playing as an Attorney (Defense Creator)

**Step 1: Browse Daily Cases**
- View the **Daily Docket** featuring 5 randomly selected legal cases
- Each case shows:
  - **Case Title**: Humorous case name (e.g., "The Quantum Cat Burglar")
  - **Crime Description**: What the defendant is accused of
  - **Difficulty Badge**: Easy (🟢), Medium (🟡), or Hard (🔴)
  - **Prisoner Mugshot**: Visual representation of the defendant
- Use arrow buttons to navigate between cases
- Live date/time display shows current courtroom session

**Step 2: Select a Case**
- Click the blue **"DEFEND"** button on any case that interests you
- You'll be taken to the Defense Form screen

**Step 3: Write Your Defense**
- Craft a creative defense argument in exactly **250 characters or less**
- Real-time character counter shows remaining space with color coding:
  - Green: Plenty of space remaining
  - Yellow: Getting close to limit
  - Red: Near or at character limit
- Be creative! The more compelling your defense, the more likely the jury will vote "Not Guilty"
- Examples of good defenses:
  - "My client was clearly sleepwalking during the alleged cookie theft. The crumbs on his pajamas are circumstantial evidence at best!"
  - "The WiFi password was '123456' - hardly secure! My client assumedium it was a public network invitation!"

**Step 4: Submit Your Defense**
- Click **"Submit Defense"** when satisfied with your argument
- Your defense automatically creates a new Reddit post for community voting
- Success message confirms submission
- Return to Daily Docket to defend more cases

### Playing as a Juror (Community Voter)

**Step 1: Find Jury Posts**
- Look for posts titled "⚖️ Better Call Snoo: [Case Name]"
- Click the splash screen button to enter the courtroom

**Step 2: Review the Case**
- **Case Details**: Read the crime description and case information
- **Defense Argument**: Carefully read the attorney's defense in the blue highlighted section
- **Characters**: See "THE JURY" (you) and "THE ACCUSED" sections with character images

**Step 3: Cast Your Vote**
- Scroll to the bottom where voting buttons are fixed
- Choose between two options:
  - **⚖️ GUILTY**: You believe the defendant is guilty despite the defense
  - **🔨 NOT GUILTY**: The defense convinced you of innocence/reasonable doubt
- Hear authentic gavel sound effect when voting with animated gavel bounce
- Your vote is immediately recorded and cannot be changed

**Step 4: Watch Live Results**
- **Real-Time Updates**: Vote counts update every 5 seconds
- **Animated Scales of Justice**: Watch the scales tip based on community sentiment
- **Character Reactions**: Snoo characters change poses based on vote percentages:
  - Neutral (balanced votes)
  - Confident (slight lead)
  - Worried (falling behind)  
  - Celebrating (strong lead)
  - Defeated (losing badly)
- **Connection Status**: Green dot shows live connection for real-time updates

### Scoring System

**Attorney Points:**
- **Base Score**: (Not Guilty votes × 2) - (Guilty votes)
- **Win Bonus**: +500 points if majority votes "Not Guilty"
- **Example**: 15 Not Guilty, 10 Guilty = (15×2) - 10 + 500 = 520 points

**Juror Points:**
- **Accuracy Reward**: +10 points for each vote matching the final majority
- **Example**: If you vote "Not Guilty" and majority agrees, you earn 10 points

### Leaderboards & Competition

**Hall of Justice Access:**
- Click **"🏛️ Hall of Justice"** button from Daily Docket
- View separate leaderboards for attorneys and jurors

**Personal Performance:**
- **Attorney Stats**: Total score, cases defended, win rate, current rank
- **Juror Stats**: Total points, cases judged, accuracy percentage, current rank
- **Trophy Recognition**: 🥇🥈🥉 for top 3 performers

**Refresh Rankings:**
- Click **"🔄 Refresh Rankings"** to update leaderboards
- Rankings update automatically as cases close

### Tips for Success

**Attorney Tips:**
- **Be Creative**: Humorous and unexpected defenses often perform better
- **Use All 250 Characters**: Longer defenses tend to be more persuasive
- **Consider the Audience**: Reddit users appreciate wit and clever reasoning
- **Defend Multiple Cases**: More submissions = more opportunities to score

**Juror Tips:**
- **Read Carefully**: Consider both the crime and the defense argument
- **Think Like Reddit**: What would the community find convincing?
- **Vote Thoughtfully**: Your accuracy affects your juror ranking
- **Participate Regularly**: More votes = more opportunities to score points

### Game Features

**Mobile Optimized:**
- Touch-friendly interface designed for mobile Reddit users
- No horizontal scrolling required
- Large, easy-to-tap buttons

**Accessibility:**
- Screen reader support with ARIA labels
- Keyboard navigation support
- High contrast text and visual elements

**Audio Experience:**
- Authentic courtroom gavel sound effects
- Web Audio API with graceful fallback
- Sounds enhance the legal drama atmosphere

## Recent Enhancements (Latest Update)

**🎨 Enhanced Visual Experience & Asset Management:**
- **Fixed Asset Paths**: Corrected background image paths to use proper `assets/` directory structure for reliable asset loading
- **Immersive Court Background**: Professional courtroom background imagery (`assets/court/court-background.png`) creates authentic legal atmosphere in both Daily Docket and Jury Voting screens
- **Enhanced Daily Docket Design**: Immersive courtroom background with enhanced lawyer character positioning, professional case file presentation with 3D perspective effects, and improved visual hierarchy
- **Improved Layout Design**: Redesigned from compact two-column to spacious scrollable single-column layout optimized for mobile devices
- **Enhanced Defense Display**: Defense arguments now prominently featured in dedicated section with blue accent styling and improved readability
- **Character Sections**: Separate dedicated sections for "THE JURY" (you) and "THE ACCUSED" with character images and descriptions
- **Fixed Bottom Voting**: Voting buttons now fixed at bottom of screen for easy access while scrolling through case details
- **Better Visual Hierarchy**: Improved spacing, typography, and visual organization for enhanced readability across all screens
- **Enhanced Accessibility**: Better contrast with semi-transparent overlays and improved mobile touch targets

## Current Game Features

**🎮 Fully Implemented & Production-Ready:**

**Core Gameplay:**
- **📋 Daily Docket System**: Interactive carousel with 5 daily cases from 50+ absurd legal scenarios, featuring professional case file styling with prisoner mugshots, difficulty badges, and live date/time display
- **✍️ Defense Creation**: 250-character writing interface with real-time validation, character counting, and automatic Reddit post creation for community voting
- **⚖️ Immersive Jury Voting**: Enhanced courtroom experience with immersive court background imagery, scrollable single-column layout optimized for mobile, live voting results with fixed bottom voting buttons, and professional styling
- **🔄 Real-Time Updates**: Live vote polling every 5 seconds with dramatically animated Scales of Justice, character reactions, and connection status indicators
- **🏆 Dual Scoring System**: Sophisticated algorithms for both attorney and juror performance with win bonuses and accuracy rewards
- **👑 Competitive Leaderboards**: Hall of Justice rankings with personal performance dashboards, user avatars, and trophy recognition (🥇🥈🥉)

**Technical Excellence:**
- **React.js 19.1.0 + TypeScript 5.8.2**: Modern, type-safe frontend architecture
- **Mobile-First Design**: Optimized for Reddit's predominantly mobile user base with touch-friendly controls
- **Web Audio API**: Authentic courtroom gavel sound effects with graceful fallback handling
- **Accessibility Compliant**: Screen reader support, keyboard navigation, ARIA labels, and semantic HTML
- **Zero Dependencies**: Runs entirely within Reddit posts using Devvit platform

## What Makes This Game Innovative?

**🚀 Revolutionary Game Design:**

1. **Self-Sustaining Content Ecosystem**: Each defense submission automatically generates a new Reddit post for community voting, creating an infinite content loop where players become both creators and consumers. This revolutionary approach turns the entire community into active content generators, ensuring fresh material and sustained engagement without requiring constant developer intervention.

2. **Seamless Reddit Integration**: Runs entirely within Reddit posts using Devvit's web platform with zero external dependencies. The game creates a native Reddit experience with automatic user authentication, post creation, and community integration that requires no additional accounts or downloads.

3. **Intelligent Post Type Detection**: The game automatically detects whether users are accessing the main Daily Docket post or a specific jury voting post, seamlessly routing them to the appropriate interface without confusion.

4. **Revolutionary Dual-Role Gameplay**: Players simultaneously participate as attorneys (creating defenses) and jurors (voting on others' defenses), creating multiple engagement pathways that accommodate different skill sets and participation preferences.

**🎭 Immersive Courtroom Experience:**

5. **Dynamic Character System**: Reddit Snoo characters (Victim Snoo and Lawyer Snoo) change poses based on real-time vote percentages with five distinct emotional states: neutral, confident, worried, celebrating, and defeated. Characters react instantly to vote changes with smooth CSS animations.

6. **Authentic Ace Attorney Recreation**: Complete visual and audio recreation of the beloved courtroom game series, featuring custom Reddit Snoo character sprites, authentic gavel sound effects using Web Audio API, professional courtroom backgrounds, and engaging typography that makes the legal drama fun and accessible.

7. **Real-Time Social Voting with Immersive Feedback**: Live vote updates every 5 seconds with dramatically animated Scales of Justice that tip based on community sentiment. The sophisticated visual feedback system includes connection status indicators, update timestamps, and smooth animations.

**🎮 Current Implemented Features:**
- **📋 Enhanced Daily Docket System**: Interactive case carousel with 5 daily cases from 50+ scenarios including "Quantum Cat Burglary", "Interdimensional Traffic Violations", and "WiFi Password Piracy", featuring immersive courtroom background imagery (`assets/court/court-background.png`), professional case file presentation with 3D perspective effects, unique prisoner mugshots (1-6.png), difficulty color-coded badges, and live date/time display updating every second
- **✍️ Professional Defense Submission**: 250-character defense writing interface with real-time character counting, color-coded validation feedback (green→yellow→red), comprehensive form validation, success confirmation messages, and automatic Reddit post creation with custom splash screens
- **⚖️ Enhanced Courtroom Experience**: Vote GUILTY or NOT GUILTY in an immersive courtroom interface with court background imagery (`assets/court/court-background.png`), scrollable single-column layout featuring defense argument prominently displayed, character sections for jury and accused, live voting results with animated Scales of Justice, connection status indicators, fixed bottom voting buttons, and instant vote recording with Redis transactions
- **🎭 Dynamic Character System**: Reddit Snoo characters positioned in authentic courtroom layout, changing poses instantly based on real-time vote percentages: neutral (balanced), confident (slight lead), worried (falling behind), celebrating (60%+ lead), and defeated (60%+ losing)
- **📊 Live Scales of Justice**: Dramatically animated balance scales that tip based on vote percentages with smooth CSS transitions, precise percentage displays, and instant response to community sentiment changes
- **🔄 Real-Time Updates & Connection Management**: Live vote polling every 5 seconds with comprehensive connection status indicators (🟢 connected, 🟡 connecting, 🔴 error), vote update notifications with "+X New Votes!" bounce animations, and timestamp tracking for transparency
- **🏆 Comprehensive Scoring & Leaderboards**: Sophisticated dual-track scoring system with attorney algorithm ((Not Guilty × 2) - Guilty + 500 win bonus) and juror accuracy rewards (+10 for majority match), Hall of Justice leaderboards with personal performance dashboards, user avatars, trophy recognition, and detailed statistics

**🎯 What Makes This Game Unique:**

Better Call Snoo revolutionizes social gaming by transforming Reddit into an interactive courtroom where creativity meets community judgment. Unlike traditional games, every player action creates new content for others to engage with - each defense submission automatically becomes a new Reddit post, creating an infinite loop of user-generated entertainment that sustains itself through community participation.

**🚀 Revolutionary Features:**
- **Self-Sustaining Content Loop**: Every defense creates a new Reddit post for voting, generating infinite community-driven content
- **Intelligent Post Detection**: Game automatically detects whether users are accessing the main Daily Docket or specific jury voting posts, seamlessly routing them to the appropriate interface
- **Dual-Role Gameplay**: Players simultaneously act as attorneys (creating defenses) and jurors (voting on others), accommodating different play styles and skill sets
- **Real-Time Social Drama**: Watch community sentiment shift in real-time through animated character reactions, live vote updates, and dramatically tipping Scales of Justice
- **Reddit-Native Experience**: Runs entirely within Reddit posts with zero external dependencies, downloads, or separate accounts required
- **Mobile-First Design**: Optimized for Reddit's predominantly mobile user base with touch-friendly controls, responsive layouts, and zero horizontal scrolling

The game seamlessly blends legal humor with Reddit culture, featuring absurd cases like "Interdimensional Traffic Violations", "Quantum Cat Burglary", and "Emotional Support Peacock Boarding Violations" that players defend with wit and creativity. Real-time character animations show Reddit's beloved Snoo mascots (Victim Snoo and Lawyer Snoo) reacting to vote changes with five distinct emotional states, while authentic courtroom gavel sound effects and Ace Attorney-inspired visuals create an immersive experience that feels like playing a premium legal drama game directly within Reddit's interface.

**🎯 Core Game Features:**
- **📋 Daily Docket System**: Browse through a carousel of 5 randomly selected funny legal cases each day from a library of 50+ absurd scenarios, refreshed every 24 hours with date-based deterministic selection, immersive courtroom background imagery (`assets/court/court-background.png`), professional case file presentation with unique prisoner mugshots, and live date/time display that updates every second
- **✍️ Creative Defense Submission**: Write compelling 250-character defense arguments with real-time character counting, color-coded validation feedback (green→yellow→red), comprehensive form validation, and automatic Reddit post creation for community voting
- **⚖️ Enhanced Jury Voting**: Vote GUILTY or NOT GUILTY on defense submissions through an immersive courtroom interface with court background imagery (`assets/court/court-background.png`), scrollable single-column layout, defense argument prominently featured, character sections for jury and accused, live vote visualization with animated Scales of Justice, fixed bottom voting buttons, and real-time connection status indicators
- **🎭 Dynamic Character System**: Reddit Snoo characters (Victim Snoo and Lawyer Snoo) positioned in authentic courtroom layout, changing poses based on real-time vote percentages with five distinct emotional states: neutral, confident, worried, celebrating, and defeated
- **📊 Live Scales of Justice**: Watch the animated balance scales tip dramatically in real-time as votes are cast, with smooth percentage displays, enhanced visual feedback, and instant response to community sentiment changes
- **🔄 Real-Time Updates**: Live vote polling every 5 seconds with comprehensive connection status indicators (🟢 connected, 🟡 connecting, 🔴 error), update timestamps, vote update notifications, and seamless data synchronization across all users
- **📱 Mobile-First Design**: Fully responsive interface optimized for Reddit's mobile user base with touch-friendly controls, zero horizontal scrolling, comprehensive accessibility compliance, and smooth animations
- **🏆 Comprehensive Scoring System**: Dual-track point system rewarding both attorneys (defense creators) and jurors (community voters) with sophisticated algorithms, win bonuses, accuracy rewards, and detailed performance tracking
- **👑 Hall of Justice Leaderboards**: Real-time competitive rankings tracking top-performing attorneys and jurors with detailed statistics, personal performance metrics, trophy recognition (🥇🥈🥉), and manual refresh capabilities

The game features a meticulously crafted Ace Attorney-inspired aesthetic with Reddit's beloved Snoo characters serving as courtroom participants, complete with dynamic pose animations, authentic courtroom sound effects, playful Comic Sans typography for a fun and approachable legal experience, and immersive visual elements that transform Reddit into a virtual courthouse experience.

## Current Game Mechanics & Features

**🎮 Complete Gameplay Loop:**
1. **Enhanced Loading Experience**: Custom loading screen with "New-Loading-Screen.png" background and "Loading Better Call Snoo..." message
2. **Intelligent Routing**: Automatic post type detection routing to Daily Docket (main game) or Jury Voting (defense posts) via `useGame` hook
3. **Daily Docket Interface**: Browse 5 cases with courtroom background (`/court/court-background.png`), real-time date/time, prisoner mugshots, difficulty badges
4. **Defense Creation**: 250-character limit with real-time validation via `DefenseForm` component with character counting and color-coded feedback
5. **Automatic Post Generation**: Defense submissions create new Reddit posts via `createDefensePost()` with custom splash screens
6. **Jury Voting**: Immersive courtroom with `JuryVoting` component, fixed voting buttons, live results, and gavel sound effects
7. **Real-Time Updates**: Live polling every 2 seconds via `useRealTimeUpdates` hook with connection status and vote notifications
8. **Live Scoring**: Immediate score processing via `processLiveScoring()` with dual-track attorney/juror algorithms
9. **Leaderboard System**: Hall of Justice rankings via `Leaderboard` component with personal stats and trophy recognition

**🎭 Enhanced Courtroom Experience:**
- **The Jury & The Accused**: Two main character sections representing the jury (you) and the defendant
- **Dynamic Prisoner Mugshots**: Unique prisoner images (1-6.png) selected deterministically based on case ID
- **Jury Character**: Professional jury representation with `/lawyers/jury.png` image
- **Immersive Layout**: Scrollable single-column design optimized for mobile with courtroom background
- **Fixed Voting Interface**: Bottom-fixed voting buttons for easy access while reviewing case details
- **Real-Time Visual Feedback**: Instant updates to vote counts, scales animation, and connection status

**🔊 Immersive Audio Experience:**
- **Authentic Gavel Sound Effects**: Professional courtroom gavel sound plays when casting votes via `playGavelSound()` function
- **Web Audio API Integration**: Advanced audio implementation using Web Audio API with graceful fallback handling
- **Smart Audio Initialization**: Audio system initializes after user interaction through `audioManager.initialize()`
- **Visual Feedback**: Gavel animation with bounce effects when voting buttons are clicked
- **Audio Utils System**: Centralized audio management through `audioUtils.ts` with status tracking and error recovery

**📊 Real-Time Voting System:**
- **Live Updates**: Vote counts refresh every 2 seconds using `useRealTimeUpdates` hook without page reload
- **Connection Status Indicators**: Visual status displays (🟢 connected, 🟡 connecting, 🔴 error, ⚫ disconnected) with real-time connection health monitoring
- **Vote Update Notifications**: "+X New Votes!" indicators with animated bounce effects via `VoteUpdateIndicator` component
- **Atomic Transactions**: Redis-based vote storage with duplicate prevention ensuring one vote per user per case
- **Instant Visual Feedback**: Vote counters and Scales of Justice update immediately after voting with smooth animations
- **Audio Integration**: Authentic gavel sound effects using Web Audio API with graceful fallback handling

**🏆 Sophisticated Scoring System:**
- **Live Scoring**: Immediate score processing after each vote using `processLiveScoring()` function
- **Attorney Scoring Algorithm**: (Not Guilty votes × 2) - (Guilty votes) + 500 bonus for majority "Not Guilty" verdict
- **Juror Accuracy Rewards**: +10 points for each vote matching the final majority verdict
- **Real-Time Processing**: Scores update immediately after voting with live leaderboard updates
- **Performance Tracking**: Detailed statistics including win rates, accuracy percentages, cases defended/judged
- **Avatar Integration**: User avatars with Reddit-style avatar generation and fallback handling via `Avatar` component



## Technology Stack & Current Implementation

**Frontend Technologies:**
- **React.js 19.1.0**: Modern hooks-based frontend with StrictMode, functional components, and custom hooks
- **TypeScript 5.8.2**: Strict type checking with shared types between client/server (`src/shared/types/`)
- **Vite 6.2.4**: Lightning-fast build tool with hot module replacement and optimized bundling
- **Tailwind CSS 4.1.6**: Utility-first CSS with custom animations, mobile-first design, and Comic Sans typography
- **Web Audio API**: Advanced audio system via `audioUtils.ts` for authentic courtroom gavel sound effects

**Backend & Platform:**
- **Devvit 0.12.1**: Reddit's developer platform with serverless runtime and Reddit API access
- **Express 5.1.0**: Server-side HTTP framework with `/api/` endpoints for game logic
- **Redis**: Data persistence via `@devvit/web/server` for votes, scores, and user data with atomic transactions
- **Node.js**: Serverless runtime with full globals support (except fs, http, https, net)

**Key Custom Hooks & Components:**
- **`useGame`**: Central game state management with intelligent post type detection
- **`useJuryVoting`**: Real-time voting with live updates and connection status management
- **`useRealTimeUpdates`**: Generic polling hook for live data updates every 2 seconds
- **`useLeaderboard`**: Leaderboard data fetching with personal performance tracking
- **`JuryVoting`**: Immersive courtroom interface with live voting and character sections
- **`DailyDocket`**: Interactive case carousel with courtroom background and real-time date/time
- **`VoteUpdateIndicator`**: Live vote notification system with bounce animations
- **`ScalesOfJustice`**: Animated balance scales that tip based on vote percentages

**Asset Management:**
- **Courtroom Backgrounds**: `/court/court-background.png` for immersive atmosphere
- **Character Images**: Prisoner mugshots (`/prisoners/1-6.png`), jury (`/lawyers/jury.png`)
- **Loading Assets**: Custom loading screen (`/New-Loading-Screen.png`)
- **Audio Assets**: Gavel sound effects with Web Audio API integration and fallback handling

## Current Game Architecture & Implementation

**🏗️ Application Structure:**

**Main App Component (`App.tsx`):**
- Central game state management via `useGame` hook with intelligent post type detection
- Seamless routing between game states: `daily_docket`, `defense_submission`, `jury_voting`, `leaderboard`
- Enhanced loading screen with `/New-Loading-Screen.png` background and professional styling
- Comprehensive error handling with user-friendly messages and retry mechanisms

**Core Game Components:**

**`DailyDocket` Component:**
- Interactive case carousel with courtroom background (`/court/court-background.png`)
- Real-time date/time display updating every second via `setInterval`
- Professional case file presentation with 3D perspective effects and hover animations
- Difficulty color-coded badges: 🟢 Easy, 🟡 Medium, 🔴 Hard
- Unique prisoner mugshots selected deterministically: `/prisoners/${(index % 6) + 1}.png`
- Enhanced lawyer character positioning with `/lawyers/arms-crossed.png`
- Navigation arrows for case browsing with current case index display

**`DefenseForm` Component:**
- 250-character defense writing interface with real-time character counting
- Color-coded validation feedback: green → yellow → red based on character usage
- Form validation preventing empty submissions with comprehensive error handling
- Success confirmation messages with automatic navigation back to Daily Docket
- Professional styling with case details display and objection lawyer image

**`JuryVoting` Component:**
- Immersive courtroom experience with scrollable single-column layout
- Court background imagery for authentic legal atmosphere
- Defense argument prominently featured in blue-highlighted section
- Character sections: "THE JURY" (you) and "THE ACCUSED" with respective images
- Live voting results with animated `ScalesOfJustice` component
- Fixed bottom voting buttons with gavel sound effects and bounce animations
- Real-time connection status indicators and vote update notifications
- Vote counting display with separate guilty/not guilty sections

**Supporting Components:**
- **`VoteUpdateIndicator`**: Live vote notifications with "+X New Votes!" bounce animations
- **`ScalesOfJustice`**: Animated balance scales that tip based on vote percentages
- **`Leaderboard`**: Hall of Justice rankings with personal performance dashboards
- **`Avatar`**: Reddit-style user avatars with deterministic generation and fallback handlingrm`**: 250-character defense writing interface with real-time validation, character counting, and automatic Reddit post creation
- **`JuryVoting`**: Immersive courtroom voting experience with character animations, gavel sound effects, and live vote visualization
- **`Leaderboard`**: Hall of Justice rankings with personal performance dashboards, user avatars, and comprehensive scoring information
- **`ScalesOfJustice`**: Animated balance scales that tip based on vote percentages with smooth CSS transitions
- **`VoteUpdateIndicator`**: Real-time vote update notifications with bounce animations

**Specialized Components:**
- **`CharacterSprites`**: Dynamic Reddit Snoo character system with 5 emotional poses (neutral, confident, worried, celebrating, defeated)
- **`VotingButtons`**: Professional GUILTY/NOT GUILTY voting interface with loading states and audio feedback
- **`Avatar`**: Smart user avatar component with Reddit avatar URL generation, deterministic fallbacks, multiple sizes (small/medium/large), and error handling with local Snoo image fallback

**Custom Hooks System:**
- **`useGame`**: Central game state management, post type detection, and navigation logic
- **`useJuryVoting`**: Jury voting functionality with real-time updates and vote submission
- **`useLeaderboard`**: Leaderboard data fetching, user avatars, and performance statistics
- **`useDefenseSubmission`**: Defense argument submission with validation and Reddit post creation
- **`useRealTimeUpdates`**: Live polling system for vote updates and connection status monitoring
- **`useVoting`**: Vote submission logic with duplicate prevention and error handling

**Utility Systems:**
- **`audioUtils.ts`**: Centralized audio management with Web Audio API integration, initialization tracking, and error recovery
- **`Avatar.tsx`**: Smart avatar system with Reddit avatar URL patterns, deterministic hash-based selection, graceful fallbacks, and comprehensive error handling

## Sample Legal Cases

The game features over 50 hilarious legal scenarios across multiple categories and difficulty levels:

**Easy Cases (Clear-cut scenarios):**
- "The Great Cookie Caper" - Theft of cookies from the office break room
- "Parking Lot Pandemonium" - Taking up two parking spaces with a compact car
- "WiFi Password Piracy" - Using neighbor's WiFi without permission for 6 months
- "The Phantom Lunch Thief" - Stealing labeled lunches from office refrigerator
- "Elevator Button Assault" - Pressing all elevator buttons before exiting on floor 2

**medium Cases (Moral ambiguity):**
- "The Robin Hood of Laundromats" - Adding extra time to other people's washing machines
- "Emotional Support Peacock" - Attempting to board airplane with emotional support peacock
- "The Quantum Cat Burglar" - Accused of stealing Schrödinger's cat while it was both alive and dead

**Hard Cases (Complex legal scenarios):**
- "Interdimensional Traffic Violation" - Speeding through parallel universe without proper permits
- "Time Travel Parking Ticket" - Receiving parking ticket before arriving at location
- "AI Rights Violation" - Discriminating against artificial intelligence in hiring process

Each case includes detailed crime descriptions, difficulty ratings, and thematic categories ranging from simple theft to quantum physics violations!

## Current Game Implementation Status

**🎯 FULLY IMPLEMENTED AND PRODUCTION-READY:**

**🎮 Complete Game Application:**
1. **React.js 19.1.0 Application**: Fully functional TypeScript app running in StrictMode with comprehensive error boundaries, intelligent state management, and seamless navigation between all game screens
2. **Four Main Game Screens - All Fully Functional**: 
   - **📋 Daily Docket**: Enhanced interactive case carousel with 5 daily cases, immersive courtroom background, real-time date/time display, professional case file styling with 3D effects, prisoner mugshots, difficulty badges, and enhanced lawyer character positioning
   - **✍️ Defense Form**: Complete 250-character defense writing interface with real-time validation, character counting, color-coded feedback, success confirmation, and automatic Reddit post creation
   - **⚖️ Jury Voting**: Fully immersive courtroom experience with court background imagery, enhanced scrollable layout, dynamic Snoo character animations, authentic gavel sound effects, professional styling, live vote visualization, fixed bottom voting buttons, and instant feedback
   - **🏆 Leaderboard**: Enhanced Hall of Justice with competitive rankings, personal performance dashboards, user avatars, trophy recognition, and detailed statistics
3. **🔄 Real-Time Features - All Working**: Live vote updates every 5 seconds, comprehensive connection status indicators, character pose changes, vote update notifications, and seamless data synchronization
4. **🔊 Complete Audio System**: Web Audio API integration with professional courtroom gavel sound effects, graceful fallback handling, and smart initialization
5. **📱 Mobile-First Design**: Fully responsive with touch-friendly controls, zero horizontal scrolling, comprehensive accessibility compliance, and Comic Sans typography for fun and accessibility
6. **🔗 Full Reddit Integration**: Automatic post creation, user authentication, community features, intelligent post type detection, and seamless Devvit platform integration

**🔧 Production-Ready Technical Architecture:**
- **Frontend Stack**: React 19.1.0 + TypeScript 5.8.2 + Vite 6.2.4 + Tailwind CSS 4.1.6 + Web Audio API
- **Backend Stack**: Express 5.1.0 + Devvit 0.12.1 + Redis for data persistence + Node.js 22.2.0+
- **Custom Hooks System**: `useGame` (state management), `useJuryVoting` (voting logic), `useLeaderboard` (rankings), `useDefenseSubmission` (defense creation), `useRealTimeUpdates` (live polling)
- **Component Architecture**: Modular folder-based components with proper TypeScript interfaces and comprehensive error handling
- **State Management**: React hooks with intelligent routing, post type detection, and seamless navigation
- **Recent Enhancements**: Avatar component system, enhanced visual design, Comic Sans typography, improved accessibility, and comprehensive code quality improvements

## How to Play Better Call Snoo

### Step-by-Step Instructions

#### 1. **Access the Game**
- Find "Better Call Snoo" posts in participating subreddits
- Click the splash screen to enter the game - no downloads or accounts needed
- The game automatically detects if you're entering the main Daily Docket or a specific jury voting post

#### 2. **Play as Defense Attorney**
- **Browse Daily Cases**: View 5 randomly selected absurd legal cases from 50+ scenarios
- **Select a Case**: Choose from cases like "Quantum Cat Burglary" or "WiFi Password Piracy"  
- **Write Your Defense**: Craft a creative 250-character defense argument
- **Submit**: Your defense automatically creates a new Reddit post for community voting

#### 3. **Serve as Jury Member**
- **Enter the Courtroom**: Experience an immersive Ace Attorney-style courtroom with court background imagery
- **Review the Case**: Read the crime and the attorney's defense argument prominently displayed
- **View Characters**: See the jury (you) and the accused in dedicated character sections
- **Cast Your Vote**: Choose GUILTY or NOT GUILTY using fixed bottom voting buttons (with authentic gavel sound effects!)
- **Watch Live Results**: See live voting results with animated Scales of Justice and real-time vote counts

#### 4. **Compete and Climb Leaderboards**
- **Earn Attorney Points**: (Not Guilty votes × 2) - (Guilty votes) + 500 win bonus
- **Earn Juror Points**: +10 points for each vote matching the final majority verdict
- **Track Performance**: View detailed statistics in the Hall of Justice leaderboards
- **Compete**: Climb rankings as both attorney and juror with dual scoring system

### 🎯 Pro Tips for Success

**🏛️ Attorney Strategies:**
- **Be Creative**: Memorable and unique defenses win regardless of case difficulty
- **Use Reddit Humor**: Leverage memes and references that resonate with the community
- **Character Economy**: Make every character count in your 250-character limit
- **Study Winners**: Observe successful defenses to understand what works

**⚖️ Juror Excellence:**
- **Read Carefully**: Consider both the crime's absurdity and defense creativity
- **Vote Independently**: Don't follow the crowd - vote based on your conviction
- **Build Accuracy**: Consistent, thoughtful voting builds your juror score over time

## Sample Legal Cases

The game features over 50 hilarious legal scenarios across multiple categories and difficulty levels:

**Easy Cases (Clear-cut scenarios):**
- "The Great Cookie Caper" - Theft of cookies from the office break room
- "Parking Lot Pandemonium" - Taking up two parking spaces with a compact car
- "WiFi Password Piracy" - Using neighbor's WiFi without permission for 6 months
- "The Phantom Lunch Thief" - Stealing labeled lunches from office refrigerator
- "Elevator Button Assault" - Pressing all elevator buttons before exiting on floor 2

**medium Cases (Moral ambiguity):**
- "The Robin Hood of Laundromats" - Adding extra time to other people's washing machines
- "Emotional Support Peacock" - Attempting to board airplane with emotional support peacock
- "The Quantum Cat Burglar" - Accused of stealing Schrödinger's cat while it was both alive and dead

**Hard Cases (Complex legal scenarios):**
- "Interdimensional Traffic Violation" - Speeding through parallel universe without proper permits
- "Time Travel Parking Ticket" - Receiving parking ticket before arriving at location
- "AI Rights Violation" - Discriminating against artificial intelligence in hiring process

Each case includes detailed crime descriptions, difficulty ratings, and thematic categories ranging from simple theft to quantum physics violations!

## Technology Stack

**Frontend Technologies:**
- **React.js 19.1.0**: Modern hooks-based frontend with TypeScript
- **TypeScript 5.8.2**: Strict type checking for code safety
- **Vite 6.2.4**: Lightning-fast build tool with hot module replacement
- **Tailwind CSS 4.1.6**: Utility-first CSS framework with responsive design
- **Web Audio API**: Authentic courtroom gavel sound effects

**Backend & Platform:**
- **Devvit 0.12.1**: Reddit's developer platform with serverless runtime
- **Express 5.1.0**: Server-side HTTP framework for API endpoints
- **Redis**: Data persistence for votes, scores, and game state
- **Node.js 22.2.0+**: Serverless runtime environment

**Key Components:**
- **App.tsx**: Central game state management with intelligent routing
- **DailyDocket**: Interactive case carousel with courtroom atmosphere
- **DefenseForm**: 250-character defense writing interface with validation
- **JuryVoting**: Immersive courtroom voting with character animations
- **Leaderboard**: Hall of Justice rankings with performance dashboards
- **ScalesOfJustice**: Animated balance scales that tip with vote percentages

## Development & Deployment

**Development Commands:**
```bash
# Start development server (runs client, server, and devvit in parallel)
npm run dev

# Build for production
npm run build

# Deploy to Reddit
npm run deploy

# Publish for review
npm run launch

# Code quality checks
npm run check
```

**Project Structure:**
```
src/
├── client/          # React.js frontend application
│   ├── components/  # Game components (DailyDocket, JuryVoting, etc.)
│   ├── hooks/       # Custom React hooks for game logic
│   └── utils/       # Utility functions (audio, etc.)
├── server/          # Express.js backend with API endpoints
│   └── core/        # Business logic modules
└── shared/          # Shared types and interfaces
```

**Key Features:**
- **Mobile-First Design**: Optimized for Reddit's predominantly mobile user base
- **Real-Time Updates**: Live vote polling every 5 seconds with connection status indicators
- **Accessibility**: Comprehensive screen reader support, keyboard navigation, and ARIA labels
- **Audio Integration**: Web Audio API with graceful fallback handling
- **Reddit Integration**: Automatic post creation, user authentication, and community features*Enhanced Visual Design**: Clean white background with professional styling, rounded corners, and elegant typography for improved readability
  - **Personal Performance Dashboard**: Your complete statistics displayed prominently with both attorney and juror metrics in side-by-side cards, featuring user avatar fetched from Reddit API and detailed performance breakdown
  - **Top Attorneys Section**: Blue gradient header with attorney character icon (`lawyers/smirk-jurybox.png`), ranked by total defense scores with trophy icons (🥇🥈🥉) for top 3 performers and enhanced entry styling with hover effects
  - **Top Jurors Section**: Blue gradient header with jury character icon (`lawyers/jury.png`), ranked by accuracy points with color-coded performance badges and smooth animations
  - **Enhanced Entry Design**: Each leaderboard entry features user avatars fetched via `/api/user-avatars` endpoint, improved visual hierarchy, hover effects with scale animations, and comprehensive accessibility features
  - **Interactive Features**: 
    - **← Back to Docket**: Return to case selection with enhanced button styling and focus states
    - **🔄 Refresh Rankings**: Manual update for latest competitive standings with visual feedback and loading states
  - **Comprehensive Scoring Information**: Detailed explanation of how attorney and juror points are calculated with color-coded sections and mathematical formulas
  - **Empty State Handling**: Encouraging messages for new players to start participating with clear call-to-action text and helpful guidance

#### 6. **Advanced Features & Real-Time Experience**
- **Live Game Updates**:
  - **Real-Time Polling**: Vote counts and character poses update every 5 seconds automatically with seamless data synchronization via `useRealTimeUpdates` hook
  - **Connection Monitoring**: Visual status indicators (🟢 connected, 🟡 connecting, 🔴 error, ⚫ disconnected) with descriptive text and animated status dots
  - **Vote Update Notifications**: "+X New Votes!" indicators with animated bounce effects that appear when new votes are detected via `VoteUpdateIndicator` component
  - **Timestamp Tracking**: "Last updated: [time]" displays for complete transparency and debugging
- **Game Timing & Lifecycle**:
  - **24-Hour Voting Windows**: Each defense remains active for exactly one day from submission with automatic expiration
  - **Automatic Case Closure**: Final verdicts determined by majority vote when time expires with Redis-based state management
  - **Instant Score Processing**: Points calculated and leaderboards updated immediumiately when cases close via server-side algorithms
  - **Daily Case Refresh**: New cases available every day with deterministic selection based on date from 50+ case library
- **Technical Excellence**:
  - **React.js Architecture**: Modern hooks-based React application with TypeScript for type safety and maintainability
  - **Component-Based Design**: Modular components including `DailyDocket`, `DefenseForm`, `JuryVoting`, `Leaderboard`, `ScalesOfJustice`, and specialized character sprites
  - **Custom Hooks System**: Specialized hooks for game logic (`useGame`), voting (`useJuryVoting`), leaderboards (`useLeaderboard`), and real-time updates (`useRealTimeUpdates`)
  - **Mobile-First Design**: Optimized for Reddit's predominantly mobile user base with responsive breakpoints and touch-friendly controls
  - **Zero Horizontal Scrolling**: Perfect responsive layouts that adapt to any screen size without overflow using Tailwind CSS
  - **Accessibility Compliance**: Full screen reader support, keyboard navigation, ARIA labels, semantic HTML, skip links, and comprehensive accessibility features
  - **Performance Optimization**: Smooth CSS animations, efficient polling intervals, fast load times, optimized asset loading, and Vite build system
  - **Error Handling**: Comprehensive error states, retry mechanisms, graceful degradation for network issues, and user-friendly error messages

### 🎯 Pro Tips for Mastering Better Call Snoo

**🏛️ Attorney Success Strategies:**
- **Embrace Creativity**: The most memorable and unique defenses win, regardless of case difficulty
- **Master Reddit Culture**: Use memes, references, and humor that resonates with the community
- **Know Your Jury**: Craft arguments that would make Reddit users vote "Not Guilty"
- **Character Efficiency**: Make every character count in your 250-character limit - edit ruthlessly
- **Study Winners**: Observe successful defenses to understand what resonates with voters
- **Timing Strategy**: Submit early in the day for maximum voting exposure and engagement

**⚖️ Juror Excellence Tips:**
- **Read Carefully**: Consider both the crime's absurdity and the defense's creativity
- **Vote Independently**: Don't follow the crowd - vote based on your personal conviction
- **Build Accuracy**: Consistent, thoughtful voting builds your juror score over time
- **Engage Early**: Vote on fresh defenses for maximum community impact
- **Balance Factors**: Consider both legal reasoning and entertainment value in your decisions

**🏆 Competitive Mastery:**
- **Dual Participation**: Engage as both attorney and juror for maximum point potential
- **Case Selection**: All difficulties offer equal scoring - choose based on your creative strengths
- **Community Awareness**: Monitor peak activity times for optimal engagement
- **Long-term Building**: Develop reputation through consistent quality and accuracy
- **Strategic Patience**: Focus on building win rate and accuracy over quick points

## Development Setup

> Make sure you have Node 22 downloaded on your machine before running!

1. Run `npm create devvit@latest --template=react`
2. Go through the installation wizard. You will need to create a Reddit account and connect it to Reddit developers
3. Copy the command on the success page into your terminal

**Development Commands:**
```bash
# Start development server (runs client, server, and devvit in parallel)
npm run dev

# Build for production
npm run build

# Deploy to Reddit
npm run deploy

# Publish for review
npm run launch

# Code quality checks
npm run check
```

## Game Architecture

**Client (`src/client/`):**
- React.js application with intelligent routing between game screens
- Custom hooks for game state, voting, leaderboards, and real-time updates
- Component-based architecture with mobile-first responsive design

**Server (`src/server/`):**
- Express.js API with Reddit integration and Redis data persistence
- Automatic post creation for jury voting and scoring algorithms
- 50+ predefined legal cases with daily rotation system

**Key Features:**
- Real-time vote updates every 5 seconds with connection status indicators
- Dynamic Reddit Snoo character animations based on vote percentages
- Authentic courtroom gavel sound effects using Web Audio API
- Comprehensive accessibility support and mobile optimization

---

**Better Call Snoo** - Where Reddit becomes your courtroom and creativity meets justice! 🏛️⚖️
