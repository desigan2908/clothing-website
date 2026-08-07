import { createContext, useContext, useEffect, useState } from "react";

const OrderContext = createContext();

export function OrderProvider({ children }) {
  const [orders, setOrders] = useState(() => {
    return JSON.parse(localStorage.getItem("orders")) || [];
  });

  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders));
  }, [orders]);

  const placeOrder = (order) => {
    const newOrder = {
      id: Date.now(),
      ...order,
      status: "Pending",
      orderDate: new Date().toLocaleString(),
    };

    setOrders((prevOrders) => [...prevOrders, newOrder]);
  };

  const cancelOrder = (id) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === id
          ? { ...order, status: "Cancelled" }
          : order
      )
    );
  };

  const getOrderById = (id) => {
    return orders.find((order) => order.id === id);
  };

  const clearOrders = () => {
    setOrders([]);
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        placeOrder,
        cancelOrder,
        getOrderById,
        clearOrders,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export const useOrders = () => useContext(OrderContext);