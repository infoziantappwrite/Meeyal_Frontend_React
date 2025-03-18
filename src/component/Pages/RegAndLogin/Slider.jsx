import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { account } from '../../../appwriteConfig'; 
import "./Login.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Slider = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
          await account.deleteSession("current"); // Logout from Appwrite
          localStorage.removeItem("session"); // Remove session from localStorage
      
          toast.success("Logout successful! Redirecting...", {
            position: "top-right",
            autoClose: 3000, // Closes after 3 seconds
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
          });
      
          setTimeout(() => {
            navigate("/login"); // Redirect after 3 seconds
          }, 3000);
        } catch (error) {
          console.error("Logout failed:", error);
          toast.error("Logout failed. Try again!", {
            position: "top-right",
            autoClose: 3000,
          });
        }
      };

  return (
       <aside id="column-left" className="col-sm-3">
              <div className="account-content list-group">
                <div className="box-content">
                  <h3 className="toggled relative">Account</h3>
                  <ul className="list-unstyled">
                    <li><Link to="/login" className="list-group-item">Login</Link></li>
                    <li><Link to="/register" className="list-group-item">Register</Link></li>
                    <li><Link to="/forgot-password" className="list-group-item">Forgotten Password</Link></li>
                    <li><Link to="/my-account" className="list-group-item">My Account</Link></li>
                    <li><Link to="/order-history" className="list-group-item">Order History</Link></li>
                    <li><button onClick={handleLogout} className="list-group-item logout-btn">Logout</button></li>
                  </ul>
                </div>
              </div>
            </aside>
  )
}

export default Slider
