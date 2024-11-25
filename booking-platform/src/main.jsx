import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import LoginPage from "./Login/LoginPage.jsx";
import { LoginProvider } from "./Login/Context/LoginContext.jsx";
import IndexPage from "./IndexPage/IndexPage.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./ErrorPage.jsx";
import HomePage from "./user/HomePage/HomePage.jsx";
import { useSearchContext } from "./user/Context/SearchContextApi.jsx";
import SearchResult from "./user/HomePage/component/SearchResult.jsx";
import { SearchProvider } from "./user/Context/SearchContextApi.jsx";

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
  {
    path: "/Home",
    element: <HomePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/show-more",
    // element: <SearchResult />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/SearchResult",
    element: (
      <SearchProvider>
        <SearchResult values={[]} />
      </SearchProvider>
    ),
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
