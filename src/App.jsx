import { useState, useEffect, useRef } from 'react';
import { useTimer, TIMER_STATES } from './hooks/useTimer';
import { useAudio } from './hooks/useAudio';
import { usePersistence } from './hooks/usePersistence';
import { Calendar, Menu, X, Volume2 } from 'lucide-react';
import CompanionView from './components/CompanionView';
import { DIALOGUES } from './components/CompanionAssets';
import QuestSelector from './components/QuestSelector';
import { QUESTS } from './components/QuestConfig';
import TimerDisplay from './components/TimerDisplay';
import BreakModal from './components/BreakModal';
import Controls from './components/Controls';
import CoachingOverlay from './components/CoachingOverlay';
import './index.css';

const TICKLE_TEXTS = {
  bear: "Aha! That tickles my tummy! 🐻🍯",
  panda: "Yawwn... bamboo is tasty! Want a bite? 🐼🎋",
  kitty: "Purrr! Mew! Keep working, human friend! 🐱🧶",
  bunny: "Boing! Let's leap over obstacles! 🐰🥕"
};

function App() {
  const { sessionCount, settings, incrementSession, updateSettings, resetHistory } = usePersistence();
  const { playSound, unlockAudio } = useAudio(settings.volume, settings.soundsEnabled);
  
  const [companion, setCompanion] = useState('bear');
  const [activeQuest, setActiveQuest] = useState('brush');
  const [tickleText, setTickleText] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const tickleTimeoutRef = useRef(null);

  const questConfig = QUESTS[activeQuest];
  const timer = useTimer({
    initialTotalSecs: questConfig.durationMins * 60,
    initialIntervalSecs: questConfig.intervalSecs,
    isBrushQuest: activeQuest === 'brush'
  });

  const canvasRef = useRef(null);
  const confettiActiveRef = useRef(false);
  const confettiParticles = useRef([]);

  // Unlocking Audio on first body-level click
  useEffect(() => {
    const handleBodyClick = () => {
      unlockAudio();
    };
    document.body.addEventListener('click', handleBodyClick);
    return () => document.body.removeEventListener('click', handleBodyClick);
  }, [unlockAudio]);

  // Sync Timer settings when Quest changes and timer is Idle
  useEffect(() => {
    if (timer.state === TIMER_STATES.IDLE) {
      timer.setTotalSecs(questConfig.durationMins * 60);
      timer.setIntervalSecs(questConfig.intervalSecs);
    }
  }, [activeQuest, questConfig, timer.state, timer]);

  // Ticking sound effect
  useEffect(() => {
    if (timer.state === TIMER_STATES.RUNNING && timer.timeRemaining > 0) {
      playSound('tick');
    }
  }, [timer.timeRemaining, timer.state, playSound]);

  // Confetti Engine implementations
  const triggerConfetti = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.display = 'block';

    confettiActiveRef.current = true;
    confettiParticles.current = [];
    const colors = ['#f43f5e', '#3b82f6', '#10b981', '#f59e0b', '#ec4899', '#8b5cf6', '#14b8a6'];

    for (let i = 0; i < 80; i++) {
      confettiParticles.current.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        size: Math.random() * 8 + 6,
        color: colors[Math.floor(Math.random() * colors.length)],
        speedY: Math.random() * 4 + 3,
        speedX: Math.random() * 3 - 1.5,
        rot: Math.random() * 360,
        rotSpeed: Math.random() * 4 - 2
      });
    }

    const animate = () => {
      if (!confettiActiveRef.current) return;
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let stillAfloat = false;

      confettiParticles.current.forEach(p => {
        p.y += p.speedY;
        p.x += p.speedX;
        p.rot += p.rotSpeed;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rot * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        ctx.restore();

        if (p.y < canvas.height) {
          stillAfloat = true;
        } else {
          p.y = -20;
          p.x = Math.random() * canvas.width;
        }
      });

      if (stillAfloat) {
        requestAnimationFrame(animate);
      }
    };
    animate();
  };

  const stopConfetti = () => {
    confettiActiveRef.current = false;
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.style.display = 'none';
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  // Handle BREAK transition and COMPLETE celebration
  useEffect(() => {
    if (timer.state === TIMER_STATES.PAUSE_TRANSITION) {
      playSound('break');
    } else if (timer.state === TIMER_STATES.COMPLETE) {
      playSound('tada');
      triggerConfetti();
      incrementSession();
    } else if (timer.state === TIMER_STATES.IDLE) {
      stopConfetti();
    }
  }, [timer.state, playSound, incrementSession]);

  // Tickle companion interactions
  const handleTickle = () => {
    unlockAudio();
    playSound(companion);

    if (tickleTimeoutRef.current) {
      clearTimeout(tickleTimeoutRef.current);
    }

    setTickleText(TICKLE_TEXTS[companion] || "Tickle!");
    
    tickleTimeoutRef.current = setTimeout(() => {
      tickleTimeoutRef.current = null;
      setTickleText('');
    }, 2800);
  };

  // Derived speech bubble dialogues to avoid effect synchronization
  const currentSpeech = tickleText || (DIALOGUES[companion] ? (
    DIALOGUES[companion][
      timer.state === TIMER_STATES.IDLE ? 'hello' :
      timer.state === TIMER_STATES.RUNNING ? 'ticking' :
      timer.state === TIMER_STATES.USER_PAUSED ? 'paused' :
      timer.state === TIMER_STATES.PAUSE_TRANSITION ? 'break' :
      'finished'
    ]
  ) : '');

  useEffect(() => {
    const handleResize = () => {
      if (confettiActiveRef.current && canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSound = (e) => {
    e.stopPropagation();
    const nextState = !settings.soundsEnabled;
    updateSettings({ soundsEnabled: nextState });
    if (nextState) {
      playSound('click');
    }
  };

  const APP_VERSION = typeof __APP_VERSION__ !== 'undefined' ? __APP_VERSION__ : '0.1.0';

  return (
    <div className="timerquest-root">
      {/* Confetti Overlay */}
      <canvas ref={canvasRef} className="confetti-canvas" />

      {/* Side Menu Drawer Settings */}
      <div 
        className={`side-menu-overlay ${isMenuOpen ? 'open' : ''}`} 
        onClick={() => setIsMenuOpen(false)} 
      />
      <div className={`side-menu-drawer ${isMenuOpen ? 'open' : ''}`}>
        <div className="menu-header">
          <div className="menu-title-group">
            <span className="menu-title-emoji">⚙️</span>
            <h2 className="menu-title">Settings</h2>
          </div>
          <button 
            className="menu-close-btn" 
            onClick={() => {
              playSound('click');
              setIsMenuOpen(false);
            }}
            aria-label="Close settings menu"
          >
            <X size={20} />
          </button>
        </div>

        <div className="menu-content">
          <div className="settings-section">
            <h3 className="settings-section-title">Sound Effects</h3>
            
            <div className="settings-item">
              <span className="settings-label">Enable Audio</span>
              <button 
                className={`settings-toggle-btn ${settings.soundsEnabled ? 'active' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  const nextState = !settings.soundsEnabled;
                  updateSettings({ soundsEnabled: nextState });
                  if (nextState) {
                    playSound('click');
                  }
                }}
              >
                {settings.soundsEnabled ? '🔊 On' : '🔇 Muted'}
              </button>
            </div>

            <div className="settings-item vertical">
              <div className="settings-label-row">
                <Volume2 size={16} />
                <span className="settings-label">Volume: {Math.round(settings.volume * 100)}%</span>
              </div>
              <input 
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={settings.volume}
                onChange={(e) => updateSettings({ volume: parseFloat(e.target.value) })}
                className="volume-slider"
                disabled={!settings.soundsEnabled}
              />
            </div>
          </div>

          <div className="settings-section">
            <h3 className="settings-section-title">Adventure Log</h3>
            <div className="settings-item vertical">
              <div className="stats-display">
                <Calendar size={16} />
                <span>{sessionCount} Quests Completed</span>
              </div>
              <button 
                className="reset-history-btn" 
                onClick={() => {
                  playSound('click');
                  if (window.confirm("Do you want to reset your completed adventures log back to 0?")) {
                    resetHistory();
                  }
                }}
              >
                Reset Adventure Log
              </button>
            </div>
          </div>
        </div>

        <div className="menu-footer">
          <div className="version-txt">Version {APP_VERSION}</div>
          <div className="credits-txt">TimerQuest by Antigravity</div>
        </div>
      </div>

      {/* Break modal - Conditionally mount to reset active task selections */}
      {timer.state === TIMER_STATES.PAUSE_TRANSITION && (
        <BreakModal
          isOpen={true}
          companion={companion}
          onResume={() => {
            playSound('resume');
            timer.resume();
          }}
        />
      )}

      {/* Header bar */}
      <header className="timerquest-header">
        <div className="logo-group">
          <div className="logo-badge">
            <span className="logo-emoji">⏰</span>
          </div>
          <div>
            <h1 className="logo-title">TimerQuest</h1>
            <p className="logo-subtitle">Your cute routine companion!</p>
          </div>
        </div>

        {/* Hamburger settings button */}
        <button 
          className="menu-trigger-btn" 
          onClick={() => {
            playSound('click');
            setIsMenuOpen(true);
          }}
          aria-label="Open settings menu"
        >
          <Menu size={20} />
        </button>
      </header>

      {/* Main app panel */}
      <main className="timerquest-main-card">
        {/* Companion Selector Tabs & Display */}
        <CompanionView
          companion={companion}
          onSelectCompanion={(id) => {
            playSound('click');
            setCompanion(id);
          }}
          animState={timer.state === TIMER_STATES.RUNNING ? 'ticking' : (timer.state === TIMER_STATES.COMPLETE ? 'celebrate' : 'idle')}
          speechText={currentSpeech}
          onTickle={handleTickle}
        />

        {/* Quest preset selector, hidden when running/complete */}
        {timer.state === TIMER_STATES.IDLE && (
          <QuestSelector
            activeQuest={activeQuest}
            onSelectQuest={(id) => {
              playSound('click');
              setActiveQuest(id);
            }}
          />
        )}

        {/* Brushing jaw overlay specific to Brush Teeth */}
        {activeQuest === 'brush' && (timer.state === TIMER_STATES.RUNNING || timer.state === TIMER_STATES.USER_PAUSED) && (
          <CoachingOverlay
            currentQuadrant={timer.currentQuadrant}
            isBrushing={timer.state === TIMER_STATES.RUNNING}
          />
        )}

        {/* Timer display section */}
        {timer.state !== TIMER_STATES.IDLE && (
          <TimerDisplay
            timeRemaining={timer.timeRemaining}
            totalSecs={timer.totalSecs}
            intervalRemaining={timer.intervalRemaining}
            showInterval={activeQuest !== 'brush'}
          />
        )}

        {/* Start, Pause, Reset Controls */}
        <Controls
          state={timer.state}
          onStart={() => {
            playSound('click');
            timer.start();
          }}
          onPause={() => {
            playSound('pause');
            timer.pause();
          }}
          onResume={() => {
            playSound('resume');
            timer.resume();
          }}
          onReset={() => {
            playSound('click');
            timer.reset();
          }}
        />

        {/* Footer completed stats, show when idle */}
        {timer.state === TIMER_STATES.IDLE && (
          <div className="history-badge">
            <Calendar size={16} /> {sessionCount} Adventures Completed
          </div>
        )}
      </main>

      <footer className="timerquest-footer">
        Created with ❤️ for little explorers
      </footer>
    </div>
  );
}

export default App;
