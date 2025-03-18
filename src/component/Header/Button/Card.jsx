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
            <span id="cart-total">
              0<span className="hidden">item(s) - $0.00</span>
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
