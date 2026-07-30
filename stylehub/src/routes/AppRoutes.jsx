import { Routes, Route } from "react-router-dom";

// Pages
import Home from "../pages.jsx/Home/Home";
import Products from "../pages.jsx/Products/Products";
import ProductDetails from "../pages.jsx/ProductDetails/ProductDetails";
import Cart from "../pages.jsx/Cart/Cart";
import Wishlist from "../pages.jsx/Wishlist/Wishlist";
import Checkout from "../pages.jsx/Checkout/Checkout";
import Login from "../pages.jsx/Login/Login";
import Register from "../pages.jsx/Register/Register";
import Profile from "../pages.jsx/Profile/Profile";
import Orders from "../pages.jsx/Orders/Orders";
import OrderSuccess from "../pages.jsx/OrderSuccess/OrderSuccess";
import NotFound from "../pages.jsx/NotFound/NotFound";

// Protected Route
import ProtectedRoute from "./ProtectedRoute";


export default function AppRoutes() {

  return (
    <Routes>

      {/* Public Routes */}
      <Route 
        path="/" 
        element={<Home />} 
      />

      <Route 
        path="/products" 
        element={<Products />} 
      />

      <Route 
        path="/product/:id" 
        element={<ProductDetails />} 
      />

      <Route 
        path="/cart" 
        element={<Cart />} 
      />

      <Route 
        path="/wishlist" 
        element={<Wishlist />} 
      />

      <Route 
        path="/login" 
        element={<Login />} 
      />

      <Route 
        path="/register" 
        element={<Register />} 
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


      {/* 404 Page */}
      <Route 
        path="*" 
        element={<NotFound />} 
      />

    </Routes>
  );
}