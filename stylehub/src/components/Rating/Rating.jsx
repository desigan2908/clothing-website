import "./Rating.css";
import {
  FaStar,
  FaStarHalfAlt,
  FaRegStar,
} from "react-icons/fa";

export default function Rating({ rating = 0 }) {
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      stars.push(<FaStar key={i} />);
    } else if (rating >= i - 0.5) {
      stars.push(<FaStarHalfAlt key={i} />);
    } else {
      stars.push(<FaRegStar key={i} />);
    }
  }

  return (
    <div
      className="rating"
      aria-label={`Rating: ${rating} out of 5`}
    >
      {stars}

      <span className="rating-value">
        ({rating.toFixed(1)})
      </span>
    </div>
  );
}