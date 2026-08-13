import "./Checkout.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaCreditCard,
  FaShoppingBag,
  FaTag,
  FaLock,
  FaArrowRight,
  FaTruck,
} from "react-icons/fa";

import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

import { useCart } from "../../context/CartContext";
import { placeOrder } from "../../services/orderApi";

export default function Checkout() {
  const navigate = useNavigate();

  const {
    cart,
    totalPrice,
    delivery,
    grandTotal,
    clearCart,
  } = useCart();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    payment: "Cash on Delivery",
  });

  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [couponMessage, setCouponMessage] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const applyCoupon = () => {
    if (coupon.trim().toUpperCase() === "STYLE10") {
      setDiscount(10);
      setCouponMessage("✓ Coupon applied successfully");
    } else {
      setDiscount(0);
      setCouponMessage("Invalid coupon code");
    }
  };

  const finalTotal = grandTotal - discount;

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    if (cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    try {
      setLoading(true);

      await placeOrder({
        orderItems: cart.map((item) => ({
          product: item.product._id,
          quantity: item.quantity,
          price: item.product.price,
        })),

        shippingAddress: {
          fullName: form.name,
          phone: form.phone,
          address: form.address,
          city: form.city,
          state: form.state,
          postalCode: form.pincode,
          country: "Sri Lanka",
        },

        paymentMethod: form.payment,

        totalPrice: finalTotal,
      });

      clearCart();

      navigate("/order-success");
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Failed to place order."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <main className="checkout-page">

        {/* Checkout Header */}
        <div className="checkout-header">
          <div>
            <span className="checkout-small-title">
              STYLEHUB CHECKOUT
            </span>

            <h1>Complete Your Order</h1>

            <p>
              You're just a few steps away from your new
              favorite pieces.
            </p>
          </div>
        </div>

        {/* Checkout Steps */}
        <div className="checkout-steps">

          <div className="checkout-step active">
            <span>1</span>
            <div>
              <strong>Shipping</strong>
              <small>Address details</small>
            </div>
          </div>

          <div className="step-line"></div>

          <div className="checkout-step">
            <span>2</span>
            <div>
              <strong>Payment</strong>
              <small>Choose payment</small>
            </div>
          </div>

          <div className="step-line"></div>

          <div className="checkout-step">
            <span>3</span>
            <div>
              <strong>Complete</strong>
              <small>Place order</small>
            </div>
          </div>

        </div>

        <div className="checkout-layout">

          {/* LEFT SIDE */}
          <div className="checkout-left">

            <form onSubmit={handlePlaceOrder}>

              {/* Shipping Card */}
              <section className="checkout-card">

                <div className="section-heading">
                  <div className="section-icon">
                    <FaMapMarkerAlt />
                  </div>

                  <div>
                    <h2>Shipping Address</h2>
                    <p>
                      Where should we deliver your order?
                    </p>
                  </div>
                </div>

                <div className="form-grid">

                  <div className="input-group full">
                    <label>Full Name</label>

                    <input
                      type="text"
                      name="name"
                      placeholder="Enter your full name"
                      value={form.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="input-group">
                    <label>Phone Number</label>

                    <input
                      type="tel"
                      name="phone"
                      placeholder="Enter phone number"
                      value={form.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="input-group">
                    <label>Postal Code</label>

                    <input
                      type="text"
                      name="pincode"
                      placeholder="Postal code"
                      value={form.pincode}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="input-group full">
                    <label>Address</label>

                    <textarea
                      name="address"
                      placeholder="House number, street name, apartment..."
                      value={form.address}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="input-group">
                    <label>City</label>

                    <input
                      type="text"
                      name="city"
                      placeholder="Enter your city"
                      value={form.city}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="input-group">
                    <label>State</label>

                    <input
                      type="text"
                      name="state"
                      placeholder="Enter your state"
                      value={form.state}
                      onChange={handleChange}
                      required
                    />
                  </div>

                </div>

              </section>

              {/* Delivery Information */}
              <div className="delivery-info">
                <div className="delivery-icon">
                  <FaTruck />
                </div>

                <div>
                  <strong>Free & Fast Delivery</strong>

                  <p>
                    Your order will be carefully packed
                    and delivered to your address.
                  </p>
                </div>
              </div>

              {/* Payment Card */}
              <section className="checkout-card payment-card">

                <div className="section-heading">
                  <div className="section-icon">
                    <FaCreditCard />
                  </div>

                  <div>
                    <h2>Payment Method</h2>
                    <p>
                      Choose how you'd like to pay.
                    </p>
                  </div>
                </div>

                <div className="payment-options">

                  <label
                    className={
                      form.payment === "Cash on Delivery"
                        ? "payment-option selected"
                        : "payment-option"
                    }
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="Cash on Delivery"
                      checked={
                        form.payment === "Cash on Delivery"
                      }
                      onChange={handleChange}
                    />

                    <div className="payment-content">
                      <strong>Cash on Delivery</strong>
                      <span>Pay when your order arrives</span>
                    </div>
                  </label>

                  <label
                    className={
                      form.payment === "Credit Card"
                        ? "payment-option selected"
                        : "payment-option"
                    }
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="Credit Card"
                      checked={
                        form.payment === "Credit Card"
                      }
                      onChange={handleChange}
                    />

                    <div className="payment-content">
                      <strong>Credit Card</strong>
                      <span>Secure card payment</span>
                    </div>
                  </label>

                  <label
                    className={
                      form.payment === "Debit Card"
                        ? "payment-option selected"
                        : "payment-option"
                    }
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="Debit Card"
                      checked={
                        form.payment === "Debit Card"
                      }
                      onChange={handleChange}
                    />

                    <div className="payment-content">
                      <strong>Debit Card</strong>
                      <span>Pay securely with your card</span>
                    </div>
                  </label>

                  <label
                    className={
                      form.payment === "UPI"
                        ? "payment-option selected"
                        : "payment-option"
                    }
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="UPI"
                      checked={
                        form.payment === "UPI"
                      }
                      onChange={handleChange}
                    />

                    <div className="payment-content">
                      <strong>UPI</strong>
                      <span>Fast digital payment</span>
                    </div>
                  </label>

                </div>

                <button
                  type="submit"
                  className="place-order-btn"
                  disabled={loading}
                >
                  {loading ? (
                    "Placing Order..."
                  ) : (
                    <>
                      Place Order
                      <FaArrowRight />
                    </>
                  )}
                </button>

                <div className="secure-payment">
                  <FaLock />

                  <span>
                    Your payment and personal information
                    are securely protected.
                  </span>
                </div>

              </section>

            </form>

          </div>

          {/* RIGHT SIDE */}
          <aside className="checkout-right">

            <div className="summary-card">

              <div className="summary-header">
                <div>
                  <span>YOUR ORDER</span>
                  <h2>Order Summary</h2>
                </div>

                <div className="bag-icon">
                  <FaShoppingBag />
                </div>
              </div>

              {/* Products */}
              <div className="summary-products">

                {cart.map((item) => (
                  <div
                    key={item._id}
                    className="summary-product"
                  >

                    <div className="summary-image">
                      <img
                        src={
                          item.product.thumbnail ||
                          item.product.images?.[0] ||
                          "/images/no-image.png"
                        }
                        alt={item.product.title}
                      />

                      <span>
                        {item.quantity}
                      </span>
                    </div>

                    <div className="summary-product-info">
                      <h4>{item.product.title}</h4>

                      <p>
                        {item.product.brand}
                      </p>
                    </div>

                    <strong>
                      ₹
                      {(
                        item.product.price *
                        item.quantity
                      ).toFixed(2)}
                    </strong>

                  </div>
                ))}

              </div>

              {/* Price Details */}
              <div className="price-details">

                <div>
                  <span>Subtotal</span>

                  <strong>
                    ₹{totalPrice.toFixed(2)}
                  </strong>
                </div>

                <div>
                  <span>Delivery</span>

                  <strong>
                    {delivery === 0
                      ? "FREE"
                      : `₹${delivery.toFixed(2)}`}
                  </strong>
                </div>

                {discount > 0 && (
                  <div className="discount-row">
                    <span>Discount</span>

                    <strong>
                      -₹{discount.toFixed(2)}
                    </strong>
                  </div>
                )}

              </div>

              {/* Coupon */}
              <div className="coupon-section">

                <div className="coupon-title">
                  <FaTag />
                  <span>Have a promo code?</span>
                </div>

                <div className="coupon-box">

                  <input
                    type="text"
                    placeholder="Enter coupon code"
                    value={coupon}
                    onChange={(e) =>
                      setCoupon(e.target.value)
                    }
                  />

                  <button
                    type="button"
                    onClick={applyCoupon}
                  >
                    Apply
                  </button>

                </div>

                {couponMessage && (
                  <p
                    className={
                      discount > 0
                        ? "coupon-success"
                        : "coupon-error"
                    }
                  >
                    {couponMessage}
                  </p>
                )}

                <small>
                  Try <strong>STYLE10</strong> for ₹10 off
                </small>

              </div>

              {/* Total */}
              <div className="grand-total">

                <div>
                  <span>Grand Total</span>

                  <small>
                    Including delivery
                  </small>
                </div>

                <strong>
                  ₹{finalTotal.toFixed(2)}
                </strong>

              </div>

            </div>

          </aside>

        </div>

      </main>

      <Footer />
    </>
  );
}