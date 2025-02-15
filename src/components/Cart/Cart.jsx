import React, { useContext, useEffect, useRef } from "react";
import { CartContext } from "../../context/CartContext";
import { Link } from "react-router-dom";

export default function Cart() {
  const {
    getCartItems,
    cartItems,
    deleteCartItem,
    clearCart,
    updateItemCount,
    totalPrice,
  } = useContext(CartContext);
  const didRun = useRef(false);

  useEffect(() => {
    if (didRun.current) return;
    didRun.current = true;

    getCartItems();
  }, []);

  return (
    <>
      <div className="container mx-auto py-8">
        <h1 className="text-center text-5xl font-medium py-5 my-2 rounded-2xl bg-green-400 text-white drop-shadow-2xl border-4">
          Shopping Cart
        </h1>
        <div className="my-2 gap-4 flex justify-end items-center">
          <Link to={`/order`}>
            <button className="flex cursor-pointer py-3 items-center text-white capitalize md:ms-2 bg-blue-400 hover:bg-blue-500 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-4 text-center transition-all">
              Buy Now
            </button>
          </Link>

          <button
            onClick={() => {
              clearCart();
            }}
            className="flex cursor-pointer items-center py-3 text-white capitalize md:ms-2 bg-red-400 hover:bg-red-500 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-4 text-center transition-all"
          >
            Clear Cart
          </button>

          <span className="text-center text-xl py-3 px-5 rounded-2xl bg-green-400 text-white drop-shadow-2xl border-4">
            Total Price : {totalPrice}
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
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {cartItems?.map((item) => (
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
                      <button
                        disabled={item.count == 1}
                        onClick={() => {
                          updateItemCount(item.product.id, item.count - 1);
                        }}
                        className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-3 focus:ring-gray-200"
                        type="button"
                      >
                        <span className="sr-only">Quantity button</span>
                        <svg
                          className="w-3 h-3"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 18 2"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M1 1h16"
                          />
                        </svg>
                      </button>
                      <div>
                        <span
                          id="first_product"
                          className="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1"
                        >
                          {item.count}
                        </span>
                      </div>
                      <button
                        onClick={() => {
                          updateItemCount(item.product.id, item.count + 1);
                        }}
                        className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-3 focus:ring-gray-200"
                        type="button"
                      >
                        <span className="sr-only">Quantity button</span>
                        <svg
                          className="w-3 h-3"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 18 18"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 1v16M1 9h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900">
                    {item.price} EGP
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => {
                        deleteCartItem(item.product.id);
                      }}
                      className="font-medium cursor-pointer text-red-600  hover:underline"
                    >
                      Remove
                    </button>
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
