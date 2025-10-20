# Better Call Snoo

**Better Call Snoo** is an Ace Attorney-inspired legal defense game built for Reddit using the Devvit platform. This interactive web application transforms Reddit into a virtual courtroom where players defend quirky cases with creative arguments while the community acts as jury, creating an engaging social experience with competitive elements.

## What is Better Call Snoo?

Better Call Snoo is a daily legal defense game where players can:
- **Browse Daily Cases**: View 5 randomly selected funny legal cases each day from the Daily Docket
- **Submit Creative Defenses**: Write 250-character defense arguments for chosen cases
- **Vote as Jury**: Participate in community voting on defense submissions with GUILTY/NOT GUILTY verdicts
- **Compete for Points**: Earn scores as both attorneys (defense creators) and jurors (voters)
- **Climb Leaderboards**: See top-performing attorneys and jurors in the community

The game features an Ace Attorney-inspired courtroom aesthetic with Reddit's beloved Snoo characters as the defendant and defense attorney.

## What Makes This Game Innovative?

1. **Reddit-Native Experience**: Runs directly inside Reddit posts without requiring external websites or downloads
2. **Daily Fresh Content**: New cases appear every 24 hours, keeping the game engaging
3. **Community-Driven Gameplay**: Each defense becomes a separate Reddit post for community voting
4. **Dual Scoring System**: Players earn points both for creating winning defenses and accurate jury voting
5. **Mobile-Optimized**: Designed with mobile-first principles for Reddit's predominantly mobile user base
6. **Zero Setup**: Users can play immediately without accounts, downloads, or complex setup

## Technology Stack

- **Devvit**: Reddit's developer platform for building apps
- **React.JS**: Frontend engine for client rendering
- **TypeScript**: Primary language with strict type checking
- **Vite**: Build tool for both client and server bundles
- **Express**: Server-side HTTP framework
- **Redis**: Data persistence layer (via Devvit)
- **Tailwind CSS**: Utility-first CSS framework for styling

## How to Play

### For Reddit Users:
1. **Find the Game**: Look for "Better Call Snoo" posts in participating subreddits
2. **Launch**: Click the "Enter Courtroom" button on the splash screen to open the full game
3. **Play the Daily Docket**: 
   - Browse 5 daily cases with funny crimes and scenarios
   - Click "Defend" on any case that catches your interest
   - Read the case details and difficulty level
4. **Submit Your Defense**: 
   - Write a creative 250-character defense argument
   - Watch the character counter as you type
   - Submit your defense to create a new Reddit post for jury voting
5. **Vote as Jury**: 
   - Visit defense posts created by other players
   - Read the case details and defense argument
   - Vote GUILTY or NOT GUILTY based on how convincing the defense is
   - Hear the gavel sound effect when you cast your vote
6. **Watch Results**: 
   - See live vote percentages on the Scales of Justice
   - Watch character poses change based on vote balance
   - Check leaderboards to see top attorneys and jurors

### Game Features:
- **Daily Fresh Cases**: 5 new random cases every 24 hours from a library of 50+ funny scenarios
- **Creative Defense System**: 250-character limit encourages witty, concise arguments
- **Community Jury Voting**: Each defense becomes a separate Reddit post for voting
- **Dual Scoring System**: Earn points as both attorney (creating defenses) and juror (voting)
- **Live Vote Visualization**: Animated Scales of Justice show real-time vote percentages
- **Ace Attorney Aesthetic**: Courtroom layout with Victim Snoo and Lawyer Snoo characters
- **Mobile Optimized**: Full functionality on mobile devices without horizontal scrolling
- **Leaderboards**: Track top-performing attorneys and jurors in the community

### Scoring System:
**As an Attorney (Defense Creator):**
- Base Score: (Not Guilty votes × 2) - (Guilty votes)
- Win Bonus: +500 points if your defense gets majority Not Guilty verdict
- Total Score: Sum of all your defense scores

**As a Juror (Voter):**
- +10 points for each vote that matches the final majority verdict
- 0 points for votes that don't match the majority
- Total Score: Sum of all your correct jury votes

### Tips for Success:
- **For Attorneys**: Be creative, funny, and persuasive in your 250-character defenses
- **For Jurors**: Vote based on how convincing the defense argument is
- **Strategy**: Easy cases may have more competition, but hard cases offer the same scoring potential
- **Community**: Engage with other players in the comments of defense posts

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

### Current API Endpoints
- `GET /api/init`: Initialize game state, fetch daily cases, and get user info
- `POST /api/submit-defense`: Submit a defense argument for a case
- `POST /api/vote`: Submit a jury vote (GUILTY/NOT GUILTY) on a defense
- `GET /api/votes`: Fetch current vote counts and user's vote status
- `POST /internal/on-app-install`: Automatically creates a game post when the app is installed
- `POST /internal/menu/post-create`: Creates a new game post via moderator menu

### Data Models
- **Cases**: Predefined funny legal scenarios with titles, crimes, difficulty, and categories
- **Defenses**: User-submitted 250-character arguments linked to specific cases
- **Votes**: Community jury votes on defense submissions with real-time tracking
- **Scores**: Dual scoring system for attorneys (defense creators) and jurors (voters)
- **Leaderboards**: Rankings of top-performing attorneys and jurors

### Game Flow
1. **Daily Docket**: Players see 5 random cases refreshed daily
2. **Defense Creation**: Players write defenses that become new Reddit posts
3. **Jury Voting**: Community votes on defenses in custom post interfaces
4. **Score Calculation**: Points awarded based on defense success and jury accuracy
5. **Leaderboards**: Rankings updated in real-time based on performance

The complete game specification can be found in `.kiro/specs/better-call-snoo/`.

## Cursor Integration

This template comes with a pre-configured cursor environment. To get started, [download cursor](https://www.cursor.com/downloads) and enable the `devvit-mcp` when prompted.
