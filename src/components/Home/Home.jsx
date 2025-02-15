import axios from "axios";
import React, { useEffect, useState } from "react";
import ProductCard from "../ProductCard/ProductCard";
import { GridLoader } from "react-spinners";

export default function Home() {
  let [allProducts, setAllProducts] = useState([]);
  let [loading, setLoading] = useState(false);

  async function getAllProducts() {
    setLoading(true);
    const res = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/products"
    );
    setAllProducts(res.data.data);
    setLoading(false);
  }
  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <>
      {loading ? (
        <div className="w-full bg-green-400 text-white font-medium capitalize text-2xl h-screen flex justify-center items-center">
          <GridLoader color="white"/>
        </div>
      ) : (
        <div className="container mx-auto p-4">
          <div className="grid gap-4 grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
            {allProducts.map((prod) => (
              <ProductCard product={prod} key={prod._id} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
