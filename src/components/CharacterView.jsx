import React, { useEffect } from 'react';
import { useRive, useStateMachineInput } from '@rive-app/canvas';
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

    switch (state) {
      case TIMER_STATES.RUNNING:
        if (isBrushingInput) isBrushingInput.value = true;
        if (isPausedInput) isPausedInput.value = false;
        break;
      case TIMER_STATES.USER_PAUSED:
      case TIMER_STATES.PAUSE_TRANSITION:
        if (isBrushingInput) isBrushingInput.value = false;
        if (isPausedInput) isPausedInput.value = true;
        break;
      case TIMER_STATES.COMPLETE:
        if (isFinishedInput) isFinishedInput.value = true;
        break;
      default:
        if (isBrushingInput) isBrushingInput.value = false;
        if (isPausedInput) isPausedInput.value = false;
    }
  }, [rive, state, isBrushingInput, isPausedInput, isFinishedInput]);

  return (
    <div className="character-canvas">
      <RiveComponent />
    </div>
  );
};

export default CharacterView;
