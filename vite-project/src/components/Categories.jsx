
import React from "react";

export default function Categories({ categories = [], selected, onSelect }) {
  return (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 12 }}>
      <button
        onClick={() => onSelect(null)}
        style={{
          padding: "6px 10px",
          borderRadius: 6,
          border: selected === null ? "2px solid #333" : "1px solid #ccc",
          background: selected === null ? "#eee" : "white",
        }}
      >
        All
      </button>

      {categories.map((c) => (
        <button
          key={c}
          onClick={() => onSelect(c)}
          style={{
            padding: "6px 10px",
            borderRadius: 6,
            border: selected === c ? "2px solid #333" : "1px solid #ccc",
            background: selected === c ? "#eee" : "white",
          }}
        >
          {c}
        </button>
      ))}
    </div>
  );
}
