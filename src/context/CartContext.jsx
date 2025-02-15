import axios from "axios";
import React, { createContext, useState } from "react";
import toast from "react-hot-toast";

export const CartContext = createContext();
export default function CartContextProvider({ children }) {
  const [numOfCartItems, setNumOfCartItems] = useState();

  async function addToCart(productId) {
    try {
      const res = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        {
          productId,
        },
        { headers: { token: localStorage.getItem("token") } }
      );
      if (res.data.status == "success") {
        toast.success(res.data.message);
        setNumOfCartItems(res.data.numOfCartItems);
      }
    } catch (err) {
      toast.error("Oops.. something went wrong!");
    }
  }

  async function getCartItems() {
    try {
      const res = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/cart",
        {
          headers: { token: localStorage.getItem("token") },
        }
      );
      console.log(res, "Response");
    } catch (err) {
      console.log(err, "Error");
    }
  }

  return (
    <CartContext.Provider value={{ addToCart, numOfCartItems, getCartItems }}>
      {children}
    </CartContext.Provider>
  );
}
