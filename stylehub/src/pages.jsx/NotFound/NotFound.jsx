import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import "./NotFound.css";

export default function NotFound() {
  return (
    <>
      <Navbar />

      <div className="not-found">

        <div className="not-found-card">

          <h1>404</h1>

          <h2>Page Not Found</h2>

          <p>
            Sorry, the page you are looking for doesn't exist.
          </p>

          <div className="not-found-buttons">

            <Link to="/">
              <button>Go Home</button>
            </Link>

            <Link to="/products">
              <button>Shop Now</button>
            </Link>

          </div>

        </div>

      </div>

      <Footer />
    </>
  );
}