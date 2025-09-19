
import React, { createContext, useContext, useState, useMemo } from "react";

const StoreContext = createContext();

export function StoreProvider({ children }) {
  const [cart, setCart] = useState([]); // [{ book, qty }]
  const [myBooks, setMyBooks] = useState([]); // [{...book, progress}]

  const addToCart = (book) => {
    setCart((prev) => {
      const idx = prev.findIndex((i) => i.book.key === book.key);
      if (idx > -1) {
        const copy = [...prev];
        copy[idx] = { ...copy[idx], qty: copy[idx].qty + 1 };
        return copy;
      }
      return [...prev, { book, qty: 1 }];
    });
  };

  const changeQty = (bookKey, qty) => {
    setCart((prev) =>
      prev.map((it) => (it.book.key === bookKey ? { ...it, qty: Math.max(1, qty) } : it))
    );
  };

  const removeFromCart = (bookKey) => {
    setCart((prev) => prev.filter((it) => it.book.key !== bookKey));
  };

  const clearCart = () => setCart([]);

  const addToMyBooks = (book) => {
    // random progress from options
    const progressOptions = [0, 25, 50, 75];
    const progress = progressOptions[Math.floor(Math.random() * progressOptions.length)];

    setMyBooks((prev) => {
      if (prev.some((b) => b.key === book.key)) return prev; // avoid duplicates
      return [...prev, { ...book, progress }];
    });
  };

  const removeFromMyBooks = (bookKey) => {
    setMyBooks((prev) => prev.filter((b) => b.key !== bookKey));
  };

  const cartTotal = useMemo(
    () => cart.reduce((sum, it) => sum + (it.book.price || 0) * it.qty, 0),
    [cart]
  );

  return (
    <StoreContext.Provider
      value={{
        cart,
        myBooks,
        addToCart,
        changeQty,
        removeFromCart,
        clearCart,
        addToMyBooks,
        removeFromMyBooks,
        cartTotal,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export const useStore = () => useContext(StoreContext);
