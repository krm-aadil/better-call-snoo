# Better Call Snoo

**Better Call Snoo** is a revolutionary legal defense game built for Reddit using the Devvit platform. This interactive React.js application transforms Reddit into a virtual courtroom where players participate in an immersive legal experience - either defending absurd criminal cases with creative arguments or serving as jury members voting on community-submitted defenses.

> **🎮 GAME STATUS**: **FULLY FUNCTIONAL & PRODUCTION-READY** - Complete implementation with streamlined gameplay flow, interactive daily case carousel, 250-character defense submission system, immersive jury voting with live updates every 2 seconds, real-time Scales of Justice display, sophisticated dual scoring algorithms, Web Audio API synthesized gavel sound effects, and competitive Hall of Justice leaderboards with personal performance dashboards.

## What is Better Call Snoo?

Better Call Snoo is a revolutionary social gaming experience that transforms Reddit into an interactive courtroom where creativity meets community judgment. Players defend absurd criminal cases with creative 250-character arguments, while the community acts as jury, voting GUILTY or NOT GUILTY in an immersive courtroom experience with real-time results.

**🎯 Core Game Mechanics:**
- **Daily Docket**: Browse and defend daily legal cases in an interactive carousel with immersive courtroom atmosphere, live date/time display, and deterministic prisoner mugshots (6 unique sprites)
- **Defense Creation**: Write compelling 250-character defense arguments with real-time validation, color-coded character counting (blue/yellow/red), and comprehensive error handling
- **Community Jury**: Vote on defenses in immersive courtroom posts with live results updating every 2 seconds via `useRealTimeUpdates` hook
- **Real-Time Voting**: Watch live vote counts with Scales of Justice display showing current verdict, vote margin, and connection status indicators
- **Dual Scoring**: Earn points as both attorney (sophisticated algorithm: (Not Guilty × 2) - Guilty + 500 win bonus) and juror (accuracy-based: +10 for majority match)
- **Live Competition**: Climb Hall of Justice leaderboards with detailed performance tracking, Reddit avatar integration via `Avatar` component, and trophy recognition (🥇🥈🥉)

**🚀 What Makes It Revolutionary:**
- **Self-Sustaining Content**: Every defense creates a new Reddit post, generating infinite community-driven gameplay
- **Native Reddit Integration**: Runs entirely within Reddit posts - no downloads or external accounts needed
- **Real-Time Social Drama**: Live vote updates every 2 seconds with connection status indicators (🟢 connected, 🟡 connecting, 🔴 error, ⚫ disconnected) and immediate feedback
- **Immersive Experience**: Professional courtroom backgrounds, character positioning, and Web Audio API synthesized gavel sound effects with visual fallback
- **Mobile-First Design**: Optimized for Reddit's mobile user base with fixed bottom voting buttons and responsive layouts
- **Intelligent Routing**: Automatic detection of post type (main game vs jury voting) for seamless user experience via `useGame` hook

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

Better Call Snoo runs entirely within Reddit posts using the Devvit platform. The game uses intelligent routing via the `useGame` hook to automatically detect whether you're accessing the main Daily Docket post (`InitResponse`) or a specific jury voting post (`JuryVotingInitResponse`) and routes you to the appropriate interface seamlessly.

### Getting Started
1. **Find the Game**: Look for two types of posts in participating subreddits:
   - **"Better Call Snoo - Main Court"** - For defending cases and accessing the Daily Docket
   - **"⚖️ Better Call Snoo: [Case Name]"** - For voting on specific defenses as a juror
2. **Launch**: Click the splash screen button to enter the game (no downloads or accounts needed)
3. **Automatic Routing**: The game intelligently detects which type of post you're accessing and routes you to the appropriate interface

### Playing as a Defense Attorney (Creating Defenses)

**Step 1: Access the Daily Docket**
- Find "Better Call Snoo - Main Court" posts in participating subreddits
- Click the splash screen button to enter the game
- You'll be taken directly to the Daily Docket where you can browse available cases

**Step 2: Browse Daily Cases**
- View the **Daily Docket** featuring legal cases in a carousel layout with immersive courtroom background (`/court/court-background.png`)
- Each case displays:
  - **Case File Number**: Professional case numbering system (e.g., "CASE FILE #123")
  - **Case Title**: Humorous case name (e.g., "The Great Cookie Caper")
  - **Difficulty Badge**: Easy (🟢), Medium (🟡), or Hard (🔴) with color-coded styling
  - **Prisoner Mugshot**: Large, centered visual representation selected deterministically from 6 character sprites (`/prisoners/1.png` through `/prisoners/6.png`) based on case index
- Use **"← Previous"** and **"Next →"** navigation buttons to browse between cases
- Live date/time display shows current courtroom session updating every second in header

