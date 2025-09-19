// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("auth_email");
    const username = localStorage.getItem("auth_username");
    return token ? { token, email, username } : null;
  });

  const getRegisteredUsers = () => {
    try {
      const raw = localStorage.getItem("registered_users");
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  };
  const setRegisteredUsers = (map) => {
    localStorage.setItem("registered_users", JSON.stringify(map));
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("auth_email");
    const username = localStorage.getItem("auth_username");
    if (token && !user) setUser({ token, email, username });
  }, []);

  const login = async (email, password) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const usersMap = getRegisteredUsers();
    const userData = usersMap[email];

    // Debug logging
    console.log("Login attempt for:", email);
    console.log("Stored users:", usersMap);
    console.log("User data found:", userData);

    if (!userData) {
      throw new Error("No account found with this email. Please register first.");
    }

    if (userData.password !== password) {
      throw new Error("Invalid password");
    }

    const token = `token_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    localStorage.setItem("token", token);
    localStorage.setItem("auth_email", email);
    localStorage.setItem("auth_username", userData.username);

    setUser({ token, email, username: userData.username });
  };

  const register = async (email, password, username) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const usersMap = getRegisteredUsers();
    
    // Check if user already exists
    if (usersMap[email]) {
      throw new Error("User already exists with this email");
    }

    // Create new user
    const token = `token_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    usersMap[email] = { username, password };
    setRegisteredUsers(usersMap);
    
    // Debug logging
    console.log("Registering user:", { email, username });
    console.log("Updated users map:", usersMap);
    console.log("Stored in localStorage:", localStorage.getItem("registered_users"));
    
    localStorage.setItem("token", token);
    localStorage.setItem("auth_email", email);
    localStorage.setItem("auth_username", username);

    setUser({ token, email, username });
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("auth_email");
    localStorage.removeItem("auth_username");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
