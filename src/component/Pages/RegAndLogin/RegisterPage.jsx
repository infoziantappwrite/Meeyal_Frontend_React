import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Ensure you have React Router installed
import { account, ID } from "../../../appwriteConfig";
import Slider from "./Slider.jsx";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RegisterPage = () => {
  const navigate = useNavigate();

  // State for form fields
  const [formData, setFormData] = useState({
    firstname: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }
    const strongPasswordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    if (!strongPasswordRegex.test(formData.password)) {
      toast.error("Password must be at least 8 characters long and include a number and special character.");
      return;
    }
    
    try {
      await account.create(
        ID.unique(),
        formData.email,
        formData.password,
        formData.firstname,
      );
      await account.createEmailPasswordSession(formData.email, formData.password);
      try {
        await account.updatePhone(formData.phone,formData.password );
        await account.createVerification(`${window.location.origin}/verify`);
        toast.success("Registration successful! Check your email to verify.");
        await account.deleteSession("current");
      } catch (verificationError) {
        // If verification email fails, delete session
        await account.deleteSession("current");

        toast.error("Verification email failed to send. Please try registering again.");
        console.error("Verification Error:", verificationError.message);
        return;
      }
      // console.log("User Registered:", response);
      navigate("/login"); // Redirect to login page after successful registration
    } catch (error) {
      //console.error("Registration Error:", error.message);
      await account.deleteSession("current");
      toast.error(error.message || "Failed to register. Try again!");
      console.error("Registration Error:", error.message);
    }
  };

  return (
    <div>
      <section>
        <div className="breadcrumb-main">
          <div className="container">
            <div className="breadcrumb-container">
              <h2 className="page-title">Register Account</h2>
            </div>
          </div>
        </div>
      </section>

      <div className="register-section">
        <div className="container">
          <div className="row">
            {/* Sidebar */}
            <Slider />

            {/* Main Content */}
            <div id="content" className="col-sm-9 all-blog my-account mb-4 ">
              <div className="row">
                <form className="form-horizontal well" onSubmit={handleSubmit}>
                  <p>
                    If you already have an account with us, please login at the{" "}
                    <Link to="/login">login page</Link>.
                  </p>

                  {/* Personal Details */}
                  <fieldset id="account">
                    <legend>Your Personal Details</legend>
                    <div className="form-group required row">
                      <label className="col-sm-2 control-label" htmlFor="input-firstname">First Name</label>
                      <div className="col-sm-10">
                        <input
                          type="text"
                          name="firstname"
                          placeholder="First Name"
                          id="input-firstname"
                          className="form-control"
                          value={formData.firstname}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="form-group required row">
                      <label className="col-sm-2 control-label" htmlFor="input-phone">Phone Number</label>
                      <div className="col-sm-10">
                        <input
                          type="tel"
                          name="phone"
                          placeholder="Phone Number"
                          id="input-phone"
                          className="form-control"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="form-group required row">
                      <label className="col-sm-2 control-label" htmlFor="input-email">E-Mail</label>
                      <div className="col-sm-10">
                        <input
                          type="email"
                          name="email"
                          placeholder="E-Mail"
                          id="input-email"
                          className="form-control"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                  </fieldset>

                  {/* Password */}
                  <fieldset id="password">
                    <legend className="d-flex gap-2 align-items-center">
                      <span>Your Password</span>
                      <small className="text-muted text-sm">(Must be 8+ chars, include number & symbol)</small>
                    </legend>
                    <div className="form-group required row">
                      <label className="col-sm-2 control-label" htmlFor="input-password">Password</label>
                      <div className="col-sm-10">
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

                    </div>
                    <div className="form-group required row">
                      <label className="col-sm-2 control-label" htmlFor="input-password">Comfirm Password</label>
                      <div className="col-sm-10">
                        <input
                          type="password"
                          name="confirmPassword"  // ✅ Correct
                          placeholder="Confirm Password"
                          id="input-confirm-password"
                          className="form-control"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          required
                        />

                      </div>

                    </div>
                  </fieldset>

                  {/* Terms and Conditions */}
                  <div className="buttons clearfix">
                    <div className="float-end text-right">
                      <div className="form-check form-check-inline">
                        <input
                          type="checkbox"
                          name="agree"
                          value="1"
                          className="form-check-input"
                          required
                        />
                        <label className="form-check-label">
                          I have read and agree to the{" "}
                          <Link to="/privacy-policy" className="modal-link">
                            <b>Privacy Policy</b>
                          </Link>
                        </label>
                      </div>
                      <button type="submit" className="btn btn-primary">
                        Register
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div> {/* End of Main Content */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;