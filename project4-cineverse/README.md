# 🎬 AK Verse — Movie & Anime Discovery Hub

**DecodeLabs Internship — Full Stack Developer Track**
**Project 4: Frontend & Backend Integration**

A full-stack discovery application built with **React (Vite)** on the frontend and **Node.js + Express** on the backend. The backend proxies two free public APIs — **TVMaze** (movies/TV) and **Jikan** (anime) — normalizes their responses into a consistent shape, caches results, and exposes a clean RESTful layer, including a full **Watchlist** feature demonstrating GET, POST, and DELETE end-to-end.

---

## 🎯 Project Overview

AK Verse lets users search and browse movies, TV shows, and anime, view detailed information (rating, genres, summary), and maintain a personal watchlist — all powered by a custom backend that talks to external APIs on the frontend's behalf.

This project focuses on the **Input → Process → Output** architecture of a real full-stack application:
- **Input:** User searches or browses trending titles via the React UI
- **Process:** The Express backend validates requests, fetches/caches data from external APIs, and normalizes it
- **Output:** A clean, consistent JSON response is sent back and rendered in the UI

---

## 🛠️ Tech Stack

**Backend:** Node.js, Express, `cors`, `morgan` (request logging), a hand-rolled in-memory TTL cache, a custom `ApiError` class, and a centralized error-handling middleware — built with modular service/route/store layers instead of a single monolithic file.

**Frontend:** React 18 + Vite, Context API for global watchlist state, a custom debounce hook (`useDebouncedValue`), a stale-request guard to prevent race conditions on fast typing, and a from-scratch "cinema marquee" design system — no UI library used.

---

## 📂 Project Structure

AK-Verse/
├── backend/
│ ├── server.js # entry point — wires everything together
│ ├── package.json
│ └── src/
│ ├── services/
│ │ ├── tvmazeService.js # talks to TVMaze, owns its cache
│ │ └── jikanService.js # talks to Jikan, owns its cache
│ ├── store/
│ │ └── watchlistStore.js # in-memory "database" (swap for real DB later)
│ ├── routes/
│ │ ├── searchRoutes.js
│ │ ├── detailsRoutes.js
│ │ ├── trendingRoutes.js
│ │ └── watchlistRoutes.js
│ ├── middleware/
│ │ ├── asyncHandler.js # forwards rejected promises to the error handler
│ │ └── errorHandler.js # single place all errors are logged + formatted
│ └── utils/
│ ├── ApiError.js
│ └── ttlCache.js
└── frontend/
├── index.html
├── package.json
└── src/
├── main.jsx
├── App.jsx # top-level state + data-fetching effect
├── index.css # design system (marquee/film-reel theme)
├── api/client.js # every fetch() call lives here
├── context/WatchlistContext.jsx
├── hooks/useDebouncedValue.js
└── components/
├── Marquee.jsx
├── ControlDeck.jsx
├── StatusBar.jsx
├── ResultsGrid.jsx
├── PosterCard.jsx
├── DetailsModal.jsx
└── WatchlistDrawer.jsx



---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- An internet connection (the backend calls live public APIs)

### 1. Backend Setup
```bash
cd backend
npm install
npm run dev             # runs on http://localhost:4000
```

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev              # runs on http://localhost:5173
```

Open `http://localhost:5173` in your browser — the backend must be running for search/trending/watchlist to work.

---

## 📡 API Endpoints

| Resource | Method | Endpoint | Description |
|---|---|---|---|
| Health | `GET` | `/health` | Basic server health check |
| Search | `GET` | `/api/search?query=&type=movie\|anime` | Search titles by keyword |
| Details | `GET` | `/api/details/:type/:id` | Get full details for one title |
| Trending | `GET` | `/api/trending?type=movie\|anime` | Get currently trending titles |
| Watchlist | `GET` | `/api/watchlist` | List all saved items |
| Watchlist | `POST` | `/api/watchlist` | Add an item to the watchlist |
| Watchlist | `DELETE` | `/api/watchlist/:id` | Remove an item from the watchlist |

---

## ✨ Key Features

- **Dual-source search** — one unified interface for both live-action (TVMaze) and anime (Jikan) content
- **Data normalization** — both APIs' very different response shapes are mapped into one consistent internal format
- **In-memory TTL caching** — repeated searches within a 2-minute window are served from cache instead of hitting external APIs again
- **Debounced search** — API calls only fire after the user stops typing for 450ms, avoiding a request per keystroke
- **Stale-request guard** — a request counter ensures that if searches fire in quick succession, only the response from the *latest* request is ever rendered
- **Centralized error handling** — a custom `ApiError` class and single error-handling middleware produce consistent, safe error responses instead of leaking stack traces
- **Full CRUD on the Watchlist** — GET, POST, and DELETE are all demonstrated end-to-end against an in-memory store

---

## 🔒 Reliability Notes

- The Jikan API is a free, community-run service with a strict rate limit. Occasional `502`/`504` errors from anime search are expected under load and are handled gracefully by the UI rather than crashing the app.
- The watchlist is stored in-memory on the backend — it resets when the backend server restarts. Swapping in a real database (MongoDB, SQLite, etc.) only requires rewriting `watchlistStore.js`; no route or frontend code would need to change.

---

## ✍️ Author

**Aresha** — DecodeLabs Full Stack Developer Intern

---

## 📄 License

This project was built for educational purposes as part of the DecodeLabs internship program.