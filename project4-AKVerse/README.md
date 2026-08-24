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