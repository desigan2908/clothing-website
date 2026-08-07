import "./SearchBar.css";
import { FaSearch, FaTimes } from "react-icons/fa";

export default function SearchBar({
  value,
  onChange,
  placeholder = "Search products...",
}) {
  return (
    <div className="search-bar">

      <FaSearch className="search-icon" />

      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Search Products"
      />

      {value && (
        <button
          className="clear-btn"
          onClick={() => onChange("")}
        >
          <FaTimes />
        </button>
      )}

    </div>
  );
}