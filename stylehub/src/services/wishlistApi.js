import api from "./api";

export const getWishlist = () =>
  api.get("/wishlist");

export const addWishlist = (data) =>
  api.post("/wishlist", data);

export const removeWishlist = (id) =>
  api.delete(`/wishlist/${id}`);