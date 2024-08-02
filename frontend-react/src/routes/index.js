import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../Pages/Root/RootLayout";
import HomePage from "../Pages/Home/HomePage";
import PostsPage from "../Pages/Posts/PostsPage";
import LoginPage from "../Pages/Auth/LoginPage";

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

export default router;
