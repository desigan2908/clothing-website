import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaSearch,
  FaBoxOpen,
  FaTruck,
  FaCheckCircle,
  FaClock,
  FaArrowRight,
} from "react-icons/fa";

import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import Loader from "../../components/Loader/Loader";

import { getOrders } from "../../services/orderApi";

import "./Orders.css";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  /* ==========================
     Fetch Orders
  ========================== */

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getOrders();

        setOrders(response.data.orders || []);
      } catch (error) {
        console.error("Error fetching orders:", error);

        setError(
          error.response?.data?.message ||
            "Failed to load your orders."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  /* ==========================
     Search Orders
  ========================== */

  const filteredOrders = orders.filter((order) =>
    order._id
      ?.toString()
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  /* ==========================
     Status Icon
  ========================== */

  const getStatusIcon = (status) => {
    const value = status?.toLowerCase();

    if (value === "delivered") {
      return <FaCheckCircle />;
    }

    if (value === "shipped") {
      return <FaTruck />;
    }

    return <FaClock />;
  };

  /* ==========================
     Status Class
  ========================== */

  const getStatusClass = (status) => {
    const value = status?.toLowerCase();

    if (value === "delivered") return "delivered";
    if (value === "shipped") return "shipped";
    if (value === "cancelled") return "cancelled";
    if (value === "processing") return "processing";

    return "pending";
  };

  /* ==========================
     Delivery Progress
  ========================== */

  const getProgress = (status) => {
    const value = status?.toLowerCase();

    if (value === "delivered") return "100%";
    if (value === "shipped") return "65%";
    if (value === "processing") return "45%";
    if (value === "cancelled") return "0%";

    return "30%";
  };

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
     Page
  ========================== */

  return (
    <>
      <Navbar />

      <main className="orders-page">

        {/* Hero */}

        <section className="orders-hero">

          <div>
            <span className="orders-eyebrow">
              YOUR SHOPPING JOURNEY
            </span>

            <h1>My Orders</h1>

            <p>
              Track your purchases and see your order
              history in one place.
            </p>
          </div>

          <div className="orders-icon">
            <FaBoxOpen />
          </div>

        </section>

        {/* Error */}

        {error && (
          <section className="no-results">

            <FaBoxOpen />

            <h2>Unable to Load Orders</h2>

            <p>{error}</p>

          </section>
        )}

        {/* Search */}

        {!error && orders.length > 0 && (
          <div className="orders-toolbar">

            <div className="order-search">

              <FaSearch />

              <input
                type="text"
                placeholder="Search by Order ID..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
              />

            </div>

            <span className="order-count">
              {filteredOrders.length}{" "}
              {filteredOrders.length === 1
                ? "Order"
                : "Orders"}
            </span>

          </div>
        )}

        {/* Empty Orders */}

        {!error && orders.length === 0 && (
          <section className="empty-orders">

            <div className="empty-orders-icon">
              <FaBoxOpen />
            </div>

            <h2>No Orders Yet</h2>

            <p>
              Your order history is waiting for its
              first purchase. Discover something you
              love and start shopping.
            </p>

            <Link
              to="/products"
              className="shop-orders-btn"
            >
              Start Shopping
              <FaArrowRight />
            </Link>

          </section>
        )}

        {/* Search Empty */}

        {!error &&
          orders.length > 0 &&
          filteredOrders.length === 0 && (
            <section className="no-results">

              <FaSearch />

              <h2>No Orders Found</h2>

              <p>
                We couldn't find an order matching "
                {search}".
              </p>

            </section>
          )}

        {/* Orders */}

        {!error &&
          filteredOrders.length > 0 && (
            <section className="orders-list">

              {filteredOrders.map((order) => {

                const statusClass =
                  getStatusClass(
                    order.orderStatus
                  );

                return (
                  <article
                    className="order-card"
                    key={order._id}
                  >

                    {/* Order Header */}

                    <div className="order-card-header">

                      <div className="order-heading">

                        <div className="order-box-icon">
                          <FaBoxOpen />
                        </div>

                        <div>

                          <span className="order-label">
                            ORDER ID
                          </span>

                          <h2>
                            #{order._id}
                          </h2>

                        </div>

                      </div>

                      <div
                        className={`order-status ${statusClass}`}
                      >

                        {getStatusIcon(
                          order.orderStatus
                        )}

                        <span>
                          {order.orderStatus ||
                            "Pending"}
                        </span>

                      </div>

                    </div>

                    {/* Order Meta */}

                    <div className="order-meta">

                      <div>
                        <span>Date</span>

                        <strong>
                          {order.createdAt
                            ? new Date(
                                order.createdAt
                              ).toLocaleDateString()
                            : "—"}
                        </strong>
                      </div>

                      <div>
                        <span>Items</span>

                        <strong>
                          {order.orderItems?.length ||
                            0}
                        </strong>
                      </div>

                      <div>
                        <span>Total</span>

                        <strong className="order-total">
                          ₹
                          {Number(
                            order.totalPrice || 0
                          ).toFixed(2)}
                        </strong>
                      </div>

                    </div>

                    {/* Products */}

                    <div className="order-products">

                      <div className="order-products-title">
                        <span>ORDER ITEMS</span>
                      </div>

                      <div className="order-product-list">

                        {order.orderItems?.map(
                          (item, index) => (

                            <div
                              className="order-product"
                              key={
                                item._id || index
                              }
                            >

                              <div className="order-product-image">

                                <img
                                  src={
                                    item.product
                                      ?.thumbnail ||
                                    item.product
                                      ?.images?.[0] ||
                                    "/images/no-image.png"
                                  }
                                  alt={
                                    item.product
                                      ?.title ||
                                    "Product"
                                  }
                                />

                              </div>

                              <div className="order-product-info">

                                <h3>
                                  {item.product
                                    ?.title ||
                                    "Product"}
                                </h3>

                                <span>
                                  Qty:{" "}
                                  {item.quantity}
                                </span>

                                <span>
                                  Price: ₹
                                  {Number(
                                    item.price || 0
                                  ).toFixed(2)}
                                </span>

                              </div>

                            </div>
                          )
                        )}

                      </div>

                    </div>

                    {/* Delivery Progress */}

                    <div className="delivery-section">

                      <div className="delivery-header">

                        <span>
                          Delivery Status
                        </span>

                        <strong>
                          {order.orderStatus ||
                            "Pending"}
                        </strong>

                      </div>

                      <div className="progress-track">

                        <div
                          className={`progress-fill ${statusClass}`}
                          style={{
                            width:
                              getProgress(
                                order.orderStatus
                              ),
                          }}
                        />

                      </div>

                      <div className="progress-labels">

                        <span>Ordered</span>
                        <span>Shipped</span>
                        <span>Delivered</span>

                      </div>

                    </div>

                    {/* Footer */}

                    <div className="order-card-footer">

                      <span>
                        Thank you for shopping
                        with StyleHub
                      </span>

                      <Link
                        to={`/orders/${order._id}`}
                        className="view-order-btn"
                      >
                        View Details
                        <FaArrowRight />
                      </Link>

                    </div>

                  </article>
                );
              })}

            </section>
          )}

      </main>

      <Footer />
    </>
  );
}