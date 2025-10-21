/**
 * Audio utility for playing sound effects with graceful fallback
 */

export class AudioManager {
  private audioContext: AudioContext | null = null;
  private gavelBuffer: AudioBuffer | null = null;
  private isInitialized = false;
  private initializationPromise: Promise<void> | null = null;

  constructor() {
    // Initialize audio context lazily to comply with browser autoplay policies
  }

  /**
   * Initialize the audio system (must be called after user interaction)
   */
  async initialize(): Promise<void> {
    if (this.initializationPromise) {
      return this.initializationPromise;
    }

    this.initializationPromise = this._initialize();
    return this.initializationPromise;
  }

  private async _initialize(): Promise<void> {
    try {
      // Create audio context
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      
      // Load gavel sound effect
      await this.loadGavelSound();
      
      this.isInitialized = true;
      console.log('Audio system initialized successfully');
    } catch (error) {
      console.warn('Failed to initialize audio system:', error);
      this.isInitialized = false;
    }
  }

  /**
   * Load the gavel sound effect
   */
  private async loadGavelSound(): Promise<void> {
    if (!this.audioContext) return;

    try {
      // Create a simple gavel sound using Web Audio API synthesis
      // Since we don't have an actual audio file, we'll synthesize a gavel-like sound
      const sampleRate = this.audioContext.sampleRate;
      const duration = 0.3; // 300ms
      const length = sampleRate * duration;
      
      const buffer = this.audioContext.createBuffer(1, length, sampleRate);
      const data = buffer.getChannelData(0);
      
      // Generate a gavel-like sound (sharp attack, quick decay)
      for (let i = 0; i < length; i++) {
        const t = i / sampleRate;
        const envelope = Math.exp(-t * 15); // Quick decay
        const frequency = 200 + (100 * Math.exp(-t * 20)); // Frequency sweep down
        const noise = (Math.random() - 0.5) * 0.3; // Add some noise for wood-like texture
        
        data[i] = (Math.sin(2 * Math.PI * frequency * t) + noise) * envelope * 0.3;
      }
      
      this.gavelBuffer = buffer;
    } catch (error) {
      console.warn('Failed to create gavel sound:', error);
    }
  }

  /**
   * Play the gavel sound effect
   */
  async playGavel(): Promise<boolean> {
    try {
      // Initialize if not already done
      if (!this.isInitialized) {
        await this.initialize();
      }

      if (!this.audioContext || !this.gavelBuffer) {
        console.warn('Audio system not available, skipping gavel sound');
        return false;
      }

      // Resume audio context if suspended (browser autoplay policy)
      if (this.audioContext.state === 'suspended') {
        await this.audioContext.resume();
      }

      // Create and play the sound
      const source = this.audioContext.createBufferSource();
      const gainNode = this.audioContext.createGain();
      
      source.buffer = this.gavelBuffer;
      source.connect(gainNode);
      gainNode.connect(this.audioContext.destination);
      
      // Set volume
      gainNode.gain.setValueAtTime(0.5, this.audioContext.currentTime);
      
      // Play the sound
      source.start();
      
      return true;
    } catch (error) {
      console.warn('Failed to play gavel sound:', error);
      return false;
    }
  }

  /**
   * Check if audio is supported and available
   */
  isAudioSupported(): boolean {
    return !!(window.AudioContext || (window as any).webkitAudioContext);
  }

  /**
   * Get audio system status
   */
  getStatus(): {
    supported: boolean;
    initialized: boolean;
    contextState?: string;
  } {
    return {
      supported: this.isAudioSupported(),
      initialized: this.isInitialized,
      ...(this.audioContext?.state && { contextState: this.audioContext.state }),
    };
  }
}

// Create a singleton instance
export const audioManager = new AudioManager();

/**
 * Simple function to play gavel sound with visual feedback fallback
 */
export async function playGavelSound(): Promise<{
  played: boolean;
  fallbackUsed: boolean;
}> {
  const played = await audioManager.playGavel();
  
  if (!played) {
    // Visual feedback fallback
    showVisualGavelFeedback();
    return { played: false, fallbackUsed: true };
  }
  
  return { played: true, fallbackUsed: false };
}

/**
 * Visual feedback when audio fails
 */
function showVisualGavelFeedback(): void {
  // Create a temporary visual element to indicate the gavel sound
  const feedback = document.createElement('div');
  feedback.textContent = '🔨 GAVEL!';
  feedback.style.cssText = `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgba(0, 0, 0, 0.8);
    color: white;
    padding: 20px;
    border-radius: 10px;
    font-size: 24px;
    font-weight: bold;
    z-index: 10000;
    pointer-events: none;
    animation: gavelFeedback 1s ease-out forwards;
  `;
  
  // Add CSS animation
  const style = document.createElement('style');
  style.textContent = `
    @keyframes gavelFeedback {
      0% { opacity: 0; transform: translate(-50%, -50%) scale(0.5); }
      50% { opacity: 1; transform: translate(-50%, -50%) scale(1.2); }
      100% { opacity: 0; transform: translate(-50%, -50%) scale(1); }
    }
  `;
  document.head.appendChild(style);
  
  document.body.appendChild(feedback);
  
  // Remove after animation
  setTimeout(() => {
    document.body.removeChild(feedback);
    document.head.removeChild(style);
  }, 1000);
}
