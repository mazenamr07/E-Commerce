import React, { useContext, useEffect } from "react";
import { CartContext } from "../../context/CartContext";

export default function Cart() {
  const { getCartItems } = useContext(CartContext);
  useEffect(() => {
    getCartItems();
  }, []);

  return <div>Cart</div>;
}
