import { createContext, useContext, useEffect, useState } from "react";

import {
  getWishlist,
  addWishlist,
  removeWishlist,
} from "../services/wishlistApi";

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ==========================
     Load Wishlist
  ========================== */

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setLoading(false);
        return;
      }

      const res = await getWishlist();

      setWishlist(res.data.wishlist);
    } catch (error) {
      console.error("Failed to fetch wishlist", error);
    } finally {
      setLoading(false);
    }
  };

  /* ==========================
     Add To Wishlist
  ========================== */

  const addToWishlist = async (product) => {
    try {
      await addWishlist({
        product: product._id,
      });

      await fetchWishlist();
    } catch (error) {
      console.error("Add Wishlist Error", error);
    }
  };

  /* ==========================
     Remove From Wishlist
  ========================== */

  const removeFromWishlist = async (wishlistId) => {
    try {
      await removeWishlist(wishlistId);

      await fetchWishlist();
    } catch (error) {
      console.error(error);
    }
  };

  /* ==========================
     Clear Wishlist
  ========================== */

  const clearWishlist = () => {
    setWishlist([]);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        loading,
        addToWishlist,
        removeFromWishlist,
        clearWishlist,
        refreshWishlist: fetchWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export const useWishlist = () => useContext(WishlistContext);