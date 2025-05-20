/* eslint-disable no-unused-vars */
import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { account } from "./appwriteConfig";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "./component/Loader";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
const ProtectedRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [hasShownToast, setHasShownToast] = useState(false); // Track if toast is shown

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response=await axios.get(`${API_URL}/users/profile`, {
        withCredentials: true,
      });
      if (response.status === 200) {
        setIsAuthenticated(true);
      }
      } catch{
        setIsAuthenticated(false);
        
        if (!hasShownToast) {
          toast.warning("Please log in first!");

          setHasShownToast(true); // Prevents showing multiple times
        }
      }
    };
    checkAuth();
  }, [hasShownToast]); // Depend on hasShownToast

  if (isAuthenticated === null) return <Loader/>; // Show loading state while checking session
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
