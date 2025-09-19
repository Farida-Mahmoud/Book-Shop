// src/pages/BookDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function BookDetails() {
  const params = useParams();
  const encoded = params.id; // encoded book.key
  const key = decodeURIComponent(encoded); // e.g. "/works/OLxxxxW"
  const [work, setWork] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!key) return;
    setLoading(true);
    fetch(`https://openlibrary.org${key}.json`)
      .then((res) => res.json())
      .then((data) => setWork(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [key]);

  if (loading) return <p>Loading details…</p>;
  if (!work) return <p>Book not found</p>;

  return (
    <div>
      <h2>{work.title}</h2>
      {work.description && (
        <p>
          {typeof work.description === "string" ? work.description : work.description.value}
        </p>
      )}
      <p>
        <strong>First published:</strong> {work.first_publish_date || work.first_publish_year || "Unknown"}
      </p>
      <p>
        <strong>Subjects:</strong> {work.subjects ? work.subjects.join(", ") : "—"}
      </p>
    </div>
  );
}
