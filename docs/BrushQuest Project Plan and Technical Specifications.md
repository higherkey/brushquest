# **BrushQuest Project Plan and Technical Specifications**

BrushQuest is a web-based toothbrushing assistant designed to improve oral hygiene habits in children through structured timing, interactive gamification, and technique coaching. The application is structured to be lightweight, responsive, and capable of offline use via Progressive Web App (PWA) standards.

## **Project Phase 1: Proof of Concept (POC)**

The primary objective of the POC is to validate the timing logic and established the foundational user interface.

| Category | Requirement   |
| :---- | :---- |
| **Core Timing** | Implementation of a 120-second countdown with configurable "spit and switch" intervals (defaulting to 5 seconds every 30 seconds). |
| **Visual Interface** | High-contrast, large-scale UI components optimized for visibility from a distance in a bathroom setting. |
| **State Feedback** | A progress bar or circular fill animation that visually represents the time remaining in the current quadrant. |

## **Project Phase 2: Minimum Viable Product (MVP)**

The MVP phase expands the utility into an engaging experience with narrative and persistent features.

| Category | Requirement   |
| :---- | :---- |
| **Narrative Themes** | Introduction of a "Theme Engine" allowing for animated sequences (e.g., Space Mission, Bunny Hop) that progress alongside the timer. |
| **Audio Cues** | Utilization of the Web Audio API for scheduled transitions, warning chimes, and celebratory end-session audio. |
| **Technique Coaching** | Contextual visual overlays demonstrating proper brushing techniques, such as circular motions and back-molar focus. |
| **Persistence** | Use of LocalStorage or IndexedDB to save user preferences, custom timing configurations, and basic session history. |

## **Thorough Technical Specifications**

### **Architecture and Environment**

The application will be developed as a Single Page Application (SPA) to minimize server round-trips and facilitate offline capabilities.

`- Frontend: React (v18+) or Vue.js (v3+)`  
`- Styling: CSS Modules or Tailwind CSS for responsive utility-first design`  
`- PWA Configuration: Service Worker (Workbox) for asset caching and manifest.json for "Add to Home Screen"`  
`- State Management: Context API or Pinia for global settings and timer status`

### **Timing and Synchronization Logic**

To prevent timer drift caused by browser backgrounding or CPU throttling, the engine must compare cumulative elapsed time against the system clock rather than relying on iterative intervals.

`State Enum:`  
  `IDLE: Application initialized`  
  `RUNNING: Timer active, increments elapsed time`  
  `PAUSE_TRANSITION: Active buffer for spitting/switching`  
  `USER_PAUSED: Interaction stopped by parent/child`  
  `COMPLETE: Full 120s reached; triggers rewards`

### **Asset Management**

Graphics should be provided as optimized SVGs where possible to maintain crispness across high-DPI mobile screens without significant payload overhead. Audio assets must be pre-fetched during the IDLE state to ensure zero-latency playback during transitions.

## **Future Iterations**

Post-MVP development will focus on camera-based motion detection for "motion-locked" timing and a shared "Co-op" mode for siblings brushing together.