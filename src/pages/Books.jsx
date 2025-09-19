import React, { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import Categories from "../components/Categories";
import BookCard from "../components/BookCard";

const CATEGORIES = ["Fiction", "Romance", "Sci-Fi", "Mystery", "History", "Children"];

function transformWorks(works) {
  return works.map((w) => {
    const category = CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)];
    const isFree = Math.random() < 0.3;
    const price = isFree ? null : Math.floor(Math.random() * 15) + 1;
    return {
      key: w.key,
      title: w.title,
      authors: w.authors || [],
      cover_edition_key: w.cover_edition_key || null,
      cover_i: w.cover_i || null,
      first_publish_year: w.first_publish_year,
      category,
      isFree,
      price,
    };
  });
}

export default function Books() {
  const [books, setBooks] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    // Check localStorage first
    const savedBooks = localStorage.getItem("booksData");
    if (savedBooks) {
      const parsed = JSON.parse(savedBooks);
      setBooks(parsed);
      setFiltered(parsed);
      setLoading(false);
      return;
    }

    // Fetch from API if not in localStorage
    fetch("https://openlibrary.org/subjects/fiction.json?limit=40")
      .then((res) => res.json())
      .then((data) => {
        const transformed = transformWorks(data.works || []);
        setBooks(transformed);
        setFiltered(transformed);

        // Save to localStorage to persist free/price
        localStorage.setItem("booksData", JSON.stringify(transformed));
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const q = search.trim().toLowerCase();
    let out = books;

    if (selectedCategory) {
      out = out.filter((b) => b.category === selectedCategory);
    }

    if (q) {
      out = out.filter(
        (b) =>
          b.title.toLowerCase().includes(q) ||
          (b.category && b.category.toLowerCase().includes(q))
      );
    }

    setFiltered(out);
  }, [search, selectedCategory, books]);

  if (loading) return <p>Loading books…</p>;

  return (
    <div>
      <h2>Books</h2>

      <SearchBar value={search} onChange={setSearch} />

      <Categories
        categories={CATEGORIES}
        selected={selectedCategory}
        onSelect={setSelectedCategory}
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(380px, 1fr))",
          gap: 12,
        }}
      >
        {filtered.length === 0 ? (
          <p>No books found.</p>
        ) : (
          filtered.map((b) => <BookCard key={b.key} book={b} />)
        )}
      </div>
    </div>
  );
}
