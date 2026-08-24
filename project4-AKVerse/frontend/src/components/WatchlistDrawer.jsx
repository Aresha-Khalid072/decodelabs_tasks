import { useWatchlist } from "../context/WatchlistContext";

export default function WatchlistDrawer({ isOpen, onClose }) {
  const { items, remove } = useWatchlist();

  return (
    <>
      <aside className={`watchlist-drawer ${isOpen ? "is-open" : ""}`} aria-hidden={!isOpen}>
        <div className="watchlist-drawer__header">
          <h2>Your Watchlist</h2>
          <button aria-label="Close watchlist" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="watchlist-drawer__list">
          {items.length === 0 ? (
            <p className="empty-note">No tickets yet. Add something from the results.</p>
          ) : (
            items.map((item) => (
              <div className="ticket-stub" key={item.id}>
                {item.poster && (
                  <img className="ticket-stub__poster" src={item.poster} alt={item.title} />
                )}
                <div className="ticket-stub__body">
                  <span className="ticket-stub__title">{item.title}</span>
                  <span className="ticket-stub__meta">
                    {item.year} {item.rating ? `· ★ ${item.rating}` : ""}
                  </span>
                </div>
                <div className="ticket-stub__tear" />
                <button
                  className="ticket-stub__remove"
                  aria-label="Remove"
                  onClick={() => remove(item.id)}
                >
                  ✕
                </button>
              </div>
            ))
          )}
        </div>
      </aside>
      <div className={`drawer-backdrop ${isOpen ? "is-open" : ""}`} onClick={onClose} />
    </>
  );
}