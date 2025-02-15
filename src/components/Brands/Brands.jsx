import React from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Category from "../Category/Category";
import { GridLoader } from "react-spinners";
import BrandCard from "../BrandCard/BrandCard";

export default function Brands() {
  async function getAllBrands() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/brands");
  }

  const { data: allBrands, isLoading: brandsLoading } = useQuery({
    queryKey: ["allBrands"],
    queryFn: getAllBrands,
    refetchOnWindowFocus: false,
  });
  const allBrandsData = allBrands?.data.data;

  return (
    <>
      <div className="py-5">
        {brandsLoading ? (
          <div className="w-full bg-green-400 text-white font-medium capitalize text-2xl h-screen flex justify-center items-center">
            <GridLoader color="white" />
          </div>
        ) : (
          <div className="container mx-auto p-4">
            <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
              {allBrandsData.map((brand) => (
                <BrandCard brand={brand} key={brand._id} />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
