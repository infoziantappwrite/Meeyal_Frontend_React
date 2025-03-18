import React from "react";
import { useParams } from "react-router-dom";

const SingleSareePage = () => {
  const { id } = useParams(); // Get the saree ID from URL

  return (
    <div className="single-saree-page" style={{ padding: "20px", textAlign: "center" }}>
      <h2>Saree Details</h2>
      <p>Showing details for Saree ID: <strong>{id}</strong></p>
      {/* TODO: Fetch and display saree details based on ID */}
    </div>
  );
};

export default SingleSareePage;
