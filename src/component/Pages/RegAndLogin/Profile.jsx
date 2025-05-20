import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const API_URL = import.meta.env.VITE_API_URL;

const Profile = () => {
  const [user, setUser] = useState(null);
  const [showChangePassword, setShowChangePassword] = useState(false);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${API_URL}/users/profile`, {
          withCredentials: true,
        });
        setUser(response.data.user || response.data); // depending on your backend response
      } catch (error) {
        console.error("Error fetching user profile:", error);
        toast.error("Please log in to view your profile.");
        navigate("/login");
      }
    };

    fetchUser();
  }, [navigate]);

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error("New password and confirm password do not match.");
      return;
    }

    if (!oldPassword || !newPassword || !confirmPassword) {
      toast.error("Please fill all password fields.");
      return;
    }

    try {
      await axios.post(
        `${API_URL}/users/change-password`,
        {
          oldPassword,
          newPassword,
          confirmPassword,
        },
        {
          withCredentials: true,
        }
      );
      toast.success("Password changed successfully!");
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setShowChangePassword(false);
    } catch (error) {
      const msg =
        error.response?.data?.message ||
        "Failed to change password. Please try again.";
      toast.error(msg);
    }
  };

  return (
    <div id="content" className="col-sm-9 all-blog my-account mb-4">
      <div className="row justify-content-center">
        <div className="col-md-10">
          <div className="card shadow-sm p-4 bg-light rounded-4">
            <h2 className="mb-4 border-bottom pb-2 text-primary">
              Profile Information
            </h2>

            {user ? (
              <div className="fs-5">
                <p>
                  <strong>Name:</strong> {user.name}
                </p>
                <p>
                  <strong>Email:</strong> {user.email}
                </p>
                <p>
                  <strong>Phone:</strong> {user.mobile || "Not Provided"}
                </p>

                <hr />

                <button
                  className="btn btn-outline-primary mb-3"
                  onClick={() => setShowChangePassword(!showChangePassword)}
                >
                  {showChangePassword ? "Cancel Change Password" : "Change Password"}
                </button>

                {showChangePassword && (
                  <form onSubmit={handleChangePassword} className="mb-3">
                    <div className="mb-3">
                      <label htmlFor="oldPassword" className="form-label">
                        Old Password
                      </label>
                      <input
                        type="password"
                        id="oldPassword"
                        className="form-control"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        required
                        minLength={6}
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="newPassword" className="form-label">
                        New Password
                      </label>
                      <input
                        type="password"
                        id="newPassword"
                        className="form-control"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                        minLength={6}
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="confirmPassword" className="form-label">
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        id="confirmPassword"
                        className="form-control"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        minLength={6}
                      />
                    </div>

                    <button type="submit" className="btn btn-primary">
                      Update Password
                    </button>
                  </form>
                )}
              </div>
            ) : (
              <p>Loading user details...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
