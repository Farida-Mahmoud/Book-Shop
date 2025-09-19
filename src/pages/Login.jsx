// src/pages/Login.jsx
import React from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().min(6, "Too short").required("Required"),
});

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/home";

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Login</h2>
        <Formik
          initialValues={{ email: "farida@gmail.com", password: "14365Farida?" }}
          validationSchema={LoginSchema}
          onSubmit={(values, { setSubmitting, setStatus }) => {
            setStatus(null);
            login(values.email, values.password)
              .then(() => navigate(from, { replace: true }))
              .catch((err) => setStatus(err.message || "Invalid credentials"))
              .finally(() => setSubmitting(false));
          }}
        >
          {({ isSubmitting, status, errors, touched }) => (
            <Form className="form">
              <label>Email</label>
              <Field
                name="email"
                type="email"
                className={`input ${errors.email && touched.email ? "error" : ""}`}
              />
              <ErrorMessage name="email" component="div" className="field-error" />

              <label>Password</label>
              <Field
                name="password"
                type="password"
                className={`input ${errors.password && touched.password ? "error" : ""}`}
              />
              <ErrorMessage name="password" component="div" className="field-error" />

              {status && <div className="field-error">{status}</div>}

              <button type="submit" className="btn" disabled={isSubmitting} style={{background: "#4D2D18"}}>
                {isSubmitting ? "Logging in..." : "Login"}
              </button>

            
              <p>
                Don't have account? <Link to="/register">Register</Link>
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
