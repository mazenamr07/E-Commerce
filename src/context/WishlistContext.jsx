import axios from "axios";
import React, { createContext, useState } from "react";
import toast from "react-hot-toast";

export const WishlistContext = createContext();
export default function WishlistContextProvider({ children }) {
  const [numOfWishlistItems, setNumOfWishlistItems] = useState();
  const [wishlistItems, setWishlistItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState();
  const [checkedItems, setCheckedItems] = useState([]);

  async function addToWishlist(productId) {
    try {
      const res = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        {
          productId,
        },
        { headers: { token: localStorage.getItem("token") } }
      );
      if (res.data.status == "success") {
        toast.success(res.data.message);
        setNumOfWishlistItems(res.data.data.length);
      }
    } catch (err) {
      toast.error("Oops.. something went wrong!");
    }
  }

  async function getWishlistItems() {
    try {
      const res = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        {
          headers: { token: localStorage.getItem("token") },
        }
      );
      if (res.data.status == "success") {
        setWishlistItems(res.data.data);
        setNumOfWishlistItems(res.data.data.length);
        let tempArray = [];
        for (let i = 0; i < res.data.data.length; i++) {
          tempArray.push(res.data.data[i]._id);
        }
        setCheckedItems(tempArray);
      }
    } catch (err) {
      toast.error("Oops.. something went wrong!");
    }
  }

  async function updateItemCount(id, count) {
    try {
      const res = await axios.put(
        `https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,
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
        setWishlistItems(res.data.data.products);
        setTotalPrice(res.data.data.totalWishlistPrice);
      }
    } catch (err) {
      toast.error("Oops.. something went wrong!");
    }
  }

  async function deleteWishlistItem(id) {
    try {
      const res = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      if (res.data.status == "success") {
        setNumOfWishlistItems(res.data.data.length);
        toast.success(res.data.message);
        window.location.reload();
      }
    } catch (err) {
      toast.error("Oops.. something went wrong!");
    }
  }

  return (
    <WishlistContext.Provider
      value={{
        addToWishlist,
        wishlistItems,
        updateItemCount,
        totalPrice,
        numOfWishlistItems,
        getWishlistItems,
        deleteWishlistItem,
        checkedItems,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}
