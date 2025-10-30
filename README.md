# Better Call Snoo

**Better Call Snoo** is a revolutionary legal defense game built for Reddit using the Devvit platform. This interactive React.js application transforms Reddit into a virtual courtroom where players participate in an immersive legal experience - either defending absurd criminal cases with creative arguments or serving as jury members voting on community-submitted defenses.

> **🎮 GAME STATUS**: **FULLY FUNCTIONAL & PRODUCTION-READY** - Complete implementation with dual-role gameplay system, interactive daily case carousel with prisoner mugshots, 250-character defense submission system, immersive jury voting with live updates every 2 seconds, real-time Scales of Justice display, Web Audio API synthesized gavel sound effects, and competitive Hall of Justice leaderboards.

## What is Better Call Snoo?

Better Call Snoo is a revolutionary social gaming experience that transforms Reddit into an interactive courtroom where creativity meets community judgment. Players choose between two distinct roles: **Judge** (voting on cases) or **Defendant** (submitting defenses), creating a dynamic legal drama where every defense becomes a new Reddit post for community voting.

**🎯 Core Game Mechanics:**

**Role Selection System:**
- **Be the Judge**: Review defendant posts and vote GUILTY or NOT GUILTY on community-submitted defenses
- **Be the Defendant**: Browse daily cases and submit creative 250-character defense arguments

**Daily Docket Experience:**
- Interactive case carousel with immersive courtroom atmosphere and live date/time display
- Unique prisoner mugshots (6 character sprites) selected deterministically based on case ID
- Difficulty badges with color-coded styling (Easy 🟢, Medium 🟡, Hard 🔴)
- Professional case file numbering system and detailed case information

**Defense Creation System:**
- Write compelling 250-character defense arguments with real-time validation
- Color-coded character counting (blue/yellow/red based on remaining characters)
- Immediate feedback and comprehensive error handling

**Immersive Jury Voting:**
- Professional courtroom atmosphere with character positioning
- Clear sections for "THE JURY" (representing the player) and "THE ACCUSED" (defendant)
- Live vote updates every 2 seconds with connection status indicators
- Real-time Scales of Justice display showing current verdict and vote margin

**🚀 What Makes It Revolutionary:**
- **Dual-Role Gameplay**: Choose your courtroom role - Judge or Defendant - for completely different experiences
- **Self-Sustaining Content**: Every defense creates a new Reddit post, generating infinite community-driven gameplay
- **Native Reddit Integration**: Runs entirely within Reddit posts with automatic user authentication
- **Real-Time Social Drama**: Live vote updates with connection status indicators and immediate feedback
- **Immersive Experience**: Professional courtroom backgrounds, Web Audio API gavel sound effects, and authentic legal theming
- **Mobile-First Design**: Optimized for Reddit's mobile user base with touch-friendly controls and responsive layouts
- **Intelligent Routing**: Automatic detection of post type (main game vs jury voting) for seamless user experience

## What Makes This Game Innovative?

**🚀 Revolutionary Game Design:**

1. **Self-Sustaining Content Ecosystem**: Each defense submission automatically generates a new Reddit post for community voting, creating an infinite content loop where players become both creators and consumers. This approach turns the entire community into active content generators, ensuring fresh material and sustained engagement without requiring external content creation.

2. **Seamless Reddit Integration**: Runs entirely within Reddit posts using Devvit's web platform with zero external dependencies. The game creates a native Reddit experience with automatic user authentication, post creation, and community integration that requires no additional accounts, downloads, or external websites.

3. **Intelligent Post Type Detection**: The game automatically detects whether users are accessing the main Daily Docket post or a specific jury voting post, seamlessly routing them to the appropriate interface via the `useGame` hook with different initialization flows (`InitResponse` vs `JuryVotingInitResponse`).

4. **Real-Time Social Voting Drama**: Live vote updates every 2 seconds via `useRealTimeUpdates` hook with clean Scales of Justice display showing current verdict, comprehensive connection status indicators (🟢 connected, 🟡 connecting, 🔴 error, ⚫ disconnected), and seamless data synchronization.

