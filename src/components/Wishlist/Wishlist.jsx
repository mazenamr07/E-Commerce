import React, { useContext, useEffect, useRef } from "react";
import { WishlistContext } from "../../context/WishlistContext";
import { CartContext } from "../../context/CartContext";

export default function Wishlist() {
  const {
    getWishlistItems,
    wishlistItems,
    deleteWishlistItem,
    updateItemCount,
    totalPrice,
    clearWishlist,
  } = useContext(WishlistContext);
  const { addToCart } = useContext(CartContext);

  const didRun = useRef(false);

  useEffect(() => {
    if (didRun.current) return;
    didRun.current = true;

    getWishlistItems();
  }, []);

  return (
    <>
      <div className="container mx-auto py-8">
        <h1 className="text-center text-5xl font-medium py-5 my-2 rounded-2xl bg-red-400 text-white drop-shadow-2xl border-4">
          Your Wishlist
        </h1>

        <div className="my-2 gap-4 flex justify-end items-center">
          <button
            onClick={() => {
              clearWishlist();
            }}
            className="flex cursor-pointer items-center py-3 text-white capitalize md:ms-2 bg-red-400 hover:bg-red-500 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-4 text-center transition-all"
          >
            Clear Wishlist
          </button>
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
                  Price
                </th>

                <th scope="col" colSpan={2} className="px-6 py-3 text-center">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {wishlistItems?.map((item) => (
                <tr
                  key={item.id}
                  className="bg-white border-b  border-gray-200 hover:bg-gray-50"
                >
                  <td className="p-4">
                    <img
                      src={item.imageCover}
                      className="w-16 md:w-32 max-w-full max-h-full"
                      alt="product image"
                    />
                  </td>

                  <td className="px-6 py-4 font-semibold text-gray-900 ">
                    {item.title}
                  </td>

                  <td className="px-6 py-4 font-semibold text-gray-900">
                    {item.price} EGP
                  </td>

                  <td className="px-6 py-4">
                    <button
                      onClick={() => {
                        addToCart(item.id);
                      }}
                      className="font-medium cursor-pointer text-green-500  hover:underline"
                    >
                      Add to Cart
                    </button>
                  </td>

                  <td className="px-6 py-4">
                    <button
                      onClick={() => {
                        deleteWishlistItem(item.id, true);
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
