import { useEffect, useState } from "react";
import * as api from "../api/client";
import { useWatchlist } from "../context/WatchlistContext";

export default function DetailsModal({ item, onClose }) {
  const [details, setDetails] = useState(null);
  const [status, setStatus] = useState("loading"); // "loading" | "ready" | "error"
  const [isAdding, setIsAdding] = useState(false);
  const { isSaved, add } = useWatchlist();

  useEffect(() => {
    if (!item) return;

    let cancelled = false;
    setStatus("loading");
    setDetails(null);

    async function loadDetails() {
      try {
        const data = await api.getDetails(item.type, item.sourceId);
        if (!cancelled) {
          setDetails(data.result);
          setStatus("ready");
        }
      } catch (error) {
        console.error("Details error:", error);
        if (!cancelled) setStatus("error");
      }
    }

    loadDetails();
    return () => {
      cancelled = true;
    };
  }, [item]);

  if (!item) return null;

  const saved = details ? isSaved(details.id) : false;

  async function handleAdd() {
    setIsAdding(true);
    try {
      await add(details);
    } catch (error) {
      console.error("Add to watchlist failed:", error);
    } finally {
      setIsAdding(false);
    }
  }

  return (
    <div className="modal-backdrop is-open" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal" role="dialog" aria-modal="true">
        <button className="modal__close" aria-label="Close" onClick={onClose}>
          ✕
        </button>

        {status === "loading" && <p style={{ color: "var(--text-muted)" }}>Loading details…</p>}

        {status === "error" && (
          <p style={{ color: "var(--red)" }}>Couldn't load details right now. Please try again.</p>
        )}

        {status === "ready" && details && (
          <>
            <h2 className="modal__title">{details.title}</h2>
            <div className="modal__meta">
              {details.year} {details.rating ? `· ★ ${details.rating}` : ""}
            </div>
            <p className="modal__summary">{details.summary}</p>
            <div className="modal__genres">
              {details.genres.map((genre) => (
                <span className="genre-chip" key={genre}>
                  {genre}
                </span>
              ))}
            </div>
            <div className="modal__actions">
              <button className="modal__add-btn" disabled={saved || isAdding} onClick={handleAdd}>
                {saved ? "✓ In Watchlist" : isAdding ? "Adding…" : "+ Add to Watchlist"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}