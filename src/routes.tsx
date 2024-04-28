import { createBrowserRouter } from "react-router-dom";
import { Home } from "./pages/home/home";
import { CreateCustomer } from "./pages/create/create";
import { EditCustomer } from "./pages/edit/edit";

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
    path: "/edit/:id",
    element: <EditCustomer />,
  },

  {
    path: "*",
    element: <div>Not Found</div>,
  },
]);
