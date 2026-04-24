import { useState, useEffect, useRef, useCallback } from 'react';

export const TIMER_STATES = {
  IDLE: 'IDLE',
  RUNNING: 'RUNNING',
  PAUSE_TRANSITION: 'PAUSE_TRANSITION',
  USER_PAUSED: 'USER_PAUSED',
  COMPLETE: 'COMPLETE',
};

export const useTimer = ({ 
  quadrantDuration = 30, 
  transitionDuration = 5 
} = {}) => {
  const TOTAL_TIME = quadrantDuration * 4;
  const [state, setState] = useState(TIMER_STATES.IDLE);
  const [elapsedTime, setElapsedTime] = useState(0); 
  const [transitionTime, setTransitionTime] = useState(0); 
  const [currentQuadrant, setCurrentQuadrant] = useState(1);
  
  const requestRef = useRef();
  const startTimeRef = useRef();
  const lastElapsedTimeRef = useRef(0);
  const lastTransitionTimeRef = useRef(0);

  const tick = useCallback(() => {
    const now = Date.now();
    const delta = (now - startTimeRef.current) / 1000;

    if (state === TIMER_STATES.RUNNING) {
      const newElapsed = lastElapsedTimeRef.current + delta;
      
      // Check if we reached end of quadrant (but not final quadrant)
      const targetElapsedTime = currentQuadrant * quadrantDuration;
      
      if (newElapsed >= targetElapsedTime && currentQuadrant < 4) {
        setElapsedTime(targetElapsedTime);
        lastElapsedTimeRef.current = targetElapsedTime;
        setState(TIMER_STATES.PAUSE_TRANSITION);
        setTransitionTime(0);
        lastTransitionTimeRef.current = 0;
        startTimeRef.current = now;
      } else if (newElapsed >= TOTAL_TIME) {
        setElapsedTime(TOTAL_TIME);
        setState(TIMER_STATES.COMPLETE);
      } else {
        setElapsedTime(newElapsed);
      }
    } else if (state === TIMER_STATES.PAUSE_TRANSITION) {
      const newTransition = lastTransitionTimeRef.current + delta;
      
      if (newTransition >= transitionDuration) {
        setTransitionTime(0);
        lastTransitionTimeRef.current = 0;
        setCurrentQuadrant(prev => prev + 1);
        setState(TIMER_STATES.RUNNING);
        startTimeRef.current = now;
      } else {
        setTransitionTime(newTransition);
      }
    }

    requestRef.current = requestAnimationFrame(tick);
  }, [state, currentQuadrant]);

  const start = () => {
    if (state === TIMER_STATES.IDLE || state === TIMER_STATES.USER_PAUSED) {
      startTimeRef.current = Date.now();
      lastElapsedTimeRef.current = elapsedTime;
      lastTransitionTimeRef.current = transitionTime;
      setState(state === TIMER_STATES.PAUSE_TRANSITION ? TIMER_STATES.PAUSE_TRANSITION : TIMER_STATES.RUNNING);
    }
  };

  const pause = () => {
    if (state === TIMER_STATES.RUNNING || state === TIMER_STATES.PAUSE_TRANSITION) {
      cancelAnimationFrame(requestRef.current);
      lastElapsedTimeRef.current = elapsedTime;
      lastTransitionTimeRef.current = transitionTime;
      setState(TIMER_STATES.USER_PAUSED);
    }
  };

  const reset = () => {
    cancelAnimationFrame(requestRef.current);
    setState(TIMER_STATES.IDLE);
    setElapsedTime(0);
    setTransitionTime(0);
    setCurrentQuadrant(1);
    lastElapsedTimeRef.current = 0;
    lastTransitionTimeRef.current = 0;
  };

  useEffect(() => {
    if (state === TIMER_STATES.RUNNING || state === TIMER_STATES.PAUSE_TRANSITION) {
      requestRef.current = requestAnimationFrame(tick);
    } else {
      cancelAnimationFrame(requestRef.current);
    }
    return () => cancelAnimationFrame(requestRef.current);
  }, [state, tick]);

  return {
    state,
    elapsedTime,
    transitionTime,
    currentQuadrant,
    start,
    pause,
    reset,
    totalProgress: (elapsedTime / TOTAL_TIME) * 100,
    quadrantProgress: ((elapsedTime % quadrantDuration) / quadrantDuration) * 100,
    transitionProgress: (transitionTime / transitionDuration) * 100
  };
};
