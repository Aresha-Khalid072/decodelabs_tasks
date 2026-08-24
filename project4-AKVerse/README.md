
# 🎬 AK Verse — Movie & Anime Discovery Hub

**DecodeLabs Internship — Full Stack Developer Track**
**Project 4: Frontend & Backend Integration**

A full-stack discovery application built with **React (Vite)** on the frontend and **Node.js + Express** on the backend.

The backend proxies two free public APIs — **TVMaze** for TV content and **Jikan** for anime — normalizes their responses into a consistent shape, caches results, and exposes a clean RESTful API layer, including a full **Watchlist** feature demonstrating GET, POST, and DELETE operations end-to-end.

---

## 🎯 Project Overview

**AK Verse** is a movie, TV show, and anime discovery platform where users can:

* 🔎 Search for movies, TV shows, and anime
* 📺 Browse trending titles
* ⭐ View ratings and genres
* 📖 View detailed information and summaries
* ❤️ Add titles to a personal watchlist
* 🗑️ Remove titles from the watchlist

The application follows a simple **Input → Process → Output** architecture:

```text
┌──────────────────────┐
│        INPUT         │
│                      │
│ User searches or    │
│ browses titles      │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│       PROCESS        │
│                      │
│ React → Express      │
│ API validation       │
│ External API calls   │
│ Caching              │
│ Data normalization   │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│       OUTPUT         │
│                      │
│ Consistent JSON      │
│ response rendered    │
│ in React UI          │
└──────────────────────┘
```

---

## 🛠️ Tech Stack

### Backend

* **Node.js**
* **Express.js**
* **CORS**
* **Morgan** — HTTP request logging
* **Custom TTL Cache** — in-memory caching
* **Custom `ApiError` class**
* **Centralized error-handling middleware**
* Modular **service / route / store** architecture

### Frontend

* **React 18**
* **Vite**
* **Context API** — global watchlist state
* **Custom debounce hook**
* **Stale-request guard** — prevents race conditions
* Custom **Cinema Marquee** design system
* Pure CSS — **no UI library**

### External APIs

* 🎬 **TVMaze** — TV and live-action content
* 🍿 **Jikan** — Anime data

---

## 📂 Project Structure

```text
project4-AKVerse/
│
├── backend/                              # Express backend
│   ├── server.js                         # Application entry point
│   ├── package.json                      # Backend dependencies
│   │
│   └── src/
│       │
│       ├── services/                     # External API integrations
│       │   ├── tvmazeService.js          # TVMaze API + caching
│       │   └── jikanService.js           # Jikan API + caching
│       │
│       ├── store/                        # Application data store
│       │   └── watchlistStore.js         # In-memory watchlist
│       │
│       ├── routes/                       # REST API routes
│       │   ├── searchRoutes.js           # Search endpoints
│       │   ├── detailsRoutes.js          # Details endpoints
│       │   ├── trendingRoutes.js         # Trending endpoints
│       │   └── watchlistRoutes.js        # Watchlist CRUD
│       │
│       ├── middleware/                   # Express middleware
│       │   ├── asyncHandler.js           # Async error forwarding
│       │   └── errorHandler.js           # Centralized error handling
│       │
│       └── utils/                        # Reusable utilities
│           ├── ApiError.js               # Custom API error class
│           └── ttlCache.js               # TTL cache implementation
│
└── frontend/                             # React + Vite frontend
    ├── index.html                        # HTML entry point
    ├── package.json                      # Frontend dependencies
    │
    └── src/
        │
        ├── main.jsx                      # React entry point
        ├── App.jsx                       # Main application component
        ├── index.css                     # Global styles/design system
        │
        ├── api/
        │   └── client.js                 # Centralized API requests
        │
        ├── context/
        │   └── WatchlistContext.jsx      # Global watchlist state
        │
        ├── hooks/
        │   └── useDebouncedValue.js      # Search debounce hook
        │
        └── components/                   # Reusable UI components
            ├── Marquee.jsx               # Header/marquee section
            ├── ControlDeck.jsx           # Search and controls
            ├── StatusBar.jsx             # Application status
            ├── ResultsGrid.jsx           # Search results grid
            ├── PosterCard.jsx            # Individual title card
            ├── DetailsModal.jsx          # Title details modal
            └── WatchlistDrawer.jsx       # Watchlist panel
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

* **Node.js v18+**
* **npm**
* Internet connection

The backend communicates with live public APIs, so an active internet connection is required.

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Aresha-Khalid072/decodelabs_tasks.git
```

Navigate to the project:

```bash
cd decodelabs_tasks/project4-AKVerse
```

### 2️⃣ Start the Backend

Open a terminal:

```bash
cd backend
npm install
npm run dev
```

The backend will run on:

```text
http://localhost:4000
```

### 3️⃣ Start the Frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

The frontend will run on:

```text
http://localhost:5173
```

