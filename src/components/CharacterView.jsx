import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useRive, useStateMachineInput } from '@rive-app/react-canvas';
import { TIMER_STATES } from '../hooks/useTimer';

const CharacterView = ({ state }) => {
  const { rive, RiveComponent } = useRive({
    src: 'https://cdn.rive.app/animations/vehicles.riv', 
    stateMachines: 'bumpy',
    autoplay: true,
  });

  // Note: These inputs are hypothetical for the current placeholder file
  // but establish the pattern for the final character assets.
  const isBrushingInput = useStateMachineInput(rive, 'bumpy', 'isBrushing');
  const isPausedInput = useStateMachineInput(rive, 'bumpy', 'isPaused');
  const isFinishedInput = useStateMachineInput(rive, 'bumpy', 'isFinished');

  useEffect(() => {
    if (!rive) return;

    const stateMap = {
      [TIMER_STATES.RUNNING]: { brushing: true, paused: false },
      [TIMER_STATES.USER_PAUSED]: { brushing: false, paused: true },
      [TIMER_STATES.PAUSE_TRANSITION]: { brushing: false, paused: true },
      [TIMER_STATES.COMPLETE]: { finished: true },
    };

    const config = stateMap[state] || { brushing: false, paused: false };

    /* eslint-disable react-hooks/immutability */
    if (isBrushingInput && 'brushing' in config) {
      isBrushingInput.value = config.brushing;
    }
    if (isPausedInput && 'paused' in config) {
      isPausedInput.value = config.paused;
    }
    if (isFinishedInput && 'finished' in config) {
      isFinishedInput.value = config.finished;
    }
    /* eslint-enable react-hooks/immutability */
  }, [rive, state, isBrushingInput, isPausedInput, isFinishedInput]);

  return (
    <div className="character-canvas" aria-label="Animated character showing toothbrushing progress">
      <RiveComponent />
    </div>
  );
};

CharacterView.propTypes = {
  state: PropTypes.string.isRequired,
};

export default CharacterView;
