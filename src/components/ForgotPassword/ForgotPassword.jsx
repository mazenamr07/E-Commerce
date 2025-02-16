import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import * as yup from "yup";
import { useFormik } from "formik";
import axios from "axios";

export default function ForgotPassword() {
  const navigate = useNavigate();

  let [loadingButton, setLoadingButton] = useState(false);
  let [errMsg, setErrMsg] = useState(null);
  let [successMsg, setSuccessMsg] = useState(null);

  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .required("Your Email is Required")
      .email("Please enter a valid Email"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: forgot,
    validationSchema,
  });

  async function forgot(values) {
    setErrMsg(null);
    setSuccessMsg(null);
    setLoadingButton(true);
    try {
      const res = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
        values
      );
      setSuccessMsg(res.data.message);
      console.log(res);

      // setTimeout(() => {
      //   navigate("/");
      // }, 500);
    } catch (err) {
      console.log(err, "Error");
      setErrMsg(err.response.data.message);
    } finally {
      setLoadingButton(false);
    }
  }

  return (
    <div className="bg-white py-10 min-h-[59.5vh]">
      <form
        onSubmit={formik.handleSubmit}
        className="max-w-sm mx-auto bg-gray-50 p-8 box-content rounded-3xl"
      >
        <p className="text-center text-2xl font-medium mb-5 border-b-2 border-blue-400 pb-2">
          Reset Password
        </p>

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

        <div className="flex items-center gap-4">
          <button
            type="submit"
            className="text-white transition-all cursor-pointer bg-blue-400 hover:bg-blue-500 focus:ring-3 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            {loadingButton ? "Sending..." : "Send Code"}
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
