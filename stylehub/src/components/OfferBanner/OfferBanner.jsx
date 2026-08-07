import "./OfferBanner.css";
import { Link } from "react-router-dom";

export default function OfferBanner() {
  return (
    <section className="offer">

      <div className="offer-content">

        <span className="offer-badge">
          🔥 Limited Time Offer
        </span>

        <h1>Summer Sale</h1>

        <h2>Up To 50% OFF</h2>

        <p>
          Discover premium fashion for Men, Women and Kids.
          Enjoy exclusive discounts on the latest collections.
        </p>

        <Link to="/products">
          <button>
            Shop Now
          </button>
        </Link>

      </div>

    </section>
  );
}