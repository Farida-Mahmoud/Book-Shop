import "./App.css";
import React, { Suspense, lazy } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

const Home = lazy(() => import("./pages/Home"));
const Books = lazy(() => import("./pages/Books"));
const BookDetails = lazy(() => import("./pages/BookDetails"));
const Cart = lazy(() => import("./pages/Cart"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Profile = lazy(() => import("./pages/Profile"));
const About = lazy(() => import("./pages/About"));
const ContactUs = lazy(() => import("./pages/ContactUs"));
const MyBooks = lazy(() => import("./pages/MyBooks"));

function AppContent() {
  const location = useLocation();
  const hideNavOn = ["/login", "/register"];
  const hideNav = hideNavOn.includes(location.pathname);

  return (
    <div className="app">
      {!hideNav && <Navbar />}
      <main className="container">
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />

            {/* Auth */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected */}
            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/books"
              element={
                <ProtectedRoute>
                  <Books />
                </ProtectedRoute>
              }
            />
            <Route
              path="/books/:id"
              element={
                <ProtectedRoute>
                  <BookDetails />
                </ProtectedRoute>
              }
            />
            <Route
              path="/cart"
              element={
                <ProtectedRoute>
                  <Cart />
                </ProtectedRoute>
              }
            />
            <Route
              path="/mybooks"
              element={
                <ProtectedRoute>
                  <MyBooks />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />

            {/* Public */}
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="*" element={<div>Page not found</div>} />
          </Routes>
        </Suspense>
      </main>
      {!hideNav && <Footer />}
    </div>
  );
}

export default function App() {
  return <AppContent />;
}
