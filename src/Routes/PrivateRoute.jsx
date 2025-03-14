import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import { Navigate, useLocation } from "react-router";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  
    const location = useLocation();

        if (loading) {
          return (
            <div className="w-full h-screen flex justify-center items-center">
              <span className="loading loading-ring loading-lg w-64"></span>
            </div>
          );
        }

    if (user) {
        return children;
    }
    return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default PrivateRoute;
