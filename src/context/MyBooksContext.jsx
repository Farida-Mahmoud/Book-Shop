
import React, { createContext, useContext, useState, useEffect } from "react";

const MyBooksContext = createContext();

export function MyBooksProvider({ children }) {
  const [myBooks, setMyBooks] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("myBooks");
    if (saved) setMyBooks(JSON.parse(saved));
  }, []);

  const addBook = (book) => {
    // Avoid duplicates
    const exists = myBooks.find((b) => b.key === book.key);
    if (!exists) {
      const bookWithProgress = { ...book, progress: 0 }; // 0% read initially
      const updated = [...myBooks, bookWithProgress];
      setMyBooks(updated);
      localStorage.setItem("myBooks", JSON.stringify(updated));
    }
  };

  const updateProgress = (key, progress) => {
    const updated = myBooks.map((b) =>
      b.key === key ? { ...b, progress } : b
    );
    setMyBooks(updated);
    localStorage.setItem("myBooks", JSON.stringify(updated));
  };

  const removeBook = (key) => {
    const updated = myBooks.filter((b) => b.key !== key);
    setMyBooks(updated);
    localStorage.setItem("myBooks", JSON.stringify(updated));
  };

  return (
    <MyBooksContext.Provider
      value={{ myBooks, addBook, updateProgress, removeBook }}
    >
      {children}
    </MyBooksContext.Provider>
  );
}

export function useMyBooks() {
  return useContext(MyBooksContext);
}
