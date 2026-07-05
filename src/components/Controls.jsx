import PropTypes from 'prop-types';

const Controls = ({
  state,
  onStart,
  onPause,
  onResume,
  onReset
}) => {
  const isIdle = state === 'IDLE';
  const isPaused = state === 'USER_PAUSED';
  const isComplete = state === 'COMPLETE';

  if (isIdle || isComplete) {
    return (
      <div className="controls-panel single-button">
        <button 
          className="start-btn" 
          onClick={onStart}
          aria-label={isComplete ? "Restart adventure" : "Start adventure"}
        >
          <span className="btn-icon">{isComplete ? "🥳" : "▶️"}</span>
          <span className="btn-label">
            {isComplete ? "GREAT JOB! PLAY AGAIN?" : "START ADVENTURE"}
          </span>
        </button>
      </div>
    );
  }

  return (
    <div className="controls-panel split-buttons">
      <button 
        className="pause-btn" 
        onClick={isPaused ? onResume : onPause}
        aria-label={isPaused ? "Resume timer" : "Pause timer"}
      >
        <span className="btn-icon">{isPaused ? "▶️" : "⏸️"}</span>
        <span className="btn-label">{isPaused ? "Resume" : "Pause"}</span>
      </button>

      <button 
        className="reset-btn" 
        onClick={onReset}
        aria-label="Stop and reset timer"
      >
        <span className="btn-icon">⏹️</span>
        <span className="btn-label">Stop & Reset</span>
      </button>
    </div>
  );
};

Controls.propTypes = {
  state: PropTypes.string.isRequired,
  onStart: PropTypes.func.isRequired,
  onPause: PropTypes.func.isRequired,
  onResume: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired
};

export default Controls;
