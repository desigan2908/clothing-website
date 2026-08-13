import "./Profile.css";
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

import { useAuth } from "../../context/AuthContext";

export default function Profile() {
  const { user, logout } = useAuth();

  return (
    <>
      <Navbar />

      <main className="profile-page">

        <div className="profile-container">

          {/* Profile Header */}
          <div className="profile-header">

            <div className="profile-avatar">
              <FaUser />
            </div>

            <div className="profile-heading">
              <span>MY ACCOUNT</span>

              <h1>My Profile</h1>

              <p>
                Manage your personal information and account details.
              </p>
            </div>

          </div>


          {/* Profile Content */}
          <div className="profile-content">

            {/* Personal Information */}
            <section className="profile-section">

              <div className="section-title">
                <div className="title-icon">
                  <FaUser />
                </div>

                <div>
                  <h2>Personal Information</h2>
                  <p>Your basic account information</p>
                </div>
              </div>


              <div className="profile-fields">

                {/* Name */}
                <div className="profile-field">
                  <label>Name</label>

                  <div className="field-box">
                    <FaUser />

                    <span>
                      {user?.name || "Not provided"}
                    </span>
                  </div>
                </div>


                {/* Email */}
                <div className="profile-field">
                  <label>Email Address</label>

                  <div className="field-box">
                    <FaEnvelope />

                    <span>
                      {user?.email || "Not provided"}
                    </span>
                  </div>
                </div>


                {/* Phone */}
                <div className="profile-field">
                  <label>Phone Number</label>

                  <div className="field-box">
                    <FaPhone />

                    <span>
                      {user?.phone || "Not provided"}
                    </span>
                  </div>
                </div>


                {/* Address */}
                <div className="profile-field full-width">
                  <label>Address</label>

                  <div className="field-box address-box">
                    <FaMapMarkerAlt />

                    <span>
                      {user?.address || "No address added yet"}
                    </span>
                  </div>
                </div>

              </div>

            </section>


            {/* Account Actions */}
            <section className="account-actions">

              <div>
                <h3>Account Settings</h3>

                <p>
                  Update your information or sign out of your account.
                </p>
              </div>

              <div className="action-buttons">

                <button
                  className="edit-profile-btn"
                  onClick={() => {
                    // Keep your existing edit profile logic here
                  }}
                >
                  Edit Profile
                </button>

                <button
                  className="logout-profile-btn"
                  onClick={logout}
                >
                  Logout
                </button>

              </div>

            </section>

          </div>

        </div>

      </main>

      <Footer />
    </>
  );
}