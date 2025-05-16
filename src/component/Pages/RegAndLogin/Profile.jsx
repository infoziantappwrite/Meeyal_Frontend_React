import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { account } from "../../../appwriteConfig";
import { toast } from "react-toastify";
import Slider from "./Slider"; // Import Slider component

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const [showOTPForm, setShowOTPForm] = useState(false);
const [otp, setOtp] = useState("");
const [isEditingPhone, setIsEditingPhone] = useState(false);
const [newPhone, setNewPhone] = useState("");
const [password, setPassword] = useState("");

const handleSendOTP = async () => {
  try {
    await account.createPhoneVerification();
    toast.success("OTP sent to your phone!");
    setShowOTPForm(true);
  } catch (error) {
    toast.error(error.message || "Failed to send OTP");
  }
};
const handleVerifyPhone = async (e) => {
  e.preventDefault();
  try {
   await account.updatePhoneVerification(user.$id, otp);
    toast.success("Phone verified successfully!");
    setShowOTPForm(false);
    setOtp('');
    setNewPhone('');
    setPassword('');
    setUser(await account.get()); // Refresh user data
  } catch (error) {
    toast.error(error.message || "Verification failed");
  }
};



const handleChangePhone = async (e) => {
  e.preventDefault();
  if (!newPhone.startsWith("+")) {
    toast.error("Phone number must start with '+' sign!");
    return;
  }
  try {
    await account.updatePhone(newPhone, password);
    toast.success("Phone number updated. Please verify.");
    setUser(await account.get());
    setIsEditingPhone(false);
    setShowOTPForm(false);
  } catch (error) {
    toast.error("Failed to update phone number. " + error.message);
  }
};




  // Fetch user details
  useEffect(() => {
    const getUser = async () => {
      try {
        const userData = await account.get();
        setUser(userData);
        console.log("User data:", userData); // Log user data for debugging
      } catch (error) {
        console.error("Error fetching user data:", error);
        toast.error("Failed to fetch user details. Please log in again.");
        navigate("/login");
      }
    };

    getUser();
  }, [navigate]);


  return (
    <div id="content" className="col-sm-9 all-blog my-account mb-4 ">
    <div className="row justify-content-center">
      <div className="col-md-10">
        <div className="card shadow-sm p-4 bg-light rounded-4">
          <h2 className="mb-4 border-bottom pb-2 text-primary">Profile Information</h2>
  
          {user ? (
            <div className="fs-5">
              <p><strong>Name:</strong> {user.name}</p>
              <p className="mt-3"><strong>Email:</strong> {user.email}</p>
              {showOTPForm && (
                <form onSubmit={handleVerifyPhone} className="mt-3">
                  <div className="form-group row align-items-center">
                    <label className="col-sm-3 col-form-label">Enter OTP</label>
                    <div className="col-sm-6">
                      <input
                        type="text"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        className="form-control"
                        required
                      />
                    </div>
                    <div className="col-sm-3">
                      <button type="submit" className="btn btn-success">Verify</button>
                    </div>
                  </div>
                </form>
              )}
              <p>
  <strong>Phone:</strong> {user.phone}{" "}
  {!user.phoneVerification && (
    <button className="btn btn-sm btn-warning ms-2" onClick={handleSendOTP}>
      Verify First
    </button>
  )}
  <button
    className="btn btn-sm btn-outline-secondary ms-2"
    onClick={() => setIsEditingPhone(!isEditingPhone)}
  >
    {isEditingPhone ? "Cancel" : "Change Phone"}
  </button>
</p>

{isEditingPhone && (
  <form onSubmit={handleChangePhone} className="mt-3">
    <div className="form-group row mb-3">
      <label className="col-sm-3 col-form-label">New Phone</label>
      <div className="col-sm-9">
        <input
          type="tel"
          className="form-control"
          placeholder="+91xxxxxxxxxx"
          value={newPhone}
          onChange={(e) => setNewPhone(e.target.value)}
          required
        />
      </div>
    </div>

    <div className="form-group row mb-3">
      <label className="col-sm-3 col-form-label">Confirm Password</label>
      <div className="col-sm-9">
        <input
          type="password"
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
    </div>

    <div className="text-end">
      <button type="submit" className="btn btn-primary">Update Phone</button>
    </div>
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
