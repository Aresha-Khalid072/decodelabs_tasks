export default function PosterCard({ item, onClick }) {
  return (
    <div className="poster-card" onClick={() => onClick(item)}>
      <div className="poster-card__image-wrap">
        {item.poster ? (
          <img src={item.poster} alt={item.title} loading="lazy" />
        ) : (
          <div className="no-poster">No poster available</div>
        )}
        {item.rating && <span className="poster-card__rating">★ {item.rating}</span>}
      </div>
      <div className="poster-card__body">
        <p className="poster-card__title">{item.title}</p>
        <span className="poster-card__meta">{item.year}</span>
      </div>
    </div>
  );
}