Open **[http://localhost:5173](http://localhost:5173)** in your browser.

> ⚠️ Make sure the backend is running before using search, trending, and watchlist functionality.

---

## 📡 API Endpoints

| Resource  | Method   | Endpoint                               | Description               |
| --------- | -------- | -------------------------------------- | ------------------------- |
| Health    | `GET`    | `/health`                              | Basic server health check |
| Search    | `GET`    | `/api/search?query=&type=movie\|anime` | Search titles by keyword  |
| Details   | `GET`    | `/api/details/:type/:id`               | Get details for a title   |
| Trending  | `GET`    | `/api/trending?type=movie\|anime`      | Get trending titles       |
| Watchlist | `GET`    | `/api/watchlist`                       | List all saved items      |
| Watchlist | `POST`   | `/api/watchlist`                       | Add an item               |
| Watchlist | `DELETE` | `/api/watchlist/:id`                   | Remove an item            |

---

## ✨ Key Features

### 🔎 Dual-Source Search

A unified search interface supports both:

* 🎬 Live-action TV content through **TVMaze**
* 🍿 Anime content through **Jikan**

### 🔄 Data Normalization

TVMaze and Jikan return completely different response structures.

AK Verse transforms both responses into a **consistent internal data format**, allowing the frontend to work with both sources through the same UI components.

### ⚡ In-Memory TTL Caching

Search results are cached for **2 minutes**.

This helps:

* Reduce unnecessary external API requests
* Improve response time
* Reduce pressure on public APIs

### ⌨️ Debounced Search

Search requests are triggered only after the user stops typing for **450ms**.

This prevents an API request from being sent for every individual keystroke.

### 🛡️ Stale Request Protection

A request counter ensures that when multiple searches are triggered quickly, only the response belonging to the **latest request** is rendered.

This prevents outdated search results from replacing newer results.

### 🚨 Centralized Error Handling

The backend uses:

* Custom `ApiError`
* `asyncHandler`
* Centralized error middleware

This keeps error responses consistent and prevents internal stack traces from being exposed to clients.

### ❤️ Watchlist

The application demonstrates end-to-end REST operations:

```text
GET     → Retrieve watchlist
POST    → Add item
DELETE  → Remove item
```

The frontend communicates with the Express backend, which manages the watchlist through an in-memory store.

---

## 🔒 Reliability Notes

### Jikan API

Jikan is a free, community-run API and can occasionally experience rate limits or temporary server errors.

Anime requests may occasionally return:

```text
502 Bad Gateway
504 Gateway Timeout
```

These errors are handled gracefully by the application UI instead of causing the entire application to crash.

### Watchlist Storage

The current watchlist uses an **in-memory store**.

Therefore:

> ⚠️ Watchlist data is reset whenever the backend server restarts.

The architecture is designed so that `watchlistStore.js` can later be replaced with a persistent database such as:

* MongoDB
* SQLite
* PostgreSQL
* MySQL

The frontend and route structure can remain largely unchanged.

---

## 🧠 Architecture

```text
                     ┌─────────────────────┐
                     │     React + Vite    │
                     │      Frontend       │
                     └──────────┬──────────┘
                                │
                                │ REST API
                                ▼
                     ┌─────────────────────┐
                     │   Express Backend   │
                     │                     │
                     │  Routes + Middleware│
                     └──────────┬──────────┘
                                │
                 ┌──────────────┼──────────────┐
                 │              │              │
                 ▼              ▼              ▼
          ┌───────────┐  ┌───────────┐  ┌─────────────┐
          │  TVMaze   │  │   Jikan   │  │  Watchlist  │
          │    API    │  │    API    │  │    Store    │
          └───────────┘  └───────────┘  └─────────────┘
                 │              │              │
                 └──────────────┼──────────────┘
                                ▼
                     ┌─────────────────────┐
                     │ Data Normalization  │
                     │   + TTL Caching     │
                     └─────────────────────┘
                                │
                                ▼
                     ┌─────────────────────┐
                     │ Consistent JSON API │
                     └─────────────────────┘
```

---

## 🎨 UI & Design

AK Verse uses a custom **cinema-inspired visual design** built from scratch.

### Design characteristics

* 🎞️ Cinema marquee aesthetic
* 🎬 Movie-inspired interface
* 📱 Responsive layout
* 🃏 Reusable poster cards
* 🔍 Interactive search controls
* ❤️ Watchlist drawer
* 🪟 Details modal
* ⚡ Loading and error states

No third-party UI framework was used.

---


## 📚 Learning Outcomes

This project demonstrates practical experience with:

* Full-stack application architecture
* React component development
* REST API development
* Express middleware
* API integration
* Data normalization
* Caching strategies
* Debounced search
* Race-condition prevention
* Context API
* CRUD operations
* Error handling
* Modular backend architecture
* Frontend/backend integration

---

## ✍️ Author

**Aresha**
🎓 DecodeLabs Full Stack Developer Intern

---

## 📄 License

This project was built for **educational purposes** as part of the **DecodeLabs Full Stack Developer Internship Program**.
