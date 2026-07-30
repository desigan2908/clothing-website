import "./Navbar.css";
import { Link } from "react-router-dom";
import {
  FaShoppingCart,
  FaHeart,
  FaUser,
} from "react-icons/fa";

export default function Navbar() {
  return (
    <nav className="navbar">

      <div className="logo">
        <Link to="/">StyleHub</Link>
      </div>

      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/products">Products</Link></li>
        <li><Link to="/wishlist">Wishlist</Link></li>
        <li><Link to="/cart">Cart</Link></li>
      </ul>

      <div className="icons">
        <Link to="/wishlist">
          <FaHeart />
        </Link>

        <Link to="/cart">
          <FaShoppingCart />
        </Link>

        <Link to="/profile">
          <FaUser />
        </Link>


        
      </div>

    </nav>
  );
}