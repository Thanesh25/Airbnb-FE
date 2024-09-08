import axios from "axios";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

export default function RegisterPage() {
  // Validation schema using Yup
  const validationSchema = Yup.object({
    name: Yup.string()
      .min(2, "Name must be at least 2 characters")
      .required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const registerUser = async (values, { setSubmitting, resetForm }) => {
    try {
      await axios.post("/register", {
        name: values.name,
        email: values.email,
        password: values.password,
      });
      alert("Registered successfully! Now you can log in.");
      resetForm();
    } catch (error) {
      alert("Registration failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-4xl text-center mb-4">Register</h1>
        <Formik
          initialValues={{ name: "", email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={registerUser}
        >
          {({ isSubmitting }) => (
            <Form className="max-w-md mx-auto">
              <div>
                <Field name="name" type="text" placeholder="Name" />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500"
                />
              </div>
              <div>
                <Field name="email" type="email" placeholder="your@gmail.com" />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500"
                />
              </div>
              <div>
                <Field name="password" type="password" placeholder="Password" />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500"
                />
              </div>
              <button className="primary" type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Registering..." : "Register"}
              </button>
              <div className="text-center py-2 text-gray-500">
                Already a Member?{" "}
                <Link className="underline text-black" to={"/login"}>
                  Login
                </Link>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
