import { createContext, useContext, useEffect, useState } from "react";

import {
  loginUser,
  registerUser,
  getProfile,
  updateProfile as updateProfileApi,
} from "../services/authApi";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  /* ==========================
     Load Logged In User
  ========================== */

  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem("token");

      // No token means user is logged out
      if (!token) {
        setUser(null);
        setLoading(false);
        return;
      }

      try {
        const res = await getProfile();

        if (res.data?.success && res.data?.user) {
          setUser(res.data.user);

          // Keep localStorage user updated
          localStorage.setItem(
            "user",
            JSON.stringify(res.data.user)
          );
        } else {
          throw new Error("User profile not found");
        }
      } catch (error) {
        console.error("Failed to load user:", error);

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  /* ==========================
     Login
  ========================== */

  const login = async (email, password) => {
    try {
      const res = await loginUser({
        email: email.trim().toLowerCase(),
        password,
      });

      if (!res.data?.success) {
        return {
          success: false,
          message: res.data?.message || "Login Failed",
        };
      }

      localStorage.setItem("token", res.data.token);

      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      setUser(res.data.user);

      return {
        success: true,
        user: res.data.user,
      };
    } catch (error) {
      console.error("Login error:", error);

      return {
        success: false,
        message:
          error.response?.data?.message ||
          "Login Failed",
      };
    }
  };

  /* ==========================
     Register
  ========================== */

  const register = async (userData) => {
    try {
      const res = await registerUser({
        ...userData,
        email: userData.email.trim().toLowerCase(),
      });

      if (!res.data?.success) {
        return {
          success: false,
          message:
            res.data?.message ||
            "Registration Failed",
        };
      }

      localStorage.setItem("token", res.data.token);

      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      setUser(res.data.user);

      return {
        success: true,
        user: res.data.user,
      };
    } catch (error) {
      console.error("Registration error:", error);

      return {
        success: false,
        message:
          error.response?.data?.message ||
          "Registration Failed",
      };
    }
  };

  /* ==========================
     Logout
  ========================== */

  const logout = () => {
    // Remove authentication data
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // Clear React authentication state
    setUser(null);
  };

  /* ==========================
     Update Profile
  ========================== */

  const updateProfile = async (data) => {
    try {
      const res = await updateProfileApi(data);

      if (!res.data?.success) {
        return {
          success: false,
          message:
            res.data?.message ||
            "Profile Update Failed",
        };
      }

      setUser(res.data.user);

      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      return {
        success: true,
        user: res.data.user,
      };
    } catch (error) {
      console.error("Profile update error:", error);

      return {
        success: false,
        message:
          error.response?.data?.message ||
          "Profile Update Failed",
      };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);