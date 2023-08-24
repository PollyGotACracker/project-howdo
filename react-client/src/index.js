import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "@styles/index.css";
import "tw-elements";
import router from "@/router";
import Provider from "@contexts/ProviderCompil";
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  // <React.StrictMode>
  <Provider>
    <RouterProvider router={router} />
  </Provider>
  // </React.StrictMode>
);