5. **Mobile-First Responsive Design**: Scrollable single-column layout optimized for Reddit's predominantly mobile user base, with fixed bottom voting buttons for easy access while reviewing case details, zero horizontal scrolling required, and touch-friendly controls throughout.

6. **Enhanced Character System**: Dedicated character sections for "THE JURY" (representing the player with jury imagery) and "THE ACCUSED" (unique prisoner mugshots selected deterministically based on case ID), creating clear visual storytelling and defined courtroom roles.

7. **Comprehensive Accessibility**: Full WCAG compliance with screen reader support, keyboard navigation, ARIA labels, semantic HTML structure, skip links, and mobile accessibility features throughout all components.

8. **Audio Integration**: Web Audio API implementation with synthesized courtroom gavel sound effects via `AudioManager` class, animated bounce effects on voting buttons, and graceful visual fallback handling ("🔨 GAVEL!" overlay) for audio-restricted environments.

## How to Play Better Call Snoo

**🎮 Complete Step-by-Step Gameplay Guide:**

Better Call Snoo runs entirely within Reddit posts using the Devvit platform. The game features a dual-role system where you choose between being a Judge or Defendant, each offering completely different gameplay experiences.

### Getting Started
1. **Find the Game**: Look for Better Call Snoo posts in participating subreddits
2. **Launch**: Click the splash screen to enter the game (no downloads or accounts needed)
3. **Choose Your Role**: Select between "BE THE JUDGE" or "BE THE DEFENDANT" on the role selection screen

### Playing as a Judge (Voting on Cases)

**Step 1: Select Judge Role**
- Click **"BE THE JUDGE"** on the role selection screen
- Access the Judge Panel to review available defendant posts

**Step 2: Review Defendant Posts**
- Browse community-submitted defenses from the Judge Panel
- Click on any defendant post to enter the jury voting interface
- The game automatically detects jury voting posts and routes you appropriately

**Step 3: Experience the Courtroom**
- **Immersive Courtroom**: Professional courtroom atmosphere with authentic backgrounds
- **Header Information**: Case title and crime description prominently displayed
- **Character Positioning**: 
  - **"THE JURY"** (left): Represents you with jury imagery
  - **"THE ACCUSED"** (right): Shows defendant with unique prisoner mugshot
- **Defense Statement**: Blue-background section displaying the attorney's defense argument and author attribution
- **Scrollable Layout**: Mobile-optimized design for easy case review

**Step 4: Cast Your Verdict**
- Use the **fixed voting buttons at the bottom** of the screen
- Choose between:
  - **GUILTY** (Red button with ⚖️ icon): Defendant is guilty despite the defense
  - **NOT GUILTY** (Blue button with 🔨 icon): Defense convinced you of innocence
- Web Audio API synthesized gavel sound effect plays when voting with visual fallback
- Your vote is immediately recorded and cannot be changed

**Step 5: Watch Live Results**
- **Real-Time Updates**: Vote counts update automatically every 2 seconds
- **Scales of Justice Display**: Visual representation showing current verdict and vote margin
- **Connection Status Indicators**: Visual indicators in top-right corner:
  - 🟢 **Connected**: Live voting active
  - 🟡 **Connecting**: Attempting to connect
  - 🔴 **Error**: Connection issues
  - ⚫ **Disconnected**: Offline mode
- **Live Vote Counts**: Separate counters for Guilty and Not Guilty votes
- **Your Verdict Display**: See your personal verdict with confirmation message
- **Verdict Images**: Dynamic images display based on majority vote

### Playing as a Defendant (Creating Defenses)

**Step 1: Select Defendant Role**
- Click **"BE THE DEFENDANT"** on the role selection screen
- Access the Daily Docket to browse available cases

**Step 2: Browse Daily Cases**
- Interactive case carousel with immersive courtroom background and live date/time display
- Each case displays:
  - **Case File Number**: Professional numbering system (e.g., "CASE FILE #123")
  - **Case Title**: Humorous case names
  - **Difficulty Badge**: Easy (🟢), Medium (🟡), or Hard (🔴) with color-coded styling
  - **Prisoner Mugshot**: Unique character sprites (6 total) selected deterministically based on case ID
