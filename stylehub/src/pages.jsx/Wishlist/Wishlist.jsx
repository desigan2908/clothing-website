import "./Wishlist.css";
import { Link } from "react-router-dom";

import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import Loader from "../../components/Loader/Loader";

import { useWishlist } from "../../context/WishlistContext";
import { useCart } from "../../context/CartContext";

export default function Wishlist() {
  const {
    wishlist,
    loading,
    removeFromWishlist,
  } = useWishlist();

  const { addToCart } = useCart();

  const handleMoveToCart = async (item) => {
    await addToCart({
      ...item.product,
      quantity: 1,
    });

    await removeFromWishlist(item._id);
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <Loader />
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="wishlist-page">

        <h1>My Wishlist</h1>

        {wishlist.length === 0 ? (
          <div className="empty-wishlist">

            <h2>Your Wishlist is Empty</h2>

            <p>
              Save your favorite products here
              and shop them later.
            </p>

            <Link to="/products">
              <button className="continue-btn">
                Continue Shopping
              </button>
            </Link>

          </div>
        ) : (
          <div className="wishlist-list">

            {wishlist.map((item) => (
              <div
                className="wishlist-item"
                key={item._id}
              >

                <Link
                  to={`/product/${item.product._id}`}
                >
                  <img
                    src={
                      item.product.thumbnail ||
                      item.product.images?.[0]
                    }
                    alt={item.product.title}
                    loading="lazy"
                  />
                </Link>

                <div className="wishlist-info">

                  <h3>
                    {item.product.title}
                  </h3>

                  <p>
                    {item.product.brand}
                  </p>

                  <p>
                    ₹{item.product.price}
                  </p>

                  <div className="wishlist-buttons">

                    <button
                      type="button"
                      className="cart-btn"
                      onClick={() =>
                        handleMoveToCart(item)
                      }
                    >
                      Move to Cart
                    </button>

                    <button
                      type="button"
                      className="remove-btn"
                      onClick={() =>
                        removeFromWishlist(item._id)
                      }
                    >
                      Remove
                    </button>

                  </div>

                </div>

              </div>
            ))}

          </div>
        )}

      </main>

      <Footer />
    </>
  );
}