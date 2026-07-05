import { useCallback, useRef } from 'react';

const SOUND_FILES = {
  bear: 'bear.mp3',
  panda: 'panda.wav',
  kitty: 'kitty.wav',
  bunny: 'bunny.wav',
  break: 'break.wav',
  tada: 'tada.wav',
  click: 'click.wav',
  tick: 'tick.wav',
  
  // Original events mapped for compatibility
  start: 'click.wav',
  switch: 'break.wav',
  complete: 'tada.wav'
};

export const useAudio = (volumeSetting = 0.5, soundsEnabled = true) => {
  const audioUnlockedRef = useRef(false);

  const unlockAudio = useCallback(() => {
    if (audioUnlockedRef.current) return;
    try {
      const silentAudio = new Audio('data:audio/wav;base64,UklGRigAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQQAAAAAAA==');
      silentAudio.play().then(() => {
        audioUnlockedRef.current = true;
      }).catch((e) => {
        console.log("Audio unlock deferred to next click event:", e);
      });
    } catch (e) {
      console.warn("Failed to unlock audio context:", e);
    }
  }, []);

  const playSound = useCallback((type, volumeOverride) => {
    if (!soundsEnabled) return;
    unlockAudio();

    const fileName = SOUND_FILES[type];
    if (!fileName) {
      console.warn("Unknown sound type requested:", type);
      return;
    }

    const baseUrl = import.meta.env.BASE_URL || '/';
    const cleanBaseUrl = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
    const soundUrl = `${cleanBaseUrl}sounds/${fileName}`;

    try {
      const volume = volumeOverride !== undefined ? volumeOverride : volumeSetting;
      const audio = new Audio(soundUrl);
      audio.volume = volume;
      audio.play().catch(e => {
        console.warn("Audio playback blocked or interrupted:", e);
      });
    } catch (err) {
      console.error("Audio engine playback error:", err);
    }
  }, [volumeSetting, soundsEnabled, unlockAudio]);

  return { playSound, unlockAudio };
};

