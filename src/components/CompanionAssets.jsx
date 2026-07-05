export const DIALOGUES = {
  bear: {
    hello: "Hi! I'm Benni. Ready to start our fun timer? 🐻🍯",
    ticking: "Tick-tock, you are doing a spectacular job! Keep it up!",
    paused: "Don't worry, I am holding the clock for you! 🐾",
    break: "Break time! Let's shake out our cozy bear paws! 🍯",
    finished: "Woohoo! We did it! Time for some sweet celebratory honey! 🍯🎉"
  },
  panda: {
    hello: "Zzz... Oh! Hello! Let's countdown together! 🐼🎋",
    ticking: "Crunch, munch... we are moving forward nicely!",
    paused: "Ah, time for a comfortable little pause... Zzz...",
    break: "Break time! Stretch up high like a giant bamboo shoot! 🎋",
    finished: "Hooray! Exceptional work! Time for a happy roll in the grass! 🎉"
  },
  kitty: {
    hello: "Mew! I'm Kiki! What amazing adventure are we timing? 🐱🧶",
    ticking: "Purr-fect speed! Keep going and you'll reach the finish!",
    paused: "Paws on the clock! Just tell me when to play again!",
    break: "Yawn! Let's do a great cat stretch together! Mew!",
    finished: "We finished! You deserve high fives and lots of head pats! 🐾🌟"
  },
  bunny: {
    hello: "Hop hop! I'm Bibi. Let's make this countdown super fun! 🐰🥕",
    ticking: "Every second gets us closer to a happy victory hop!",
    paused: "Sitting still like a bunny in the clover. Ready when you are!",
    break: "Hop break! Bounce up and down on one foot 5 times!",
    finished: "Yippee! We did it! Let's do a giant victory jump! 🥕✨"
  }
};

