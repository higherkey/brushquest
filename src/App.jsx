import React from 'react';
import { useTimer, TIMER_STATES } from './hooks/useTimer';
import { useAudio } from './hooks/useAudio';
import { usePersistence } from './hooks/usePersistence';
import { Play, Pause, RotateCcw, Droplets, Trophy, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import CharacterView from './components/CharacterView';
import CoachingOverlay from './components/CoachingOverlay';
import './index.css';

function App() {
  const { sessionCount, settings, incrementSession } = usePersistence();
  const { playSound } = useAudio(settings.volume);
  const {
    state,
    elapsedTime,
    transitionTime,
    currentQuadrant,
    start,
    pause,
    reset,
    totalProgress,
  } = useTimer({
    quadrantDuration: settings.quadrantDuration,
  });

  const isBrushing = state === TIMER_STATES.RUNNING;

  React.useEffect(() => {
    if (state === TIMER_STATES.RUNNING && elapsedTime === 0) {
      playSound('start');
    } else if (state === TIMER_STATES.PAUSE_TRANSITION) {
      playSound('switch');
    } else if (state === TIMER_STATES.COMPLETE) {
      playSound('complete');
      incrementSession();
    }
  }, [state, playSound, incrementSession]);

  const formatTime = (time) => {
    const remaining = Math.max(0, 120 - Math.floor(time));
    const minutes = Math.floor(remaining / 60);
    const seconds = remaining % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="container">
      <motion.h1 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        BrushQuest
      </motion.h1>

      <motion.div 
        className="history-badge"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <Calendar size={16} /> {sessionCount} Brushes Completed
      </motion.div>

      <div className="card">
        <CharacterView state={state} />
        
        <CoachingOverlay 
          currentQuadrant={currentQuadrant} 
          isBrushing={isBrushing} 
        />
        <div className="status-label" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
          {state === TIMER_STATES.COMPLETE ? (
            <><Trophy className="text-yellow-400" /> Well Done!</>
          ) : `Quadrant ${currentQuadrant} of 4`}
        </div>

        <div className="progress-container">
          <div 
            className="progress-bar" 
            style={{ width: `${totalProgress}%` }}
          />
        </div>

        <div className="timer-display">
          <AnimatePresence mode='wait'>
            <motion.span
              key={Math.floor(elapsedTime)}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.1 }}
            >
              {formatTime(elapsedTime)}
            </motion.span>
          </AnimatePresence>
        </div>

        <div className="controls">
          {state === TIMER_STATES.RUNNING || state === TIMER_STATES.PAUSE_TRANSITION ? (
            <button className="btn-secondary" onClick={pause}>
              <Pause size={24} /> Pause
            </button>
          ) : (
            <button className="btn-primary" onClick={start} disabled={state === TIMER_STATES.COMPLETE}>
              <Play size={24} /> {state === TIMER_STATES.IDLE ? 'Start Brushing' : 'Resume'}
            </button>
          )}
          
          <button className="btn-secondary" onClick={reset}>
            <RotateCcw size={24} /> Reset
          </button>
        </div>
      </div>

      <AnimatePresence>
        {state === TIMER_STATES.PAUSE_TRANSITION && (
          <motion.div 
            className="transition-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="transition-text"
            >
              <Droplets size={80} style={{ marginBottom: '1rem' }} />
              <div>SPIT & SWITCH</div>
            </motion.div>
            <div className="status-label">
              Next: Quadrant {currentQuadrant + 1}
            </div>
            <div style={{ width: '200px', height: '8px', background: '#334155', borderRadius: '4px', marginTop: '2rem', overflow: 'hidden' }}>
              <motion.div 
                style={{ height: '100%', background: '#fbbf24' }}
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 5, ease: "linear" }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
