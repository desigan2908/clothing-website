import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import "./Login.css";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    const success = login(email, password, remember);

    if (success) {
      navigate("/profile");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <>
      <Navbar />
      <div className="login-container">
        <div className="login-wrapper">
          <div className="login-box">
            <h1>Welcome Back</h1>
            <p className="subtitle">Sign in to your account</p>

            {error && <div className="error-message">{error}</div>}

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="form-group checkbox">
                <label>
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                  />
                  <span>Remember me</span>
                </label>
                <a href="#forgot" className="forgot-link">
                  Forgot password?
                </a>
              </div>

              <button type="submit" className="login-btn">
                Sign In
              </button>
            </form>

            <div className="divider">or</div>

            <div className="signup-link">
              Don't have an account?{" "}
              <Link to="/register">Create one now</Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}