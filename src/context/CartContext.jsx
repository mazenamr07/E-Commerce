import axios from "axios";
import React, { createContext, useState } from "react";
import toast from "react-hot-toast";

export const CartContext = createContext();
export default function CartContextProvider({ children }) {
  const [numOfCartItems, setNumOfCartItems] = useState();
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState();
  const [cartID, setCartID] = useState();

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
      if (res.data.status == "success") {
        setCartItems(res.data.data.products);
        setTotalPrice(res.data.data.totalCartPrice);
        setNumOfCartItems(res.data.numOfCartItems);
        setCartID(res.data.cartId);
      }
    } catch (err) {
      toast.error("Oops.. something went wrong!");
    }
  }

  async function updateItemCount(id, count) {
    try {
      const res = await axios.put(
        `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
        {
          count,
        },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      if (res.data.status == "success") {
        setCartItems(res.data.data.products);
        setTotalPrice(res.data.data.totalCartPrice);
      }
    } catch (err) {
      toast.error("Oops.. something went wrong!");
    }
  }

  async function deleteCartItem(id) {
    try {
      const res = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      if (res.data.status == "success") {
        setCartItems(res.data.data.products);
        setTotalPrice(res.data.data.totalCartPrice);
        setNumOfCartItems(res.data.numOfCartItems);
      }
    } catch (err) {
      toast.error("Oops.. something went wrong!");
    }
  }

  async function clearCart() {
    try {
      const res = await axios.delete(
        "https://ecommerce.routemisr.com/api/v1/cart",
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );

      if (res.data.message == "success") {
        setCartItems(null);
        setTotalPrice(0);
        setNumOfCartItems(0);
      }
    } catch (err) {
      toast.error("Oops.. something went wrong!");
    }
  }

  return (
    <CartContext.Provider
      value={{
        addToCart,
        cartItems,
        cartID,
        updateItemCount,
        clearCart,
        totalPrice,
        numOfCartItems,
        getCartItems,
        deleteCartItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
