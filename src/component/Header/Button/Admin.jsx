import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate

const Admin = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate(); // ✅ Initialize useNavigate

  // Toggle dropdown on click
  const toggleDropdown = () => {
    setOpen(!open);
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
              <li>
                <button className="dropdown-item" onClick={() => navigate("/register")}>
                  Register
                </button>
              </li>
              <li>
                <button className="dropdown-item" onClick={() => navigate("/login")}>
                  Login
                </button>
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;
