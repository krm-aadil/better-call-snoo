# Better Call Snoo

**Better Call Snoo** is an Ace Attorney-inspired legal defense game built for Reddit using the Devvit platform. This interactive web application transforms Reddit into a virtual courtroom where players defend quirky cases with creative arguments while the community acts as jury, creating an engaging social experience with competitive elements.

## What is Better Call Snoo?

Better Call Snoo is a daily legal defense game that brings the excitement of courtroom drama to Reddit. Players take on the role of defense attorneys, crafting creative arguments for absurd legal cases, while the community serves as the jury deciding the fate of each defense.

**Core Game Features:**
- **Daily Docket System**: Browse 5 randomly selected funny legal cases each day from a library of 50+ absurd scenarios, refreshed every 24 hours with date-based deterministic selection
- **Creative Defense Submission**: Write compelling 250-character defense arguments with real-time character counting and validation
- **Community Jury Voting**: Vote GUILTY or NOT GUILTY on defense submissions with immersive courtroom interface featuring authentic gavel sound effects
- **Live Vote Visualization**: Watch the animated Scales of Justice tip dramatically in real-time as votes are cast, with enhanced visual feedback
- **Dynamic Character System**: Snoo characters change poses based on vote percentages (neutral, confident, worried, celebrating, defeated) with smooth animations
- **Real-Time Updates**: Live vote polling every 5 seconds with connection status indicators and update timestamps
- **Mobile-First Design**: Fully responsive interface optimized for Reddit's mobile user base with touch-friendly controls
- **Dual Scoring System**: Earn points as both attorneys (defense creators) and jurors (community voters) with detailed scoring algorithms
- **Competitive Leaderboards**: Track top-performing attorneys and jurors across the community

The game features a rich Ace Attorney-inspired aesthetic with Reddit's beloved Snoo characters serving as the defendant (Victim Snoo) and defense attorney (Lawyer Snoo), complete with dynamic poses, courtroom sound effects, and authentic visual styling including custom fonts and animations.

## What Makes This Game Innovative?

1. **Reddit-Native Gaming Experience**: Runs entirely within Reddit posts using Devvit's web platform - no external websites, downloads, or separate accounts required

2. **Community-Driven Content Creation**: Each defense submission automatically creates a new Reddit post, turning the entire community into active participants in the game ecosystem

3. **Daily Fresh Content with Algorithmic Variety**: Features 50+ pre-written absurd legal cases (from "The Great Cookie Caper" to "Quantum Entanglement Harassment") with 5 new cases selected daily using date-based randomization