**Step 3: Select a Case**
- Click the blue **"DEFEND"** button positioned prominently below the prisoner image
- Smooth transition animation takes you to the Defense Form screen with custom background (`/Defend-Background.png`)
- Case details remain visible for reference during defense writing

**Step 4: Write Your Defense**
- Enter an immersive defense writing environment with objection lawyer imagery (`/lawyers/objection.png`)
- Left side shows case details in blue-bordered white box with difficulty and category badges
- Craft a creative defense argument in **exactly 250 characters or less** in the main textarea
- Real-time character counter with intelligent color-coded feedback:
  - **Blue**: Plenty of space remaining (0-175 characters)
  - **Yellow**: Getting close to limit (176-225 characters) 
  - **Red**: Near or at character limit (226-250 characters)
- Form validation prevents submission of empty or over-limit defenses
- **Pro Tip**: Be creative! The more compelling your defense, the more likely the jury will vote "Not Guilty"

**Step 5: Submit Your Defense**
- Click **"Submit Defense"** when satisfied with your argument
- Loading spinner with "Submitting..." text provides real-time feedback
- Your defense automatically creates a new Reddit post for community voting via `createDefensePost` function
- Success message confirms submission with green checkmark and encouraging text
- **"← Back to Cases"** button returns you to Daily Docket to defend more cases

### Playing as a Juror (Community Voter)

**Step 1: Access Jury Voting Posts**
- Find posts titled "⚖️ Better Call Snoo: [Case Name]" in participating subreddits
- Click the splash screen button to enter the jury voting interface directly
- The game automatically detects this is a jury voting post and takes you straight to the courtroom

**Step 2: Review the Case**
- **Immersive Courtroom**: Experience the courtroom with a test background (`url(/TEST)`) for optimal readability
- **Header Information**: Case title and crime description prominently displayed in the courtroom header
- **Character Sections**: 
  - **"THE JURY"** (left): Represents you with jury imagery (`/lawyers/jury.png`)
  - **"THE ACCUSED"** (right): Shows the defendant with unique prisoner mugshot selected deterministically based on case ID
- **Defense Statement Section**: Clearly labeled section containing the attorney's defense argument highlighted with quotation marks and author attribution ("- Attorney [Username]")
- **Scrollable Layout**: Vertical single-column mobile-optimized design for easy case review

**Step 3: Cast Your Vote**
- Scroll through case details to review all information thoroughly
- Use the **fixed voting buttons at the bottom** of the screen via `VotingButtons` component for easy thumb access
- Choose between:
  - **GUILTY** (Red button with ⚖️ icon): You believe the defendant is guilty despite the defense
  - **NOT GUILTY** (Blue button with 🔨 icon): The defense convinced you of innocence/reasonable doubt
- Web Audio API synthesized gavel sound effect (300ms duration with frequency sweep and noise texture) plays when voting via `AudioManager` class with animated gavel bounce effect (`animate-bounce`) on the button icons
- Visual feedback fallback appears if audio fails ("🔨 GAVEL!" overlay with CSS animation) handled by `playGavelSound()` function
- Your vote is immediately recorded via `submitVote` function and cannot be changed

**Step 4: Watch Live Results**
- **Real-Time Updates**: Vote counts update automatically every 2 seconds via `useRealTimeUpdates` hook with seamless data synchronization and force update capabilities
- **Scales of Justice Display**: Clean visual representation via `ScalesOfJustice` component showing the current verdict and vote margin with color-coded backgrounds (red for guilty, blue for not guilty, yellow for tied)
- **Connection Status Indicators**: Visual indicators show live connection status in top-right corner with animated states:
  - 🟢 **Connected**: Live voting active with pulsing animation (`animate-pulse`)
  - 🟡 **Connecting**: Attempting to connect with spinning animation (`animate-spin`)
  - 🔴 **Error**: Connection issues detected (static red indicator)
  - ⚫ **Disconnected**: Offline mode (static gray indicator)
- **Live Vote Counts**: Separate red and green counters for Guilty and Not Guilty votes with current verdict display and total vote counter
- **Your Verdict Display**: After voting, see your personal verdict prominently displayed in a blue card with confirmation message ("Thank you for serving as a juror!")
- **Current Verdict Indicator**: Real-time display of leading verdict with vote margin ("Leading by X vote(s)") and clear visual emphasis
- **Verdict Images**: Dynamic verdict images (`/guilty.png`, `/not-guilty.png`) display based on majority vote with large verdict text overlay

### Scoring System & Competition

**Attorney Points (Sophisticated Algorithm):**
- **Base Score**: (Not Guilty votes × 2) - (Guilty votes)
- **Win Bonus**: +500 points if majority votes "Not Guilty"
- **Example**: 15 Not Guilty, 10 Guilty = (15×2) - 10 + 500 = 520 points
- **Strategy**: Focus on persuasive, creative defenses that resonate with the community

