import React from "react";
import { useStore } from "../context/StoreContext";
import { useNavigate } from "react-router-dom";

export default function BookCard({ book }) {
  const { addToCart, addToMyBooks } = useStore();
  const navigate = useNavigate();

  const handleAdd = () => {
    if (book.isFree) {
      addToMyBooks(book);
      navigate("/mybooks");
    } else {
      addToCart(book);
    }
  };

  // Determine the cover URL with fallback
  const coverUrl = book.cover_edition_key
    ? `https://covers.openlibrary.org/b/olid/${book.cover_edition_key}-M.jpg`
    : book.cover_i
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
    : "/placeholder-book.png"; // Add a local placeholder image

  return (
    <div className="book-card">
      <img src={coverUrl} alt={book.title} className="book-cover" />

      <div className="book-details">
        <h3 className="book-title">{book.title}</h3>
        <div className="book-authors">
          {book.authors && book.authors.length > 0
            ? book.authors.map((a) => a.name).join(", ")
            : "Unknown author"}
        </div>

        {book.first_publish_year && (
          <div className="book-year">
            <small>First published: {book.first_publish_year}</small>
          </div>
        )}

        <div className="book-actions">
          <button onClick={handleAdd} className="btn">
            {book.isFree ? "Read" : `Add to cart - $${book.price}`}
          </button>
          <button
            onClick={() => navigate(`/books/${encodeURIComponent(book.key)}`)}
            className="btn"
          >
            View details
          </button>
        </div>
      </div>
    </div>
  );
}