export const ANIMAL_SVGS = {
  bear: (className) => (
    <svg viewBox="0 0 100 100" className={`svg-companion ${className}`}>
      <circle cx="28" cy="28" r="14" fill="#a16207" className="anim-ear-l" />
      <circle cx="28" cy="28" r="8" fill="#fbcfe8" className="anim-ear-l" />
      <circle cx="72" cy="28" r="14" fill="#a16207" className="anim-ear-r" />
      <circle cx="72" cy="28" r="8" fill="#fbcfe8" className="anim-ear-r" />
      <ellipse cx="50" cy="85" rx="30" ry="20" fill="#a16207" />
      <circle cx="50" cy="85" r="18" fill="#fef08a" opacity="0.4"/>
      <circle cx="50" cy="52" r="32" fill="#b45309" />
      <circle cx="28" cy="62" r="5" fill="#f472b6" opacity="0.6" />
      <circle cx="72" cy="62" r="5" fill="#f472b6" opacity="0.6" />
      <ellipse cx="50" cy="61" rx="11" ry="8" fill="#fef08a" />
      <ellipse cx="50" cy="58" rx="5" ry="3" fill="#1e293b" />
      <path d="M 46 62 Q 50 65 54 62" stroke="#1e293b" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <g className="anim-blink">
        <circle cx="34" cy="48" r="4" fill="#1e293b" />
        <circle cx="32.5" cy="46.5" r="1.5" fill="white" />
        <circle cx="66" cy="48" r="4" fill="#1e293b" />
        <circle cx="64.5" cy="46.5" r="1.5" fill="white" />
      </g>
    </svg>
  ),
  panda: (className) => (
    <svg viewBox="0 0 100 100" className={`svg-companion ${className}`}>
      <circle cx="26" cy="26" r="15" fill="#1e293b" className="anim-ear-l" />
      <circle cx="74" cy="26" r="15" fill="#1e293b" className="anim-ear-r" />
      <ellipse cx="50" cy="85" rx="32" ry="18" fill="#1e293b" />
      <circle cx="50" cy="85" r="18" fill="#f8fafc" />
      <circle cx="50" cy="52" r="33" fill="#f8fafc" />
      <ellipse cx="32" cy="49" rx="10" ry="8" fill="#1e293b" transform="rotate(-10 32 49)" />
      <ellipse cx="68" cy="49" rx="10" ry="8" fill="#1e293b" transform="rotate(10 68 49)" />
      <circle cx="24" cy="62" r="4" fill="#f472b6" opacity="0.5" />
      <circle cx="76" cy="62" r="4" fill="#f472b6" opacity="0.5" />
      <g className="anim-blink">
        <circle cx="33" cy="48" r="3.5" fill="white" />
        <circle cx="34" cy="48" r="1.5" fill="#1e293b" />
        <circle cx="67" cy="48" r="3.5" fill="white" />
        <circle cx="66" cy="48" r="1.5" fill="#1e293b" />
      </g>
      <ellipse cx="50" cy="59" rx="7" ry="5" fill="#f1f5f9" />
      <polygon points="46,57 54,57 50,61" fill="#1e293b" />
      <path d="M 47,61 Q 50,63 53,61" stroke="#1e293b" strokeWidth="2" fill="none" strokeLinecap="round" />
    </svg>
  ),
  kitty: (className) => (
    <svg viewBox="0 0 100 100" className={`svg-companion ${className}`}>
      <path d="M 75 80 C 85 70, 95 80, 85 95" stroke="#fb923c" strokeWidth="7" strokeLinecap="round" fill="none" className="anim-tail" />
      <polygon points="18,18 42,42 16,50" fill="#f97316" className="anim-ear-l" />
      <polygon points="16,16 38,38 18,48" fill="#fecdd3" className="anim-ear-l" />
      <polygon points="82,18 58,42 84,50" fill="#f97316" className="anim-ear-r" />
      <polygon points="84,16 62,38 82,48" fill="#fecdd3" className="anim-ear-r" />
      <ellipse cx="50" cy="85" rx="28" ry="18" fill="#fb923c" />
      <ellipse cx="50" cy="85" rx="16" ry="12" fill="#fff" opacity="0.7" />
      <ellipse cx="50" cy="52" rx="33" ry="28" fill="#f97316" />
      <line x1="14" y1="56" x2="28" y2="58" stroke="#fdba74" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="12" y1="64" x2="26" y2="63" stroke="#fdba74" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="86" y1="56" x2="72" y2="58" stroke="#fdba74" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="88" y1="64" x2="74" y2="63" stroke="#fdba74" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="26" cy="62" r="5" fill="#f472b6" opacity="0.6" />
      <circle cx="74" cy="62" r="5" fill="#f472b6" opacity="0.6" />
      <g className="anim-blink">
        <ellipse cx="34" cy="48" rx="4" ry="4.5" fill="#1e293b" />
        <circle cx="32.5" cy="46" r="1.5" fill="white" />
        <ellipse cx="66" cy="48" rx="4" ry="4.5" fill="#1e293b" />
        <circle cx="64.5" cy="46" r="1.5" fill="white" />
      </g>
      <polygon points="48,56 52,56 50,59" fill="#db2777" />
      <path d="M 45,61 Q 50,65 55,61" stroke="#1e293b" strokeWidth="2" fill="none" strokeLinecap="round" />
    </svg>
  ),
  bunny: (className) => (
    <svg viewBox="0 0 100 100" className={`svg-companion ${className}`}>
      <g className="anim-ear-l">
        <ellipse cx="32" cy="22" rx="9" ry="22" fill="#e2e8f0" transform="rotate(-5 32 22)" />
        <ellipse cx="32" cy="22" rx="5" ry="16" fill="#fbcfe8" transform="rotate(-5 32 22)" />
      </g>
      <g className="anim-ear-r">
        <ellipse cx="68" cy="22" rx="9" ry="22" fill="#e2e8f0" transform="rotate(5 68 22)" />
        <ellipse cx="68" cy="22" rx="5" ry="16" fill="#fbcfe8" transform="rotate(5 68 22)" />
      </g>
      <ellipse cx="50" cy="86" rx="28" ry="18" fill="#f1f5f9" />
      <circle cx="50" cy="85" r="14" fill="#fff" />
      <circle cx="50" cy="54" r="28" fill="#e2e8f0" />
      <circle cx="28" cy="62" r="4.5" fill="#f472b6" opacity="0.6" />
      <circle cx="72" cy="62" r="4.5" fill="#f472b6" opacity="0.6" />
      <g className="anim-blink">
        <circle cx="35" cy="48" r="3.5" fill="#1e293b" />
        <circle cx="33.5" cy="46.5" r="1.2" fill="white" />
        <circle cx="65" cy="48" r="3.5" fill="#1e293b" />
        <circle cx="63.5" cy="46.5" r="1.2" fill="white" />
      </g>
      <ellipse cx="50" cy="56" rx="4" ry="2.5" fill="#db2777" className="anim-chew" />
      <path d="M 46,60 Q 50,63 54,60" stroke="#1e293b" strokeWidth="2" fill="none" strokeLinecap="round" />
      <rect x="48" y="61" width="4" height="3" fill="white" stroke="#1e293b" strokeWidth="1" />
    </svg>
  )
};
