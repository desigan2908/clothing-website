import { lazy } from "react";
import { Routes, Route } from "react-router-dom";

// Lazy Loaded Pages
const Home = lazy(() => import("../pages.jsx/Home/Home"));
const Products = lazy(() => import("../pages.jsx/Products/Products"));
const ProductDetails = lazy(() =>
  import("../pages.jsx/ProductDetails/ProductDetails")
);
const Cart = lazy(() => import("../pages.jsx/Cart/Cart"));
const Wishlist = lazy(() => import("../pages.jsx/Wishlist/Wishlist"));
const Checkout = lazy(() => import("../pages.jsx/Checkout/Checkout"));
const Login = lazy(() => import("../pages.jsx/Login/Login"));
const Register = lazy(() => import("../pages.jsx/Register/Register"));
const Profile = lazy(() => import("../pages.jsx/Profile/Profile"));
const Orders = lazy(() => import("../pages.jsx/Orders/Orders"));
const OrderSuccess = lazy(() =>
  import("../pages.jsx/OrderSuccess/OrderSuccess")
);
const Unauthorized = lazy(() =>
  import("../pages.jsx/Unauthorized/Unauthorized")
);
const NotFound = lazy(() =>
  import("../pages.jsx/NotFound/NotFound")
);

// Protected Route
import ProtectedRoute from "./ProtectedRoute";

export default function AppRoutes() {
  return (
    <Routes>

      {/* Public Routes */}
      <Route path="/" element={<Home />} />

      <Route path="/products" element={<Products />} />

      <Route path="/product/:id" element={<ProductDetails />} />

      <Route path="/cart" element={<Cart />} />

      <Route path="/wishlist" element={<Wishlist />} />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route
        path="/unauthorized"
        element={<Unauthorized />}
      />

      {/* Protected Routes */}
      <Route
        path="/checkout"
        element={
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

      <Route
        path="/orders"
        element={
          <ProtectedRoute>
            <Orders />
          </ProtectedRoute>
        }
      />

      <Route
        path="/order-success"
        element={
          <ProtectedRoute>
            <OrderSuccess />
          </ProtectedRoute>
        }
      />

      {/* 404 */}
      <Route
        path="*"
        element={<NotFound />}
      />

    </Routes>
  );
}