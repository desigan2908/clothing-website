import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

import { loginUser } from "../../services/authApi";

import "./Login.css";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!email.trim() || !password) {
      setError("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);

      const res = await loginUser({
        email: email.trim(),
        password,
      });

      // Save JWT Token
      localStorage.setItem("token", res.data.token);

      // Save User
      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      // Remember Me
      if (remember) {
        localStorage.setItem("rememberEmail", email);
      } else {
        localStorage.removeItem("rememberEmail");
      }

      navigate("/profile");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Login Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="login-container">
        <div className="login-wrapper">
          <div className="login-box">

            <h1>Welcome Back</h1>

            <p className="subtitle">
              Sign in to your account
            </p>

            {error && (
              <div className="error-message">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>

              <div className="form-group">
                <label htmlFor="email">
                  Email Address
                </label>

                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">
                  Password
                </label>

                <input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                />
              </div>

              <div className="form-group checkbox">

                <label>
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={(e) =>
                      setRemember(e.target.checked)
                    }
                  />

                  <span>Remember me</span>
                </label>

                <button
                  type="button"
                  className="forgot-link"
                  onClick={() =>
                    alert(
                      "Forgot Password feature coming soon!"
                    )
                  }
                >
                  Forgot Password?
                </button>

              </div>

              <button
                type="submit"
                className="login-btn"
                disabled={loading}
              >
                {loading
                  ? "Signing In..."
                  : "Sign In"}
              </button>

            </form>

            <div className="divider">
              or
            </div>

            <div className="signup-link">
              Don't have an account?{" "}
              <Link to="/register">
                Create one now
              </Link>
            </div>

          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}