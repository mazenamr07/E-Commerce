import React, { useContext, useEffect, useState } from "react";
import Logo from "./../../assets/images/freshcart-logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { CartContext } from "../../context/CartContext";
import { WishlistContext } from "../../context/WishlistContext";

export default function Navbar() {
  const { token, setToken } = useContext(AuthContext);
  const { numOfCartItems, addToCart, getCartItems } = useContext(CartContext);
  const { numOfWishlistItems, addToWishlist, getWishlistItems } =
    useContext(WishlistContext);
  const navigate = useNavigate();

  useEffect(() => {
    getCartItems();
    getWishlistItems();
  }, []);

  let [loggingOut, setLoggingOut] = useState(false);
  return (
    <nav className="bg-gray-50 w-full z-20 top-0 start-0">
      <div className="container flex flex-wrap items-center justify-start mx-auto p-4">
        <Link to="" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src={Logo} className="h-8" alt="FreshCart Logo" />
        </Link>

        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse ms-auto">
          <ul className="md:gap-3 me-3 hidden md:flex">
            <li>
              <a
                href="https://instagram.com"
                className="block py-2 capitalize px-3 mt-2 md:mt-0 text-black rounded-sm hover:bg-green-400 hover:text-white md:hover:bg-transparent md:hover:text-green-400 md:p-2 md:px-0 transition-all"
              >
                <i className="fa-brands fa-instagram"></i>
              </a>
            </li>

            <li>
              <a
                href="https://facebook.com"
                className="block py-2 capitalize px-3 mt-2 md:mt-0 text-black rounded-sm hover:bg-green-400 hover:text-white md:hover:bg-transparent md:hover:text-green-400 md:p-2 md:px-0 transition-all"
              >
                <i className="fa-brands fa-facebook"></i>
              </a>
            </li>

            <li>
              <a
                href="https://tiktok.com"
                className="block py-2 capitalize px-3 mt-2 md:mt-0 text-black rounded-sm hover:bg-green-400 hover:text-white md:hover:bg-transparent md:hover:text-green-400 md:p-2 md:px-0 transition-all"
              >
                <i className="fa-brands fa-tiktok"></i>
              </a>
            </li>

            <li>
              <a
                href="https://twitter.com"
                className="block py-2 capitalize px-3 mt-2 md:mt-0 text-black rounded-sm hover:bg-green-400 hover:text-white md:hover:bg-transparent md:hover:text-green-400 md:p-2 md:px-0 transition-all"
              >
                <i className="fa-brands fa-twitter"></i>
              </a>
            </li>

            <li>
              <a
                href="https://linkedin.com"
                className="block py-2 capitalize px-3 mt-2 md:mt-0 text-black rounded-sm hover:bg-green-400 hover:text-white md:hover:bg-transparent md:hover:text-green-400 md:p-2 md:px-0 transition-all"
              >
                <i className="fa-brands fa-linkedin"></i>
              </a>
            </li>

            <li>
              <a
                href="https://youtube.com"
                className="block py-2 capitalize px-3 mt-2 md:mt-0 text-black rounded-sm hover:bg-green-400 hover:text-white md:hover:bg-transparent md:hover:text-green-400 md:p-2 md:px-0 transition-all"
              >
                <i className="fa-brands fa-youtube"></i>
              </a>
            </li>
          </ul>
          {token ? (
            <button
              onClick={() => {
                setLoggingOut(true);

                setTimeout(() => {
                  setToken(null);
                  localStorage.removeItem("token");
                  setLoggingOut(false);
                  navigate("/login");
                }, 500);
              }}
              className="flex cursor-pointer items-center text-white capitalize md:ms-2 bg-green-400 hover:bg-green-500 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2 text-center transition-all"
            >
              {loggingOut ? "logging out..." : "log out"}
            </button>
          ) : null}

          {!token ? (
            <Link
              to="login"
              className="flex items-center text-white capitalize md:ms-2 bg-green-400 hover:bg-green-500 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2 text-center transition-all"
            >
              log in
            </Link>
          ) : null}

          {!token ? (
            <Link
              to="register"
              className="flex items-center text-white capitalize md:ms-2 bg-blue-400 hover:bg-blue-500 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2 text-center transition-all"
            >
              sign up
            </Link>
          ) : null}

          <button
            data-collapse-toggle="navbar-sticky"
            type="button"
            className={
              token
                ? "inline-flex items-center p-2 w-10 h-10 md:ms-3 justify-center text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
                : "inline-flex items-center p-2 w-10 h-10 md:ms-3 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
            }
            aria-controls="navbar-sticky"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>

        {token ? (
          <div
            className="items-center justify-between hidden w-full lg:flex lg:w-auto lg:order-1 order-3 ms-5 transition-all"
            id="navbar-sticky"
          >
            <ul className="flex flex-col p-4 lg:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-300 lg:space-x-5 rtl:space-x-reverse lg:flex-row lg:mt-0 lg:border-0 lg:bg-gray-50">
              <li>
                <Link
                  to=""
                  className="block py-2 px-3 text-white bg-green-400 rounded-sm lg:bg-green-400 lg:text-white lg:p-2"
                  aria-current="page"
                >
                  Home
                </Link>
              </li>

              <li className="relative">
                <Link
                  to="cart"
                  className="block py-2 capitalize px-3 mt-2 lg:mt-0 text-black rounded-sm hover:bg-green-400 hover:text-white lg:hover:bg-transparent lg:hover:text-green-400 lg:p-2 lg:px-0 transition-all"
                >
                  cart
                </Link>
                <Link to="cart">
                  <div className="w-5 h-5 top-[-10%] end-[-35%] bg-blue-400 rounded-full text-xs absolute flex items-center justify-center text-white">
                    {numOfCartItems}
                  </div>
                </Link>
              </li>

              <li className="relative">
                <Link
                  to="wishlist"
                  className="block py-2 capitalize px-3 mt-2 lg:mt-0 text-black rounded-sm hover:bg-green-400 hover:text-white lg:hover:bg-transparent lg:hover:text-green-400 lg:p-2 lg:px-0 transition-all"
                >
                  wishlist
                </Link>
                <Link to="wishlist">
                  <div className="w-5 h-5 top-[-10%] end-[-25%] bg-red-400 rounded-full text-xs absolute flex items-center justify-center text-white">
                    {numOfWishlistItems}
                  </div>
                </Link>
              </li>

              <li>
                <Link
                  to="products"
                  className="block py-2 capitalize px-3 mt-2 lg:mt-0 text-black rounded-sm hover:bg-green-400 hover:text-white lg:hover:bg-transparent lg:hover:text-green-400 lg:p-2 lg:px-0 transition-all"
                >
                  products
                </Link>
              </li>

              <li>
                <Link
                  to="categories"
                  className="block py-2 capitalize px-3 mt-2 lg:mt-0 text-black rounded-sm hover:bg-green-400 hover:text-white lg:hover:bg-transparent lg:hover:text-green-400 lg:p-2 lg:px-0 transition-all"
                >
                  categories
                </Link>
              </li>

              <li>
                <Link
                  to="brands"
                  className="block py-2 capitalize px-3 mt-2 lg:mt-0 text-black rounded-sm hover:bg-green-400 hover:text-white lg:hover:bg-transparent lg:hover:text-green-400 lg:p-2 lg:px-0 transition-all"
                >
                  brands
                </Link>
              </li>

              <li className="ms-auto">
                <ul className="flex md:gap-3 md:hidden">
                  <li>
                    <a
                      href="https://instagram.com"
                      className="block py-2 capitalize px-3 mt-2 md:mt-0 text-black rounded-sm hover:bg-green-400 hover:text-white md:hover:bg-transparent md:hover:text-green-400 md:p-2 md:px-0 transition-all"
                    >
                      <i className="fa-brands fa-instagram"></i>
                    </a>
                  </li>

                  <li>
                    <a
                      href="https://facebook.com"
                      className="block py-2 capitalize px-3 mt-2 md:mt-0 text-black rounded-sm hover:bg-green-400 hover:text-white md:hover:bg-transparent md:hover:text-green-400 md:p-2 md:px-0 transition-all"
                    >
                      <i className="fa-brands fa-facebook"></i>
                    </a>
                  </li>

                  <li>
                    <a
                      href="https://tiktok.com"
                      className="block py-2 capitalize px-3 mt-2 md:mt-0 text-black rounded-sm hover:bg-green-400 hover:text-white md:hover:bg-transparent md:hover:text-green-400 md:p-2 md:px-0 transition-all"
                    >
                      <i className="fa-brands fa-tiktok"></i>
                    </a>
                  </li>

                  <li>
                    <a
                      href="https://twitter.com"
                      className="block py-2 capitalize px-3 mt-2 md:mt-0 text-black rounded-sm hover:bg-green-400 hover:text-white md:hover:bg-transparent md:hover:text-green-400 md:p-2 md:px-0 transition-all"
                    >
                      <i className="fa-brands fa-twitter"></i>
                    </a>
                  </li>

                  <li>
                    <a
                      href="https://linkedin.com"
                      className="block py-2 capitalize px-3 mt-2 md:mt-0 text-black rounded-sm hover:bg-green-400 hover:text-white md:hover:bg-transparent md:hover:text-green-400 md:p-2 md:px-0 transition-all"
                    >
                      <i className="fa-brands fa-linkedin"></i>
                    </a>
                  </li>

                  <li>
                    <a
                      href="https://youtube.com"
                      className="block py-2 capitalize px-3 mt-2 md:mt-0 text-black rounded-sm hover:bg-green-400 hover:text-white md:hover:bg-transparent md:hover:text-green-400 md:p-2 md:px-0 transition-all"
                    >
                      <i className="fa-brands fa-youtube"></i>
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        ) : null}

        {!token ? (
          <div
            className="items-center luv justify-between hidden w-full md:flex md:w-auto md:order-1 ms-5"
            id="navbar-sticky"
          >
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-300 md:space-x-5 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-gray-50">
              <li className="ms-auto">
                <ul className="flex md:gap-3 md:hidden">
                  <li>
                    <a
                      href="https://instagram.com"
                      className="block py-2 capitalize px-3 mt-2 md:mt-0 text-black rounded-sm hover:bg-green-400 hover:text-white md:hover:bg-transparent md:hover:text-green-400 md:p-2 md:px-0 transition-all"
                    >
                      <i className="fa-brands fa-instagram"></i>
                    </a>
                  </li>

                  <li>
                    <a
                      href="https://facebook.com"
                      className="block py-2 capitalize px-3 mt-2 md:mt-0 text-black rounded-sm hover:bg-green-400 hover:text-white md:hover:bg-transparent md:hover:text-green-400 md:p-2 md:px-0 transition-all"
                    >
                      <i className="fa-brands fa-facebook"></i>
                    </a>
                  </li>

                  <li>
                    <a
                      href="https://tiktok.com"
                      className="block py-2 capitalize px-3 mt-2 md:mt-0 text-black rounded-sm hover:bg-green-400 hover:text-white md:hover:bg-transparent md:hover:text-green-400 md:p-2 md:px-0 transition-all"
                    >
                      <i className="fa-brands fa-tiktok"></i>
                    </a>
                  </li>

                  <li>
                    <a
                      href="https://twitter.com"
                      className="block py-2 capitalize px-3 mt-2 md:mt-0 text-black rounded-sm hover:bg-green-400 hover:text-white md:hover:bg-transparent md:hover:text-green-400 md:p-2 md:px-0 transition-all"
                    >
                      <i className="fa-brands fa-twitter"></i>
                    </a>
                  </li>

                  <li>
                    <a
                      href="https://linkedin.com"
                      className="block py-2 capitalize px-3 mt-2 md:mt-0 text-black rounded-sm hover:bg-green-400 hover:text-white md:hover:bg-transparent md:hover:text-green-400 md:p-2 md:px-0 transition-all"
                    >
                      <i className="fa-brands fa-linkedin"></i>
                    </a>
                  </li>

                  <li>
                    <a
                      href="https://youtube.com"
                      className="block py-2 capitalize px-3 mt-2 md:mt-0 text-black rounded-sm hover:bg-green-400 hover:text-white md:hover:bg-transparent md:hover:text-green-400 md:p-2 md:px-0 transition-all"
                    >
                      <i className="fa-brands fa-youtube"></i>
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        ) : null}
      </div>
    </nav>
  );
}
