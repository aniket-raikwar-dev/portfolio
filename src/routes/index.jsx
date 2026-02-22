import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import About from "../pages/About";
import Works from "../pages/Works";
import Crafts from "../pages/Crafts";
import Contact from "../pages/Contact";
import { RouteTransitionProvider } from "../context/RouteTransitionContext";

export const ROUTES = {
  HOME: "/",
  ABOUT: "/about",
  WORKS: "/works",
  CRAFTS: "/crafts",
  CONTACT: "/contact",
};

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <RouteTransitionProvider>
        <MainLayout />
      </RouteTransitionProvider>
    ),
    children: [
      { index: true, element: <Home /> },
      { path: "home", element: <Home /> },
      { path: "about", element: <About /> },
      { path: "works", element: <Works /> },
      { path: "crafts", element: <Crafts /> },
      { path: "contact", element: <Contact /> },
    ],
  },
]);

export const AppRouter = () => <RouterProvider router={router} />;
