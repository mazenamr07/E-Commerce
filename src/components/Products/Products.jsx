import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import ProductCard from "../ProductCard/ProductCard";
import { GridLoader } from "react-spinners";
import { useQuery } from "@tanstack/react-query";
import { CartContext } from "../../context/CartContext";

export default function Home() {
  const { addToCart } = useContext(CartContext);
const [search, setSearch] = useState("");

  function updateSearch(event) {
    const newSearch = event.target.value;
    setSearch(newSearch);
  }
  
  async function getAllProducts() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/products");
  }
  async function getAllCategories() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  }

  const { data, isLoading } = useQuery({
    queryKey: ["allProducts"],
    queryFn: getAllProducts,
    refetchOnWindowFocus: false,
  });
  const allProductsData = data?.data.data;
  const filteredProductsData = allProductsData?.filter((prod) =>
    prod.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      {isLoading ? (
        <div className="w-full bg-green-400 text-white font-medium capitalize text-2xl h-screen flex justify-center items-center">
          <GridLoader color="white" />
        </div>
      ) : (
        <div className="container mx-auto p-4">
          <div className="flex items-center justify-center">
            <form className="max-w-md mx-auto">
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-500"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
                <input
                  type="search"
                  id="default-search"
                  className="block w-full py-3 px-10 ps-10 text-sm text-gray-900 border outline-green-400 transition-all border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
                  placeholder="Search Products..."
                  value={search}
                  onChange={updateSearch}
                  required
                />
              </div>
            </form>
          </div>
          <div className="grid gap-4 grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
            {filteredProductsData.map((prod) => (
              <ProductCard product={prod} key={prod._id} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
