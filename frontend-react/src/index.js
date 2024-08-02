import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import App from "./App";
import HomePage from "./Pages/Home/HomePage";
import PostsPage from "./Pages/Posts/PostsPage";
import LoginPage from "./Pages/Auth/LoginPage";
import RootLayout from "./Pages/Root/RootLayout";

const router = createBrowserRouter([
  {
    path: "",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/posts", // http://localhost:3000/posts
        element: <PostsPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <RouterProvider router={router}>
    <App />
  </RouterProvider>
);
