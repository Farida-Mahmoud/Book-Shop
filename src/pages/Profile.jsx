import React from "react";
import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const { user } = useAuth();

  return (
    <div className="profile-page">
      <form className="profile-form">
        <h2>Profile</h2>

        <label htmlFor="email">Email:</label>
        <input 
          type="email" 
          id="email" 
          value={user?.email || ""} 
          disabled 
        />

        <label htmlFor="username">Username:</label>
        <input 
          type="text" 
          id="username" 
          value={user?.username || ""} 
          disabled 
        />
      </form>
    </div>
  );
}
