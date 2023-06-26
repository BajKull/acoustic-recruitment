import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "@/styles/globals.scss";
import ROUTES from "@/constants/routes.ts";
import Home from "@/pages/index/index";
import Articles from "@/pages/articles/articles.tsx";
import Article from "@/pages/article/article.tsx";
import MainLayout from "./views/layouts/MainLayout";
import { QueryClient, QueryClientProvider } from "react-query";
import ErrorPage from "./pages/error/errorPage";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: ROUTES.INDEX.PATH, element: <Home /> },
      { path: ROUTES.ARTICLES.PATH, element: <Articles /> },
      { path: ROUTES.ARTICLE.PATH, element: <Article /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
