import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const raw = localStorage.getItem("cart");
    return raw ? JSON.parse(raw) : [];
  });

  const persist = (next) => {
    setCart(next);
    localStorage.setItem("cart", JSON.stringify(next));
  };

  const addItem = (book) => {
    const existing = cart.find((i) => i.id === book.id);
    if (existing) {
      persist(cart.map((i) =>
        i.id === book.id ? { ...i, qty: i.qty + 1 } : i
      ));
    } else {
      persist([...cart, { ...book, qty: 1 }]);
    }
  };

  const removeItem = (id) => persist(cart.filter((i) => i.id !== id));
  const clearCart = () => persist([]);
  const updateQty = (id, qty) => persist(cart.map((i) => i.id === id ? { ...i, qty } : i));

  return (
    <CartContext.Provider value={{ cart, addItem, removeItem, clearCart, updateQty }}>
      {children}
    </CartContext.Provider>
  );
}
