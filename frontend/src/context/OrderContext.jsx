import { createContext, useContext, useState } from "react";

const OrderContext = createContext();

export const useOrders = () => useContext(OrderContext);

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);

  const createOrder = (orderData) => {
    const newOrder = {
      id: `ORD-${Date.now().toString().slice(-6)}`,
      tokenNumber: Math.floor(100 + Math.random() * 900),
      ...orderData,
      status: "pending",
      createdAt: new Date().toISOString(),
    };
    setOrders((prev) => [newOrder, ...prev]);
    return newOrder;
  };

  const updateOrderStatus = (orderId, status) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, status } : order
      )
    );
  };

  const getOrderById = (orderId) => orders.find((o) => o.id === orderId);

  const getOrdersByStall = (stallId) =>
    orders.filter((o) => o.stallId === stallId);

  return (
    <OrderContext.Provider
      value={{
        orders,
        createOrder,
        updateOrderStatus,
        getOrderById,
        getOrdersByStall,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};