# Design Document

## Overview

The "Better Call Snoo" game is a Reddit-native legal defense game that transforms the platform into a virtual courtroom. Players defend quirky cases with creative arguments while the community acts as jury, creating an engaging social experience with competitive elements.

### Core Game Loop
1. **Daily Discovery**: Players browse 5 daily cases from the Daily Docket
2. **Defense Creation**: Players craft 250-character defenses for chosen cases
3. **Community Judgment**: Each defense becomes a separate Reddit post for voting
4. **Competitive Scoring**: Attorneys and jurors earn points based on performance

## Architecture

### System Components

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Daily Docket  │    │ Defense Creator │    │ Jury Voting     │
│   (Main Hub)    │───▶│   (Form)        │───▶│   (Custom Post) │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Case Data     │    │ Post Creation   │    │ Vote Tracking   │
│   (Redis)       │    │   (Reddit API)  │    │   (Redis)       │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                                             │
         └─────────────────┬─────────────────────────────┘
                           ▼
                 ┌─────────────────┐
                 │  Leaderboards   │
                 │   (Redis)       │
                 └─────────────────┘
```

### Technical Stack
- **Frontend**: React with TypeScript in `/src/client/`
- **Backend**: Express server with Devvit integration in `/src/server/`
- **Data Layer**: Redis for persistence and real-time updates
- **Post System**: Devvit Custom Posts for jury voting screens
- **Audio**: Web Audio API for gavel sound effects

## Components and Interfaces

### 1. Daily Docket System

**Purpose**: Main game hub displaying 5 random cases daily

**Interface Design**:
```typescript
interface DailyDocket {
  cases: Case[];
  selectedDate: string;
  refreshTime: number;
}

interface Case {
  id: string;
  title: string;
  crime: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
}
```

**Visual Design**:
- Ace Attorney-inspired courtroom background
- Scroll-free mobile layout with card-based case presentation
- Each case card shows title, crime description, and "Defend" button
- Daily refresh indicator showing time until new cases

**Key Features**:
- Deterministic daily randomization using date-based seed
- Case difficulty indicators for strategic selection
- Smooth transitions between case selection and defense form

### 2. Defense Submission Form

**Purpose**: Interface for creating 250-character defense arguments

**Interface Design**:
```typescript
interface DefenseSubmission {
  caseId: string;
  defenseText: string;
  authorId: string;
  timestamp: number;
  characterCount: number;
}
```

**Visual Design**:
- Large text area with real-time character counter (250/250)
- Character counter changes color as limit approaches (green → yellow → red)
- Submit button disabled until valid defense entered
- Case context displayed above form for reference

**UX Considerations**:
- Auto-save draft to prevent loss
- Clear validation messages
- Smooth animation on character limit warnings

### 3. Custom Post Creator

**Purpose**: Generates individual Reddit posts for each defense submission

**Implementation**:
```typescript
interface CustomPostData {
  caseTitle: string;
  crimediumescription: string;
  defenseText: string;
  authorUsername: string;
  submissionTime: number;
  votingEndTime: number;
}
```

**Post Structure**:
- Custom post type with embedded jury voting interface
- Post title format: "Better Call Snoo: [Case Title]"
- Post flair indicating case category
- 24-hour voting period with automatic closure

### 4. Jury Voting Screen

**Purpose**: Interactive courtroom interface matching provided UI sketch

**Visual Components**:
- **Victim Snoo**: Animated defendant character with sad/worried poses
- **Lawyer Snoo**: Animated attorney character with confident/pleading poses
- **Case Display**: Scrolling banner showing case title and crime
- **Defense Bubble**: Speech bubble containing the submitted defense
- **Voting Buttons**: Large "GUILTY" (red) and "NOT GUILTY" (green) buttons
- **Scales of Justice**: Live-updating visual representation of vote balance

**Interface Design**:
```typescript
interface JuryVotingState {
  caseData: Case;
  defenseText: string;
  authorUsername: string;
  votes: {
    guilty: number;
    notGuilty: number;
  };
  userVote?: 'guilty' | 'not_guilty';
  votingClosed: boolean;
  finalVerdict?: 'guilty' | 'not_guilty';
}
```

**Interactive Elements**:
- Hover effects on voting buttons
- Character pose changes based on vote percentages
- Gavel sound effect on vote submission
- Smooth percentage updates without page refresh

### 5. Scales of Justice Display

**Purpose**: Visual representation of live voting results

**Design Specifications**:
- Traditional balance scale graphic
- Left scale: "GUILTY" votes (red)
- Right scale: "NOT GUILTY" votes (green)
- Scale tips based on vote percentage difference
- Percentage numbers displayed on each scale
- Smooth animations for vote updates

**Implementation**:
```typescript
interface ScalesState {
  guiltyPercentage: number;
  notGuiltyPercentage: number;
  totalVotes: number;
  scaleRotation: number; // -45° to +45° based on balance
}
```

### 6. Scoring Systems

**Attorney Scoring Algorithm**:
```typescript
function calculateAttorneyScore(votes: VoteData): number {
  const baseScore = (votes.notGuilty * 2) - votes.guilty;
  const winBonus = votes.notGuilty > votes.guilty ? 500 : 0;
  return baseScore + winBonus;
}
```

**Juror Scoring Algorithm**:
```typescript
function calculateJurorScore(userVote: string, finalVerdict: string): number {
  return userVote === finalVerdict ? 10 : 0;
}
```

**Leaderboard Interface**:
```typescript
interface LeaderboardEntry {
  username: string;
  score: number;
  rank: number;
  casesDefended?: number; // For attorneys
  casesJudged?: number;   // For jurors
  winRate?: number;       // For attorneys
  accuracy?: number;      // For jurors
}
```

## Data Models

### Redis Schema

**Daily Cases**:
```
Key: "daily_cases:{YYYY-MM-DD}"
Value: JSON array of 5 case IDs
TTL: 24 hours
```

**Case Library**:
```
Key: "case:{case_id}"
Value: {
  title: string,
  crime: string,
  category: string,
  difficulty: string
}
TTL: Never (permanent case library)
```

**Defense Submissions**:
```
Key: "defense:{post_id}"
Value: {
  caseId: string,
  defenseText: string,
  authorId: string,
  timestamp: number,
  votingEndTime: number
}
TTL: 30 days (compliance with user deletion policy)
```

**Vote Tracking**:
```
Key: "votes:{post_id}"
Value: {
  guilty: number,
  notGuilty: number,
  voters: Set<user_id>,
  finalVerdict?: string
}
TTL: 30 days
```

**User Scores**:
```
Key: "attorney_scores"
Type: Sorted Set
Members: user_id, Score: total_points

