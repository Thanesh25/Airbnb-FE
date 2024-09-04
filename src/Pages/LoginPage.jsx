import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../UserContext.jsx";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";

export default function LoginPage() {
  const { setUser } = useContext(UserContext);
  const [redirect, setRedirect] = useState(false);

  // Basic validation function
  const validate = (values) => {
    const errors = {};
    if (!values.email) {
      errors.email = "Email is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = "Invalid email address";
    }
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }
    return errors;
  };

  async function handleLoginSubmit(values, { setSubmitting }) {
    try {
      const { data } = await axios.post("/login", values);
      localStorage.setItem("token", data.token);
      setUser(data.userDoc);
      alert("Login successful");
      setRedirect(true);
    } catch (error) {
      alert("Login failed");
    } finally {
      setSubmitting(false);
    }
  }

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-4xl text-center mb-4">Login</h1>
        <Formik
          initialValues={{ email: "", password: "" }}
          validate={validate} // Use the validate function for basic validation
          onSubmit={handleLoginSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="max-w-md mx-auto">
              <div>
                <Field
                  type="email"
                  name="email"
                  placeholder="your@gmail.com"
                  className="input"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500"
                />
              </div>
              <div>
                <Field
                  type="password"
                  name="password"
                  placeholder="password"
                  className="input"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500"
                />
              </div>
              <button type="submit" className="primary" disabled={isSubmitting}>
                {isSubmitting ? "Logging in..." : "Login"}
              </button>
              <div className="text-center py-2 text-gray-500">
                Don't have an account yet?
                <Link className="underline text-black" to={"/register"}>
                  Register now
                </Link>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
