import api from "./api";

// Get All Products
export const getProducts = () => {
  return api.get("/products");
};

// Get Single Product
export const getProduct = (id) => {
  return api.get(`/products/${id}`);
};

// Create Product
export const createProduct = (data) => {
  return api.post("/products", data);
};

// Update Product
export const updateProduct = (id, data) => {
  return api.put(`/products/${id}`, data);
};

// Delete Product
export const deleteProduct = (id) => {
  return api.delete(`/products/${id}`);
};