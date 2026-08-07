import "./Profile.css";
import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";

import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

import { useAuth } from "../../context/AuthContext";

export default function Profile() {
  const navigate = useNavigate();

  const {
    user,
    logout,
    updateProfile,
    loading,
  } = useAuth();

  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="profile">
          <h2>Loading...</h2>
        </div>
        <Footer />
      </>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const [form, setForm] = useState({
    name: user.name || "",
    email: user.email || "",
    phone: user.phone || "",
    address: user.address || "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const saveProfile = async () => {
    try {
      setSaving(true);
      setError("");

      const result = await updateProfile({
        name: form.name,
        phone: form.phone,
        address: form.address,
      });

      if (!result.success) {
        setError(result.message);
        return;
      }

      alert("Profile Updated Successfully");

      setEditing(false);
    } catch (err) {
      setError("Failed to update profile.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="profile">

        <div className="profile-card">

          <h1>My Profile</h1>

          {error && (
            <p className="error-message">
              {error}
            </p>
          )}

          <label>Name</label>

          <input
            type="text"
            name="name"
            value={form.name}
            disabled={!editing}
            onChange={handleChange}
          />

          <label>Email</label>

          <input
            type="email"
            name="email"
            value={form.email}
            disabled
          />

          <label>Phone</label>

          <input
            type="tel"
            name="phone"
            value={form.phone}
            disabled={!editing}
            onChange={handleChange}
          />

          <label>Address</label>

          <textarea
            name="address"
            value={form.address}
            disabled={!editing}
            onChange={handleChange}
          />

          <div className="buttons">

            {editing ? (
              <button
                onClick={saveProfile}
                disabled={saving}
              >
                {saving
                  ? "Saving..."
                  : "Save Changes"}
              </button>
            ) : (
              <button
                onClick={() =>
                  setEditing(true)
                }
              >
                Edit Profile
              </button>
            )}

            <button
              className="logout"
              onClick={() => {
                logout();
                navigate("/login");
              }}
            >
              Logout
            </button>

          </div>

        </div>

      </div>

      <Footer />
    </>
  );
}