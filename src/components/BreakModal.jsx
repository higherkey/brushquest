import { useState } from 'react';
import PropTypes from 'prop-types';
import { ANIMAL_SVGS, DIALOGUES } from './CompanionAssets';

const KID_BREAK_TASKS = [
  "Stand up and flap your wings like a giant eagle 5 times! 🦅",
  "Do a happy dance for 10 seconds! 💃🕺",
  "Roll your shoulders backwards like a slow train engine! 🚂",
  "Reach high up for the sky, then tickle your toes! 🌌🦶",
  "Take 3 slow, deep tummy-breaths like a blowing puffball! 💨",
  "Wiggle your nose and shake your hips like a little puppy! 🐶",
  "Pretend you are a slow-moving starfish stretching on the beach! 🌟",
  "Look out the window and find something that is bright green! 🌳",
  "Clap your hands together in slow-motion, then super-fast! 👏"
];

const BreakModal = ({ isOpen, companion, onResume }) => {
  // Use state initializer function to select a random task exactly once on mount
  const [randomIndex] = useState(() => Math.floor(Math.random() * KID_BREAK_TASKS.length));
  
  if (!isOpen) return null;

  const activeTask = KID_BREAK_TASKS[randomIndex];
  const titleText = `${companion.charAt(0).toUpperCase() + companion.slice(1)} Break! 🐾`;
  const dialogueText = DIALOGUES[companion] ? DIALOGUES[companion].break : "Break Time!";

  return (
    <div className="break-modal-overlay">
      <div className="break-modal-card scale-in">
        {/* Top Emoji badge */}
        <div className="modal-top-badge">
          🎉
        </div>

        <div className="modal-content">
          <h3 className="modal-title">{titleText}</h3>
          
          <p className="modal-message">
            {dialogueText}
          </p>

          {/* Miniature SVG companion wiggling in celebration */}
          <div className="modal-avatar anim-celebrate">
            {ANIMAL_SVGS[companion] ? ANIMAL_SVGS[companion]('mini-avatar') : null}
          </div>

          {/* Mini-Mission Card */}
          <div className="mini-mission-card">
            <p className="mission-title">💡 Mini-Mission:</p>
            <p className="mission-text">{activeTask}</p>
          </div>

          {/* Keep Going Button */}
          <button 
            className="modal-resume-btn" 
            onClick={onResume}
            aria-label="Resume quest timer"
          >
            🚀 KEEP GOING!
          </button>
        </div>
      </div>
    </div>
  );
};

BreakModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  companion: PropTypes.string.isRequired,
  onResume: PropTypes.func.isRequired
};

export default BreakModal;
