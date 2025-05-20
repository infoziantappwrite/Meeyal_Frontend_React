import React, { useState } from "react";
import Slider from "./RegAndLogin/Slider"; // Importing the Slider component
import "./Contact.css";

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    const data = {
      name: form.name.value,
      email: form.email.value,
      phone: form.phone.value,
      enquiry: form.enquiry.value,
    };

    console.log("Form Data:", data);
    setSubmitted(true);
    form.reset();

    // Hide success message after 5 seconds
    setTimeout(() => {
      setSubmitted(false);
    }, 5000);
  };

  return (
    <div className="contact-page-wrapper">
      {/* Banner with breadcrumb */}
      <div className="contact-banner">
        <div className="banner-content">
          <h1>Contact Us</h1>
          <div className="breadcrumb-nav">
            <a href="/">
              <i className="fa fa-home"></i>
            </a>
            <i className="fa fa-angle-right"></i>
            <span>Contact Us</span>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="contact-row">
          {/* Account Section */}
          <div className="contact-section account-section">
            <Slider />
          </div>

          {/* Locations Section */}
          <div className="contact-section locations-section">
            <h2 className="section-title">Our Locations</h2>
            <div className="locations-wrapper">
              {/* Store Location */}
              <div className="location-box">
                <div className="location-icon-container">
                  <i className="fa fa-home location-icon"></i>
                </div>
                <h3 className="location-title">Your Store</h3>
                <p className="location-address">
                  National park, d1 588436, United States
                </p>
                <a
                  href="https://www.google.com/maps/place/National+Park+588436"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="view-map-btn"
                >
                  <i className="fa fa-map-marker"></i> View Google Map
                </a>
              </div>

              <div className="divider"></div>

              {/* Telephone */}
              <div className="location-box">
                <div className="location-icon-container">
                  <i className="fa fa-phone location-icon"></i>
                </div>
                <h3 className="location-title">Telephone</h3>
                <p className="location-contact">+1 (123) 8425733</p>
              </div>

              <div className="divider"></div>

              {/* Opening Times */}
              <div className="location-box">
                <div className="location-icon-container">
                  <i className="fa fa-clock-o location-icon"></i>
                </div>
                <h3 className="location-title">Opening Times</h3>
                <p className="location-hours">8:00 to 4:00</p>
              </div>
            </div>
          </div>

          {/* Contact Form Section */}
          <div className="contact-section form-section">
            <h2 className="section-title">Contact Form</h2>
            <div className="contact-form-container">
              {submitted ? (
                <div className="success-container">
                  <div className="success-icon">
                    <i className="fa fa-check-circle"></i>
                  </div>
                  <h3>Thank You!</h3>
                  <p className="success-msg">
                    Your message has been sent successfully. We'll get back to
                    you shortly.
                  </p>
                </div>
              ) : (
                <form className="contact-form" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="name">
                      <span className="required">*</span> Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="form-control"
                      name="name"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">
                      <span className="required">*</span> E-Mail Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="form-control"
                      name="email"
                      placeholder="Enter your email address"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="phone">
                      <span className="required">*</span> Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      className="form-control"
                      name="phone"
                      placeholder="Enter your phone number"
                      required
                    />
                  </div>

                  <div className="form-group flex-grow">
                    <label htmlFor="enquiry">
                      <span className="required">*</span> Enquiry
                    </label>
                    <textarea
                      id="enquiry"
                      className="form-control"
                      name="enquiry"
                      placeholder="How can we help you?"
                      required
                    ></textarea>
                  </div>

                  <div className="form-buttons">
                    <button type="submit" className="submit-btn">
                      <i className="fa fa-paper-plane"></i> Submit
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
