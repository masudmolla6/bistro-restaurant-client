import { Navigate, useLocation } from "react-router";
import useAuth from "../hooks/useAuth";
import useAdmin from "../hooks/useAdmin";

const AdminRoutes = ({children}) => {
  const { user, loading,logOut } = useAuth();
  const [isAdmin, isAdminLoading] = useAdmin();
  console.log(isAdmin, isAdminLoading);

    const location = useLocation();

    if (loading || isAdminLoading) {
      return (
        <div className="w-full h-screen flex justify-center items-center">
          <span className="loading loading-ring loading-lg w-64"></span>
        </div>
      );
  }
  
  // if (!isAdmin) {
  //   return logOut()
  //     .then(() => { })
  //   .catch(error=>console.error(error))
  // }

    if (user && isAdmin) {
      return children;
  }
  
    return <Navigate to="/" state={{ from: location }} replace></Navigate>;
};

export default AdminRoutes;