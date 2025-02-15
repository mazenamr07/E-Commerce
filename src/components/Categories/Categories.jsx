import React from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Category from "../Category/Category";
import { GridLoader } from "react-spinners";

export default function Categories() {
  async function getAllCategories() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  }
  async function getAllSubCategories() {
    return axios.get(
      "https://ecommerce.routemisr.com/api/v1/categories/6439d30b67d9aa4ca97064b1/subcategories"
    );
  }

  const { data: allCat, isLoading: catLoading } = useQuery({
    queryKey: ["allCategories"],
    queryFn: getAllCategories,
    refetchOnWindowFocus: false,
  });
  const allCategoriesData = allCat?.data.data;

  const { data: subCat, isLoading: subLoading } = useQuery({
    queryKey: ["subCategories"],
    queryFn: getAllSubCategories,
    refetchOnWindowFocus: false,
  });
  const subCategoriesData = subCat?.data.data;

  return (
    <>
      <div className="py-5">
        {catLoading ? (
          <div className="w-full bg-green-400 text-white font-medium capitalize text-2xl h-screen flex justify-center items-center">
            <GridLoader color="white" />
          </div>
        ) : (
          <div className="container mx-auto p-4">
            <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
              {allCategoriesData.map((cat) => (
                <Category category={cat} key={cat._id} />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
