import { useCallback } from 'react';

export const useAudio = (defaultVolume = 0.1) => {
  const playSound = useCallback((type, volumeOverride) => {
    const volume = volumeOverride !== undefined ? volumeOverride : defaultVolume;
    const ctx = new (globalThis.AudioContext || globalThis.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    const now = ctx.currentTime;

    const rampVolume = (v, time) => {
      gain.gain.setValueAtTime(v, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + time);
    };

    switch (type) {
      case 'start':
        osc.type = 'sine';
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.1);
        rampVolume(volume, 0.2);
        osc.start(now);
        osc.stop(now + 0.2);
        break;
      case 'switch':
        osc.type = 'square';
        osc.frequency.setValueAtTime(660, now);
        osc.frequency.setValueAtTime(440, now + 0.1);
        rampVolume(volume * 0.5, 0.3);
        osc.start(now);
        osc.stop(now + 0.3);
        break;
      case 'complete':
        osc.type = 'sine';
        osc.frequency.setValueAtTime(523.25, now); // C5
        osc.frequency.setValueAtTime(659.25, now + 0.1); // E5
        osc.frequency.setValueAtTime(783.99, now + 0.2); // G5
        osc.frequency.setValueAtTime(1046.50, now + 0.3); // C6
        rampVolume(volume, 0.6);
        osc.start(now);
        osc.stop(now + 0.6);
        break;
      default:
        break;
    }
  }, []);

  return { playSound };
};
