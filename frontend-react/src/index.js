import { ApolloProvider } from "@apollo/client";
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import App from "./App";

import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

import client from "./apollo/client";
import router from "./routes";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <RouterProvider router={router}>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </RouterProvider>
);
