import "./Orders.css";
import { useState } from "react";

import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

import { useOrders } from "../../context/OrderContext";
import { useCart } from "../../context/CartContext";

export default function Orders() {
  const { orders, cancelOrder } = useOrders();
  const { addToCart } = useCart();

  const [search, setSearch] = useState("");

  const filteredOrders = orders.filter((order) =>
    order.id.toString().includes(search)
  );

  return (
    <>
      <Navbar />

      <div className="orders-page">

        <h1>My Orders</h1>

        <input
          className="search-order"
          placeholder="Search by Order ID"
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

        {filteredOrders.length === 0 ? (
          <h2>No Orders Found</h2>
        ) : (
          filteredOrders.map((order) => (
            <div
              className="order-card"
              key={order.id}
            >
              <h3>Order #{order.id}</h3>

              <p>
                Date : {order.orderDate}
              </p>

              <p>
                Status : {order.status}
              </p>

              <p>
                Total : ₹
                {order.total.toFixed(2)}
              </p>

              <h4>Items</h4>

              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="order-item"
                >
                  <img
                    src={
                      item.thumbnail ||
                      item.images?.[0] ||
                      item.image
                    }
                    alt={
                      item.title || item.name
                    }
                    loading="lazy"
                  />

                  <div>
                    <p>
                      {item.title ||
                        item.name}
                    </p>

                    <p>
                      Qty : {item.quantity}
                    </p>
                  </div>
                </div>
              ))}

              {order.status ===
                "Pending" && (
                <button
                  className="cancel-btn"
                  onClick={() =>
                    cancelOrder(order.id)
                  }
                >
                  Cancel Order
                </button>
              )}

              <button
                className="reorder-btn"
                onClick={() =>
                  order.items.forEach(
                    addToCart
                  )
                }
              >
                Reorder
              </button>

            </div>
          ))
        )}

      </div>

      <Footer />
    </>
  );
}