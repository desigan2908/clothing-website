import "./CategoryCard.css";

export default function CategoryCard({
  title,
  image,
}) {
  return (
    <div className="category-card">

      <img
        src={image}
        alt={title}
        loading="lazy"
      />

      <div
        className="overlay"
        aria-hidden="true"
      >
        <h2>{title}</h2>
      </div>

    </div>
  );
}