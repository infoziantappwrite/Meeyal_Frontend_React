import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { account } from "./appwriteConfig";
import Loader from "./component/Loader";

const PublicRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await account.getSession("current");
        setIsAuthenticated(true);
      } catch {
        setIsAuthenticated(false);
      }
    };
    checkAuth();
  }, []);

  if (isAuthenticated === null) return <Loader/>;

  return isAuthenticated ? <Navigate to="/profile" replace /> : <Outlet />;
};

export default PublicRoute;
