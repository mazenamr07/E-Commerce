import axios from "axios";
import React, { useEffect, useState } from "react";
import ProductCard from "../ProductCard/ProductCard";

export default function Home() {
  let [allProducts, setAllProducts] = useState([]);

  async function getAllProducts() {
    const res = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/products"
    );
    setAllProducts(res.data.data);
  }
  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {allProducts.map((prod) => (
          <ProductCard product={prod} />
        ))}
      </div>
    </>
  );
}
