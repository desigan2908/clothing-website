import "./Cart.css";
import { Link } from "react-router-dom";

import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import Loader from "../../components/Loader/Loader";

import { useCart } from "../../context/CartContext";

export default function Cart() {
  const {
    cart,
    loading,
    increaseQuantity,
    decreaseQuantity,
    removeItem,
    totalPrice,
    delivery,
    grandTotal,
  } = useCart();

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

      <div className="cart-page">

        <h1>Shopping Cart</h1>

        {cart.length === 0 ? (
          <div className="empty-cart">

            <h2>Your Cart is Empty</h2>

            <Link to="/products">
              <button className="continue-btn">
                Continue Shopping
              </button>
            </Link>

          </div>
        ) : (
          <>
            {cart.map((item) => (
              <div
                className="cart-item"
                key={item._id}
              >

                <img
                  src={
                    item.product.thumbnail ||
                    item.product.images?.[0]
                  }
                  alt={item.product.title}
                  loading="lazy"
                />

                <div>

                  <h3>{item.product.title}</h3>

                  <p>{item.product.brand}</p>

                  <p>
                    ₹{item.product.price}
                  </p>

                  <div className="qty">

                    <button
                      onClick={() =>
                        decreaseQuantity(
                          item._id,
                          item.quantity
                        )
                      }
                    >
                      -
                    </button>

                    <span>
                      {item.quantity}
                    </span>

                    <button
                      onClick={() =>
                        increaseQuantity(
                          item._id,
                          item.quantity
                        )
                      }
                    >
                      +
                    </button>

                  </div>

                  <button
                    className="remove"
                    onClick={() =>
                      removeItem(item._id)
                    }
                  >
                    Remove
                  </button>

                </div>

              </div>
            ))}

            <div className="summary">

              <h3>
                Total : ₹
                {totalPrice.toFixed(2)}
              </h3>

              <h3>
                Delivery : ₹
                {delivery.toFixed(2)}
              </h3>

              <h2>
                Grand Total : ₹
                {grandTotal.toFixed(2)}
              </h2>

              <Link to="/checkout">
                <button className="checkout-btn">
                  Proceed to Checkout
                </button>
              </Link>

            </div>
          </>
        )}

      </div>

      <Footer />
    </>
  );
}