export default function Marquee() {
  return (
    <header className="marquee">
      <div className="marquee__bulbs" aria-hidden="true" />
      <h1 className="marquee__title">
        AK<span>VERSE</span>
      </h1>
      <p className="marquee__subtitle">Now showing — search across movies, TV &amp; anime</p>
    </header>
  );
}