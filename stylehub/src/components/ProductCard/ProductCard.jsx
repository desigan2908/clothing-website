import { memo } from "react";
import { Link } from "react-router-dom";
import { FaHeart, FaShoppingCart } from "react-icons/fa";

import "./ProductCard.css";

import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";

function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();

  return (
    <div className="product-card">

      {/* Wishlist Button */}
      <button
        className="wishlist-btn"
        onClick={() => addToWishlist(product)}    
      >
        <FaHeart />
      </button>

      {/* Product Image */}
      <Link to={`/product/${product._id}`}>
        <img
          src={
            product.thumbnail ||
            product.images?.[0] ||
            "/images/no-image.png"
          }
          alt={product.title}
          loading="lazy"
        />
      </Link>

      {/* Product Information */}
      <div className="product-info">

        <h3>{product.title}</h3>

        <p className="brand">
          {product.brand}
        </p>

        <div className="price-section">

          <span className="price">
            ₹{product.price}
          </span>

          {product.discountPercentage > 0 && (
            <span className="discount">
              {product.discountPercentage}% OFF
            </span>
          )}

        </div>

        {product.rating && (
          <p className="rating">
            ⭐ {product.rating}
          </p>
        )}

        <button
          className="cart-btn"
          onClick={() =>
            addToCart({
              ...product,
              quantity: 1,
            })
          }
        >
          <FaShoppingCart />
          Add To Cart
        </button>

      </div>

    </div>
  );
}

export default memo(ProductCard);