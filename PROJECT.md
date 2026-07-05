# TimerQuest - Architecture & Work Trace

TimerQuest is a high-performance, web-based task companion designed for children. It combines precision timing logic with premium animations and local audio to create an engaging and effective routine habit.

## 🏛️ Architecture Overview

The application is a Single Page Application (SPA) designed to minimize server round-trips and facilitate offline capabilities.

- **Frontend**: React (v18+) via Vite
- **Styling**: Vanilla CSS with a high-contrast, "Styled Realism" design system optimized for visibility from a distance.
- **PWA Configuration**: Service Worker (Workbox) for asset caching and manifest.json for "Add to Home Screen".
- **State Management**: React Hooks (`useTimer`, `useAudio`) to handle global settings and timer status without heavy external dependencies.
- **Timing Engine**: To prevent "timer drift" when the browser backgrounds tabs, the engine compares cumulative elapsed time against the system clock rather than relying on intervals.
- **Animations & Audio**: Framer Motion for UI transitions, pure HTML5 SVG animations for interactive characters. Zero-latency local audio files (from OpenGameArt.org) avoid synthetic chimes.

---

## 🎨 Design & UX Mandates

- **Zero-Scroll Visibility**: The core brushing loop must be 100% visible on a single screen without scrolling, across all common mobile viewports.
- **Large Touch Targets**: Minimum interactive area of 44x44px.
- **High Resilience**: Session state must be recoverable to minimize disruption for sensitive users.
- **Joyful Feedback**: Visual and audio feedback must be positive, encouraging, and clear.

---

## 1) Planned Work (MVP Phase)

### TODO List
- [ ] **Character Reactivity**: Map `useTimer` states to Rive state machine inputs (`isBrushing`, `isPaused`, `isFinished`).
- [ ] **Technique Coaching Overlay**: Visual guides showing *how* and *where* to brush for each quadrant.
- [ ] **State Persistence**: Save user preferences and session history.
- [ ] **Audio & Polish**: Add sound volume controls and visual "Wait" overlays during transitions.

### File List
- `/src/components/CharacterView.jsx` (Modify)
- `/src/components/CoachingOverlay.jsx` (New)
- `/src/hooks/usePersistence.js` (New)
- `/src/hooks/useTimer.js` (Modify)
- `/src/App.jsx` (Modify)

### Rationale
- **CharacterView**: Needs to accept robust state changes to trigger correct Rive animations.
- **CoachingOverlay**: Required for the "Technique Coaching" MVP feature to demonstrate proper brushing visually.
- **usePersistence & useTimer**: Required to implement `localStorage` persistence for custom timing configurations and session history, satisfying the MVP Persistence requirement.
- **App.jsx**: Needs updates to integrate the coaching overlay and persistence hooks.

---

## 2) In Progress Work
*(No active files currently being modified)*

---

## 3) Completed Work (MVP Phase)

### Summary
The MVP Phase focusing on engagement and persistence has been completed.
- `/src/hooks/useTimer.js`
- `/src/hooks/useAudio.js`
- `/src/index.css`
- `/src/App.jsx`
- `/vite.config.js` and `manifest.json`
- `/src/components/CharacterView.jsx`
- `/src/components/CoachingOverlay.jsx`
- `/src/hooks/usePersistence.js`

### Revised Rationale
- **Engagement & Character**: `CharacterView.jsx` now maps timer states to Rive state machine inputs, providing dynamic feedback.
- **Visual Coaching**: `CoachingOverlay.jsx` provides a visual guide of the current quadrant and brushing motion.
- **Persistence**: `usePersistence.js` manages `localStorage` for session history and settings.
- **Dynamic Timing**: `useTimer.js` updated to support custom quadrant and transition durations.
- **Polish**: `useAudio.js` updated for dynamic volume control, and `App.jsx` features a session history badge.

### Revised Rationale
- **Core Timing**: Implemented `useTimer.js` using `requestAnimationFrame` and system clock comparisons to ensure accuracy. Handles the 120-second countdown with 5-second "spit and switch" intervals.
- **Visual Interface & Feedback**: `App.jsx` built with Framer Motion for large-scale UI components and circular progress fill.
- **Audio**: `useAudio.js` implemented using Web Audio API for zero-latency synth chimes instead of bulky audio files. (Recently updated to use `globalThis.AudioContext`).
- **PWA**: `vite.config.js` configured with `vite-plugin-pwa` for offline support.

---

## 4) Issues and Out of Scope
- *(None discovered yet for the MVP phase)*
