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

const playProceduralSound = (type, volume) => {
  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    const now = ctx.currentTime;

    if (type === 'pause') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(140, now + 0.25);
      
      gain.gain.setValueAtTime(volume, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.25);
    } else if (type === 'resume') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(160, now);
      osc.frequency.exponentialRampToValueAtTime(480, now + 0.22);
      
      gain.gain.setValueAtTime(volume, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.25);
    } else if (type === 'complete' || type === 'tada') {
      const notes = [261.63, 329.63, 392.00, 523.25, 659.25, 783.99, 1046.50];
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
        const noteStart = now + idx * 0.08;
        const duration = 0.35;

        osc.frequency.setValueAtTime(freq, noteStart);
        gain.gain.setValueAtTime(volume * 0.8, noteStart);
        gain.gain.exponentialRampToValueAtTime(0.01, noteStart + duration - 0.05);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(noteStart);
        osc.stop(noteStart + duration);
      });
    }
  } catch (e) {
    console.warn("Failed to play procedural sound:", e);
  }
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

    const volume = volumeOverride !== undefined ? volumeOverride : volumeSetting;

    if (type === 'pause' || type === 'resume') {
      playProceduralSound(type, volume);
      return;
    }

    if (type === 'complete' || type === 'tada') {
      playProceduralSound('complete', volume);
    }

    const fileName = SOUND_FILES[type];
    if (!fileName) {
      console.warn("Unknown sound type requested:", type);
      return;
    }

    const baseUrl = import.meta.env.BASE_URL || '/';
    const cleanBaseUrl = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
    const soundUrl = `${cleanBaseUrl}sounds/${fileName}`;

    try {
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

