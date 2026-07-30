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
      orderDate: new Date().toLocaleDateString(),
    };

    setOrders((prev) => [...prev, newOrder]);
  };

  const cancelOrder = (id) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === id
          ? { ...order, status: "Cancelled" }
          : order
      )
    );
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        placeOrder,
        cancelOrder,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export const useOrders = () => useContext(OrderContext);