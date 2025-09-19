import React from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";  // Use HashRouter for deployment
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { StoreProvider } from "./context/StoreContext";

import "./index.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HashRouter>
      <AuthProvider>
        <StoreProvider>
          <App />
        </StoreProvider>
      </AuthProvider>
    </HashRouter>
  </React.StrictMode>
);
