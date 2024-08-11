import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { login } from "../utils/api";
import { loginSuccess } from "../utils/authSlice";
import { useNavigate, Link } from "react-router-dom";
import FormWrapper from "../components/FormWrapper";

const SignIn: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        const data = await login(values.email, values.password);
        dispatch(loginSuccess({ token: data.token, userId: data.id }));
        navigate("/dashboard");
      } catch (error: any) {
        setErrors({ password: error.response.data.error });
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <FormWrapper title="Sign In" onSubmit={formik.handleSubmit}>
      <div className="mb-4">
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <input
          id="email"
          type="email"
          {...formik.getFieldProps("email")}
          className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none"
        />
        {formik.touched.email && formik.errors.email ? (
          <div className="text-red-600 text-sm">{formik.errors.email}</div>
        ) : null}
      </div>
      <div className="mb-4">
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          Password
        </label>
        <input
          id="password"
          type="password"
          {...formik.getFieldProps("password")}
          className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none"
        />
        {formik.touched.password && formik.errors.password ? (
          <div className="text-red-600 text-sm">{formik.errors.password}</div>
        ) : null}
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded-md"
        disabled={formik.isSubmitting}
      >
        {formik.isSubmitting ? "Signing In..." : "Sign In"}
      </button>
      <div className="mt-4 text-center">
        <span className="text-sm">Don't have an account?</span>
        <Link to="/signup" className="text-blue-600 ml-2">
          Sign Up
        </Link>
      </div>
    </FormWrapper>
  );
};

export default SignIn;
