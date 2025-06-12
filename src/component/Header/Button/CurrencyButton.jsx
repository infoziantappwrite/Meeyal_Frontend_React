import React, { useState, useEffect, useRef } from "react";
import { useCurrency } from "../../../CurrencyContext";

const currencies = [
  { symbol: "€", label: "Euro", rate: (1 / 0.92) * 83.05 },
  { symbol: "£", label: "Pound Sterling", rate: (1 / 0.78) * 83.05 },
  { symbol: "$", label: "US Dollar", rate: 83.05 },
  { symbol: "₹", label: "Indian Rupee", rate: 1 },
];

const CurrencyButton = () => {
  const { currency, changeCurrency } = useCurrency();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="px-3 py-1 text-sm font-medium text-gray-700 hover:text-black flex items-center gap-1"
      >
        <span className="text-lg">{currency.symbol}</span>
        <span>{currency.label}</span>
        <svg
          className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
  <ul className="absolute right-0 mt-3 w-56 bg-white border border-gray-100 rounded-xl shadow-2xl z-[9999] overflow-hidden list-none p-0 m-0">
    {currencies.map((curr, index) => (
      <li key={index} className="border-b last:border-b-0 border-gray-100">
        <button
          onClick={() => {
            changeCurrency(curr);
            setOpen(false);
          }}
          className={`w-full px-5 py-3 flex items-center gap-3 text-sm transition-all duration-200 
            hover:bg-gradient-to-r hover:from-pink-50 hover:to-pink-100 hover:text-pink-700
            ${
              currency.label === curr.label
                ? "bg-pink-100 text-pink-800 font-semibold"
                : "text-gray-800"
            }`}
        >
          <div
            className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center text-lg font-bold text-pink-600"
          >
            {curr.symbol}
          </div>
          <span className="tracking-wide">{curr.label}</span>
        </button>
      </li>
    ))}
  </ul>
)}

    </div>
  );
};

export default CurrencyButton;
