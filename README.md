# Better Call Snoo

**Better Call Snoo** is an Ace Attorney-inspired legal defense game built for Reddit using the Devvit platform. This interactive web application transforms Reddit into a virtual courtroom where players defend quirky cases with creative arguments while the community acts as jury, creating an engaging social experience with competitive elements and real-time gameplay.

> **🎮 Live Game Status**: Fully functional and production-ready with all core features implemented including daily cases, defense submissions, jury voting, real-time updates, scoring systems, and leaderboards.

## What is Better Call Snoo?

Better Call Snoo is a fully-featured daily legal defense game that brings the excitement of courtroom drama directly to Reddit. Players take on dual roles as defense attorneys crafting creative arguments for absurd legal cases, and as community jurors deciding the fate of each defense through an immersive voting experience.

**🎯 Core Game Features:**
- **📋 Daily Docket System**: Browse 5 randomly selected funny legal cases each day from a library of 50+ absurd scenarios, refreshed every 24 hours with date-based deterministic selection and professional case file presentation
- **✍️ Creative Defense Submission**: Write compelling 250-character defense arguments with real-time character counting, color-coded validation, and automatic Reddit post creation for community voting
- **⚖️ Immersive Jury Voting**: Vote GUILTY or NOT GUILTY on defense submissions through a fully-realized courtroom interface featuring authentic gavel sound effects, dynamic character animations, and live vote visualization
- **🎭 Dynamic Character System**: Reddit Snoo characters (Victim Snoo and Lawyer Snoo) change poses based on real-time vote percentages with five distinct emotional states: neutral, confident, worried, celebrating, and defeated
- **📊 Live Scales of Justice**: Watch the animated balance scales tip dramatically in real-time as votes are cast, with smooth percentage displays and enhanced visual feedback that responds instantly to community sentiment
- **🔄 Real-Time Updates**: Live vote polling every 5 seconds with comprehensive connection status indicators, update timestamps, and seamless data synchronization across all users
- **📱 Mobile-First Design**: Fully responsive interface optimized for Reddit's mobile user base with touch-friendly controls, no horizontal scrolling, and accessibility compliance
- **🏆 Comprehensive Scoring System**: Dual-track point system rewarding both attorneys (defense creators) and jurors (community voters) with sophisticated algorithms and win bonuses
- **👑 Hall of Justice Leaderboards**: Real-time competitive rankings tracking top-performing attorneys and jurors with detailed statistics, personal performance metrics, and community recognition

The game features a meticulously crafted Ace Attorney-inspired aesthetic with Reddit's beloved Snoo characters serving as courtroom participants, complete with dynamic pose animations, authentic courtroom sound effects, professional legal styling, and immersive visual elements that transform Reddit into a virtual courthouse experience.

## Current Game Mechanics & Features

**🎮 Complete Gameplay Loop:**
1. **Instant Access**: Players enter directly into the Daily Docket courtroom interface with immediate access to cases and leaderboards
2. **Daily Case Selection**: Choose from 5 randomly selected cases with professional case file presentation, difficulty ratings, and category classifications
3. **Defense Creation**: Write 250-character defense arguments with real-time validation and character counting
4. **Automatic Post Generation**: Each defense creates a new Reddit post for community voting
5. **Jury Participation**: Vote on other players' defenses in an immersive courtroom setting
6. **Real-Time Results**: Watch live vote updates with animated character reactions and scales of justice
7. **Competitive Scoring**: Earn points as both attorney and juror with sophisticated scoring algorithms
8. **Leaderboard Competition**: Climb the Hall of Justice rankings with detailed performance statistics

**🎭 Dynamic Character System:**
- **Victim Snoo & Lawyer Snoo**: Two Reddit Snoo characters positioned in courtroom layout
- **Five Emotional States**: Characters dynamically change poses based on vote percentages:
  - **Neutral** (0-50% either way): Balanced, waiting poses
  - **Confident** (50-60% lead): Steady, assured stances
  - **Worried** (40-50% behind): Nervous, fidgeting animations
  - **Celebrating** (60%+ lead): Victory poses with raised arms
  - **Defeated** (60%+ behind): Dejected, slumped postures
- **Smooth Transitions**: CSS animations provide seamless pose changes as votes shift

**🔊 Immersive Audio Experience:**
- **Gavel Sound Effects**: Authentic courtroom gavel sound plays when voting
- **Web Audio API**: Professional audio implementation with graceful fallback
- **User Interaction Based**: Audio initializes after user interaction for browser compatibility

