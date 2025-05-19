import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { account } from "../../../appwriteConfig";
import { toast } from "react-toastify";

const VerifyPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyEmail = async () => {
      const queryParams = new URLSearchParams(location.search);
      const userId = queryParams.get("userId");
      const secret = queryParams.get("secret");

      if (!userId || !secret) {
        toast.error("Invalid verification link.");
        setTimeout(() => navigate("/login"), 3000);
        return;
      }

      try {
        await account.updateVerification(userId, secret);
        toast.success("Email verified successfully!");
        setTimeout(() => navigate("/login"), 3000); // wait 3 seconds after toast
      } catch (error) {
        console.error("Verification Error:", error.message);
        toast.error(error.message||"Verification failed. Please try again.");
        setTimeout(() => navigate("/login"), 3000); // wait 3 seconds on error too
      } finally {
        setLoading(false);
      }
    };

    verifyEmail();
  }, [location, navigate]);

  return (
    <div className="container text-center mt-5">
      {loading ? <h3>Verifying your email...</h3> : <h3>Redirecting to login...</h3>}
    </div>
  );
};

export default VerifyPage;
