# TimerQuest

> A premium, web-based routine and timer companion for kids. Built for performance, visibility, and fun.

[![standard-readme compliant](https://img.shields.io/badge/readme%20style-standard-brightgreen.svg?style=flat-square)](https://github.com/richardlitt/standard-readme)
[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen?style=flat-square)](https://higherkey.github.io/timerquest/)
[![Deploy Status](https://github.com/higherkey/timerquest/actions/workflows/deploy.yml/badge.svg)](https://github.com/higherkey/timerquest/actions/workflows/deploy.yml)
[![React 19](https://img.shields.io/badge/React-19-20232A?style=flat-square&logo=react)](https://react.dev/)
[![Vite 8](https://img.shields.io/badge/Vite-8-646CFF?style=flat-square&logo=vite)](https://vite.dev/)
[![PWA Ready](https://img.shields.io/badge/PWA-Ready-5A0FC8?style=flat-square&logo=pwa&logoColor=white)](#)
[![Framer Motion 12](https://img.shields.io/badge/Framer--Motion-12-FF007A?style=flat-square&logo=framer)](#)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](LICENSE)

TimerQuest is a child-first, mobile-first task and routine companion that leverages game elements, timing, and high-fidelity visuals to build positive habit patterns for kids.

## Table of Contents

- [Background](#background)
- [Install](#install)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Background

TimerQuest is built on a **"Child-First"** mandate. We prioritize the emotional and sensory needs of children—especially those who may be dysregulated or sensitive—above all else.

### Key Features
- **Precision Timing**: Drift-free countdown logic using the system clock.
- **High-Visibility UI**: Large-scale interface designed for children's focus.
- **Interactive Companion**: Pure SVG wiggling characters (Bear, Panda, Kitty, Bunny) that react to progress.
- **PWA Ready**: Works offline and can be installed on home screens.
- **Local Audio**: High-quality cartoonish animal sounds and event bells.

### Design Philosophy
1. **Accessibility First**: Large touch targets, clear high-contrast text, and zero-scroll layouts.
2. **Emotional Resilience**: State persistence ensures that interruptions (crashes/refreshes) don't break the habit-forming flow.
3. **Childlike Joy**: Every interaction, sound, and animation is designed to spark delight.
4. **UX > Code**: We value intuitive usability and "hand-off" interaction more than developer convenience or code elegance.

### Project Structure
- `src/`: React source code and components.
- `public/`: Static assets, audio resources, and PWA icons.
- `docs/`: Technical specifications and work trace history.

For details on architecture, refer to [PROJECT.md](PROJECT.md).

---

## Install

This project requires [Node.js](https://nodejs.org/) (latest LTS) and npm.

1. **Clone the repository:**
   ```bash
   git clone https://github.com/higherkey/timerquest.git
   cd timerquest
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```

---

## Usage

### Local Development
To launch the Vite development server locally with hot-reloading:
```bash
npm run dev
```

### Production Build
To compile the static production bundle into the `dist/` directory:
```bash
npm run build
```
Preview the built app locally:
```bash
npm run preview
```

---

## Contributing

We welcome contributions of all kinds! Please read [PROJECT.md](PROJECT.md) to understand design principles before initiating layout edits. Follow conventional commit message headers.

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
