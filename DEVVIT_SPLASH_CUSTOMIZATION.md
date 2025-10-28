# Devvit Splash Screen Customization Guide

## Overview

The "Welcome to the Game!" screen you see is Devvit's built-in splash screen. To customize it like the Riddonkulous example, you need to modify your `devvit.json` configuration.

## Current vs Custom Splash Screen

**Current (Default):**
- Generic "Welcome to the Game!" title
- "An exciting interactive experience" subtitle  
- Orange Devvit icon
- "Tap to Start" button

**Custom (What you want):**
- "Better Call Snoo" title
- Legal-themed subtitle
- Custom icon and background
- "DEFEND NOW!" button

## How to Customize

### Step 1: Update devvit.json

Add splash configuration to your `devvit.json` file. Replace the current `post` section with:

```json
{
  "$schema": "https://developers.reddit.com/schema/config-file.v1.json",
  "name": "better-call-snoo",
  "post": {
    "dir": "dist/client",
    "entrypoints": {
      "default": {
        "entry": "index.html",
        "splash": {
          "title": "Better Call Snoo",
          "subtitle": "Can you prove your client's innocence?",
          "description": "Ace Attorney style legal defense game",
          "icon": "default-icon.png",
          "background": "default-splash.png",
          "buttonText": "DEFEND NOW!"
        }
      },
      "jury-voting": {
        "entry": "index.html",
        "splash": {
          "title": "Jury Duty",
          "subtitle": "Justice awaits your verdict",
          "description": "Vote on this defense case",
          "icon": "default-icon.png",
          "background": "default-splash.png",
          "buttonText": "CAST VOTE"
        }
      }
    }
  },
  "server": {
    "dir": "dist/server",
    "entry": "index.cjs"
  },
  "media": {
    "dir": "assets"
  },
  "menu": {
    "items": [
      {
        "label": "Create a new post",
        "description": "better-call-snoo",
        "location": "subreddit",
        "forUserType": "moderator",
        "endpoint": "/internal/menu/post-create"
      }
    ]
  },
  "triggers": {
    "onAppInstall": "/internal/on-app-install"
  }
}
```

### Step 2: Create Custom Assets

You already have some assets, but you may want to create custom ones:

#### Custom Icon (512x512px recommended)
- Create a legal-themed icon (scales of justice, gavel, Snoo in lawyer outfit)
- Save as `assets/custom-icon.png`
- Update `"icon": "custom-icon.png"` in devvit.json

#### Custom Background (1920x1080px recommended)
- You already have `default-splash.png`
- Make sure it's legal-themed (courtroom, law books, etc.)
- Should work well with text overlay

### Step 3: Splash Configuration Options

Available splash screen properties:

```json
"splash": {
  "title": "Your Game Title",           // Main title text
  "subtitle": "Engaging subtitle",      // Subtitle text
  "description": "Game description",    // Longer description
  "icon": "icon-file.png",             // Icon image (from assets/)
  "background": "bg-file.png",         // Background image (from assets/)
  "buttonText": "CUSTOM BUTTON TEXT"   // Button text instead of "Tap to Start"
}
```

### Step 4: Asset Requirements

**Icon:**
- Format: PNG, JPG, or SVG
- Size: 512x512px (recommended)
- Should be square
- Will be displayed as circular

**Background:**
- Format: PNG or JPG
- Size: 1920x1080px (recommended)
- Should work with text overlay
- Consider mobile aspect ratios

### Step 5: Testing

After updating `devvit.json`:

1. Stop your dev server (`Ctrl+C`)
2. Run `npm run build` to rebuild
3. Run `npm run dev` to restart
4. Open the playtest URL
5. You should see your custom splash screen

## Example Custom Assets

### Custom Icon Ideas:
- Snoo wearing a lawyer wig
- Scales of justice with Snoo
- Gavel with Reddit logo
- Courthouse with Snoo

### Custom Background Ideas:
- Courtroom interior
- Law library with books
- Justice-themed abstract design
- Ace Attorney style courtroom

## Troubleshooting

**Splash screen not updating:**
1. Clear browser cache
2. Rebuild with `npm run build`
3. Restart dev server
4. Check asset file paths in devvit.json

**Assets not loading:**
1. Ensure files are in `/assets/` folder
2. Check file names match exactly in devvit.json
3. Verify file formats (PNG, JPG, SVG)
4. Check file sizes aren't too large

**Text not readable:**
1. Adjust background image contrast
2. Use darker/lighter backgrounds
3. Add text shadows in CSS if needed

## Advanced Customization

For even more control, you can:

1. **Create multiple splash variants** for different post types
2. **Use CSS overlays** in your app for additional styling
3. **Add animations** that start after splash screen
4. **Coordinate colors** between splash and your app

## Current Assets Available

You already have these assets that can be used:
- `assets/default-icon.png` - Default icon
- `assets/default-splash.png` - Alternative splash image  
- `assets/default-splash.png` - Your custom background
- `assets/loading.gif` - Loading animation

## Next Steps

1. **Update devvit.json** with the splash configuration above
2. **Create custom icon** if you want something more specific than default-icon.png
3. **Test the changes** by rebuilding and restarting dev server
4. **Iterate on design** based on how it looks

The splash screen customization will give you that professional, branded look like the Riddonkulous game example you showed!
