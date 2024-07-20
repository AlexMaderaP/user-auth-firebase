import { Navigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

export default function RedirectIfAuthenticated({ children }) {
  const { currentUser } = useAuth();

  if (currentUser) {
    return <Navigate to="/" />;
  }

  return children;
}
