import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import App from "./App";
import AuthProvider from "./providers/AuthProvider";
import { Toaster } from "react-hot-toast";
import ErrorPage from "./components/ErrorPage";
import Login from "./components/auth/Login";
import SignUp from "./components/auth/SignUp";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <SignUp /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <Toaster />
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);