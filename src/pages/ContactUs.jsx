import React, { useState } from "react";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message submitted!"); // Simulate submission
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="contact-page">
      <form className="contact-form" onSubmit={handleSubmit}>
        <h2>Have a Question?</h2>
        <p>Write us a message and we'll be happy to help you!</p>

        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your Name"
          required
        />

        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Your Email"
          required
        />

        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Write your message..."
          rows="5"
          required
        ></textarea>

        <button type="submit" className="btn submit">
          Submit
        </button>
      </form>
    </div>
  );
}
