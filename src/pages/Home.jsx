import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="home-page">
      <section className="hero">
        <div className="container">
          <h1>
            {user?.username 
              ? `Welcome, ${user.username}!` 
              : "Welcome to Books For You"}
          </h1>
          <p>What do you want to read today?</p>
          
          <Link to="/books" className="btn" style={{background: "#4D2D18"}}>
            Browse Books
          </Link>
        </div>
      </section>
    </div>
  );
}