Key: "juror_scores"  
Type: Sorted Set
Members: user_id, Score: total_points
```

**Vote History** (for juror scoring):
```
Key: "user_votes:{user_id}"
Value: Array of {
  postId: string,
  vote: string,
  timestamp: number,
  finalVerdict?: string
}
TTL: 30 days
```

## Error Handling

### Client-Side Error Handling

**Network Failures**:
- Retry mechanism for API calls with exponential backoff
- Offline state detection with user notification
- Local storage backup for defense drafts

**Validation Errors**:
- Real-time form validation with clear error messages
- Character limit enforcement with visual feedback
- Empty submission prevention

**Audio Failures**:
- Graceful degradation if gavel sound fails to load
- Silent fallback with visual feedback only

### Server-Side Error Handling

**Redis Connection Issues**:
- Connection retry logic with circuit breaker pattern
- Fallback to in-memory storage for critical operations
- Error logging for monitoring

**Reddit API Failures**:
- Retry logic for post creation
- Fallback error pages for failed custom posts
- User notification system for submission failures

**Vote Processing Errors**:
- Transaction-based vote recording to prevent double-voting
- Rollback mechanisms for failed vote updates
- Audit logging for vote integrity

### Data Consistency

**Concurrent Vote Handling**:
```typescript
// Redis transaction for atomic vote recording
async function recordVote(postId: string, userId: string, vote: string) {
  const txn = await redis.watch(`votes:${postId}`);
  await txn.multi();
  await txn.sadd(`voters:${postId}`, userId);
  await txn.hincrby(`votes:${postId}`, vote, 1);
  await txn.set(`user_vote:${postId}:${userId}`, vote);
  return await txn.exec();
}
```

**Score Calculation Integrity**:
- Scheduled batch processing for score updates
- Verification checks against vote totals
- Manual reconciliation tools for administrators

## Testing Strategy

### Unit Testing Focus Areas

**Core Game Logic**:
- Daily case selection algorithm
- Scoring calculation functions
- Vote percentage calculations
- Character limit validation

**Data Layer**:
- Redis operations and transactions
- Error handling and retry logic
- Data serialization/deserialization

### Integration Testing

**API Endpoints**:
- Defense submission flow
- Vote recording and retrieval
- Leaderboard generation
- Custom post creation

**Reddit Integration**:
- Custom post rendering
- User authentication flow
- Post creation and management

### User Experience Testing

**Mobile Responsiveness**:
- Touch interaction testing across devices
- Performance testing on slower connections
- Accessibility compliance verification

**Audio Integration**:
- Cross-browser audio compatibility
- Volume level appropriateness
- Fallback behavior testing

### Performance Testing

**Load Testing Scenarios**:
- Concurrent voting on popular defenses
- Daily case refresh under high load
- Leaderboard queries with large datasets

**Optimization Targets**:
- Initial page load < 2 seconds
- Vote submission response < 500ms
- Leaderboard refresh < 1 second

## Mobile-First Design Considerations

### Responsive Layout Strategy

**Viewport Breakpoints**:
- Mobile: 320px - 768px (primary focus)
- Tablet: 768px - 1024px
- Desktop: 1024px+ (enhancement)

**Touch-Friendly Interface**:
- Minimum 44px touch targets for all interactive elements
- Adequate spacing between voting buttons
- Swipe gestures for case navigation (optional enhancement)

**Performance Optimization**:
- Lazy loading for non-critical assets
- Compressed images with WebP fallbacks
- Minimal JavaScript bundle size

### Accessibility Features

**Screen Reader Support**:
- Semantic HTML structure
- ARIA labels for interactive elements
- Alt text for all character sprites

**Keyboard Navigation**:
- Tab order optimization
- Enter/Space key support for voting
- Escape key for modal dismissal

**Visual Accessibility**:
- High contrast color schemes
- Scalable text (up to 200% zoom)
- Color-blind friendly vote button design

This design provides a comprehensive foundation for implementing the "Better Call Snoo" game while ensuring scalability, maintainability, and an excellent user experience across all devices.
