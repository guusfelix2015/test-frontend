import { createBrowserRouter } from "react-router-dom";
import { Home } from "./pages/home/home";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },

  {
    path: "*",
    element: <div>Not Found</div>,
  },
]);
