import "./ProductCard.css";
import { FaHeart } from "react-icons/fa";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();

  return (
    <div className="product-card">
      <button
        className="wishlist-icon"
        onClick={() => addToWishlist(product)}
      >
        <FaHeart />
      </button>

      <Link to={`/products/${product.id}`} className="product-link">
        <img
          src={
            product.thumbnail ||
            product.images?.[0] ||
            product.image
          }
          alt={product.title || product.name}
        />
        <h3>{product.title || product.name}</h3>
      </Link>

      <p className="brand">{product.brand}</p>

      <p className="price">₹{product.discountPrice ?? product.price}</p>

      <button
        className="cart-btn"
        onClick={() => addToCart(product)}
      >
        Add To Cart
      </button>
    </div>
  );
}