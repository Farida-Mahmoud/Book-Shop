
import React from "react";
import { useStore } from "../context/StoreContext";

export default function MyBooks() {
  const { myBooks, removeFromMyBooks } = useStore();

  if (!myBooks || myBooks.length === 0) return <p>You have no books yet. Read free books to save them here.</p>;

  return (
    <div>
      <h2>My Books</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {myBooks.map((b) => (
          <li key={b.key} style={{ marginBottom: 12, border: "1px solid #ddd", padding: 10, borderRadius: 6 }}>
            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              {b.cover_edition_key ? (
                <img
                  src={`https://covers.openlibrary.org/b/olid/${b.cover_edition_key}-S.jpg`}
                  alt={b.title}
                  style={{ width: 60, height: 95, objectFit: "cover" }}
                />
              ) : (
                <div style={{ width: 60, height: 95, background: "#f3f3f3" }} />
              )}
              <div style={{ flex: 1 }}>
                <strong>{b.title}</strong>
                <div style={{ marginTop: 6 }}>
                  Progress: {b.progress}%
                  <div style={{ height: 8, background: "#eee", borderRadius: 4, marginTop: 6 }}>
                    <div style={{ width: `${b.progress}%`, height: "100%", background: "#4caf50", borderRadius: 4 }} />
                  </div>
                </div>
              </div>
              <div>
                <button onClick={() => removeFromMyBooks(b.key)} className="btn" style={{ background: " #4D2D18" }}>
                  Remove
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
