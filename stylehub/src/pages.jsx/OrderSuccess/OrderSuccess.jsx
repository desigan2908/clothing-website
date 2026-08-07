import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import "./OrderSuccess.css";

export default function OrderSuccess() {
  return (
    <>
      <Navbar />

      <div className="order-success">

        <div className="success-card">

          <div className="success-icon">
            ✅
          </div>

          <h1>Order Placed Successfully!</h1>

          <p>
            Thank you for shopping with <strong>StyleHub</strong>.
          </p>

          <p>
            Your order has been received and is being processed.
          </p>

          <div className="success-buttons">

            <Link to="/orders">
              <button className="orders-btn">
                View My Orders
              </button>
            </Link>

            <Link to="/products">
              <button className="shop-btn">
                Continue Shopping
              </button>
            </Link>

          </div>

        </div>

      </div>

      <Footer />
    </>
  );
}