import { useEffect, useMemo, useState } from "react";
import { getProducts } from "../../services/productApi";

import ProductCard from "../../components/ProductCard/ProductCard";
import Loader from "../../components/Loader/Loader";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import SearchBar from "../../components/SearchBar/SearchBar";
import FilterPanel from "../../components/FilterPanel/FilterPanel";
import Pagination from "../../components/Pagination/Pagination";

import "./Products.css";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);

  const itemsPerPage = 8;

  /* ==========================
     Fetch Products
  ========================== */

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        const res = await getProducts();

        setProducts(res.data.products);

      } catch (err) {
        console.error(err);

        setError(
          err.response?.data?.message ||
            "Failed to load products."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  /* ==========================
     Reset Page
  ========================== */

  useEffect(() => {
    setPage(1);
  }, [search, category]);

  /* ==========================
     Categories
  ========================== */

  const categories = useMemo(() => {
    return [
      ...new Set(
        products.map((product) => product.category)
      ),
    ];
  }, [products]);

  /* ==========================
     Search + Filter
  ========================== */

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.title
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesCategory =
        category === "" ||
        product.category === category;

      return (
        matchesSearch &&
        matchesCategory
      );
    });
  }, [products, search, category]);

  /* ==========================
     Pagination
  ========================== */

  const totalPages = Math.ceil(
    filteredProducts.length / itemsPerPage
  );

  const displayedProducts = useMemo(() => {
    const start =
      (page - 1) * itemsPerPage;

    return filteredProducts.slice(
      start,
      start + itemsPerPage
    );
  }, [filteredProducts, page]);

  return (
    <>
      <Navbar />

      <div className="products">

        <h1>Explore Our Collection</h1>

        <p>
          Browse the latest fashion for Men,
          Women and Accessories.
        </p>

        <SearchBar
          value={search}
          onChange={setSearch}
        />

        <FilterPanel
          categories={categories}
          selectedCategory={category}
          onCategoryChange={setCategory}
        />

        {loading && <Loader />}

        {!loading && error && (
          <p className="error-message">
            {error}
          </p>
        )}

        {!loading &&
          !error &&
          filteredProducts.length === 0 && (
            <p className="error-message">
              No products found.
            </p>
          )}

        {!loading &&
          !error &&
          filteredProducts.length > 0 && (
            <>
              <div className="product-grid">
                {displayedProducts.map(
                  (product) => (
                    <ProductCard
                      key={product._id}
                      product={product}
                    />
                  )
                )}
              </div>

              <Pagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={setPage}
              />
            </>
          )}

      </div>

      <Footer />
    </>
  );
}