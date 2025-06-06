import React, { useState, useEffect, useRef } from "react";
import "./Header.css";
import { useCurrency } from "../../CurrencyContext";

// Dropdown Data
const currencies = [
  { symbol: "€", label: "Euro", rate: 1 / 0.92 * 83.05 },
  { symbol: "£", label: "Pound Sterling", rate: 1 / 0.78 * 83.05 },
  { symbol: "$", label: "US Dollar", rate: 83.05 },
  { symbol: "₹", label: "Indian Rupee", rate: 1 },
];



const NavBar = () => {
  const { currency, changeCurrency } = useCurrency();
  const [currencyOpen, setCurrencyOpen] = useState(false);

  const currencyRef = useRef(null);
 

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (currencyRef.current && !currencyRef.current.contains(event.target)) {
        setCurrencyOpen(false);
      }
      
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="Navbar-section">
      <div id="top">
        <div className="container">
          <div className="top-left">
            <div className="contact-info">
              <a href="tel:+1(123)8425733">
                <i className="fa fa-phone"></i>
                <span >+1 (123) 8425733</span>
              </a>
            </div>
          </div>
          <div className="top-right">
            {/* Currency Dropdown */}
            <div className="pull-left" ref={currencyRef}>
              <div className="btn-group">
                <button
                  className="btn btn-link dropdown-toggle"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent event bubbling
                    setCurrencyOpen(!currencyOpen);
                  }}
                >
                  <span className="symbol">{currency.symbol}</span>
                  <span className="drop-text">Currency</span>
                  <span className="code">{currency.label}</span>
                  <i className="fa fa-angle-down"></i>
                </button>
                {currencyOpen && (
                  <ul className="dropdown-menu show">
                    {currencies.map((curr, index) => (
                      <li key={index}>
                        <button
                          className="btn btn-link"
                          type="button"
                          onClick={() => {
                            changeCurrency(curr);
                            setCurrencyOpen(false);
                          }}
                        >
                          {curr.symbol} {curr.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>


          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