**Juror Points (Accuracy-Based):**
- **Accuracy Reward**: +10 points for each vote matching the final majority verdict
- **Example**: Vote "Not Guilty" and majority agrees = +10 points
- **Strategy**: Vote thoughtfully and independently to build long-term accuracy

**Hall of Justice Leaderboards:**
- Click **"🏛️ Hall of Justice"** button from Daily Docket footer
- Separate leaderboards for attorneys and jurors with distinct visual themes
- Personal performance dashboard with Reddit user avatars and detailed statistics
- Trophy recognition (🥇🥈🥉) for top 3 performers with special styling
- Comprehensive scoring explanations and interactive refresh functionality

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
- **Central Hub**: `App.tsx` manages intelligent game state routing between Daily Docket, Defense Form, Jury Voting, and Leaderboard screens with smooth CSS animations
- **Loading Experience**: Custom loading screen (`/New-Loading-Screen.png`) with professional styling and accessibility features
- **Intelligent Routing**: Automatic detection of post type (main game vs jury voting) for seamless user experience via the `useGame` hook
- **Streamlined Flow**: Game goes directly to Daily Docket for immediate gameplay and reduced friction

**🏛️ Core Components:**
- **Daily Docket**: Interactive case carousel with immersive courtroom background (`/court/court-background.png`), real-time date/time display updating every second, prisoner mugshots (deterministically selected from 6 sprites `/prisoners/1-6.png` based on case index), difficulty badges (🟢🟡🔴), and navigation controls with case counter
- **Defense Form**: 250-character defense writing interface with custom background (`/Defend-Background.png`), real-time validation, character counting with color-coded feedback (blue: 0-175, yellow: 176-225, red: 226-250), comprehensive error handling, success messaging with green checkmark, and objection lawyer imagery (`/lawyers/objection.png`)
- **Jury Voting**: Immersive courtroom experience with test background (`url(/TEST)`), scrollable single-column layout optimized for mobile, "THE JURY" (`/lawyers/jury.png`) and "THE ACCUSED" (deterministic prisoner selection) character sections, clearly labeled "Defense Statement" section with attorney attribution, live voting with fixed bottom `VotingButtons` component, and real-time results with connection status indicators
- **Leaderboard**: Hall of Justice rankings with personal performance dashboards, user avatars via `Avatar` component (Reddit API integration with fallback patterns), trophy recognition (🥇🥈🥉), detailed statistics for both attorney and juror performance, and comprehensive scoring explanations
- **Real-Time Updates**: Live vote polling every 2 seconds via `useRealTimeUpdates` hook with connection status indicators (🟢 connected, 🟡 connecting, 🔴 error, ⚫ disconnected) and seamless data synchronization

**🎯 Advanced Features:**
- **Scales of Justice Display**: Clean visual representation of voting results with current verdict indicator, vote margin display, and live indicator when connected
- **Enhanced UI Clarity**: Clear section labeling including "Defense Statement" headers, character sections ("THE JURY" and "THE ACCUSED"), and comprehensive case information display
- **Audio Integration**: Web Audio API implementation with synthesized gavel sound effects (300ms duration with frequency sweep and noise texture) via `AudioManager` class and graceful visual fallback ("🔨 GAVEL!" overlay) when audio fails
- **Mobile-First Design**: Optimized for Reddit's mobile user base with touch-friendly controls, fixed bottom voting buttons, responsive layouts, and mobile-touch-target classes
- **Accessibility Compliant**: Full WCAG compliance with screen reader support, keyboard navigation, ARIA labels, semantic HTML structure, skip links, and live regions for dynamic content updates

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

- **Immersive Gameplay**: Professional courtroom atmosphere with character positioning, real-time voting drama, Web Audio API synthesized sound effects via `AudioManager` class, and authentic legal theming
- **Social Engagement**: Community-driven content creation where every defense becomes a new post for voting via `createDefensePost` function
- **Technical Excellence**: Modern React.js architecture with custom hooks (`useGame`, `useJuryVoting`, `useRealTimeUpdates`, `useLeaderboard`), real-time updates every 2 seconds, mobile optimization, and comprehensive accessibility (WCAG compliant)
- **Native Integration**: Seamless Reddit experience with automatic authentication, intelligent post type detection via `InitResponse` and `JuryVotingInitResponse`, and zero external dependencies
- **Competitive Elements**: Sophisticated dual scoring algorithms, Hall of Justice leaderboards with `Avatar` component integration, and personal performance tracking

The current implementation provides a complete gaming experience with streamlined access to browsing daily cases via interactive carousel, writing 250-character defenses with real-time validation, and participating in immersive jury voting with live results updating every 2 seconds via `useRealTimeUpdates` hook. Players can compete on Hall of Justice leaderboards with personal performance dashboards featuring Reddit avatars and trophy recognition (🥇🥈🥉).
