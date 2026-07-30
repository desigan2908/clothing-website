import "./FeaturedCollections.css";
import CategoryCard from "../CategoryCard/CategoryCard";

export default function FeaturedCollections() {

  const categories = [
    {
      title: "Men",
      image:
        "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600",
    },
    {
      title: "Women",
      image:
        "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600",
    },
    {
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
          <CategoryCard
            key={item.title}
            title={item.title}
            image={item.image}
          />
        ))}

      </div>

    </section>
  );
}