- Use **"← Previous"** and **"Next →"** navigation buttons to browse cases

**Step 3: Select and Defend a Case**
- Click the blue **"DEFEND"** button below the prisoner image
- Enter the Defense Form with professional legal imagery
- Case details remain visible for reference during writing

**Step 4: Write Your Defense**
- Craft a creative defense argument in **exactly 250 characters or less**
- Real-time character counter with color-coded feedback:
  - **Blue**: Plenty of space (0-175 characters)
  - **Yellow**: Getting close (176-225 characters) 
  - **Red**: Near limit (226-250 characters)
- Form validation prevents empty or over-limit submissions

**Step 5: Submit Your Defense**
- Click **"Submit Defense"** when satisfied
- Your defense automatically creates a new Reddit post for community voting
- Success message confirms submission
- Return to Daily Docket to defend more cases

### Scoring System & Competition

**Attorney Points:**
- Earn points based on jury votes for your defenses
- More "Not Guilty" votes = higher scores
- Win bonus for successful defenses

**Juror Points:**
- Earn points for voting accuracy
- Bonus for matching the final majority verdict

**Hall of Justice Leaderboards:**
- Click **"🏛️ Hall of Justice"** button from Daily Docket
- Separate leaderboards for attorneys and jurors
- Personal performance dashboard with detailed statistics
- Trophy recognition for top performers

## Technology Stack

**Frontend Technologies:**
- **React.js 19.1.0**: Modern hooks-based frontend with TypeScript and StrictMode for type safety
- **TypeScript 5.8.2**: Strict type checking with shared types between client/server for maintainability
- **Vite 6.2.4**: Lightning-fast build tool with hot module replacement and optimized bundling
- **Tailwind CSS 4.1.6**: Utility-first CSS framework with mobile-first responsive design and custom animations
- **Web Audio API**: Synthesized courtroom gavel sound effects (AudioManager class) with graceful visual fallback handling

**Backend & Platform:**
- **Devvit 0.12.1**: Reddit's developer platform with serverless runtime and native Reddit integration
- **Express 5.1.0**: Server-side HTTP framework with RESTful `/api/` endpoints
- **Redis**: High-performance data persistence for votes, scores, and user data via Devvit
- **Node.js**: Serverless runtime environment with modern JavaScript features

**Key React Architecture:**
- **Custom Hooks**: `useGame` (intelligent routing), `useJuryVoting` (real-time voting), `useLeaderboard` (rankings), `useRealTimeUpdates` (2-second polling), `useDefenseSubmission` (form handling) for sophisticated state management
- **Component Structure**: Modular component architecture with `App.tsx` as central router, intelligent game state management, and smooth CSS animations (animate-fade-in-up, animate-scale-in, animate-slide-in-right/left)
- **Real-Time Updates**: Live polling system with connection status monitoring (ConnectionStatus type), automatic retry mechanisms, and force update capabilities
- **Responsive Design**: Mobile-first approach with Tailwind CSS utilities, touch-optimized interactions, and mobile-touch-target classes
- **Accessibility**: Full WCAG compliance with screen reader support, keyboard navigation, semantic HTML, ARIA labels, skip links, and live regions for dynamic content

## Current Game Architecture

Based on the latest client code analysis, Better Call Snoo is a fully functional React.js game with the following core architecture:

**🎮 Main Game Flow:**
- **Entry Point**: `main.tsx` renders the main `App` component in React StrictMode with TypeScript support
- **Central Hub**: `App.tsx` manages intelligent game state routing between Role Selection, Judge Panel, Daily Docket, Defense Form, Jury Voting, and Leaderboard screens with smooth CSS animations
- **Role-Based Routing**: Dual-role system where players choose between Judge (voting) or Defendant (defense creation) roles
- **Loading Experience**: Custom loading screen with professional styling and accessibility features
- **Intelligent Routing**: Automatic detection of post type (main game vs jury voting) for seamless user experience via the `useGame` hook

