import React from "react";
import { Link } from "react-router-dom"; // ✅ Import Link
import "../Header.css";

const Home = () => {
  return (
    <div className="home-section">
      <li className="home current-active active-first">
        <Link to="/">
          <span>
            <strong className="home-text">Home</strong>
          </span>
        </Link>
      </li>
    </div>
  );
};

export default Home;
