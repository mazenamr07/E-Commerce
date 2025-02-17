import axios from "axios";
import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import { CartContext } from "../../context/CartContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Order() {
  const [paymentMethod, setPaymentMethod] = useState();
  const { cartID, getCartItems } = useContext(CartContext);
  const navigate = useNavigate();

  function submit(values) {
    if (paymentMethod == "cash") {
      payCash(values);
    } else if (paymentMethod == "visa") {
      payVisa(values);
    }
  }

  async function payCash(values) {
    try {
      const res = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/${cartID}`,
        values,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      if (res.data.status == "success") {
        toast.success("Your order was completed successfully!");
        navigate("/cart");
      }
    } catch (err) {
      if (cartID == undefined) {
        toast.error("Oops.. your cart is empty!");
      } else {
        toast.error("Oops.. something went wrong!");
      }
    }
  }
  async function payVisa(values) {
    try {
      const res = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartID}?url=${window.location.origin}`,
        values,
        {
          headers: { token: localStorage.getItem("token") },
        }
      );
      window.open(res.data.session.url, "_blank");
      console.log(res);
      
    } catch (err) {
      if (cartID == undefined) {
        toast.error("Oops.. your cart is empty!");
      } else {
        toast.error("Oops.. something went wrong!");
      }
    }
  }

  const formik = useFormik({
    initialValues: {
      shippingAddress: {
        details: "",
        phone: "",
        city: "",
      },
    },
    onSubmit: submit,
  });

  return (
    <div className=" bg-white py-10 min-h-[59.5vh]">
      <form
        onSubmit={formik.handleSubmit}
        className="max-w-sm mx-auto bg-gray-50 p-8 box-content rounded-3xl"
      >
        <p className="text-center text-2xl font-medium mb-5 border-b-2 border-blue-400 pb-2">
          Confirm your Payment
        </p>
        <div className="mb-5">
          <label
            htmlFor="details"
            className="block mb-2 text-sm font-medium text-gray-800"
          >
            Details
          </label>
          <input
            type="text"
            id="details"
            name="details"
            onChange={(e) => {
              formik.setFieldValue("shippingAddress.details", e.target.value);
            }}
            className="outline-green-400 transition-all shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-400 focus:border-green-400 block w-full p-2.5 "
            placeholder="..."
            required
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="phone"
            className="block mb-2 text-sm font-medium text-gray-800"
          >
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            onChange={(e) => {
              formik.setFieldValue("shippingAddress.phone", e.target.value);
            }}
            className="outline-green-400 transition-all shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-400 focus:border-green-400 block w-full p-2.5 "
            placeholder="..."
            required
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="city"
            className="block mb-2 text-sm font-medium text-gray-800"
          >
            City
          </label>
          <input
            type="text"
            id="city"
            name="city"
            onChange={(e) => {
              formik.setFieldValue("shippingAddress.city", e.target.value);
            }}
            className="outline-green-400 transition-all shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-400 focus:border-green-400 block w-full p-2.5 "
            placeholder="..."
            required
          />
        </div>

        <div className="flex items-center gap-4">
          <button
            type="submit"
            onClick={() => {
              setPaymentMethod("cash");
            }}
            className="text-white transition-all cursor-pointer bg-blue-400 hover:bg-blue-500 focus:ring-3 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Pay Cash
          </button>

          <button
            type="submit"
            onClick={() => {
              setPaymentMethod("visa");
            }}
            className="text-white transition-all cursor-pointer bg-blue-400 hover:bg-blue-500 focus:ring-3 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Pay Visa
          </button>
        </div>
      </form>
    </div>
  );
}
