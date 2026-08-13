import { Link } from "react-router-dom";
import {
  FaCheck,
  FaBoxOpen,
  FaTruck,
  FaShoppingBag,
  FaArrowRight,
} from "react-icons/fa";

import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

import "./OrderSuccess.css";

export default function OrderSuccess() {
  return (
    <>
      <Navbar />

      <main className="success-page">
        <div className="success-container">

          {/* Success Icon */}
          <div className="success-icon-wrapper">
            <div className="success-icon">
              <FaCheck />
            </div>
          </div>

          {/* Main Message */}
          <div className="success-content">
            <span className="success-label">ORDER CONFIRMED</span>

            <h1>
              Your order is
              <span> on its way!</span>
            </h1>

            <p className="success-description">
              Thank you for shopping with <strong>StyleHub</strong>.
              Your order has been successfully placed and we'll
              keep you updated every step of the way.
            </p>

            {/* Order Status */}
            <div className="order-status">

              <div className="status-item active">
                <div className="status-icon">
                  <FaCheck />
                </div>

                <div>
                  <h4>Order Confirmed</h4>
                  <p>Your order has been received</p>
                </div>
              </div>

              <div className="status-line"></div>

              <div className="status-item">
                <div className="status-icon">
                  <FaBoxOpen />
                </div>

                <div>
                  <h4>Preparing</h4>
                  <p>We're preparing your items</p>
                </div>
              </div>

              <div className="status-line"></div>

              <div className="status-item">
                <div className="status-icon">
                  <FaTruck />
                </div>

                <div>
                  <h4>On the way</h4>
                  <p>Your order will be delivered soon</p>
                </div>
              </div>

            </div>

            {/* Buttons */}
            <div className="success-actions">

              <Link to="/orders" className="primary-action">
                <span>View My Orders</span>
                <FaArrowRight />
              </Link>

              <Link to="/products" className="secondary-action">
                <FaShoppingBag />
                <span>Continue Shopping</span>
              </Link>

            </div>

            <p className="thank-you">
              ✦ Thank you for choosing StyleHub ✦
            </p>

          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}