import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getProduct } from "../../services/productApi";

import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import Loader from "../../components/Loader/Loader";
import Rating from "../../components/Rating/Rating";

import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";

import "./ProductDetails.css";

export default function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [image, setImage] = useState("");
  const [qty, setQty] = useState(1);

  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();

  /* ==========================
     Fetch Product
  ========================== */

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);

        const res = await getProduct(id);

        const data = res.data.product;

        if (!data) {
          setError("Product not found.");
          return;
        }

        setProduct(data);

        setImage(
          data.thumbnail ||
            data.images?.[0] ||
            ""
        );
      } catch (err) {
        console.error(err);

        setError(
          err.response?.data?.message ||
            "Failed to load product."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  /* ==========================
     Loading
  ========================== */

  if (loading) {
    return (
      <>
        <Navbar />
        <Loader />
        <Footer />
      </>
    );
  }

  /* ==========================
     Error
  ========================== */

  if (error) {
    return (
      <>
        <Navbar />

        <div className="details">
          <h2>{error}</h2>
        </div>

        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="details">

        <div className="left">

          <img
            className="main-image"
            src={image}
            alt={product.title}
            loading="lazy"
          />

          <div className="gallery">

            {product.images?.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={product.title}
                loading="lazy"
                onClick={() => setImage(img)}
              />
            ))}

          </div>

        </div>

        <div className="right">

          <h1>{product.title}</h1>

          <Rating
            rating={product.rating}
          />

          <h2>₹{product.price}</h2>

          <p>{product.description}</p>

          <div className="product-info">

            <h4>
              Brand: {product.brand}
            </h4>

            <h4>
              Category: {product.category}
            </h4>

            <h4>
              Stock: {product.stock}
            </h4>

          </div>

          <div className="sizes">

            <h3>Size</h3>

            <button>S</button>
            <button>M</button>
            <button>L</button>
            <button>XL</button>

          </div>

          <div className="qty">

            <button
              onClick={() =>
                setQty(
                  Math.max(1, qty - 1)
                )
              }
            >
              -
            </button>

            <span>{qty}</span>

            <button
              onClick={() =>
                setQty(qty + 1)
              }
            >
              +
            </button>

          </div>

          <div className="buttons">

            <button
              className="cart-btn"
              onClick={() =>
                addToCart({
                  ...product,
                  quantity: qty,
                })
              }
            >
              Add To Cart
            </button>

            <button
              className="wish-btn"
              onClick={() =>
                addToWishlist(product)
              }
            >
              Wishlist
            </button>

          </div>

        </div>

      </div>

      <Footer />
    </>
  );
}