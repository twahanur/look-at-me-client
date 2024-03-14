import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Register from "../pages/Auth/Register";
import Login from "../pages/Auth/Login";
import { adminPaths } from "./admin.routes";
import { routeGenerator } from "../utils/routesGenerator";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [],
  },
  {
    path: "/user",
    element: <App />,
    children: routeGenerator(adminPaths),
  },

  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default router;
