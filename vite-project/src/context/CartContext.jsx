import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    const raw = localStorage.getItem("cart");
    return raw ? JSON.parse(raw) : [];
  });

  function persist(next) {
    setItems(next);
    localStorage.setItem("cart", JSON.stringify(next));
  }

  function addItem(book) {
    const existing = items.find((i) => i.id === book.id);
    if (existing) {
      const next = items.map((i) =>
        i.id === book.id ? { ...i, qty: i.qty + 1 } : i
      );
      persist(next);
    } else {
      persist([...items, { ...book, qty: 1 }]);
    }
  }

  function removeItem(id) {
    const next = items.filter((i) => i.id !== id);
    persist(next);
  }

  function clearCart() {
    persist([]);
  }

  function updateQty(id, qty) {
    const next = items.map((i) => (i.id === id ? { ...i, qty } : i));
    persist(next);
  }

  const value = { cart: items, addItem, removeItem, clearCart, updateQty };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
