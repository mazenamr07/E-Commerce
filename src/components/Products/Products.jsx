import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import ProductCard from "../ProductCard/ProductCard";
import { GridLoader } from "react-spinners";
import { useQuery } from "@tanstack/react-query";
import { CartContext } from "../../context/CartContext";

export default function Home() {
  const { addToCart } = useContext(CartContext);

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

  const { data: allCat, isLoading: catLoading } = useQuery({
    queryKey: ["allCategories"],
    queryFn: getAllCategories,
    refetchOnWindowFocus: false,
  });
  const allCategoriesData = allCat?.data.data;

  return (
    <>
      {isLoading ? (
        <div className="w-full bg-green-400 text-white font-medium capitalize text-2xl h-screen flex justify-center items-center">
          <GridLoader color="white" />
        </div>
      ) : (
        <div className="container mx-auto p-4">
          <div className="grid gap-4 grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
            {allProductsData.map((prod) => (
              <ProductCard product={prod} key={prod._id} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
