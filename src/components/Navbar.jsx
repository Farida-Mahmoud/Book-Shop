// src/components/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useStore } from "../context/StoreContext";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { cart } = useStore();
  const { user, logout } = useAuth();
  const cartCount = cart.reduce((sum, it) => sum + it.qty, 0);

  return (
    <nav className="navbar">
      <div className="nav-inner">
        {/* Left links */}
        <ul>
          <h3 className="cursive">Book For You</h3>
          <li><Link to="/home">Home</Link></li>
          <li><Link to="/books">Books</Link></li>
          <li><Link to="/mybooks">My Books</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact Us</Link></li>
        </ul>

        {/* Right side: Cart + User */}
        <div className="nav-actions">
          <Link to="/cart" className="cart-icon">
            <i className="fas fa-shopping-cart"></i> ({cartCount})
          </Link>

          {user ? (
            <>
              <Link 
                to="/profile" 
                style={{ margin: "0 12px", textDecoration: "none", color: "#fff", fontWeight: 600 }}
              >
                {user.username || user.email}
              </Link>
              <button onClick={logout} className="btn" style={{background: "#4D2D18"}}>Logout</button>
            </>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
}
