import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import axios from "axios";

export default function ResetPassword() {
  const navigate = useNavigate();

  let [loadingButton, setLoadingButton] = useState(false);
  let [errMsg, setErrMsg] = useState(null);
  let [successMsg, setSuccessMsg] = useState(null);

  const validationSchema = yup.object().shape({
    newPassword: yup
      .string()
      .required("Your Password is Required")
      .matches(
        /^[A-z0-9_@%$!]{6,30}$/,
        "Password must consist of 6-30 characters"
      ),
  });

  const formik = useFormik({
    initialValues: {
      email: localStorage.getItem("resetPasswordEmail"),
      newPassword: "",
    },
    onSubmit: resetPassword,
    validationSchema,
  });

  async function resetPassword(values) {
    setErrMsg(null);
    setSuccessMsg(null);
    setLoadingButton(true);
    try {
      const res = await axios.put(
        "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
        values
      );

      if (res.statusText == "OK") {
        setSuccessMsg("Success");
        localStorage.removeItem("resetPasswordEmail");
      }

      setTimeout(() => {
        navigate("/login");
      }, 500);
    } catch (err) {
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
          Create a New Password
        </p>

        <div className="mb-5">
          <label
            htmlFor="newPassword"
            className="block mb-2 text-sm font-medium text-gray-800"
          >
            New Password
          </label>
          <input
            type="password"
            id="newPassword"
            name="newPassword"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="outline-green-400 transition-all shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-400 focus:border-green-400 block w-full p-2.5 "
            placeholder="..."
            required
          />

          {formik.errors.newPassword && formik.touched.newPassword ? (
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
                {formik.errors.newPassword}
              </div>
            </div>
          ) : null}
        </div>

        <div className="flex items-center gap-4">
          <button
            type="submit"
            className="text-white transition-all cursor-pointer bg-blue-400 hover:bg-blue-500 focus:ring-3 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            {loadingButton ? "Submitting..." : "Submit"}
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
