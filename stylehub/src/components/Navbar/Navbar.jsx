import "./Navbar.css";
import { Link } from "react-router-dom";
import {
  FaShoppingCart,
  FaHeart,
  FaUser,
} from "react-icons/fa";

import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const { cart } = useCart();
  const { wishlist } = useWishlist();
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">

      {/* Logo */}
      <div className="logo">
        <Link to="/">StyleHub</Link>
      </div>

      {/* Navigation */}
      <ul className="nav-links">
        <li>
          <Link to="/">Home</Link>
        </li>

        <li>
          <Link to="/products">Products</Link>
        </li>

        <li>
          <Link to="/wishlist">Wishlist</Link>
        </li>

        <li>
          <Link to="/cart">Cart</Link>
        </li>

        <li>
          <Link to="/orders">Orders</Link>
        </li>
      </ul>

      {/* Icons */}
      <div className="icons">

        {/* Wishlist */}
        <Link to="/wishlist" className="icon">
          <FaHeart />
          {wishlist.length > 0 && (
            <span className="badge">
              {wishlist.length}
            </span>
          )}
        </Link>

        {/* Cart */}
        <Link to="/cart" className="icon">
          <FaShoppingCart />
          {cart.length > 0 && (
            <span className="badge">
              {cart.length}
            </span>
          )}
        </Link>

        {/* User */}
        {user ? (
          <div className="user-menu">

            <Link to="/profile">
              <FaUser />
            </Link>

            <span className="username">
              {user.name}
            </span>

            <button
              className="logout-btn"
              onClick={logout}
            >
              Logout
            </button>

          </div>
        ) : (
          <Link to="/login">
            Login
          </Link>
        )}

      </div>

    </nav>
  );
}