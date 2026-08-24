import PosterCard from "./PosterCard";

export default function ResultsGrid({ items, onSelect }) {
  if (items.length === 0) return null;

  return (
    <section className="results-grid">
      {items.map((item) => (
        <PosterCard key={item.id} item={item} onClick={onSelect} />
      ))}
    </section>
  );
}