**🏛️ Core Components:**

**Role Selection System:**
- **RoleSelection**: Split-screen interface with "BE THE JUDGE" and "BE THE DEFENDANT" options
- **Judge Panel**: Access point for reviewing defendant posts and entering jury voting
- **Dual Gameplay Paths**: Completely different experiences based on role selection

**Defendant Path Components:**
- **Daily Docket**: Interactive case carousel with immersive courtroom background, real-time date/time display, prisoner mugshots (6 unique sprites selected deterministically based on case ID), difficulty badges with color coding, and navigation controls
- **Defense Form**: 250-character defense writing interface with custom background, real-time validation, character counting with color-coded feedback, comprehensive error handling, and success messaging

**Judge Path Components:**
- **Jury Voting**: Immersive courtroom experience with scrollable mobile-optimized layout, character sections for "THE JURY" and "THE ACCUSED", clearly labeled "Defense Statement" section, and fixed bottom voting buttons
- **Real-Time Updates**: Live vote polling every 2 seconds with connection status indicators and seamless data synchronization via `useJuryVoting` hook
- **Scales of Justice**: Clean visual representation of voting results with current verdict indicator and vote margin display

**Shared Components:**
- **Leaderboard**: Hall of Justice rankings with personal performance dashboards, trophy recognition, and detailed statistics for both attorney and juror performance
- **VotingButtons**: Interactive voting interface with Web Audio API gavel sound effects and visual feedback

**🎯 Advanced Features:**
- **Dual-Role Architecture**: Complete separation of Judge and Defendant gameplay experiences
- **Character Positioning**: Clear visual storytelling with "THE JURY" and "THE ACCUSED" sections
- **Audio Integration**: Web Audio API implementation with synthesized gavel sound effects and graceful visual fallback when audio fails
- **Mobile-First Design**: Optimized for Reddit's mobile user base with touch-friendly controls, fixed bottom voting buttons, and responsive layouts
- **Accessibility Compliant**: Full WCAG compliance with screen reader support, keyboard navigation, ARIA labels, semantic HTML structure, and skip links
- **Real-Time Connection Status**: Visual indicators showing live connection status (connected, connecting, error, disconnected)

## Development Setup

> Make sure you have Node 22 downloaded on your machine before running!

**Development Commands:**
```bash
# Install dependencies
npm install

# Start development server (runs client, server, and devvit in parallel)
npm run dev

# Build for production
npm run build

# Deploy to Reddit
npm run deploy

# Code quality checks
npm run check
```

**Development Workflow:**
1. Run `npm run dev` to start the development server
2. Devvit automatically creates a test subreddit (e.g., `r/better-call-snoo_dev`)
3. Open the provided playtest URL in your browser
4. Test both main game posts and jury voting posts
5. Make changes and see them reflected immediately with hot reloading

## Game Features Summary

Better Call Snoo is a fully functional, production-ready legal defense game that transforms Reddit into an interactive courtroom experience. The game successfully combines:

- **Dual-Role Gameplay**: Choose between Judge (voting on cases) or Defendant (creating defenses) for completely different gaming experiences
- **Immersive Courtroom Experience**: Professional courtroom atmosphere with character positioning, real-time voting drama, Web Audio API synthesized gavel sound effects, and authentic legal theming
- **Social Engagement**: Community-driven content creation where every defense becomes a new Reddit post for voting
- **Technical Excellence**: Modern React.js architecture with custom hooks, real-time updates every 2 seconds, mobile optimization, and comprehensive accessibility (WCAG compliant)
- **Native Reddit Integration**: Seamless Reddit experience with automatic authentication, intelligent post type detection, and zero external dependencies
- **Competitive Elements**: Sophisticated dual scoring algorithms, Hall of Justice leaderboards, and personal performance tracking

The current implementation provides a complete gaming experience with role selection, streamlined access to browsing daily cases via interactive carousel, writing 250-character defenses with real-time validation, and participating in immersive jury voting with live results. Players can compete on Hall of Justice leaderboards with personal performance dashboards and trophy recognition.
