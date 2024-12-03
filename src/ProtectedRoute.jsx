import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext"; // Correct import

const ProtectedRoute = ({ children }) => {
  const { currentUser } = useContext(AuthContext);

  // If no user is logged in, redirect to the Login page
  if (!currentUser) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
