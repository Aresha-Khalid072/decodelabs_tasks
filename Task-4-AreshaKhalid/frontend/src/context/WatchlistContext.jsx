import { createContext, useCallback, useContext, useEffect, useState } from "react";
import * as api from "../api/client";

const WatchlistContext = createContext(null);

export function WatchlistProvider({ children }) {
  const [items, setItems] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function loadInitialWatchlist() {
      try {
        const data = await api.getWatchlist();
        if (!cancelled) setItems(data.results);
      } catch (error) {
        console.error("Failed to load watchlist:", error);
      } finally {
        if (!cancelled) setLoaded(true);
      }
    }

    loadInitialWatchlist();
    return () => {
      cancelled = true;
    };
  }, []);

  const add = useCallback(async (item) => {
    const data = await api.addToWatchlist(item);
    setItems(data.results);
  }, []);

  const remove = useCallback(async (id) => {
    const data = await api.removeFromWatchlist(id);
    setItems(data.results);
  }, []);

  const isSaved = useCallback((id) => items.some((entry) => entry.id === id), [items]);

  const value = { items, loaded, add, remove, isSaved };

  return <WatchlistContext.Provider value={value}>{children}</WatchlistContext.Provider>;
}

export function useWatchlist() {
  const context = useContext(WatchlistContext);
  if (!context) {
    throw new Error("useWatchlist must be used within a WatchlistProvider");
  }
  return context;
}