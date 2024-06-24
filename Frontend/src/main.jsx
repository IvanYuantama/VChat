import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import Dashboard from "./components/Dashboard.jsx";
import LoginUser from "./components/LoginUser.jsx";
import SignUpUser from "./components/SignUpUser.jsx";
import Chat from "./components/Chat.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "/user/login",
    element: <LoginUser />,
  },
  {
    path: "/user/signup",
    element: <SignUpUser />,
  },
  {
    path: "/chat",
    element: <Chat />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
