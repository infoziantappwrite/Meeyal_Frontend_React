import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Ensure you have React Router installed
import { account, ID } from "../../../appwriteConfig";
import Slider from "./Slider.jsx";

const RegisterPage = () => {
  const navigate = useNavigate();

  // State for form fields
  const [formData, setFormData] = useState({
    firstname: "",
    phone: "",
    email: "",
    password: "",
  });

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await account.create(
        ID.unique(),
        formData.email,
        formData.password,
        formData.firstname
      );

      console.log("User Registered:", response);
      alert("Registration Successful!");
      navigate("/login"); // Redirect to login page after successful registration
    } catch (error) {
      console.error("Registration Error:", error.message);
      alert("Failed to register. Try again!");
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
            <div id="content" className="col-sm-9 all-blog my-account">
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
                    <legend>Your Password</legend>
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