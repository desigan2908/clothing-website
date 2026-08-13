import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

import "./Register.css";

export default function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (
      !form.name.trim() ||
      !form.email.trim() ||
      !form.password ||
      !form.confirmPassword
    ) {
      setError("Please fill in all fields");
      return;
    }

    if (form.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      const result = await register({
        name: form.name.trim(),
        email: form.email.trim(),
        password: form.password,
      });

      if (!result.success) {
        setError(result.message);
        return;
      }

      alert("Registration Successful!");

      navigate("/profile");
    } catch (err) {
      setError("Registration Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <main className="register-page">
        <div className="register-card">

          {/* Left Branding Section */}
          <div className="register-showcase">

            <div className="showcase-content">
              <div className="brand-mark">S</div>

              <h1>
                Welcome to
                <span> StyleHub</span>
              </h1>

              <p>
                Discover your style, explore new trends,
                and shop everything you love in one place.
              </p>

              <div className="showcase-features">

                <div className="feature">
                  <span className="feature-icon">✓</span>
                  <div>
                    <strong>Fresh Styles</strong>
                    <small>Discover the latest fashion</small>
                  </div>
                </div>

                <div className="feature">
                  <span className="feature-icon">✓</span>
                  <div>
                    <strong>Easy Shopping</strong>
                    <small>A simple shopping experience</small>
                  </div>
                </div>

                <div className="feature">
                  <span className="feature-icon">✓</span>
                  <div>
                    <strong>Secure Account</strong>
                    <small>Your account stays protected</small>
                  </div>
                </div>

              </div>
            </div>

            <div className="showcase-decoration decoration-one"></div>
            <div className="showcase-decoration decoration-two"></div>

          </div>

          {/* Registration Section */}
          <div className="register-form-section">

            <div className="register-header">

              <span className="welcome-text">
                GET STARTED
              </span>

              <h2>Create your account</h2>

              <p>
                Join StyleHub and start shopping today.
              </p>

            </div>

            {error && (
              <div className="error-message">
                <span>!</span>
                {error}
              </div>
            )}

            <form
              className="register-form"
              onSubmit={handleSubmit}
            >

              {/* Full Name */}
              <div className="form-group">
                <label htmlFor="name">
                  Full Name
                </label>

                <div className="input-wrapper">
                  <span className="input-icon">👤</span>

                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={form.name}
                    onChange={handleChange}
                    autoComplete="name"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="form-group">
                <label htmlFor="email">
                  Email Address
                </label>

                <div className="input-wrapper">
                  <span className="input-icon">✉</span>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    value={form.email}
                    onChange={handleChange}
                    autoComplete="email"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="form-group">
                <label htmlFor="password">
                  Password
                </label>

                <div className="input-wrapper">
                  <span className="input-icon">🔒</span>

                  <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Create a password"
                    value={form.password}
                    onChange={handleChange}
                    autoComplete="new-password"
                  />
                </div>

                <p className="hint">
                  Use at least 6 characters
                </p>
              </div>

              {/* Confirm Password */}
              <div className="form-group">
                <label htmlFor="confirmPassword">
                  Confirm Password
                </label>

                <div className="input-wrapper">
                  <span className="input-icon">   🔐</span>

                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm your password"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    autoComplete="new-password"
                  />
                </div>
              </div>

              {/* Terms */}
              <div className="terms">
                <label className="terms-label">

                  <input
                    type="checkbox"
                    required
                  />

                  <span className="custom-check"></span>

                  <span className="terms-text">
                    I agree to the{" "}
                    <span>Terms and Conditions</span>
                  </span>

                </label>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="register-btn"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner"></span>
                    Creating Account...
                  </>
                ) : (
                  <>
                    Create Account
                    <span className="arrow">→</span>
                  </>
                )}
              </button>

            </form>

            {/* Login */}
            <div className="login-link">
              <span>Already have an account?</span>

              <Link to="/login">
                Sign in
              </Link>
            </div>

          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}