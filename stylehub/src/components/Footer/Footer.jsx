import "./Footer.css";
import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">

        {/* Brand */}
        <div className="footer-section">
          <h2>StyleHub</h2>

          <p>
            Your one-stop destination for trendy fashion,
            stylish clothing, shoes, and accessories.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h3>Quick Links</h3>

          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          <Link to="/wishlist">Wishlist</Link>
          <Link to="/cart">Cart</Link>
          <Link to="/profile">Profile</Link>
        </div>

        {/* Categories */}
        <div className="footer-section">
          <h3>Categories</h3>

          <p>Men</p>
          <p>Women</p>
          <p>Shoes</p>
          <p>Accessories</p>
        </div>

        {/* Contact */}
        <div className="footer-section">
          <h3>Contact</h3>

          <p>
            <FaMapMarkerAlt /> KARAIKUDI, TAMILNADU, INDIA
          </p>

          <p>
            <FaPhone /> +91 98765 43210
          </p>

          <p>
            <FaEnvelope /> vinothkumar@stylehub.com
          </p>

          <div className="social-icons">
            <FaFacebook />
            <FaInstagram />
            <FaTwitter />
          </div>
        </div>

      </div>

      <hr />

      <p className="copyright">
        © 2026 StyleHub. All Rights Reserved.
      </p>

    </footer>
  );
}