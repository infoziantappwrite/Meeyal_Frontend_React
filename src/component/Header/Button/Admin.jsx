import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { FaUser } from "react-icons/fa";

const API_URL = import.meta.env.VITE_API_URL;

const Admin = () => {
  const [open, setOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get(`${API_URL}/users/profile`, {
          withCredentials: true,
        });
        if (response.status === 200) setIsAuthenticated(true);
      } catch {
        setIsAuthenticated(false);
      }
    };
    checkAuth();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post(`${API_URL}/users/logout`, {}, { withCredentials: true });
      setIsAuthenticated(false);
      toast.success("Logged out successfully!");
      setOpen(false);
      navigate("/login");
    } catch (error) {
      toast.error("Logout failed. Try again.");
    }
  };

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
    <div className="relative" ref={dropdownRef}>
      {/* User Icon Button */}
      <button
        onClick={() => setOpen(!open)}
        className="p-2 rounded-full hover:bg-gray-100 transition duration-200"
      >
        <FaUser className="text-gray-700 text-lg" />
      </button>

      {/* Dropdown Menu */}
      {open && (
        <ul
          className="absolute right-0 mt-3 w-44 bg-white border border-gray-200 rounded-xl shadow-2xl z-[9999] animate-fade-in overflow-hidden p-0 m-0"
        >
          {isAuthenticated ? (
            <>
              <li>
                <button
                  onClick={() => {
                    navigate("/profile");
                    setOpen(false);
                  }}
                  className="w-full px-4 py-2 text-left text-sm hover:bg-pink-50 hover:text-pink-600 transition"
                >
                  Profile
                </button>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-2 text-left text-sm hover:bg-pink-50 hover:text-pink-600 transition"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <button
                  onClick={() => {
                    navigate("/register");
                    setOpen(false);
                  }}
                  className="w-full px-4 py-2 text-left text-sm hover:bg-pink-50 hover:text-pink-600 transition"
                >
                  Register
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    navigate("/login");
                    setOpen(false);
                  }}
                  className="w-full px-4 py-2 text-left text-sm hover:bg-pink-50 hover:text-pink-600 transition"
                >
                  Login
                </button>
              </li>
            </>
          )}
        </ul>
      )}
    </div>
  );
};

export default Admin;
