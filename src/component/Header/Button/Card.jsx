import React from "react";
import { Link } from "react-router-dom";

const Card = () => {
  return (
    <div>
      <div className="cart-content">
        <div id="cart" className="btn-group btn-block">
          {/* ✅ Wrap the button with Link to navigate to "/cart" */}
          <Link to="/cart" className="btn btn-inverse btn-block btn-lg dropdown-toggle">
            <i className="fa-solid fa-cart-shopping"></i>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
