import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [stallId, setStallId] = useState(null);

  const addToCart = (item, stall) => {
    // If cart has items from different stall, clear it
    if (stallId && stallId !== stall.id) {
      setCartItems([{ ...item, quantity: 1 }]);
      setStallId(stall.id);
      return;
    }

    setStallId(stall.id);

    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === itemId);
      if (existing?.quantity === 1) {
        const newItems = prev.filter((i) => i.id !== itemId);
        if (newItems.length === 0) setStallId(null);
        return newItems;
      }
      return prev.map((i) =>
        i.id === itemId ? { ...i, quantity: i.quantity - 1 } : i
      );
    });
  };

  const clearCart = () => {
    setCartItems([]);
    setStallId(null);
  };

  const getItemQuantity = (itemId) => {
    return cartItems.find((i) => i.id === itemId)?.quantity || 0;
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        stallId,
        addToCart,
        removeFromCart,
        clearCart,
        getItemQuantity,
        totalItems,
        totalAmount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};