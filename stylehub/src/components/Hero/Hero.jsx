import "./Hero.css";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="hero">

      <div className="hero-overlay">

        <div className="hero-content">

          <span className="offer">
            🔥 New Collection 2026
          </span>

          <h1>
            Discover Your Perfect Style
          </h1>

          <p>
            Shop premium fashion for Men, Women and Kids.
            Explore the latest trends with exclusive discounts.
          </p>

          <div className="hero-buttons">

            <Link to="/products">
              <button className="shop-btn">
                Shop Now
              </button>
            </Link>

            <Link to="/products">
              <button className="explore-btn">
                Explore Collection
              </button>
            </Link>

          </div>

        </div>

      </div>

    </section>
  );
}