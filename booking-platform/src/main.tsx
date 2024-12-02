import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import LoginPage from "./Login/LoginPage.js";
import { LoginProvider } from "./Login/Context/LoginContext.js";
import IndexPage from "./IndexPage/IndexPage.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ErrorPage } from "./ErrorPage";
import HomePage from "./user/HomePage/HomePage.js";
import { SearchProvider } from "./user/Context/SearchContextApi.js";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SearchPage from "./user/SearchPage/SearchPage.js";

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
    path: "/search-result",
    element: (
      <SearchProvider>
        <SearchPage />
      </SearchProvider>
    ),
    errorElement: <ErrorPage />,
  },
]);
const queryClient = new QueryClient();
const rootElement = document.getElementById("root");
if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <LoginProvider>
          <RouterProvider router={router} />
        </LoginProvider>
      </QueryClientProvider>
    </StrictMode>
  );
}
