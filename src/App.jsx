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

const routes = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "cart", element: <Cart /> },
      { path: "categories", element: <Categories /> },
      { path: "products", element: <Products /> },
      { path: "brands", element: <Brands /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "*", element: <Error /> },
    ],
  },
]);

export default function App() {
  return (
    <>
      <AuthContextProvider>
        <RouterProvider router={routes} />
      </AuthContextProvider>
    </>
  );
}