**📊 Real-Time Voting System:**
- **Live Updates**: Vote counts refresh every 5 seconds without page reload
- **Connection Status**: Visual indicators show real-time connection health
- **Atomic Transactions**: Redis-based vote storage prevents duplicate voting
- **Instant Feedback**: Character poses and scales update immediately after voting

**🏆 Sophisticated Scoring:**
- **Attorney Scoring**: (Not Guilty votes × 2) - (Guilty votes) + 500 bonus for wins
- **Juror Scoring**: +10 points for matching final majority verdict
- **24-Hour Voting Periods**: Cases remain active for exactly one day
- **Automatic Processing**: Scores calculate and update automatically when voting closes

## What Makes This Game Innovative?

1. **Seamless Reddit Integration**: Runs entirely within Reddit posts using Devvit's web platform with zero external dependencies. The game creates a native Reddit experience that feels like a natural extension of the platform, with automatic user authentication, post creation, and community integration that requires no additional accounts or downloads. Features instant access with direct entry to the Daily Docket, eliminating loading screens for immediate engagement.

2. **Self-Sustaining Content Ecosystem**: Each defense submission automatically generates a new Reddit post for community voting, creating an infinite content loop where players become both creators and consumers. This revolutionary approach turns the entire community into active content generators, ensuring fresh material and sustained engagement without requiring constant developer intervention.

3. **Intelligent Post Type Detection**: The game automatically detects whether users are accessing the main Daily Docket post or a specific jury voting post, seamlessly routing them to the appropriate interface without confusion or additional navigation steps.

4. **Algorithmic Daily Variety**: Features 50+ meticulously crafted absurd legal cases spanning categories from "The Great Cookie Caper" to "Interdimensional Traffic Violations," with 5 new cases selected daily using date-based deterministic randomization. This ensures consistent variety without repetition while maintaining fairness across all players and time zones.

