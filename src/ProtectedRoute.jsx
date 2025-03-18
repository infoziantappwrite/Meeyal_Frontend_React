import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { account } from "./appwriteConfig";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProtectedRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [hasShownToast, setHasShownToast] = useState(false); // Track if toast is shown

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await account.getSession("current"); // Checks if session exists
        setIsAuthenticated(true);
      } catch (error) {
        setIsAuthenticated(false);
        
        if (!hasShownToast) {
          toast.warning("Please log in first!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
          });

          setHasShownToast(true); // Prevents showing multiple times
        }
      }
    };
    checkAuth();
  }, [hasShownToast]); // Depend on hasShownToast

  if (isAuthenticated === null) return <p>Loading...</p>; // Show loading state while checking session
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
