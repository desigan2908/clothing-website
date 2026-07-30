import "./CategoryCard.css";

export default function CategoryCard({ title, image }) {
  return (
    <div className="category-card">
      <img src={image} alt={title} />

      <div className="overlay">
        <h2>{title}</h2>
      </div>
    </div>
  );
}