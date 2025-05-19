import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { account } from "../../../appwriteConfig";
import { toast } from "react-toastify";

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState("");
  const [secret, setSecret] = useState("");

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const userIdParam = queryParams.get("userId");
    const secretParam = queryParams.get("secret");

    if (!userIdParam || !secretParam) {
      toast.error("Invalid or expired reset link.");
      navigate("/login");
    } else {
      setUserId(userIdParam);
      setSecret(secretParam);
      setLoading(false);
    }
  }, [location, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      await account.updateRecovery(userId, secret, formData.password, formData.confirmPassword);
      toast.success("Password updated successfully!");
      setTimeout(() => navigate("/login"), 3000);
    } catch (err) {
      toast.error(err.message || "Something went wrong.");
    }
  };

  if (loading) return <h3 className="text-center mt-5">Loading reset form...</h3>;

  return (
    <div className="bg-light py-5">
  <div className="container d-flex justify-content-center align-items-center">
    <div className="card shadow p-4" style={{ maxWidth: "500px", width: "100%", borderRadius: "12px" }}>
      <h3 className="text-center mb-4">Reset Your Password</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <label htmlFor="input-password">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            id="input-password"
            className="form-control"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group mb-3">
          <label htmlFor="input-confirm-password">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            id="input-confirm-password"
            className="form-control"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>

        <div className="text-center">
          <button type="submit" className="btn btn-primary w-100">Reset Password</button>
        </div>
      </form>
    </div>
  </div>
</div>

  );
};

export default ResetPasswordPage;
