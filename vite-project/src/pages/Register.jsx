// src/pages/Register.jsx
import React from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const passwordRules = /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;

const RegisterSchema = Yup.object().shape({
  username: Yup.string().min(2, "Too short").required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .matches(passwordRules, "Password must be 8+ chars, include at least one uppercase and a special character")
    .required("Required"),
  confirmPassword: Yup.string()
    .test('passwords-match', 'passwords do not match', function (value) {
      return this.parent.password === value;
    })
    .required("Required"),
});

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Register</h2>
        <Formik
          initialValues={{ username: "", email: "", password: "", confirmPassword: "" }}
          validationSchema={RegisterSchema}
          onSubmit={(values, { setSubmitting, setStatus }) => {
            setStatus(null);
            register(values.email, values.password, values.username)
              .then(() => navigate("/home", { replace: true }))
              .catch((err) => setStatus(err.message || "Registration failed"))
              .finally(() => setSubmitting(false));
          }}
        >
          {({ isSubmitting, status, errors, touched }) => (
            <Form className="form">
              <label>Username</label>
              <Field
                name="username"
                type="text"
                className={`input ${errors.username && touched.username ? "error" : ""}`}
              />
              <ErrorMessage name="username" component="div" className="field-error" />

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


              <label>Confirm Password</label>
              <Field
                name="confirmPassword"
                type="password"
                className={`input ${errors.confirmPassword && touched.confirmPassword ? "error" : ""}`}

              />
              <ErrorMessage name="confirmPassword" component="div" className="field-error" />




              {status && <div className="field-error">{status}</div>}

              <button type="submit" className="btn" disabled={isSubmitting} style={{background: "#4D2D18"}}>
                {isSubmitting ? "Registering..." : "Register"}
              </button>

              <p>
                Already have account? <Link to="/login">Login</Link>
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
