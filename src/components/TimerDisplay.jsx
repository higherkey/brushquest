import PropTypes from 'prop-types';

const TimerDisplay = ({
  timeRemaining,
  totalSecs,
  intervalRemaining,
  showInterval
}) => {
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const formatSeconds = (totalSecs) => {
    if (totalSecs < 60) return `${totalSecs}s`;
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return secs === 0 ? `${mins}m` : `${mins}m ${secs}s`;
  };

  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const progress = timeRemaining / totalSecs;
  const offset = circumference * (1 - progress);

  const getRingColor = () => {
    if (progress > 0.5) return '#059669';
    if (progress > 0.2) return '#d97706';
    return '#dc2626';
  };

  return (
    <div className="timer-display-panel">
      <div className="timer-circle-container">
        <svg className="progress-ring-svg" viewBox="0 0 100 100">
          <circle 
            cx="50" 
            cy="50" 
            r={radius} 
            strokeWidth="8" 
            stroke="#f1f5f9" 
            fill="transparent"
          />
          <circle 
            id="progress-ring" 
            cx="50" 
            cy="50" 
            r={radius} 
            strokeWidth="8" 
            stroke={getRingColor()} 
            strokeDasharray={circumference} 
            strokeDashoffset={offset} 
            strokeLinecap="round" 
            fill="transparent" 
            style={{ transition: 'stroke-dashoffset 1s linear, stroke 0.5s ease' }}
          />
        </svg>

        <div className="timer-digits-container">
          <div className="timer-digits" id="timer-digits">
            {formatTime(timeRemaining)}
          </div>
          {showInterval && intervalRemaining > 0 && timeRemaining > intervalRemaining && (
            <div className="interval-countdown" id="interval-countdown">
              Next pause: {formatSeconds(intervalRemaining)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

TimerDisplay.propTypes = {
  timeRemaining: PropTypes.number.isRequired,
  totalSecs: PropTypes.number.isRequired,
  intervalRemaining: PropTypes.number.isRequired,
  showInterval: PropTypes.bool.isRequired
};

export default TimerDisplay;
