import { createBrowserRouter } from "react-router-dom";
import { Home } from "./pages/home/home";
import { CreateCustomer } from "./pages/create/create";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/create",
    element: <CreateCustomer />,
  },

  {
    path: "*",
    element: <div>Not Found</div>,
  },
]);
