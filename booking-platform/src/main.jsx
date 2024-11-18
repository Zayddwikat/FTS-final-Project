import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import LoginPage from "./Login/LoginPage.jsx";
import { LoginProvider } from "./Login/utils/LoginContext";
import IndexPage from "./IndexPage/IndexPage.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./ErrorPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <IndexPage />,
  },
  {
    path: "/Login",
    element: <LoginPage />,
    errorElement: <ErrorPage />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <LoginProvider>
      <RouterProvider router={router} />
    </LoginProvider>
  </StrictMode>
);
