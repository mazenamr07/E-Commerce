import axios from "axios";
import { jwtDecode } from "jwt-decode";
import React, { useContext, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

export default function OrderStatement() {
  const { id } = useParams();
  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);
  const userID = decoded.id;

  const [mainOrder, setMainOrder] = useState();
  const [orderCart, setOrderCart] = useState();

  async function getOrderDetails() {
    try {
      const res = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/orders/user/${userID}`
      );
      if (res.statusText == "OK") {
        const order = res.data.find((obj) => obj._id == id);
        setMainOrder(order);
        setOrderCart(order.cartItems);
      }
    } catch (err) {
      toast.error("Oops.. something went wrong!");
    }
  }

  const didRun = useRef(false);

  useEffect(() => {
    if (didRun.current) return;
    didRun.current = true;

    getOrderDetails();
  }, []);

  return (
    <>
      <div className="container mx-auto py-8">
        <h1 className="text-center text-5xl font-medium py-5 my-2 rounded-2xl bg-green-400 text-white drop-shadow-2xl border-4">
          Shopping Cart
        </h1>
        <div className="my-2 gap-4 flex justify-end items-center">
          <span className="text-center text-xl py-3 px-5 rounded-2xl bg-green-400 text-white drop-shadow-2xl border-4">
            Total Price : {mainOrder?.totalOrderPrice} EGP
          </span>
        </div>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
              <tr>
                <th scope="col" className="px-16 py-3">
                  <span className="sr-only">Image</span>
                </th>
                <th scope="col" className="px-6 py-3">
                  Product
                </th>
                <th scope="col" className="px-6 py-3">
                  Qty
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
              </tr>
            </thead>
            <tbody>
              {orderCart?.map((item) => (
                <tr
                  key={item.product.id}
                  className="bg-white border-b  border-gray-200 hover:bg-gray-50"
                >
                  <td className="p-4">
                    <img
                      src={item.product.imageCover}
                      className="w-16 md:w-32 max-w-full max-h-full"
                      alt="product image"
                    />
                  </td>

                  <td className="px-6 py-4 font-semibold text-gray-900 ">
                    {item.product.title}
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div>
                        <span
                          id="first_product"
                          className="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1"
                        >
                          {item.count}
                        </span>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4 font-semibold text-gray-900">
                    {item.price} EGP
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
