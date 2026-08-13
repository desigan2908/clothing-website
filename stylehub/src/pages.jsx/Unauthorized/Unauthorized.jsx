import { Link } from "react-router-dom";
import { FaHeart, FaShoppingBag } from "react-icons/fa";

import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import "./Unauthorized.css";

export default function Unauthorized() {
  return (
    <>
      <Navbar />

      <main className="unauthorized">
        <div className="unauthorized-card">

          <div className="unauthorized-icon">
            <FaShoppingBag />
          </div>

          <div className="heart-decoration">
            <FaHeart />
          </div>

          <h1>Your Style Awaits</h1>

          <h2>Log in to continue shopping</h2>

          <p>
            Sign in to your StyleHub account to view your orders,
            track your purchases, and keep your fashion journey going.
          </p>

          <div className="unauthorized-buttons">
            <Link to="/login" className="login-btn">
              Login to StyleHub
            </Link>

            <Link to="/" className="home-btn">
              Continue Shopping
            </Link>
          </div>

          <p className="unauthorized-note">
            New to StyleHub? Create an account and discover your style.
          </p>

        </div>
      </main>

      <Footer />
    </>
  );
}