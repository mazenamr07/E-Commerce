import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import { WishlistContext } from "../../context/WishlistContext";

export default function ProductCard(props) {
  const { addToCart } = useContext(CartContext);
  const { addToWishlist } = useContext(WishlistContext);

  const {
    title,
    imageCover,
    price,
    _id,
    description,
    ratingsAverage,
    category,
  } = props.product;

  return (
    <>
      <div className=" bg-white pb-10 my-5 relative rounded-lg drop-shadow-lg hover:drop-shadow-2xl hover: transition-all border-gray-200">
        <Link to={`/details/${_id}`}>
          <div>
            <img
              className="rounded-t-lg my-2"
              src={imageCover}
              alt="product image"
            />
          </div>
        </Link>

        <div className="px-3 pb-5">
          <span className="text-green-400 text-sm font-medium">
            {category.name}
          </span>

          <Link to={`details/${_id}`}>
            <div>
              <h5 className="font-semibold text-gray-700 ">{title}</h5>
            </div>
          </Link>

          <div className="flex justify-between items-center pt-2">
            <span className="text-gray-400">{price} EGP</span>

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

              <span className="text-gray-400 mx-1">{ratingsAverage}</span>
            </div>
          </div>
        </div>
        <div className="absolute bottom-2 flex justify-between items-center w-full pe-3">
          <button
            onClick={() => {
              addToCart(_id);
            }}
            className="flex cursor-pointer items-center text-white capitalize md:ms-2 bg-green-400 hover:bg-green-500 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2 text-center transition-all"
          >
            Add to Cart
          </button>

          <i
            onClick={() => {
              addToWishlist(_id);
            }}
            className="fa-solid fa-heart text-3xl cursor-pointer hover:text-red-500 transition-all"
          ></i>
        </div>
      </div>
    </>
  );
}
