import "./Navbar.css";
import { Link, useLocation, useNavigate } from "react-router-dom";

import {
  FaShoppingCart,
  FaHeart,
  FaUser,
  FaSearch,
} from "react-icons/fa";

import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const { cart } = useCart();
  const { wishlist } = useWishlist();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <header className="navbar">
      <div className="navbar-container">

        {/* =========================
            LOGO
        ========================= */}
        <Link to="/" className="navbar-logo">
          <span className="logo-main">Style</span>
          <span className="logo-highlight">Hub</span>
        </Link>

        {/* =========================
            NAVIGATION
        ========================= */}
        <nav className="nav-menu">

          <Link
            to="/"
            className={`nav-item ${
              isActive("/") ? "active" : ""
            }`}
          >
            Home
          </Link>

          <Link
            to="/products"
            className={`nav-item ${
              isActive("/products") ? "active" : ""
            }`}
          >
            Products
          </Link>

          <Link
            to="/wishlist"
            className={`nav-item ${
              isActive("/wishlist") ? "active" : ""
            }`}
          >
            Wishlist
          </Link>

          <Link
            to="/orders"
            className={`nav-item ${
              isActive("/orders") ? "active" : ""
            }`}
          >
            Orders
          </Link>

        </nav>

        {/* =========================
            RIGHT SIDE
        ========================= */}
        <div className="navbar-right">

          {/* Search */}
          <button
            type="button"
            className="nav-icon-btn"
            onClick={() => navigate("/products")}
            title="Search Products"
          >
            <FaSearch />
          </button>

          {/* Wishlist */}
          <Link
            to="/wishlist"
            className="nav-icon-btn"
            title="Wishlist"
          >
            <FaHeart />

            {wishlist.length > 0 && (
              <span className="nav-badge">
                {wishlist.length}
              </span>
            )}
          </Link>

          {/* Cart */}
          <Link
            to="/cart"
            className="nav-icon-btn"
            title="Shopping Cart"
          >
            <FaShoppingCart />

            {cart.length > 0 && (
              <span className="nav-badge">
                {cart.length}
              </span>
            )}
          </Link>

          {/* User */}
          {user ? (
            <div className="navbar-user">

              <Link
                to="/profile"
                className="user-profile"
                title="My Profile"
              >
                <div className="user-avatar">
                  <FaUser />
                </div>

                <div className="user-info">
                  <span className="user-welcome">
                    Welcome
                  </span>

                  <span className="user-name">
                    {user.name}
                  </span>
                </div>
              </Link>

              <button
                type="button"
                className="logout-btn"
                onClick={handleLogout}
              >
                Logout
              </button>

            </div>
          ) : (
            <Link
              to="/login"
              className="login-btn"
            >
              Login
            </Link>
          )}

        </div>
      </div>
    </header>
  );
}