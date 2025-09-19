
import React from "react";

export default function SearchBar({ value, onChange, placeholder = "Search by Category or book name" }) {
  return (
    <div style={{ marginBottom: 12 }}>
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          width: "100%",
          padding: "8px 12px",
          borderRadius: 6,
          border: "1px solid #ccc",
        }}
      />
    </div>
  );
}
