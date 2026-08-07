import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import "./Unauthorized.css";

export default function Unauthorized() {
  return (
    <>
      <Navbar />

      <div className="unauthorized">

        <div className="unauthorized-card">

          <h1>401</h1>

          <h2>Unauthorized Access</h2>

          <p>
            You must log in before accessing this page.
          </p>

          <div className="unauthorized-buttons">

            <Link to="/login">
              <button className="login-btn">
                Login
              </button>
            </Link>

            <Link to="/">
              <button className="home-btn">
                Go Home
              </button>
            </Link>

          </div>

        </div>

      </div>

      <Footer />
    </>
  );
}