# Better Call Snoo

**Better Call Snoo** is an interactive counter game built for Reddit using the Devvit platform. This engaging web application allows Reddit users to collaboratively increment and decrement a shared counter, creating a community-driven experience directly within Reddit posts.

## What is Better Call Snoo?

Better Call Snoo is a simple yet addictive clicker game where users can:
- **Increment** the counter by clicking the "+" button
- **Decrement** the counter by clicking the "-" button  
- **View** their Reddit username displayed in the interface
- **Participate** in a shared, persistent counter that saves across sessions

The game features a clean, mobile-first design with Reddit's signature orange color scheme and the beloved Snoo mascot as the centerpiece.

## What Makes This Game Innovative?

1. **Reddit-Native Experience**: Runs directly inside Reddit posts without requiring external websites or downloads
2. **Persistent State**: Uses Redis to maintain the counter value across all user sessions and interactions
3. **Real-time Synchronization**: All users see the same counter value, creating a shared community experience
4. **Optimistic Updates**: Provides instant visual feedback while syncing with the server in the background
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
2. **Launch**: Click the "Tap to Start" button on the splash screen to open the full game
3. **Play**: 
   - Click the **"+"** button to increase the counter
   - Click the **"-"** button to decrease the counter
   - Watch as your changes are instantly reflected and saved
4. **Compete**: See how high (or low) you and the community can make the counter go!

### Game Features:
- **Instant Feedback**: Your clicks register immediately with smooth animations
- **Persistent Progress**: The counter value is saved and shared across all players
- **User Recognition**: Your Reddit username is displayed while you play
- **Mobile Friendly**: Optimized for both desktop and mobile Reddit browsing

### Tips for Playing:
- The counter starts at 0 and can go positive or negative
- All players share the same counter - it's a community effort!
- Your changes are saved automatically - no need to worry about losing progress
- The game works best on the official Reddit app or website

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
- **React App**: Main game interface with counter buttons and user display
- **Custom Hook**: `useCounter` manages state, API calls, and optimistic updates
- **Responsive Design**: Mobile-first approach with Tailwind CSS styling

### Server (`src/server/`)
- **Express API**: RESTful endpoints for game state management
- **Redis Integration**: Persistent counter storage using Redis
- **Reddit Integration**: User authentication and post creation

### API Endpoints
- `GET /api/init`: Initialize game state and fetch current counter value
- `POST /api/increment`: Increase counter by 1
- `POST /api/decrement`: Decrease counter by 1

## Cursor Integration

This template comes with a pre-configured cursor environment. To get started, [download cursor](https://www.cursor.com/downloads) and enable the `devvit-mcp` when prompted.
