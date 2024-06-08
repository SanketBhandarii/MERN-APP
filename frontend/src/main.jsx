import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";
import User from "./components/getUser/User.jsx";
import AddUser from "./components/addUser/AddUser.jsx";
import EditUser from "./components/updateUser/EditUser.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <User />,
  },
  {
    path: "/add",
    element: <AddUser />,
  },
  {
    path: "/edit/:id",
    element: <EditUser/>,
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
