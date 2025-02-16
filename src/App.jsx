import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./components/Home/Home";
import Cart from "./components/Cart/Cart";
import Categories from "./components/Categories/Categories";
import Products from "./components/Products/Products";
import Brands from "./components/Brands/Brands";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Error from "./components/Error/Error";
import AuthContextProvider from "./context/AuthContext";
import Guard from "./components/Guard/Guard";
import AuthGuard from "./components/AuthGuard/AuthGuard";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import CartContextProvider from "./context/CartContext";
import { Toaster } from "react-hot-toast";
import Wishlist from "./components/Wishlist/Wishlist";
import WishlistContextProvider from "./context/WishlistContext";
import Order from "./components/Order/Order";
import AllOrders from "./components/AllOrders/AllOrders";
import OrderStatement from "./components/OrderStatement/OrderStatement";

const queryClient = new QueryClient();

const routes = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <Guard>
            <Home />
          </Guard>
        ),
      },
      {
        path: "cart",
        element: (
          <Guard>
            <Cart />
          </Guard>
        ),
      },
      {
        path: "wishlist",
        element: (
          <Guard>
            <Wishlist />
          </Guard>
        ),
      },
      {
        path: "categories",
        element: (
          <Guard>
            <Categories />
          </Guard>
        ),
      },
      {
        path: "order",
        element: (
          <Guard>
            <Order />
          </Guard>
        ),
      },
      {
        path: "allorders/:id",
        element: (
          <Guard>
            <OrderStatement />
          </Guard>
        ),
      },
      {
        path: "allorders",
        element: (
          <Guard>
            <AllOrders />
          </Guard>
        ),
      },
      {
        path: "products",
        element: (
          <Guard>
            <Products />
          </Guard>
        ),
      },
      {
        path: "brands",
        element: (
          <Guard>
            <Brands />
          </Guard>
        ),
      },
      {
        path: "details/:id",
        element: (
          <Guard>
            <ProductDetails />
          </Guard>
        ),
      },
      {
        path: "login",
        element: (
          <AuthGuard>
            <Login />
          </AuthGuard>
        ),
      },
      {
        path: "register",
        element: (
          <AuthGuard>
            <Register />
          </AuthGuard>
        ),
      },
      { path: "*", element: <Error /> },
    ],
  },
]);

export default function App() {
  return (
    <>
      <AuthContextProvider>
        <CartContextProvider>
          <WishlistContextProvider>
            <QueryClientProvider client={queryClient}>
              <RouterProvider router={routes} />
              <Toaster position="top-right" reverseOrder={false} />
            </QueryClientProvider>
          </WishlistContextProvider>
        </CartContextProvider>
      </AuthContextProvider>
    </>
  );
}
