import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Checking your account...</div>;
  }

  if (!user) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}