5. **Revolutionary Dual-Role Gameplay**: Players simultaneously participate as attorneys (creating defenses) and jurors (voting on others' defenses), creating multiple engagement pathways that accommodate different skill sets and participation preferences. This dual participation model ensures sustained engagement regardless of creative writing ability or time availability.

6. **Real-Time Social Voting with Immersive Feedback**: Live vote updates every 5 seconds with dramatically animated Scales of Justice that tip based on community sentiment, plus dynamic Reddit Snoo character poses that react to vote percentages in real-time. The sophisticated visual feedback system includes connection status indicators, update timestamps, live vote notifications, and smooth animations that create immediate engagement rewards.

7. **Authentic Ace Attorney Recreation**: Complete visual and audio recreation of the beloved courtroom game series, featuring custom Reddit Snoo character sprites with five distinct emotional poses, authentic gavel sound effects using Web Audio API, professional courtroom backgrounds, and game-accurate typography that transforms Reddit into a virtual Phoenix Wright courtroom experience.

8. **Mobile-First Accessibility Excellence**: Fully optimized for Reddit's predominantly mobile user base with touch-friendly controls, zero horizontal scrolling, proper viewport handling, comprehensive screen reader support, full keyboard navigation, ARIA labels, semantic HTML structure, and reduced motion options for users with vestibular disorders.

9. **Sophisticated Competitive Framework**: Dual scoring algorithms reward both creative defense writing and accurate jury predictions with complex point calculations, win bonuses, and accuracy tracking. Real-time leaderboards create ongoing competition and community recognition, while the 24-hour voting periods ensure fair participation across global time zones.

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
- **Direct Entry**: The game opens immediately with the Daily Docket interface, providing instant access to:
  - Today's 5 randomly selected legal cases with professional case file styling
  - Hall of Justice leaderboards accessible via the prominent "🏆 Hall of Justice" button
  - Immediate case selection and defense submission capabilities
  - Full courtroom atmosphere with Ace Attorney-inspired visual design
- **Seamless Integration**: The game loads directly in your browser within the Reddit post - no downloads, separate accounts, or additional setup needed
- **Mobile Optimized**: Fully responsive design works perfectly on smartphones and tablets with touch-friendly controls

#### 2. **Browse the Daily Docket (Main Interface)**
- **View Today's Cases**: See 5 randomly selected legal cases, refreshed daily at midnight
- **Case Information**: Each case displays:
  - Quirky case title (e.g., "The Case of the Quantum Cat Burglar")
  - Specific crime description (e.g., "Accused of stealing Schrödinger's cat while it was both alive and dead")
  - Difficulty level (Easy/Medium/Hard) with color-coded badges (green/yellow/red)
  - Category tags (Theft, Fraud, Physics Violation, etc.) with thematic emoji icons
  - Unique case file numbers and professional case file styling
- **Navigation**: Access the "🏆 Hall of Justice" leaderboards from the main docket
- **Case Selection**: Click "⚖️ DEFEND" on any case that interests you
- **Mobile Optimization**: Responsive grid layout with no horizontal scrolling, optimized for touch interaction

#### 3. **Submit Your Defense**
- **Defense Writing Interface**: 
  - Clean, focused text area with 250-character limit
  - Real-time character counter with color-coded feedback (green → yellow → red as you approach the limit)
  - Case details displayed above for reference including title, crime, difficulty, and category
  - Form validation prevents empty submissions
- **Character Limit Strategy**: The 250-character limit encourages:
  - Witty, concise arguments that get straight to the point
  - Creative legal reasoning and wordplay
  - Memorable one-liners that stick with voters
- **Submission Process**: 
  - Click "Submit Defense" to create a new Reddit post automatically
  - Your defense becomes a separate post for community voting
  - Success confirmation with automatic redirect back to Daily Docket after 3 seconds
  - Error handling for failed submissions with clear feedback

#### 4. **Participate in Jury Voting**
- **Immersive Courtroom Interface**: 
  - Full Ace Attorney-inspired courtroom layout with dramatic gradient backgrounds (yellow-orange-red) and authentic courtroom atmosphere
  - Victim Snoo (defendant) and Lawyer Snoo (attorney) character sprites positioned on opposite sides with professional courtroom styling
  - Dynamic character poses that change based on real-time vote percentages with smooth CSS animations and transitions:
    - **Neutral**: Equal votes or no votes cast yet - characters in relaxed, balanced poses
    - **Confident**: Leading in votes (50-60%) with steady, confident stances and subtle animation cycles
    - **Worried**: Losing in votes (40-50%) with nervous, fidgeting animations and concerned expressions
    - **Celebrating**: Winning by large margin (60%+) with victory poses, raised arms, and celebratory animations
    - **Defeated**: Losing by large margin (60%+) with dejected, slumped poses and disappointed expressions
- **Enhanced Voting Process**:
  - Case details and defense argument displayed in styled courtroom text boxes with professional legal typography and quotation styling
  - Large, prominent "GUILTY" and "NOT GUILTY" voting buttons with hover effects, focus states, and visual feedback
  - Authentic gavel sound effect upon voting using Web Audio API with graceful fallback handling for audio failures
  - Vote immediately recorded with atomic Redis transactions and cannot be changed to prevent manipulation
  - Instant visual feedback with character pose updates, vote counter changes, and scales animation
  - Real-time connection status indicators (connected/connecting/error/disconnected) with colored status dots and descriptive text
  - Vote update timestamps showing last refresh time for transparency
- **Live Results Visualization**: Watch the animated Scales of Justice tip dramatically based on real-time vote percentages with smooth transitions, gradient styling, and precise percentage displays that update every 5 seconds

#### 5. **Track Your Performance**
- **Comprehensive Dual Scoring System**:
  
  **As an Attorney (Defense Creator):**
  - **Base Score Calculation**: (Not Guilty votes × 2) - (Guilty votes) - rewards persuasive arguments that sway the community
  - **Victory Bonus**: +500 points if your defense achieves majority "Not Guilty" verdict (>50%) - significant reward for winning cases
  - **Total Score**: Cumulative score across all your defense submissions with no negative penalties
  - **Detailed Statistics**: Track cases defended, cases won, win rate percentage, and individual case performance
  
  **As a Juror (Community Voter):**
  - **Accuracy Points**: +10 points for each vote that matches the final majority verdict after 24-hour voting period
  - **No Penalty System**: 0 points (not negative) for minority votes - encourages honest voting without fear of punishment
  - **Total Score**: Sum of all your accurate jury predictions across all cases you've voted on
  - **Performance Metrics**: Track cases judged, correct votes, accuracy percentage, and voting consistency

- **Hall of Justice Leaderboards**: 
  - **Top Attorneys Leaderboard**: Ranked by total defense scores with usernames, point totals, and win statistics displayed with trophy icons (🥇🥈🥉) for top 3 positions
  - **Top Jurors Leaderboard**: Ranked by total accuracy points with voting statistics and accuracy percentages, featuring color-coded ranking badges
  - **Personal Performance Dashboard**: Your own statistics displayed prominently with rank positions, detailed breakdowns, and progress tracking
  - **Real-Time Updates**: Leaderboards refresh automatically as votes are cast and cases conclude, with live ranking changes
  - **Accessible Navigation**: Easily accessible via the "🏆 Hall of Justice" button from the main Daily Docket interface
  - **Refresh Functionality**: Manual refresh button to get the latest rankings and ensure data accuracy

#### 6. **Advanced Features & Real-Time Experience**
- **Sophisticated Live Updates**: Vote percentages and character poses update every 5 seconds without page refresh using optimized polling with connection management
- **Connection Status Management**: Visual indicators show real-time connection status with colored dots and descriptive text (🟢 connected, 🟡 connecting, 🔴 error, ⚫ disconnected)
- **Vote Update Indicators**: Visual feedback system showing total vote count changes with smooth animations and update timestamps for transparency
- **24-Hour Voting Periods**: Each defense post remains active for voting for exactly 24 hours with automatic case closure and final verdict determination
- **Automatic Scoring**: Final verdicts determined by majority vote after voting period ends with immediate score calculation and leaderboard updates
- **Mobile-First Responsive Design**: Full functionality on smartphones and tablets with touch-optimized controls, dynamic viewport height support, and no horizontal scrolling
- **Comprehensive Accessibility Features**: 
  - Full screen reader support with ARIA labels, semantic HTML structure, and descriptive alt text
  - Complete keyboard navigation support for all interactive elements with visible focus indicators
  - Skip links for efficient navigation and content jumping
  - High contrast mode compatibility for visual accessibility
  - Reduced motion options for users with vestibular disorders
  - Role-based announcements for dynamic content changes
  - Proper heading hierarchy and landmark navigation

### Pro Tips for Success

**For Aspiring Attorneys:**
- **Be Creative & Original**: The most memorable and unique defenses often win, regardless of case difficulty
- **Use Reddit Humor**: Leverage memes, references, and wit that resonates with Reddit's community culture
- **Know Your Audience**: Consider what arguments would make the Reddit community vote "Not Guilty"
- **Character Economy**: Make every character count in your 250-character limit - edit ruthlessly
- **Study Successful Defenses**: Observe winning arguments to understand what resonates with voters
- **Timing Matters**: Submit defenses early in the day for maximum voting exposure and engagement

**For Effective Jurors:**
- **Read Thoroughly**: Consider both the absurdity of the crime and the creativity of the defense argument
- **Vote Your Conscience**: Don't just follow the crowd - vote based on how convincing you personally find the argument
- **Consistency Builds Score**: Accurate voting over time builds your juror score and leaderboard position
- **Engage Early**: Vote on defenses when they're fresh for maximum community impact
- **Consider Context**: Factor in both legal reasoning and entertainment value when making decisions

**Strategic Considerations:**
- **Case Difficulty Balance**: All cases offer the same scoring potential, so choose based on your creative strengths rather than difficulty
- **Dual Participation**: Engage in both roles (attorney and juror) for maximum point earning potential
- **Community Timing**: Monitor when the community is most active for optimal engagement
- **Long-term Strategy**: Build reputation over time through consistent quality submissions and accurate voting

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

**✅ Fully Completed & Production-Ready Features:**

**🎮 Core Game Systems:**
- **Streamlined Entry Experience**: Direct access to the Daily Docket interface with immediate case browsing and leaderboard access, eliminating unnecessary loading screens for optimal user experience
- **Daily Docket System**: Complete implementation with 5 random cases daily from 50+ predefined funny legal scenarios, professional case file styling, difficulty badges (easy/medium/hard), category icons, and date-based deterministic selection with Redis caching
- **Defense Submission System**: Full-featured 250-character limit interface with real-time character counter, color-coded validation feedback (green→yellow→red), form validation, success/error handling, and automatic Reddit post creation for community voting
- **Custom Post Creation**: Seamless automatic Reddit post generation for each defense submission with comprehensive success/error handling, user feedback, and proper post metadata integration

**⚖️ Courtroom Experience:**
- **Immersive Jury Voting Interface**: Complete courtroom experience with full Ace Attorney-style presentation, character sprites, voting buttons, authentic courtroom atmosphere, and professional legal styling with gradient backgrounds
- **Dynamic Character System**: Sophisticated Reddit Snoo pose system with 5 distinct emotional states (neutral, confident, worried, celebrating, defeated) that change based on real-time vote percentages with smooth CSS animations and transition effects
- **Professional Audio System**: Gavel sound effects with Web Audio API integration, graceful fallback handling, user interaction-based initialization, and proper audio context management
- **Animated Scales of Justice**: Enhanced visual balance representation with dramatic tipping animations, gradient styling, real-time percentage displays, smooth transitions, and responsive design

**🔄 Real-Time Features:**
- **Real-Time Vote Updates**: Advanced live polling system updating every 5 seconds with connection status indicators, last update timestamps, atomic Redis vote transactions, and seamless data synchronization
- **Live Vote Notifications**: Dynamic notification system that displays "+X New Votes!" indicators when fresh votes are cast, with animated bounce effects and automatic 3-second display duration for immediate feedback
- **Vote Update Indicators**: Comprehensive visual feedback system showing when new votes are cast with animation triggers, real-time connection status, and transparent update tracking
- **Connection Management**: Robust real-time connection status with visual indicators (connected/connecting/error/disconnected states), automatic reconnection handling, and user-friendly status messages

**🏆 Competitive Systems:**
- **Complete Scoring System**: Full attorney and juror point calculation algorithms with 24-hour voting periods, win bonuses (+500 for majority Not Guilty), accuracy tracking, and automatic score processing
- **Hall of Justice Leaderboards**: Comprehensive ranking system for top attorneys and jurors with detailed statistics, personal performance tracking, real-time updates, trophy icons, and refresh functionality
- **Final Verdict System**: Automatic case closure and majority verdict determination with proper scoring attribution, leaderboard updates, and 24-hour voting period management

**📱 Technical Excellence:**
- **Mobile-First Responsive Design**: Fully optimized for mobile devices with touch-friendly controls, zero horizontal scrolling, dynamic viewport height support, accessibility compliance, and cross-device compatibility
- **Authentic Ace Attorney Styling**: Complete visual recreation with custom CSS, courtroom aesthetics, game-accurate fonts, authentic visual elements, immersive animations, and professional legal document styling
- **Comprehensive Accessibility**: Full screen reader support, complete keyboard navigation, ARIA labels, semantic HTML structure, high contrast mode compatibility, reduced motion options, and skip links

### Game Flow Architecture

The game operates through four main screens managed by the React App component:

1. **Daily Docket (`DailyDocket.tsx`)**: Main hub and entry point displaying 5 daily cases with case file styling, difficulty badges, category icons, and leaderboard access
2. **Defense Form (`DefenseForm.tsx`)**: Character-limited defense submission interface with real-time validation and success feedback
3. **Jury Voting (`JuryVoting.tsx`)**: Immersive courtroom with dynamic character sprites, voting buttons, and live results visualization
4. **Leaderboard (`Leaderboard.tsx`)**: Hall of Justice displaying top attorneys and jurors with personal performance statistics

The game state is managed through custom React hooks (`useGame`, `useJuryVoting`, `useLeaderboard`, `useDefenseSubmission`) that handle API communication, real-time updates, and state transitions between screens. The game initializes directly to the Daily Docket for immediate engagement, with automatic detection of jury voting posts that bypass the main interface.

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
- **React Hooks**: Custom hooks for game state (`useGame`), defense submission (`useDefenseSubmission`), jury voting (`useJuryVoting`), and leaderboards (`useLeaderboard`)
- **Component Architecture**: Modular components for Daily Docket, Defense Form, Jury Voting, Scales of Justice, Character Sprites, and Leaderboards
- **State Management**: Centralized game state with proper loading and error handling across multiple screens using React's useState and useEffect
- **Real-Time Updates**: Polling-based live updates for vote counts and percentages with connection status indicators
- **Mobile Optimization**: Responsive design with mobile-first approach, touch optimization, and dynamic viewport height support
- **Accessibility**: ARIA labels, semantic HTML, keyboard navigation, screen reader support, and reduced motion support
- **Audio System**: Web Audio API with gavel sound effects and graceful fallback handling
- **Scoring Algorithms**: Complex point calculations for both attorneys and jurors with automatic processing
- **CSS Animations**: Custom keyframe animations for character poses, UI transitions, and visual feedback using Tailwind CSS and custom CSS

The complete game specification can be found in `.kiro/specs/better-call-snoo/`.

## Cursor Integration

This template comes with a pre-configured cursor environment. To get started, [download cursor](https://www.cursor.com/downloads) and enable the `devvit-mcp` when prompted.
