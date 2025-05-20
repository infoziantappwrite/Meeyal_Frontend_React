import React, { useEffect, useState } from "react";
import "./About.css";

const About = () => {
  const [aboutData, setAboutData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the about data from the JSON file
    fetch("/data/about.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch about data");
        }
        return response.json();
      })
      .then((data) => {
        setAboutData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error loading about data:", error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="about-loading">
        <div className="container">
          <div className="spinner"></div>
          <p>Loading about page content...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="about-error">
        <div className="container">
          <h2>Something went wrong</h2>
          <p>{error}</p>
          <p>Please try refreshing the page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="about-page">
      {/* Hero Section */}
      <div
        className="about-hero"
        style={{ backgroundImage: `url(${aboutData.heroImage})` }}
      >
        <div className="container">
          <div className="about-hero-content">
            <h1>{aboutData.heroTitle}</h1>
            <div className="breadcrumb-nav">
              <a href="/">
                <i className="fa fa-home"></i>
              </a>
              <i className="fa fa-angle-right"></i>
              <span>About Us</span>
            </div>
          </div>
        </div>
      </div>

      {/* Our Story Section */}
      <div className="about-section our-story">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="section-image">
                <img
                  src={aboutData.storyImage}
                  alt="Our Story"
                  className="img-responsive"
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="section-content">
                <h2>{aboutData.storyTitle}</h2>
                <p>{aboutData.storyContent}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Our Mission Section */}
      <div className="about-section our-mission">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="section-content">
                <h2>{aboutData.missionTitle}</h2>
                <p>{aboutData.missionContent}</p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="section-image">
                <img
                  src={aboutData.missionImage}
                  alt="Our Mission"
                  className="img-responsive"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="about-section our-team">
        <div className="container">
          <h2 className="section-title">{aboutData.teamTitle}</h2>
          <div className="centered-subtitle">
            <strong>
              The passionate individuals behind our brand who work tirelessly to
              bring you the best products and shopping experience.
            </strong>
          </div>

          <div className="row team-members">
            {aboutData.teamMembers.map((member, index) => (
              <div className="col-md-3 col-sm-6" key={index}>
                <div className="team-member">
                  <div className="member-image">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="img-responsive"
                    />
                  </div>
                  <div className="member-info">
                    <h3>{member.name}</h3>
                    <p className="position">{member.position}</p>
                    <p className="bio">{member.bio}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="about-section our-values">
        <div className="container">
          <h2 className="section-title">{aboutData.valuesTitle}</h2>
          <div className="centered-subtitle">
            <strong>
              These principles guide everything we do and every decision we
              make.
            </strong>
          </div>

          <div className="row values-items">
            {aboutData.values.map((value, index) => (
              <div className="col-md-4" key={index}>
                <div className="value-item">
                  <div className="value-icon">
                    <img src={value.icon} alt={value.title} />
                  </div>
                  <h3>{value.title}</h3>
                  <p>{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
