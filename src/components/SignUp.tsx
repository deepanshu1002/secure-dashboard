import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate, Link } from "react-router-dom";
import { signUp } from "../utils/api";
import FormWrapper from "../components/FormWrapper";
import { log } from "console";

const SignUp: React.FC = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Password is required"),
    }),
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        await signUp(values.email, values.password);
        navigate("/");
      } catch (err: any) {
        setErrors({ email: err.response.data.error });
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <FormWrapper title="Sign Up" onSubmit={formik.handleSubmit}>
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
      <div className="mb-4">
        <label
          htmlFor="confirmPassword"
          className="block text-sm font-medium text-gray-700"
        >
          Confirm Password
        </label>
        <input
          id="confirmPassword"
          type="password"
          {...formik.getFieldProps("confirmPassword")}
          className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none"
        />
        {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
          <div className="text-red-600 text-sm">
            {formik.errors.confirmPassword}
          </div>
        ) : null}
      </div>
      <button
        type="submit"
        className="w-full bg-green-500 text-white py-2 rounded-md"
        disabled={formik.isSubmitting}
      >
        {formik.isSubmitting ? "Signing Up..." : "Sign Up"}
      </button>
      <div className="mt-4 text-center">
        <span className="text-sm">Already have an account?</span>
        <Link to="/" className="text-blue-600 ml-2">
          Sign In
        </Link>
      </div>
    </FormWrapper>
  );
};

export default SignUp;
