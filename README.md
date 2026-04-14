# GiMusic: Streaming SPA

A React-based music streaming application featuring a custom-built audio engine and optimized real-time data flow. Explore global charts, discover new genres, search for artists, and persistently save your favorite tracks. Engineered with a scalable architecture, seamless API integration, and a mobile-first design to deliver a smooth, app-like user experience.

**🔗 Live Demo:** [gi-gi-music.vercel.app](https://gi-gi-music.vercel.app/)

---
## Preview

<p align="center">
  <img src="https://github.com/user-attachments/assets/83f48ef6-ee84-44d9-a037-540ac9f75b9c" width="90%" alt="GiGi Music Dashboard Preview"/>
</p>

---

## Key Engineering Decisions & Highlights

- **Ref-Based Audio Control** — Used React Refs to manipulate the HTML5 Audio API directly, enabling smooth progress updates without triggering performance-heavy component re-renders.
- **Global Context Logic** — Player state lifted using Context API + `useReducer` for persistent, gapless playback while navigating between different routes.
- **Smart Queue System** — Cyclic playlist navigation, automatic next/previous track handling, and continuous playback logic.
- **Parallel Data Fetching** — Implemented `Promise.all()` for simultaneous API requests (e.g., fetching artist info + top tracks), significantly reducing load times.
- **Debounced Search** — Custom implementation to prevent API spam and ensure smooth real-time querying.
- **Production-Grade UX** — Comprehensive Skeleton loading states, toast notifications for error handling, and robust React Error Boundaries.

---

## Core System Functionality

### 🎧 Custom Player Engine
- **Full Playback Control:** Play/pause, track skipping, and volume control via `rc-slider`.
- **Drag-to-Seek:** Real-time track scrubbing using custom progress bar logic.
- **Persistent State:** Player persists globally across the entire application lifecycle.

### 🔍 Search & Explore
- **Real-Time Search:** Instantly find tracks, artists, and albums via the Deezer API.
- **Global Charts & Genres:** Browse top global tracks and dynamically load random radio stations based on selected music genres.

### 💾 User Library
- **Favorites System:** Mark tracks as 'Liked' to save them instantly to `LocalStorage` for your next visit.

---

## Client-Side Architecture & Data Flow

The application isolates the audio engine from the UI rendering cycle to maximize performance.

```text
[User Interaction / UI Component]
      |
      ▼
[Global Context + useReducer] ─── (Manages Playlist, Current Track, Play State)
      |
      ▼
[HTML5 Audio API + React Refs] ── (Handles Playback & Time Updates w/o Re-renders)
      |
      ▼
[Service Layer / Custom Hooks] ── (Axios Interceptors, Error Handling, useLoadData)
      |
      ▼
[External Infrastructure] ─────── (Deezer Public API)
```

---

## Engineering Patterns

### Custom Hook Ecosystem
- **`useLoadData`**: Encapsulates async fetching logic and loading state management, keeping components DRY.
- **`useWindowSize`**: Tracks viewport dimensions for complex responsive logic that CSS media queries cannot handle alone.
- **`useDebounceLoadData`**: Delays API calls by 500ms during typing to optimize network usage.

### Styling Methodology
- **CSS-in-JS (Styled-Components):** Scoped, dynamic styling preventing CSS conflicts.
- **Theme-Driven Design:** Global design tokens (breakpoints, colors, fonts) managed via a unified `ThemeProvider`.

---

## Tech Stack

- **React 18** — modern concurrent rendering
- **Context API + useReducer** — scalable global state without external libraries
- **Styled Components** — dynamic, theme-driven styling
- **Axios (with interceptors)** — centralized API layer and error handling
- **Deezer API** — real-world external data integration

---

## Architectural Structure

The codebase follows a modular, feature-based architecture to ensure maintainability and clean separation of concerns.

```text
Gigi-Music/
├── src/
│   ├── components/           # Reusable UI and layout components
│   │   ├── Player/           # Core audio player engine and UI
│   │   ├── TracksTable/      # Complex data grids for track listings
│   │   └── ui/               # Atomic components (Buttons, Typography, SVG Icons)
│   ├── context/              # Global state management
│   │   ├── playerContext.js  # Provider initialization
│   │   └── playerReducer.js  # Playlist and track state transition logic
│   ├── hooks/                # Custom React hooks (useLoadData, useWindowSize)
│   ├── pages/                # Route-level components (Home, Search, Artist, Genre)
│   ├── services/             # External Integrations
│   │   ├── api.js            # Axios configuration and Deezer API endpoints
│   │   └── localStorage.js   # Persistent storage helpers for Favorites
│   └── utils/                # Pure functions (e.g., time formatting)
└── package.json
```

---

## Local Development Setup

To run this project locally, ensure you have `Node.js` installed. The application uses a public API, so no additional backend configuration is strictly required for the core functionality.

1. **Clone the repository:**
```bash
git clone https://github.com/IgorBaranow/gigi-music.git
cd gigi-music
```

2. **Install dependencies:**
```bash
npm install
# or
yarn install
```

3. **Start the development server:**
```bash
npm start
```

## ⭐ Final Note

GiMusic is not a typical frontend project — it is a performance-focused system that demonstrates:

- direct control over browser APIs (HTML5 Audio)
- advanced state synchronization across routes
- optimized real-time data fetching strategies
- scalable and maintainable architecture

Built to reflect real-world frontend engineering challenges beyond standard CRUD applications.


---

* 💼 **LinkedIn:** [linkedin.com/in/igor-baranow](https://www.linkedin.com/in/igor-baranow/)
