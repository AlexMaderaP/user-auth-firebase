import { Navigate } from "react-router-dom";
import NavLayout from "./Layouts/NavLayout";
import Error from "./Pages/Error";
import Login from "./Pages/Login";
import NotFound from "./Pages/NotFound";
import Signup from "./Pages/Signup";
import Home from "./Pages/Home";
import ProtectedRoute from "./Components/ProtectedRoute";
import RedirectIfAuthenticated from "./Components/RedirectIfAuthenticated";

export const routes = [
  {
    element: <NavLayout />,
    children: [
      {
        errorElement: <Error />,
        children: [
          { index: true, element: <Navigate to="home" replace /> },
          {
            path: "login",
            element: (
              <RedirectIfAuthenticated>
                <Login />
              </RedirectIfAuthenticated>
            ),
          },
          {
            path: "signup",
            element: (
              <RedirectIfAuthenticated>
                <Signup />
              </RedirectIfAuthenticated>
            ),
          },
          {
            path: "home",
            element: (
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            ),
          },
          {
            path: "*",
            element: <NotFound />,
          },
        ],
      },
    ],
  },
];
