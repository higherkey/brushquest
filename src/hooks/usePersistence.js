import { useState, useCallback } from 'react';

const STORAGE_KEYS = {
  SESSION_COUNT: 'timerquest_session_count',
  LAST_SESSION: 'timerquest_last_session',
  SETTINGS: 'timerquest_settings'
};

export const usePersistence = () => {
  const [sessionCount, setSessionCount] = useState(() => {
    return Number.parseInt(localStorage.getItem(STORAGE_KEYS.SESSION_COUNT) || '0', 10);
  });

  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    return saved ? JSON.parse(saved) : {
      quadrantDuration: 30,
      volume: 0.5,
      soundsEnabled: true
    };
  });

  const incrementSession = useCallback(() => {
    setSessionCount(prev => {
      const next = prev + 1;
      localStorage.setItem(STORAGE_KEYS.SESSION_COUNT, next.toString());
      localStorage.setItem(STORAGE_KEYS.LAST_SESSION, new Date().toISOString());
      return next;
    });
  }, []);

  const updateSettings = useCallback((newSettings) => {
    setSettings(prev => {
      const next = { ...prev, ...newSettings };
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(next));
      return next;
    });
  }, []);

  const resetHistory = useCallback(() => {
    setSessionCount(0);
    localStorage.setItem(STORAGE_KEYS.SESSION_COUNT, '0');
    localStorage.removeItem(STORAGE_KEYS.LAST_SESSION);
  }, []);

  return {
    sessionCount,
    settings,
    incrementSession,
    updateSettings,
    resetHistory
  };
};

