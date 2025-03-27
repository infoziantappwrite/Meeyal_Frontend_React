import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { account } from "../../../appwriteConfig"; // Import Appwrite account instance
import { toast } from "react-toastify";

const Admin = () => {
  const [open, setOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Check authentication status
  const checkAuth = async () => {
    try {
      await account.getSession("current");
      setIsAuthenticated(true);
    } catch {
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, [isAuthenticated]); // ✅ Run effect when isAuthenticated changes

  // Logout function
  const handleLogout = async () => {
    try {
      await account.deleteSession("current"); // Logs out the user
      setIsAuthenticated(false);
      toast.success("Logged out successfully!");
      setOpen(false); // Close dropdown
      navigate("/login"); // Redirect to login page
    } catch (error) {
      console.log(error);
      toast.error("Failed to log out. Try again.");
    }
  };

  // Toggle dropdown on click
  const toggleDropdown = () => {
    setOpen(!open);
  };

  const toggleDropdownClose = () => {
    setOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="admin-section">
      <div className="admin-container">
        <div id="header_ac" className="dropdown" ref={dropdownRef}>
          <div className="dropdown-toggle" onClick={toggleDropdown}>
            <i className="fa fa-user user-icon"></i>
          </div>

          {/* Dropdown menu */}
          {open && (
            <ul className="dropdown-menu dropdown-menu-right">
              {isAuthenticated ? (
                <>
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => {
                        navigate("/profile");
                        toggleDropdownClose(); // ✅ Close dropdown after navigation
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
                        toggleDropdownClose(); // ✅ Close dropdown after navigation
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
                        toggleDropdownClose(); // ✅ Close dropdown after navigation
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
