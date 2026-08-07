import "./BestSellers.css";
import ProductCard from "../ProductCard/ProductCard";

export default function BestSellers() {

  const products = [

    {
      id: 5,
      title: "Premium Hoodie",
      brand: "Puma",
      category: "Hoodies",
      price: 89,
      oldPrice: 120,
      discount: 25,
      rating: 4.9,
      thumbnail:
        "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=600",
    },

    {
      id: 6,
      title: "Formal Shirt",
      brand: "Louis Philippe",
      category: "Shirts",
      price: 65,
      oldPrice: 90,
      discount: 28,
      rating: 4.8,
      thumbnail:
        "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=600",
    },

    {
      id: 7,
      title: "Slim Fit Jeans",
      brand: "Levi's",
      category: "Jeans",
      price: 75,
      oldPrice: 99,
      discount: 24,
      rating: 4.7,
      thumbnail:
        "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600",
    },

    {
      id: 8,
      title: "Running Shoes",
      brand: "Nike",
      category: "Shoes",
      price: 110,
      oldPrice: 145,
      discount: 20,
      rating: 5,
      thumbnail:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600",
    },

  ];

  return (
    <section className="best">

      <h2>🔥 Best Sellers</h2>

      <div className="best-grid">

        {products.map((item) => (
          <ProductCard
            key={item.id}
            product={item}
          />
        ))}

      </div>

    </section>
  );
}