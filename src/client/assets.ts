// src/client/assets.ts

export const gameAssets = {
  backgrounds: {
    courtroom1:
      'https://github.com/krm-aadil/GIT-IMAGES/blob/main/reddit-sample/Gemini_Generated_Image_wek3k1wek3k1wek3.png?raw=true',
    courtroom2:
      'https://github.com/krm-aadil/GIT-IMAGES/blob/main/reddit-sample/Gemini_Generated_Image_fyvu4afyvu4afyvu.png?raw=true',
    // Add more if you generated variations
  },
  characters: {
    victimSnooWorried:
      'https://github.com/krm-aadil/GIT-IMAGES/blob/main/reddit-sample/Gemini_Generated_Image_3vgr8z3vgr8z3vgr.png?raw=true',
    lawyerSnooObjection:
      'https://github.com/krm-aadil/GIT-IMAGES/blob/main/reddit-sample/Gemini_Generated_Image_iypr34iypr34iypr.png?raw=true',
    judgeSnooStern:
      'https://github.com/krm-aadil/GIT-IMAGES/blob/main/reddit-sample/Gemini_Generated_Image_xyd0ryxyd0ryxyd0.png?raw=true', // Optional
  },
  ui: {
    objectionBubble:
      'https://github.com/krm-aadil/GIT-IMAGES/blob/main/reddit-sample/Gemini_Generated_Image_2epj0g2epj0g2epj.png?raw=true',
    scalesIcon:
      'https://github.com/krm-aadil/GIT-IMAGES/blob/main/reddit-sample/Gemini_Generated_Image_ipanclipanclipan.png?raw=true',
    gavelIcon:
      'https://github.com/krm-aadil/GIT-IMAGES/blob/main/reddit-sample/Gemini_Generated_Image_qjot28qjot28qjot.png?raw=true', // If needed for UI, not just sound
  },
  // Optional Accessories
  accessories: {
    pickle:
      'https://github.com/krm-aadil/GIT-IMAGES/blob/main/reddit-sample/Gemini_Generated_Image_mr3mkmmr3mkmmr3m.png?raw=true',
    pizzaSlice:
      'https://github.com/krm-aadil/GIT-IMAGES/blob/main/reddit-sample/Gemini_Generated_Image_mr3mkmmr3mkmmr3m.png?raw=true',
    // Add more as needed
  },
};

// Helper function to get a random courtroom background
export const getRandomCourtroom = (): string => {
  const backgroundUrls = Object.values(gameAssets.backgrounds);
  if (backgroundUrls.length === 0) {
    // Fallback if no backgrounds are defined
    return 'none'; // Or a default color/gradient
  }
  return backgroundUrls[Math.floor(Math.random() * backgroundUrls.length)]!;
};
