export default function StatusBar({ message, kind }) {
  return (
    <section
      className={`status-bar ${kind === "loading" ? "is-loading" : ""} ${
        kind === "error" ? "is-error" : ""
      }`}
      aria-live="polite"
    >
      {message}
    </section>
  );
}