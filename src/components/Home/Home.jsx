import axios from "axios";
import React, { useEffect, useState } from "react";
import ProductCard from "../ProductCard/ProductCard";
import { GridLoader } from "react-spinners";
import { useQuery } from "@tanstack/react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import swiperImg1 from "../../assets/images/slider-image-1.jpeg";
import swiperImg2 from "../../assets/images/slider-image-2.jpeg";
import swiperImg3 from "../../assets/images/slider-image-3.jpeg";
import swiperImg4 from "../../assets/images/slider-2.jpeg";

export default function Home() {
  async function getAllProducts() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/products");
  }

  const { data, isLoading } = useQuery({
    queryKey: ["allProducts"],
    queryFn: getAllProducts,
  });
  const allProductsData = data?.data.data;

  return (
    <>
      <div className="container mx-auto p-6 grid grid-cols-6">
        <div className="bg-red-500 col-span-4">
          <Swiper
            slidesPerView={1}
            loop={true}
            className="h-[100%] border-2 border-green-400 border-r-1"
          >
            <SwiperSlide className="box-border">
              <img src={swiperImg1} className="w-full h-full block" alt="" />
            </SwiperSlide>
            <SwiperSlide className="box-border">
              <img src={swiperImg2} className="w-full block h-full" alt="" />
            </SwiperSlide>
          </Swiper>
        </div>
        <div className="bg-blue-500 col-span-2">
          <div className="img h-[50%] border-2 border-green-400 border-l-1 border-b-1">
            <img src={swiperImg3} className="block w-full h-full" alt="" />
          </div>
          <div className="img h-[50%] border-2 border-green-400 border-l-1 border-t-1">
            <img src={swiperImg4} className="block w-full h-full" alt="" />
          </div>
        </div>
      </div>

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
