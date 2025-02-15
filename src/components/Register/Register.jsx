import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import * as yup from "yup";

export default function Register() {
  let [errMsg, setErrMsg] = useState(null);
  let [successMsg, setSuccessMsg] = useState(null);
  let [loadingButton, setLoadingButton] = useState(false);

  const validationSchema = yup.object().shape({
    name: yup
      .string()
      .required("Your Name is Required")
      .min(3, "Minimum Length is 3 Characters")
      .max(20, "Maximum Length is 20 Characters"),
    email: yup
      .string()
      .required("Your Email is Required")
      .email("Please enter a valid Email"),
    password: yup
      .string()
      .required("Your Password is Required")
      .matches(
        /^[A-z0-9_@%$!]{6,30}$/,
        "Password must consist of 6-30 characters"
      ),
    rePassword: yup
      .string()
      .required("Your must Re-Enter your Password")
      .oneOf([yup.ref("password")], "Passwords do not match"),
    phone: yup
      .string()
      .required("Your Phone Number is Required")
      .matches(/^01[1250][0-9]{8}$/, "Only Egyptian numbers are accepted"),
  });

  async function register(values) {
    setErrMsg(null);
    setSuccessMsg(null);
    setLoadingButton(true);
    try {
      const res = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signup",
        values
      );
      setSuccessMsg(res.data.message);
    } catch (err) {
      setErrMsg(err.response.data.message);
    } finally {
      setLoadingButton(false);
    }
  }

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    onSubmit: register,
    validationSchema,
  });

  return (
    <div className="bg-white py-10">
      <form
        onSubmit={formik.handleSubmit}
        className="max-w-sm mx-auto bg-gray-50 p-8 box-content rounded-3xl"
      >
        <p className="text-center text-2xl font-medium mb-5 border-b-2 border-blue-400 pb-2">
          Register your Account
        </p>
        <div className="mb-5">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-800"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="outline-green-400 transition-all shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-400 focus:border-green-400 block w-full p-2.5 "
            placeholder="..."
            required
          />

          {formik.errors.name && formik.touched.name ? (
            <div
              className="flex items-center p-4 my-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50"
              role="alert"
            >
              <svg
                className="shrink-0 inline w-4 h-4 me-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
              </svg>

              <span className="sr-only">Info</span>
              <div>
                <span className="font-medium">Name Alert!</span>{" "}
                {formik.errors.name}
              </div>
            </div>
          ) : null}
        </div>

        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-800"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="outline-green-400 transition-all shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-400 focus:border-green-400 block w-full p-2.5 "
            placeholder="..."
            required
          />

          {formik.errors.email && formik.touched.email ? (
            <div
              className="flex items-center p-4 my-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50"
              role="alert"
            >
              <svg
                className="shrink-0 inline w-4 h-4 me-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
              </svg>

              <span className="sr-only">Info</span>
              <div>
                <span className="font-medium">Name Alert!</span>{" "}
                {formik.errors.email}
              </div>
            </div>
          ) : null}
        </div>

        <div className="mb-5">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-800"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="outline-green-400 transition-all shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-400 focus:border-green-400 block w-full p-2.5 "
            placeholder="..."
            required
          />

          {formik.errors.password && formik.touched.password ? (
            <div
              className="flex items-center p-4 my-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50"
              role="alert"
            >
              <svg
                className="shrink-0 inline w-4 h-4 me-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
              </svg>

              <span className="sr-only">Info</span>
              <div>
                <span className="font-medium">Name Alert!</span>{" "}
                {formik.errors.password}
              </div>
            </div>
          ) : null}
        </div>

        <div className="mb-5">
          <label
            htmlFor="rePassword"
            className="block mb-2 text-sm font-medium text-gray-800"
          >
            Re-Enter your Password
          </label>
          <input
            type="password"
            id="rePassword"
            name="rePassword"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="outline-green-400 transition-all shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-400 focus:border-green-400 block w-full p-2.5 "
            placeholder="..."
            required
          />

          {formik.errors.rePassword && formik.touched.rePassword ? (
            <div
              className="flex items-center p-4 my-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50"
              role="alert"
            >
              <svg
                className="shrink-0 inline w-4 h-4 me-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
              </svg>

              <span className="sr-only">Info</span>
              <div>
                <span className="font-medium">Name Alert!</span>{" "}
                {formik.errors.rePassword}
              </div>
            </div>
          ) : null}
        </div>

        <div className="mb-5">
          <label
            htmlFor="phone"
            className="block mb-2 text-sm font-medium text-gray-800"
          >
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="outline-green-400 transition-all shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-400 focus:border-green-400 block w-full p-2.5 "
            placeholder="..."
            required
          />

          {formik.errors.phone && formik.touched.phone ? (
            <div
              className="flex items-center p-4 my-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50"
              role="alert"
            >
              <svg
                className="shrink-0 inline w-4 h-4 me-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
              </svg>

              <span className="sr-only">Info</span>
              <div>
                <span className="font-medium">Name Alert!</span>{" "}
                {formik.errors.phone}
              </div>
            </div>
          ) : null}
        </div>

        <div className="flex items-center gap-4">
          <button
            type="submit"
            className="text-white cursor-pointer bg-blue-400 hover:bg-blue-500 focus:ring-3 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            {loadingButton ? "Registering..." : "Register new account"}
          </button>

          {errMsg ? (
            <p className="text-sm font-bold text-red-400 capitalize">
              {errMsg}
            </p>
          ) : null}
          {successMsg ? (
            <p className="text-sm font-bold text-green-400 capitalize">
              {successMsg}
            </p>
          ) : null}
        </div>
      </form>
    </div>
  );
}
