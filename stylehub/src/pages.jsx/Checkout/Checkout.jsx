import "./Checkout.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { useCart } from "../../context/CartContext";
import { useOrders } from "../../context/OrderContext";

export default function Checkout() {
  const navigate = useNavigate();

  const {
    cart,
    totalPrice,
    delivery,
    grandTotal,
  } = useCart();

  // Order Context
  const { placeOrder } = useOrders();

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

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const applyCoupon = () => {
    if (coupon === "STYLE10") {
      setDiscount(10);
      alert("Coupon Applied Successfully");
    } else {
      alert("Invalid Coupon");
    }
  };

  const finalTotal = grandTotal - discount;

  // Place Order
  const handlePlaceOrder = (e) => {
    e.preventDefault();

    if (cart.length === 0) {
      alert("Cart is Empty");
      return;
    }

    placeOrder({
      customer: form,
      items: cart,
      total: finalTotal,
      date: new Date().toLocaleString(),
    });

    navigate("/success");
  };

  return (
    <>
      <Navbar />

      <div className="checkout">
        {/* Left Side */}
        <div className="left">
          <form onSubmit={handlePlaceOrder}>
            <h2>Shipping Address</h2>

            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              required
            />

            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={form.phone}
              onChange={handleChange}
              required
            />

            <textarea
              name="address"
              placeholder="Address"
              value={form.address}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="city"
              placeholder="City"
              value={form.city}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="state"
              placeholder="State"
              value={form.state}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="pincode"
              placeholder="Pincode"
              value={form.pincode}
              onChange={handleChange}
              required
            />

            <h2>Payment Method</h2>

            <select
              name="payment"
              value={form.payment}
              onChange={handleChange}
            >
              <option>Cash on Delivery</option>
              <option>Credit Card</option>
              <option>Debit Card</option>
              <option>UPI</option>
            </select>

            <button type="submit" className="place">
              Place Order
            </button>
          </form>
        </div>

        {/* Right Side */}
        <div className="right">
          <h2>Order Summary</h2>

          {cart.map((item) => (
            <div
              key={item.id}
              className="summary-item"
            >
              <p>{item.name}</p>

              <p>Qty : {item.quantity}</p>

              <p>₹{(item.price * item.quantity).toFixed(2)}</p>
            </div>
          ))}

          <hr />

          <h3>Subtotal : ₹{totalPrice.toFixed(2)}</h3>

          <h3>Delivery : ₹{delivery.toFixed(2)}</h3>

          <input
            type="text"
            placeholder="Coupon Code"
            value={coupon}
            onChange={(e) => setCoupon(e.target.value)}
          />

          <button onClick={applyCoupon}>
            Apply Coupon
          </button>

          <h3>Discount : ₹{discount.toFixed(2)}</h3>

          <h2>Grand Total : ₹{finalTotal.toFixed(2)}</h2>
        </div>
      </div>

      <Footer />
    </>
  );
}