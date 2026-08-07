import "./FeaturedCollections.css";
import { Link } from "react-router-dom";
import CategoryCard from "../CategoryCard/CategoryCard";

export default function FeaturedCollections() {
  const categories = [
    {
      id: 1,
      title: "Men",
      image:
        "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600",
    },
    {
      id: 2,
      title: "Women",
      image:
        "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600",
    },
    {
      id: 3,
      title: "Kids",
      image:
        "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=600",
    },
  ];

  return (
    <section className="featured">
      <h1>Featured Collections</h1>

      <div className="category-grid">
        {categories.map((item) => (
          <Link
            key={item.id}
            to="/products"
            style={{ textDecoration: "none" }}
          >
            <CategoryCard
              title={item.title}
              image={item.image}
            />
          </Link>
        ))}
      </div>
    </section>
  );
}