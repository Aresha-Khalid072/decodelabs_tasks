import { useWatchlist } from "../context/WatchlistContext";

export default function ControlDeck({
  contentType,
  onContentTypeChange,
  searchValue,
  onSearchChange,
  onOpenWatchlist,
}) {
  const { items } = useWatchlist();

  return (
    <section className="control-deck">
      <div className="toggle-group" role="tablist" aria-label="Content type">
        <button
          className={`toggle-btn ${contentType === "movie" ? "is-active" : ""}`}
          role="tab"
          aria-selected={contentType === "movie"}
          onClick={() => onContentTypeChange("movie")}
        >
          🎬 Movies &amp; TV
        </button>
        <button
          className={`toggle-btn ${contentType === "anime" ? "is-active" : ""}`}
          role="tab"
          aria-selected={contentType === "anime"}
          onClick={() => onContentTypeChange("anime")}
        >
          🌸 Anime
        </button>
      </div>

      <div className="search-bar">
        <input
          type="text"
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search titles… e.g. Breaking Bad, Naruto, Interstellar"
          autoComplete="off"
        />
      </div>

      <button className="watchlist-toggle" type="button" onClick={onOpenWatchlist}>
        🎟️ Watchlist <span id="watchlist-count">{items.length}</span>
      </button>
    </section>
  );
}