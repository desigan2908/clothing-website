import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import { AuthProvider } from "./context/AuthContext";
import { OrderProvider } from "./context/OrderContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
  <AuthProvider>
    <CartProvider>
      <WishlistProvider>
        <OrderProvider>
          <App />
        </OrderProvider>
      </WishlistProvider>
    </CartProvider>
  </AuthProvider>
</BrowserRouter>
);