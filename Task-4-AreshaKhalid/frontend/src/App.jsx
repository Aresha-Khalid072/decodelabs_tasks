import { useEffect, useRef, useState } from "react";
import Marquee from "./components/Marquee";
import ControlDeck from "./components/ControlDeck";
import StatusBar from "./components/StatusBar";
import ResultsGrid from "./components/ResultsGrid";
import WatchlistDrawer from "./components/WatchlistDrawer";
import DetailsModal from "./components/DetailsModal";
import { useDebouncedValue } from "./hooks/useDebouncedValue";
import * as api from "./api/client";

export default function App() {
  const [contentType, setContentType] = useState("movie"); // "movie" | "anime"
  const [searchInput, setSearchInput] = useState("");
  const debouncedQuery = useDebouncedValue(searchInput, 450);

  const [results, setResults] = useState([]);
  const [statusMessage, setStatusMessage] = useState(
    'Try searching for something like "Breaking Bad" or "One Piece" — or browse what\'s trending below.'
  );
  const [statusKind, setStatusKind] = useState("info"); // "info" | "loading" | "error"

  const [selectedItem, setSelectedItem] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Guards against a slow, stale request overwriting a newer one's results
  // (e.g. user types "batman", then quickly changes to "b" - the shorter
  // query's response might resolve first, out of order).
  const requestIdRef = useRef(0);

  useEffect(() => {
    const thisRequestId = ++requestIdRef.current;

    async function runFetch() {
      const query = debouncedQuery.trim();

      if (!query) {
        // No search term: show what's trending instead of an empty screen.
        setStatusKind("loading");
        setStatusMessage(`Loading trending ${contentType === "movie" ? "shows" : "anime"}…`);
        try {
          const data = await api.getTrending(contentType);
          if (thisRequestId !== requestIdRef.current) return;
          setResults(data.results);
          setStatusKind("info");
          setStatusMessage(
            data.results.length
              ? `Trending ${contentType === "movie" ? "shows" : "anime"} right now.`
              : "Nothing trending right now — try searching instead."
          );
        } catch (error) {
          if (thisRequestId !== requestIdRef.current) return;
          console.error("Trending fetch failed:", error);
          setResults([]);
          setStatusKind("error");
          setStatusMessage(error.message);
        }
        return;
      }

      setStatusKind("loading");
      setStatusMessage(`Searching ${contentType === "movie" ? "movies & TV" : "anime"}…`);

      try {
        const data = await api.searchTitles(query, contentType);
        if (thisRequestId !== requestIdRef.current) return; // a newer request has since started

        setResults(data.results);
        setStatusKind("info");
        setStatusMessage(
          data.results.length
            ? `${data.results.length} result${data.results.length === 1 ? "" : "s"} found.`
            : `No results for "${query}". Try another title.`
        );
      } catch (error) {
        if (thisRequestId !== requestIdRef.current) return;
        console.error("Search failed:", error);
        setResults([]);
        setStatusKind("error");
        setStatusMessage(error.message);
      }
    }

    runFetch();
  }, [debouncedQuery, contentType]);

  return (
    <div className={contentType === "anime" ? "mode-anime" : ""}>
      <div className="sprocket-strip" aria-hidden="true" />

      <Marquee />

      <main className="stage">
        <ControlDeck
          contentType={contentType}
          onContentTypeChange={setContentType}
          searchValue={searchInput}
          onSearchChange={setSearchInput}
          onOpenWatchlist={() => setIsDrawerOpen(true)}
        />

        <StatusBar message={statusMessage} kind={statusKind} />

        <ResultsGrid items={results} onSelect={setSelectedItem} />
      </main>

      <WatchlistDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />

      <DetailsModal item={selectedItem} onClose={() => setSelectedItem(null)} />

      <div className="sprocket-strip sprocket-strip--bottom" aria-hidden="true" />
    </div>
  );
}