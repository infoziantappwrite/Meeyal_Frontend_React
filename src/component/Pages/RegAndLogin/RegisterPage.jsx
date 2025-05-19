import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Ensure you have React Router installed
import Slider from "./Slider.jsx";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;




const RegisterPage = () => {
  const navigate = useNavigate();

  // State for form fields
  const [formData, setFormData] = useState({
    firstname: "",
    username: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    //console.log(API_URL);
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
      await axios.post(`${API_URL}/users/register`, {
        name: formData.firstname,
        username: formData.username,
        mobile: formData.phone,
        email: formData.email,
        password: formData.password,
      });

      toast.success("Registration successful!");
      navigate("/login");
    } catch (err) {
      const msg = err.response?.data?.message || "Registration failed!";
      toast.error(msg);
      console.error("Error:", err);
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
                      <label className="col-sm-2 control-label" htmlFor="input-username">Username</label>
                      <div className="col-sm-10">
                        <input
                          type="text"
                          name="username"
                          placeholder="Username"
                          id="input-username"
                          className="form-control"
                          value={formData.username}
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