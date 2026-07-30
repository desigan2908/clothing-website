import "./Wishlist.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { useWishlist } from "../../context/WishlistContext";
import { useCart } from "../../context/CartContext";

export default function Wishlist() {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  return (
    <>
      <Navbar />

      <div className="wishlist-page">
        <h1>My Wishlist</h1>

        {wishlist.length === 0 ? (
          <h2>Your Wishlist is Empty</h2>
        ) : (
          wishlist.map((item) => (
            <div className="wishlist-item" key={item.id}>
              <img
                src={
                  item.thumbnail ||
                  item.images?.[0] ||
                  item.image
                }
                alt={item.title || item.name}
              />

              <div className="wishlist-info">
                <h3>{item.title || item.name}</h3>

                <p>{item.brand}</p>

                <p>₹{item.price}</p>

                <div className="wishlist-buttons">
                  <button
                    className="cart-btn"
                    onClick={() => addToCart(item)}
                  >
                    Move to Cart
                  </button>

                  <button
                    className="remove-btn"
                    onClick={() => removeFromWishlist(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <Footer />
    </>
  );
}