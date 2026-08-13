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

      <main className="cart-page">

        {/* Page Header */}
        <div className="cart-header">
          <div>
            <h1>Shopping Cart</h1>
            {cart.length > 0 && (
              <p>
                {cart.length} {cart.length === 1 ? "item" : "items"} in your cart
              </p>
            )}
          </div>

          {cart.length > 0 && (
            <Link to="/products" className="continue-shopping">
              Continue Shopping
            </Link>
          )}
        </div>

        {/* Empty Cart */}
        {cart.length === 0 ? (
          <div className="empty-cart">

            <div className="empty-cart-icon">
              🛒
            </div>

            <h2>Your Cart is Empty</h2>

            <p>
              Looks like you haven't added anything to your cart yet.
            </p>

            <Link to="/products">
              <button className="continue-btn">
                Start Shopping
              </button>
            </Link>

          </div>
        ) : (

          /* Cart Content */
          <div className="cart-layout">

            {/* Left Side - Cart Items */}
            <div className="cart-items">

              <div className="cart-items-header">
                <h2>Your Items</h2>
                <span>{cart.length} items</span>
              </div>

              {cart.map((item) => (

                <div
                  className="cart-item"
                  key={item._id}
                >

                  {/* Product Image */}
                  <div className="cart-image-wrapper">

                    <img
                      src={
                        item.product.thumbnail ||
                        item.product.images?.[0] ||
                        "/images/no-image.png"
                      }
                      alt={item.product.title}
                      loading="lazy"
                    />

                  </div>

                  {/* Product Details */}
                  <div className="cart-product-info">

                    <div className="product-details">

                      <h3>
                        {item.product.title}
                      </h3>

                      <p className="cart-brand">
                        {item.product.brand}
                      </p>

                      <p className="cart-price">
                        ₹{Number(item.product.price).toFixed(2)}
                      </p>

                    </div>

                    {/* Quantity + Remove */}
                    <div className="cart-actions">

                      <div className="qty">

                        <button
                          type="button"
                          aria-label="Decrease quantity"
                          onClick={() =>
                            decreaseQuantity(
                              item._id,
                              item.quantity
                            )
                          }
                        >
                          −
                        </button>

                        <span>
                          {item.quantity}
                        </span>

                        <button
                          type="button"
                          aria-label="Increase quantity"
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
                        type="button"
                        className="remove"
                        onClick={() =>
                          removeItem(item._id)
                        }
                      >
                        Remove
                      </button>

                    </div>

                  </div>

                  {/* Item Total */}
                  <div className="item-total">

                    <span>Item Total</span>

                    <strong>
                      ₹
                      {(
                        Number(item.product.price) *
                        item.quantity
                      ).toFixed(2)}
                    </strong>

                  </div>

                </div>

              ))}

            </div>

            {/* Right Side - Summary */}
            <aside className="summary">

              <h2>Order Summary</h2>

              <div className="summary-line">

                <span>
                  Subtotal
                </span>

                <strong>
                  ₹{totalPrice.toFixed(2)}
                </strong>

              </div>

              <div className="summary-line">

                <span>
                  Delivery
                </span>

                <strong>
                  {delivery === 0
                    ? "FREE"
                    : `₹${delivery.toFixed(2)}`}
                </strong>

              </div>

              <div className="summary-divider"></div>

              <div className="summary-total">

                <span>
                  Grand Total
                </span>

                <strong>
                  ₹{grandTotal.toFixed(2)}
                </strong>

              </div>

              <Link
                to="/checkout"
                className="checkout-link"
              >
                <button className="checkout-btn">
                  Proceed to Checkout
                  <span>→</span>
                </button>
              </Link>

              <div className="secure-checkout">
                <span>🔒</span>
                <p>
                  Secure checkout
                </p>
              </div>

              <div className="payment-info">

                <span>✓</span>
                <p>
                  Safe and secure payment
                </p>

              </div>

              <div className="payment-info">

                <span>✓</span>
                <p>
                  Easy returns available
                </p>

              </div>

            </aside>

          </div>
        )}

      </main>

      <Footer />
    </>
  );
}