import "./NewArrivals.css";
import ProductCard from "../ProductCard/ProductCard";

export default function NewArrivals() {

  const products = [

    {
      id: 1,
      title: "Casual Hoodie",
      brand: "Nike",
      category: "Hoodies",
      price: 79,
      oldPrice: 99,
      discount: 20,
      rating: 4.5,
      thumbnail:
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600",
    },

    {
      id: 2,
      title: "Denim Jacket",
      brand: "Levi's",
      category: "Jackets",
      price: 95,
      oldPrice: 120,
      discount: 15,
      rating: 4.8,
      thumbnail:
        "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600",
    },

    {
      id: 3,
      title: "Summer Dress",
      brand: "Zara",
      category: "Dresses",
      price: 60,
      oldPrice: 75,
      discount: 20,
      rating: 4.7,
      thumbnail:
        "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600",
    },

    {
      id: 4,
      title: "Sneakers",
      brand: "Adidas",
      category: "Shoes",
      price: 110,
      oldPrice: 140,
      discount: 22,
      rating: 4.9,
      thumbnail:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600",
    },

  ];

  return (
    <section className="arrivals">

      <h1>New Arrivals</h1>

      <div className="product-grid">

        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}

      </div>

    </section>
  );
}