4. **Dual-Role Gameplay**: Players can simultaneously be attorneys (creating defenses) and jurors (voting on others' defenses), creating multiple engagement pathways

5. **Real-Time Social Voting**: Live vote updates with animated visual feedback through the Scales of Justice, creating immediate community engagement

6. **Mobile-First Design**: Fully responsive interface optimized for Reddit's predominantly mobile user base, with touch-friendly controls and no horizontal scrolling

7. **Gamified Social Interaction**: Transforms Reddit's commenting and voting mechanics into structured gameplay with scoring, leaderboards, and competitive elements

8. **Accessibility-First Approach**: Includes audio feedback (gavel sounds), high contrast support, reduced motion options, and semantic HTML structure

## Technology Stack

- **Devvit**: Reddit's developer platform for building apps
- **React.JS**: Frontend engine for client rendering
- **TypeScript**: Primary language with strict type checking
- **Vite**: Build tool for both client and server bundles
- **Express**: Server-side HTTP framework
- **Redis**: Data persistence layer (via Devvit)
- **Tailwind CSS**: Utility-first CSS framework for styling

## Sample Legal Cases

The game features over 50 hilarious legal scenarios across multiple categories and difficulty levels:

**Easy Cases (Clear-cut scenarios):**
- "The Great Cookie Caper" - Theft of cookies from the office break room
- "Parking Lot Pandemonium" - Taking up two parking spaces with a compact car
- "WiFi Password Piracy" - Using neighbor's WiFi without permission for 6 months
- "The Phantom Lunch Thief" - Stealing labeled lunches from office refrigerator
- "Elevator Button Assault" - Pressing all elevator buttons before exiting on floor 2

**Medium Cases (Moral ambiguity):**
- "The Robin Hood of Laundromats" - Adding extra time to other people's washing machines
- "Emotional Support Peacock" - Attempting to board airplane with emotional support peacock
- "The Quantum Cat Burglar" - Accused of stealing Schrödinger's cat while it was both alive and dead

**Hard Cases (Complex legal scenarios):**
- "Interdimensional Traffic Violation" - Speeding through parallel universe without proper permits
- "Time Travel Parking Ticket" - Receiving parking ticket before arriving at location
- "AI Rights Violation" - Discriminating against artificial intelligence in hiring process

Each case includes detailed crime descriptions, difficulty ratings, and thematic categories ranging from simple theft to quantum physics violations!

## How to Play

### Step-by-Step Gameplay Guide

#### 1. **Access the Game**
- Look for "Better Call Snoo" posts in participating subreddits
- Click the "Play" button on the splash screen to enter the full-screen courtroom experience
- The game loads directly in your browser - no downloads or separate accounts needed

#### 2. **Browse the Daily Docket**
- **View Today's Cases**: See 5 randomly selected legal cases, refreshed daily at midnight
- **Case Information**: Each case displays:
  - Quirky case title (e.g., "The Case of the Quantum Cat Burglar")
  - Specific crime description (e.g., "Accused of stealing Schrödinger's cat while it was both alive and dead")
  - Difficulty level (Easy/Medium/Hard) with color-coded badges
  - Category tags (Theft, Fraud, Physics Violation, etc.)
  - Unique case file numbers and thematic icons
- **Case Selection**: Click "⚖️ DEFEND" on any case that interests you
- **Mobile Optimization**: Scroll through cases without horizontal scrolling, optimized for touch interaction

#### 3. **Submit Your Defense**
- **Defense Writing Interface**: 
  - Single text input field with 250-character limit
  - Real-time character counter with color-coded feedback (green → yellow → red as you approach the limit)
  - Case details displayed above for reference
- **Character Limit Strategy**: The 250-character limit encourages:
  - Witty, concise arguments
  - Creative legal reasoning
  - Memorable one-liners that stick with voters
- **Submission Process**: 
  - Click "Submit Defense" to create a new Reddit post automatically
  - Your defense becomes a separate post for community voting
  - Success confirmation with automatic redirect back to Daily Docket

#### 4. **Participate in Jury Voting**
- **Courtroom Interface**: 
  - Two-panel layout matching Ace Attorney games exactly
  - Victim Snoo (defendant) and Lawyer Snoo (attorney) character sprites
  - Dynamic character poses that change based on vote percentages:
    - **Neutral**: Equal or no votes
    - **Confident**: Leading in votes
    - **Worried**: Losing in votes  
    - **Celebrating**: Winning by large margin (60%+)
    - **Defeated**: Losing by large margin (60%+)
- **Voting Process**:
  - Read the case details and defense argument in styled text boxes
  - Click either "GUILTY" or "NOT GUILTY" button
  - Hear authentic gavel sound effect upon voting
  - Cannot change vote once submitted
- **Live Results**: Watch the Scales of Justice animate and tip based on real-time vote percentages

#### 5. **Track Your Performance**
- **Dual Scoring System**:
  
  **As an Attorney (Defense Creator):**
  - **Base Score**: (Not Guilty votes × 2) - (Guilty votes)
  - **Victory Bonus**: +500 points if your defense achieves majority "Not Guilty" verdict (>50%)
  - **Total Score**: Cumulative score across all your defense submissions
  
  **As a Juror (Community Voter):**
  - **Accuracy Points**: +10 points for each vote that matches the final majority verdict
  - **No Penalty**: 0 points (not negative) for minority votes
  - **Total Score**: Sum of all your accurate jury predictions

- **Leaderboards**: 
  - **Top Attorneys**: Ranked by total defense scores
  - **Top Jurors**: Ranked by total accuracy points
  - Real-time updates as votes are cast and cases conclude

#### 6. **Advanced Features**
- **Real-Time Updates**: Vote percentages update every 5 seconds without page refresh
- **24-Hour Voting Periods**: Each defense post remains active for voting for 24 hours
- **Mobile-First Design**: Full functionality on smartphones and tablets
- **Accessibility Features**: 
  - Screen reader support with ARIA labels
  - High contrast mode compatibility
  - Reduced motion options for users with vestibular disorders
  - Keyboard navigation support

### Pro Tips for Success

**For Aspiring Attorneys:**
- **Be Creative**: The most memorable defenses often win, regardless of case difficulty
- **Use Humor**: Reddit loves witty, clever arguments that make people laugh
- **Know Your Audience**: Consider what would make the Reddit community vote "Not Guilty"
- **Character Economy**: Make every character count in your 250-character limit
- **Study Winners**: Look at successful defenses to understand what resonates

**For Effective Jurors:**
- **Read Carefully**: Consider both the absurdity of the crime and creativity of the defense
- **Vote Your Conscience**: Don't just follow the crowd - vote based on how convincing you find the argument
- **Consistency Pays**: Accurate voting over time builds your juror score
- **Engage Early**: Vote on defenses when they're fresh for maximum community impact

**Strategic Considerations:**
- **Case Difficulty**: All cases offer the same scoring potential, so choose based on your creative strengths
- **Timing**: Submit defenses early in the day for maximum voting exposure
- **Community Engagement**: Participate in both roles (attorney and juror) for maximum point potential

## Development Setup

> Make sure you have Node 22 downloaded on your machine before running!

1. Run `npm create devvit@latest --template=react`
2. Go through the installation wizard. You will need to create a Reddit account and connect it to Reddit developers
3. Copy the command on the success page into your terminal

## Development Commands

- `npm run dev`: Starts a development server where you can develop your application live on Reddit
- `npm run build`: Builds your client and server projects
- `npm run deploy`: Uploads a new version of your app
- `npm run launch`: Publishes your app for review
- `npm run login`: Logs your CLI into Reddit
- `npm run check`: Type checks, lints, and prettifies your app

## Game Architecture

### Client (`src/client/`)
- **React App**: Multi-screen game interface with Daily Docket, Defense Form, and Jury Voting
- **Custom Hooks**: 
  - `useGame` manages overall game state and navigation
  - `useDefenseSubmission` handles defense argument submissions
  - `useVoting` manages jury voting functionality
- **Components**: Modular components for Daily Docket, Defense Form, and Jury Voting screens
- **Responsive Design**: Mobile-first approach with Tailwind CSS styling

### Server (`src/server/`)
- **Express API**: RESTful endpoints for game state management
- **Redis Integration**: Persistent storage for cases, defenses, votes, and scores
- **Reddit Integration**: User authentication and custom post creation for jury voting
- **Case Library**: Predefined library of 50+ funny legal cases with daily rotation

### Current Implementation Status

**✅ Completed Features:**
- **Daily Docket System**: 5 random cases daily with 50+ predefined funny legal scenarios including categories like "Theft," "Public Nuisance," "Fraud," "Quantum Crime," and "Physics Violation"
- **Defense Submission**: 250-character limit with real-time counter, color-coded feedback, and form validation
- **Custom Post Creation**: Automatic Reddit post generation for each defense submission with success/error handling
- **Jury Voting Interface**: Full courtroom layout with character sprites, voting buttons, and immersive Ace Attorney-style presentation
- **Dynamic Character System**: Snoo poses change based on vote percentages (neutral, confident, worried, celebrating, defeated) with smooth transitions
- **Audio System**: Gavel sound effects with Web Audio API integration and graceful fallback handling
- **Real-Time Vote Updates**: Live polling every 5 seconds with connection status indicators and last update timestamps
- **Scales of Justice Animation**: Enhanced visual balance representation with dramatic tipping animations, gradient styling, and real-time percentage displays
- **Mobile-Responsive Design**: Optimized for mobile devices with touch-friendly controls, no horizontal scrolling, and dynamic viewport height support
- **Ace Attorney Styling**: Custom CSS with courtroom aesthetics, game-like fonts, and authentic visual elements
- **Vote Update Indicators**: Visual feedback system showing when new votes are cast with animation triggers
- **Connection Management**: Real-time connection status with visual indicators (connected, connecting, error, disconnected states)
- **Scoring System**: Complete attorney and juror point calculation algorithms with 24-hour voting periods
- **Leaderboard System**: Top attorneys and jurors ranking displays with comprehensive statistics
- **Final Verdict System**: Automatic case closure and majority verdict determination

### API Endpoints
- `GET /api/init`: Initialize game state, fetch daily cases, and get user authentication
- `GET /api/daily-cases`: Fetch current daily case selection
- `POST /api/submit-defense`: Submit defense argument and create Reddit post for voting
- `POST /api/vote`: Submit jury vote (GUILTY/NOT GUILTY) with duplicate prevention
- `GET /api/votes`: Fetch current vote counts and user's voting status
- `GET /api/leaderboards`: Get top attorneys and jurors rankings
- `GET /api/user-scores`: Get current user's personal scores and statistics
- `GET /api/vote-stats`: Get detailed voting statistics for debugging
- `POST /internal/on-app-install`: Auto-create game post when app is installed in subreddit
- `POST /internal/menu/post-create`: Manual game post creation via moderator menu

### Data Architecture
- **Case Library**: 50+ predefined legal scenarios with categories (Theft, Fraud, Public Nuisance, Quantum Crime, etc.), difficulties (easy/medium/hard), and unique crimes
- **Daily Selection**: Date-based deterministic randomization for consistent daily cases with Redis caching
- **Defense Storage**: User submissions linked to cases with metadata, timestamps, and 24-hour voting periods
- **Vote Tracking**: Real-time vote counting with atomic transactions, user authentication, and duplicate prevention
- **Scoring System**: Attorney scores based on vote outcomes with win bonuses, juror scores for accuracy
- **Leaderboards**: Redis sorted sets for real-time ranking of top attorneys and jurors
- **Character State Management**: Dynamic pose calculation based on vote percentages
- **Audio Management**: Web Audio API integration with graceful fallback handling

### Technical Implementation
- **React Hooks**: Custom hooks for game state (`useGame`), defense submission (`useDefenseSubmission`), jury voting (`useJuryVoting`), leaderboards (`useLeaderboard`), and real-time updates (`useRealTimeUpdates`)
- **Component Architecture**: Modular components for Daily Docket, Defense Form, Jury Voting, Scales of Justice, Character Sprites, and Leaderboards
- **State Management**: Centralized game state with proper loading and error handling across multiple screens
- **Real-Time Updates**: Polling-based live updates for vote counts and percentages with connection status indicators
- **Mobile Optimization**: Responsive design with mobile-first approach, touch optimization, and dynamic viewport height support
- **Accessibility**: ARIA labels, semantic HTML, keyboard navigation, screen reader support, and reduced motion support
- **Audio System**: Web Audio API with gavel sound effects and graceful fallback handling
- **Scoring Algorithms**: Complex point calculations for both attorneys and jurors with automatic processing

The complete game specification can be found in `.kiro/specs/better-call-snoo/`.

## Cursor Integration

This template comes with a pre-configured cursor environment. To get started, [download cursor](https://www.cursor.com/downloads) and enable the `devvit-mcp` when prompted.
