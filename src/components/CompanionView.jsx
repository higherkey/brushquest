import PropTypes from 'prop-types';
import { ANIMAL_SVGS } from './CompanionAssets';

const CompanionView = ({
  companion,
  onSelectCompanion,
  animState,
  speechText,
  onTickle
}) => {
  const companionsList = [
    { id: 'bear', name: 'Benni', icon: '🐻' },
    { id: 'panda', name: 'Pip', icon: '🐼' },
    { id: 'kitty', name: 'Kiki', icon: '🐱' },
    { id: 'bunny', name: 'Bibi', icon: '🐰' }
  ];

  const getAnimClass = () => {
    if (animState === 'ticking') return 'anim-ticking';
    if (animState === 'celebrate') return 'anim-celebrate';
    return 'anim-idle';
  };

  const getViewportClass = () => {
    if (animState === 'ticking') return 'viewport-ticking';
    if (animState === 'celebrate') return 'viewport-celebrating';
    return 'viewport-idle';
  };

  return (
    <div className="companion-view-container">
      {/* Tab Selector */}
      <div className="companion-tabs-header">
        <p className="tab-title-hint">Choose Your Companion!</p>
        <div className="companion-grid">
          {companionsList.map((comp) => (
            <button
              key={comp.id}
              className={`tab-btn ${companion === comp.id ? 'active' : ''}`}
              onClick={() => onSelectCompanion(comp.id)}
              aria-label={`Select ${comp.name}`}
            >
              <span className="tab-emoji">{comp.icon}</span>
              <span className="tab-name">{comp.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Character Viewport */}
      <div className={`companion-viewport ${getViewportClass()}`} id="animal-viewport">
        {/* Dialogue Bubble */}
        <div className="speech-bubble" id="speech-bubble">
          {speechText}
        </div>

        {/* Companion Character */}
        <div
          className="character-container"
          id="character-container"
          onClick={onTickle}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && onTickle()}
          aria-label={`Tickle ${companion}`}
        >
          {ANIMAL_SVGS[companion] ? ANIMAL_SVGS[companion](getAnimClass()) : null}
        </div>

        {/* Tickle hint */}
        <p className="tickle-prompt" onClick={onTickle}>
          👉 Click me to hear my real sound!
        </p>
      </div>
    </div>
  );
};

CompanionView.propTypes = {
  companion: PropTypes.string.isRequired,
  onSelectCompanion: PropTypes.func.isRequired,
  animState: PropTypes.string.isRequired,
  speechText: PropTypes.string.isRequired,
  onTickle: PropTypes.func.isRequired
};

export default CompanionView;
