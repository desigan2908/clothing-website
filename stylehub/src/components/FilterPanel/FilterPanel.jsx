import "./FilterPanel.css";

export default function FilterPanel({
  categories = [],
  selectedCategory,
  onCategoryChange,
}) {
  return (
    <div className="filter-panel">
      <div className="filter-content">
        <span className="filter-label">Category</span>

        <select
          id="category-filter"
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
        >
          <option value="">All Categories</option>

          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}