import { useState, useEffect, useRef, useCallback } from 'react';

export const TIMER_STATES = {
  IDLE: 'IDLE',
  RUNNING: 'RUNNING',
  PAUSE_TRANSITION: 'PAUSE_TRANSITION', // Transition break state
  USER_PAUSED: 'USER_PAUSED',
  COMPLETE: 'COMPLETE',
};

export const useTimer = ({ 
  initialTotalSecs = 120, 
  initialIntervalSecs = 30,
  isBrushQuest = true
} = {}) => {
  const [state, setState] = useState(TIMER_STATES.IDLE);
  const [totalSecs, setTotalSecsState] = useState(initialTotalSecs);
  const [intervalSecs, setIntervalSecsState] = useState(initialIntervalSecs);

  const [timeRemaining, setTimeRemaining] = useState(initialTotalSecs);
  const [intervalRemaining, setIntervalRemaining] = useState(initialIntervalSecs);
  const [currentQuadrant, setCurrentQuadrant] = useState(1);

  const requestRef = useRef();
  const startTimeRef = useRef();
  
  // Accumulated time indicators
  const elapsedBeforeCurrentRun = useRef(0);
  const intervalElapsedBeforeCurrentRun = useRef(0);

  // Synchronous config modifiers to avoid cascading effect renders
  const setTotalSecs = useCallback((secs) => {
    setTotalSecsState(secs);
    setTimeRemaining(secs);
    elapsedBeforeCurrentRun.current = 0;
  }, []);

  const setIntervalSecs = useCallback((secs) => {
    setIntervalSecsState(secs);
    setIntervalRemaining(secs);
    intervalElapsedBeforeCurrentRun.current = 0;
  }, []);

  const tick = useCallback(function animate() {
    if (state !== TIMER_STATES.RUNNING) return;

    const now = Date.now();
    const delta = (now - startTimeRef.current) / 1000;

    const totalElapsed = elapsedBeforeCurrentRun.current + delta;
    const intervalElapsed = intervalElapsedBeforeCurrentRun.current + delta;

    const remaining = Math.max(0, totalSecs - totalElapsed);
    const intRemaining = Math.max(0, intervalSecs - intervalElapsed);

    if (remaining <= 0) {
      setState(TIMER_STATES.COMPLETE);
      setTimeRemaining(0);
      setIntervalRemaining(0);
      return;
    }

    if (intRemaining <= 0) {
      setState(TIMER_STATES.PAUSE_TRANSITION);
      setTimeRemaining(remaining);
      setIntervalRemaining(0);
      
      elapsedBeforeCurrentRun.current = totalElapsed;
      intervalElapsedBeforeCurrentRun.current = 0;
      return;
    }

    setTimeRemaining(remaining);
    setIntervalRemaining(intRemaining);

    if (isBrushQuest) {
      const quad = Math.min(4, Math.floor(totalElapsed / 30) + 1);
      setCurrentQuadrant(quad);
    }

    requestRef.current = requestAnimationFrame(animate);
  }, [state, totalSecs, intervalSecs, isBrushQuest]);

  const start = () => {
    if (state === TIMER_STATES.IDLE) {
      startTimeRef.current = Date.now();
      elapsedBeforeCurrentRun.current = 0;
      intervalElapsedBeforeCurrentRun.current = 0;
      setState(TIMER_STATES.RUNNING);
    }
  };

  const pause = () => {
    if (state === TIMER_STATES.RUNNING) {
      cancelAnimationFrame(requestRef.current);
      const now = Date.now();
      const delta = (now - startTimeRef.current) / 1000;
      
      elapsedBeforeCurrentRun.current += delta;
      intervalElapsedBeforeCurrentRun.current += delta;
      
      setState(TIMER_STATES.USER_PAUSED);
    }
  };

  const resume = () => {
    if (state === TIMER_STATES.USER_PAUSED || state === TIMER_STATES.PAUSE_TRANSITION) {
      startTimeRef.current = Date.now();
      if (state === TIMER_STATES.PAUSE_TRANSITION) {
        intervalElapsedBeforeCurrentRun.current = 0;
      }
      setState(TIMER_STATES.RUNNING);
    }
  };

  const reset = () => {
    cancelAnimationFrame(requestRef.current);
    setState(TIMER_STATES.IDLE);
    setTimeRemaining(totalSecs);
    setIntervalRemaining(intervalSecs);
    setCurrentQuadrant(1);
    elapsedBeforeCurrentRun.current = 0;
    intervalElapsedBeforeCurrentRun.current = 0;
  };

  useEffect(() => {
    if (state === TIMER_STATES.RUNNING) {
      requestRef.current = requestAnimationFrame(tick);
    } else {
      cancelAnimationFrame(requestRef.current);
    }
    return () => cancelAnimationFrame(requestRef.current);
  }, [state, tick]);

  const totalProgress = ((totalSecs - timeRemaining) / totalSecs) * 100;

  return {
    state,
    timeRemaining,
    intervalRemaining,
    currentQuadrant,
    totalSecs,
    intervalSecs,
    setTotalSecs,
    setIntervalSecs,
    start,
    pause,
    resume,
    reset,
    totalProgress,
  };
};
