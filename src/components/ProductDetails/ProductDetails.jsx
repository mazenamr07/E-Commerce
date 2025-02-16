import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import { WishlistContext } from "../../context/WishlistContext";

export default function ProductDetails() {
  const { id } = useParams();
  let [details, setDetails] = useState();
  const { addToCart } = useContext(CartContext);
  const { addToWishlist } = useContext(WishlistContext);

  async function getDetails() {
    const { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products/${id}`
    );
    setDetails(data.data);
  }
  useEffect(() => {
    getDetails();
  }, []);

  return (
    <>
      <div className="container mx-auto p-6">
        <div className="grid grid-cols-6 gap-5">
          <div className="col-span-6 md:col-span-2">
            <div className="img max-w-60 mx-auto">
              <img src={details?.imageCover} alt="" />
            </div>
          </div>

          <div className="col-span-6 md:col-span-4 h-full flex flex-col justify-center">
            <p className="text-gray-900 text-sm">{details?.title}</p>
            <p className="text-gray-400 text-sm ps-2 py-3">
              {details?.description}
            </p>

            <span className="text-green-400 text-sm font-medium">
              {details?.category.name}
            </span>

            <div>
              <div className="flex justify-between items-center pt-2">
                <span className="text-gray-400">{details?.price} EGP</span>

                <div className="flex items-center">
                  <svg
                    className="w-4 h-4 text-yellow-300"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 20"
                  >
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                  </svg>

                  <span className="text-gray-400 mx-1">
                    {details?.ratingsAverage}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-5 my-2">
              <button
                onClick={() => {
                  addToCart(id);
                }}
                className="flex cursor-pointer w-full my-2 items-center text-white capitalize bg-green-400 hover:bg-green-500 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2 text-center transition-all"
              >
                Add to Cart
              </button>

              <i
                onClick={() => {
                  addToWishlist(id);
                }}
                className="fa-solid fa-heart text-3xl cursor-pointer hover:text-red-500 transition-all"
              ></i>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
