// src/pages/VerifyEmail.jsx
import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
const API_URL = import.meta.env.VITE_API_URL;

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState("Verifying...");

  useEffect(() => {
    const token = searchParams.get("token");

    if (!token) {
      setStatus("Invalid verification link.");
      return;
    }

    const verify = async () => {
      try {
        await axios.get(`${API_URL}/users/verify-email?token=${token}`);
        setStatus("✅ Email verified successfully!");
        toast.success("Email verified! You can now login.");
        setTimeout(() => navigate("/login"), 2000);
      } catch (err) {
        console.error("Verification error:", err);
        setStatus("❌ Verification failed. Token may be invalid or expired.");
        toast.error("Verification failed.");
      }
    };

    verify();
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-lg p-8 text-center w-full max-w-md">
        <h2 className="text-2xl font-bold text-indigo-600 mb-4">Email Verification</h2>
        <p className="text-gray-700">{status}</p>
      </div>
    </div>
  );
};

export default VerifyEmail;
