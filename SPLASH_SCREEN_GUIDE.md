# Better Call Snoo - Splash Screen Guide

## Overview

Better Call Snoo features a comprehensive dual-splash screen system that creates an engaging entry experience for Reddit users:

1. **Reddit Native Splash Screen**: Appears first on the Reddit feed with custom branding
2. **In-App Custom Splash Screen**: Provides an immersive game introduction

## How It Works

### Loading Sequence

When users visit your Reddit post, they experience:

1. **Reddit Native Splash**: Custom-branded entry point with the new Better Call Snoo icon
2. **In-App Splash**: Animated courtroom scene with interactive elements
3. **Main Game Interface**: Daily Docket with case selection

### Enhanced Features

- **Custom Legal Icon**: New SVG icon featuring Snoo as a lawyer with scales of justice
- **Animated Courtroom Scene**: Interactive character with floating legal elements
- **Enhanced Call-to-Action**: "Enter Courtroom" button with legal theming
- **Game Feature Showcase**: Three highlighted game modes with hover effects
- **Mobile-Optimized Design**: Responsive layout with touch-friendly interactions

## Asset Configuration

### Reddit Native Splash Screen Assets

**Current Configuration** (in `src/server/core/post.ts`):

- `appIconUri: 'better-call-snoo-icon.svg'` - Custom legal-themedium icon
- `backgroundUri: 'default-splash.png'` - Courtroom background
- `buttonLabel: '⚖️ Enter Courtroom ⚖️'` - Legal-themedium CTA

### In-App Splash Screen Assets

**Key Assets** in `/assets/`:

- `better-call-snoo-icon.svg` - **NEW**: Custom icon with Snoo lawyer, scales, gavel
- `better-call-snoo-logo.svg` - Game logo with legal elements
- `default-splash.png` - Courtroom background image

### Icon Customization

The new `better-call-snoo-icon.svg` features:

- Snoo character as a lawyer with powdered wig
- Scales of justice as central element
- Gavel and law book as supporting elements
- Professional legal color scheme (gold, dark blue, white)
- Circular design optimized for Reddit's icon display

To customize the icon:

1. Edit `assets/better-call-snoo-icon.svg` directly
2. Maintain 512x512 viewBox for optimal display
3. Keep legal theme elements for brand consistency

### Enhanced Animations

**New Animations** in `/src/client/index.css`:

- `icon-glow` - Multi-layered glow effect for the main icon
- `courtroom-entrance` - Dramatic entrance animation for legal elements
- `legal-badge-spin` - Rotating animation for legal badges
- `floating-elements` - Ambient floating legal symbols

**Enhanced Visual Effects**:

- Multi-layered glow effects around the main icon
- Floating legal elements (scales, gavel, scrolls, courthouse)
- Interactive hover states on all elements
- Smooth transitions between game states

### Color Scheme & Theming

**Legal Professional Palette**:

- **Primary Gold**: `#fbbf24` (yellow-400) - Justice, prestige
- **Deep Navy**: `#1e293b` (slate-800) - Authority, professionalism
- **Accent Amber**: `#f59e0b` (amber-500) - Warmth, approachability
- **Reddit Orange**: `#ff4500` - Brand consistency
- **Courtroom Gradients**: Dark blues to purples for dramatic effect

### Content Personalization

**Reddit Native Splash**:

- Dynamic descriptions based on post type (main game vs jury voting)
- Contextual button labels ("Enter Courtroom" vs "Enter Jury Box")
- Case-specific information for defense posts

**In-App Splash**:

- Interactive character with dynamic speech bubbles
- Animated feature showcase with hover effects
- Contextual call-to-action messaging

## File Structure

```
src/client/components/SplashScreen/
├── SplashScreen.tsx    # Main component
└── index.ts           # Export file

assets/
├── default-splash.png      # Background image
├── better-call-snoo-logo.svg  # Custom logo
└── default-splash.png         # Alternative splash

src/client/
├── App.tsx            # Updated to include splash state
└── index.css          # Splash-specific animations
```

## Game State Flow

1. `splash` - Shows custom splash screen
2. `daily_docket` - Main game interface
3. `defense_submission` - Case defense form
4. `jury_voting` - Voting interface
5. `leaderboard` - Leaderboard view

## Mobile Optimization

The splash screen is fully mobile-optimized with:

- Responsive text sizing (`text-5xl md:text-7xl`)
- Touch-friendly buttons (`mobile-touch-target`)
- Proper spacing (`mobile-spacing`)
- Accessible navigation

## Accessibility Features

- Screen reader support with proper ARIA labels
- Keyboard navigation support
- High contrast mode compatibility
- Reduced motion support for users with vestibular disorders
- Skip links for screen readers

## Testing

To test your splash screen:

1. Run `npm run dev`
2. Open the provided playtest URL
3. The splash screen should appear first
4. Click "PLAY GAME" to proceed to the Daily Docket

## Tips for Enhancement

1. **Custom Artwork**: Commission or create custom Snoo artwork for your legal theme
2. **Sound Effects**: Add sound effects for button clicks and animations (if supported)
3. **Particle Effects**: Add CSS particle animations for more visual appeal
4. **Loading States**: Show loading progress during data fetching
5. **Seasonal Themes**: Create different splash screens for holidays or events

## Troubleshooting

If the splash screen doesn't appear:

1. Check that `gameState` starts as `'splash'` in `useGame.ts`
2. Verify the splash screen component is imported in `App.tsx`
3. Ensure assets are in the correct `/assets/` folder
4. Check browser console for any errors

The splash screen will automatically skip for jury voting posts to maintain the voting flow.
