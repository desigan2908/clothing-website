import "./Loader.css";

export default function Loader() {
  return (
    <div
      className="loader-container"
      role="status"
      aria-live="polite"
      aria-label="Loading"
    >
      <div className="spinner"></div>

      <p className="loading-text">
        Loading...
      </p>
    </div>
  );
}