import { useState, useCallback } from 'react';

const STORAGE_KEYS = {
  SESSION_COUNT: 'brushquest_session_count',
  LAST_SESSION: 'brushquest_last_session',
  SETTINGS: 'brushquest_settings'
};

export const usePersistence = () => {
  const [sessionCount, setSessionCount] = useState(() => {
    return Number.parseInt(localStorage.getItem(STORAGE_KEYS.SESSION_COUNT) || '0', 10);
  });

  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    return saved ? JSON.parse(saved) : {
      quadrantDuration: 30,
      volume: 0.1
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

  return {
    sessionCount,
    settings,
    incrementSession,
    updateSettings
  };
};
