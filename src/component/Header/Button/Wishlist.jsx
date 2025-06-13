import React from "react";
import { Link } from "react-router-dom";

const Wishlist = () => {
  return (
    <div>
      <div className="wishlist-content">
        <div id="wishlist" className="btn-group btn-block">
          <Link
            to="/wishlist"
            className="btn-xlg"
            style={{
              height: "18px",      // increase height
              width: "18px",       // optional: make it a square
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "21px"     // make icon larger if needed
            }}
          >
            <i className="fa-solid fa-heart"></i>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
