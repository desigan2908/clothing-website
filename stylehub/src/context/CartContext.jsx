import { createContext, useContext, useEffect, useState } from "react";

import {
  getCart,
  addToCart as addToCartApi,
  updateCart,
  removeFromCart,
} from "../services/cartApi";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ==========================
     Load Cart
  ========================== */

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setLoading(false);
        return;
      }

      const res = await getCart();

      setCart(res.data.cart);
    } catch (error) {
      console.error("Failed to fetch cart", error);
    } finally {
      setLoading(false);
    }
  };

  /* ==========================
     Add To Cart
  ========================== */

  const addToCart = async (product) => {
    try {
      await addToCartApi({
        product: product._id,
        quantity: product.quantity || 1,
      });

      await fetchCart();
    } catch (error) {
      console.error("Add To Cart Error", error);
    }
  };

  /* ==========================
     Increase Quantity
  ========================== */

  const increaseQuantity = async (cartId, quantity) => {
    try {
      await updateCart(cartId, {
        quantity: quantity + 1,
      });

      await fetchCart();
    } catch (error) {
      console.error(error);
    }
  };

  /* ==========================
     Decrease Quantity
  ========================== */

  const decreaseQuantity = async (cartId, quantity) => {
    try {
      if (quantity <= 1) {
        await removeItem(cartId);
        return;
      }

      await updateCart(cartId, {
        quantity: quantity - 1,
      });

      await fetchCart();
    } catch (error) {
      console.error(error);
    }
  };

  /* ==========================
     Remove Item
  ========================== */

  const removeItem = async (cartId) => {
    try {
      await removeFromCart(cartId);

      await fetchCart();
    } catch (error) {
      console.error(error);
    }
  };

  /* ==========================
     Clear Cart
  ========================== */

  const clearCart = () => {
    setCart([]);
  };

  /* ==========================
     Totals
  ========================== */

  const totalPrice = cart.reduce(
    (total, item) =>
      total +
      item.product.price * item.quantity,
    0
  );

  const delivery =
    totalPrice > 500 ? 0 : 50;

  const grandTotal =
    totalPrice + delivery;

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeItem,
        clearCart,
        totalPrice,
        delivery,
        grandTotal,
        refreshCart: fetchCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);