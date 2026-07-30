import axios from "axios";

export const getProducts = async () => {
  const categories = [
    "mens-shirts",
    "mens-shoes",
    "tops",
    "womens-dresses",
    "womens-shoes",
    "womens-bags",
    "womens-jewellery",
    "sunglasses"
  ];

  try {
    const responses = await Promise.all(
      categories.map((category) =>
        axios.get(`https://dummyjson.com/products/category/${category}`)
      )
    );

    const products = responses.flatMap((res) => res.data.products);

    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

export const getProductById = async (id) => {
  try {
    const response = await axios.get(`https://dummyjson.com/products/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
};