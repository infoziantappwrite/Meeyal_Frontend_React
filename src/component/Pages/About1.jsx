import React, { useState, useEffect } from "react";
import "./About1.css";

const About1 = () => {
  const [aboutData, setAboutData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/data/about1.json");
        if (!response.ok) throw new Error("Failed to fetch about data");
        const data = await response.json();
        setAboutData(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching about data:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  if (!aboutData) {
    return <div>Unable to load about information. Please try again later.</div>;
  }

  return (
    <div className="about-page">
      {/* Hero Section */}
      <div
        className="about-hero"
        style={{ backgroundImage: `url(${aboutData.banner})` }}
      >
        <div className="about-hero-overlay"></div>
        <div className="container">
          <div className="hero-content">
            <h1>{aboutData.title}</h1>
            <p className="subtitle">{aboutData.subtitle}</p>
            <p className="established">{aboutData.established}</p>
          </div>
        </div>
      </div>

      {/* Our Story Section */}
      <div className="our-story section">
        <div className="container">
          <div className="section-header">
            <h2>Our Story</h2>
            <div className="divider">
              <span className="divider-dot"></span>
            </div>
          </div>
          <div className="story-content">
            <div className="story-text">
              <p>{aboutData.story}</p>
            </div>
            <div className="mission-vision">
              <div className="mission">
                <h3>Our Mission</h3>
                <p>{aboutData.mission}</p>
              </div>
              <div className="vision">
                <h3>Our Vision</h3>
                <p>{aboutData.vision}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Our Values Section */}
      <div className="our-values section bg-light">
        <div className="container">
          <div className="section-header">
            <h2>Our Values</h2>
            <div className="divider">
              <span className="divider-dot"></span>
            </div>
          </div>
          <div className="values-grid">
            {aboutData.values.map((value, index) => (
              <div className="value-card" key={index}>
                <div className="value-icon">
                  <i className={`fa fa-${value.icon}`}></i>
                </div>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Our Process Section */}
      <div className="our-process section">
        <div className="container">
          <div className="section-header">
            <h2>Our Process</h2>
            <div className="divider">
              <span className="divider-dot"></span>
            </div>
          </div>
          <div className="process-timeline">
            {aboutData.process.map((item, index) => (
              <div className="process-step" key={index}>
                <div className="step-number">{index + 1}</div>
                <div className="step-content">
                  <h3>{item.step}</h3>
                  <p>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Our Team Section */}
      <div className="our-team section bg-light">
        <div className="container">
          <div className="section-header">
            <h2>Meet Our Team</h2>
            <div className="divider">
              <span className="divider-dot"></span>
            </div>
          </div>
          <div className="team-grid">
            {aboutData.team.map((member, index) => (
              <div className="team-card" key={index}>
                <div className="team-img">
                  <img
                    src={member.image}
                    alt={member.name}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/api/placeholder/200/200";
                    }}
                  />
                </div>
                <div className="team-info">
                  <h3>{member.name}</h3>
                  <p className="position">{member.position}</p>
                  <p className="bio">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Achievements Section */}
      <div className="achievements section bg-light">
        <div className="container">
          <div className="section-header">
            <h2>Our Achievements</h2>
            <div className="divider">
              <span className="divider-dot"></span>
            </div>
          </div>
          <div className="achievements-list">
            {aboutData.achievements.map((achievement, index) => (
              <div className="achievement-item" key={index}>
                <div className="achievement-icon">
                  <i className="fa fa-trophy"></i>
                </div>
                <p>{achievement}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About1;
