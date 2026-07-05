import PropTypes from 'prop-types';
import { QUESTS } from './QuestConfig';

const QuestSelector = ({ activeQuest, onSelectQuest, disabled }) => {
  const questsList = Object.values(QUESTS);

  return (
    <div className="quest-selector-container">
      <div className="presets-grid">
        {questsList.map((quest) => (
          <button
            key={quest.id}
            disabled={disabled}
            className={`preset-btn ${quest.bgColor} ${activeQuest === quest.id ? 'active' : ''}`}
            onClick={() => onSelectQuest(quest.id)}
            aria-label={`Select ${quest.label} preset`}
          >
            {quest.emoji} {quest.label} ({quest.durationMins}m)
          </button>
        ))}
      </div>
    </div>
  );
};

QuestSelector.propTypes = {
  activeQuest: PropTypes.string.isRequired,
  onSelectQuest: PropTypes.func.isRequired,
  disabled: PropTypes.bool
};

export default QuestSelector;
