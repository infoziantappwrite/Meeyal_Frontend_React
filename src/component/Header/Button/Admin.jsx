import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const API_URL = import.meta.env.VITE_API_URL;

const Admin = () => {
  const [open, setOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // ✅ Check authentication via cookie-based session
  const checkAuth = async () => {
    try {
      const response = await axios.get(`${API_URL}/users/profile`, {
        withCredentials: true,
      });
      if (response.status === 200) {
        setIsAuthenticated(true);
      }
    } catch {
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  // ✅ Logout using backend route
  const handleLogout = async () => {
    try {
      await axios.post(`${API_URL}/users/logout`, {}, { withCredentials: true });
      setIsAuthenticated(false);
      toast.success("Logged out successfully!");
      setOpen(false);
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Failed to log out. Try again.");
    }
  };

  // Toggle dropdown on click
  const toggleDropdown = () => setOpen(!open);
  const toggleDropdownClose = () => setOpen(false);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="admin-section">
      <div className="admin-container">
        <div id="header_ac" className="dropdown" ref={dropdownRef}>
          <div className="dropdown-toggle" onClick={toggleDropdown}>
            <i className="fa fa-user user-icon"></i>
          </div>

          {open && (
            <ul className="dropdown-menu dropdown-menu-right">
              {isAuthenticated ? (
                <>
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => {
                        navigate("/profile");
                        toggleDropdownClose();
                      }}
                    >
                      Profile
                    </button>
                  </li>
                  <li>
                    <button className="dropdown-item" onClick={handleLogout}>
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => {
                        navigate("/register");
                        toggleDropdownClose();
                      }}
                    >
                      Register
                    </button>
                  </li>
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => {
                        navigate("/login");
                        toggleDropdownClose();
                      }}
                    >
                      Login
                    </button>
                  </li>
                </>
              )}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;
