import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "./component/Loader";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

const PublicRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [hasShownToast, setHasShownToast] = useState(false); // Track if toast is shown

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get(`${API_URL}/users/profile`, {
          withCredentials: true,
        });
        if (response.status === 200) {
          setIsAuthenticated(true);
        }
        if (!hasShownToast) {
          toast.warning("You are already logged in!");

          setHasShownToast(true); // Prevents showing multiple times
        }
      } catch {
        setIsAuthenticated(false);

        
      }
    };
    checkAuth();
  }, [hasShownToast]);

  if (isAuthenticated === null) return <Loader />;

  return isAuthenticated ? <Navigate to="/profile" replace /> : <Outlet />;
};

export default PublicRoute;
