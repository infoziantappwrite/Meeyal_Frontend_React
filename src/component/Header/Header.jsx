import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Shop from "./Button/Shop";
import Search from "./Button/Search";
import Admin from "./Button/Admin";
import Card from "./Button/Card";
import Wishlist from "./Button/Wishlist";
import CurrencyButton from "./Button/CurrencyButton";
import NavBar from "./NavBar";
import "./Header.css";

const Header = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsSticky(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on window resize above md
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMobileMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <NavBar />
      <header
        className={`w-full bg-white z-50 transition-shadow duration-300 ${
          isSticky ? "sticky top-0 shadow-md" : ""
        }`}
      >
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          {/* Left: Logo */}
          <Link to="/" className="flex-shrink-0">
            <img
              src="/assets/images/logo.png"
              alt="Logo"
              className="h-15 w-auto object-contain"
            />
          </Link>

          {/* Center Spacer - hidden on mobile */}
          <div className="flex-grow hidden md:block" />

          {/* Hamburger Button - visible only on mobile */}
          <button
            className="md:hidden text-gray-800 focus:outline-none"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            {/* Hamburger icon */}
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>

          {/* Desktop nav + buttons - hidden on mobile */}
          <nav className="md:flex items-center gap-6 text-gray-800 text-[16px] font-medium">
            <Link to="/" className="relative group text-gray-800">
              Home
              <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-pink-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>

            <Shop />

            <Link to="/about" className="relative group text-gray-800">
              About
              <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-pink-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>

            <Link to="/contact" className="relative group text-gray-800">
              Contact
              <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-pink-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>

            <Search />
            <Admin />
            <Card />
            <CurrencyButton />
          </nav>
        </div>

        {/* Mobile menu - only show if open */}
        {mobileMenuOpen && (
          <nav className="md:hidden bg-white border-t border-gray-200 shadow-sm">
            <div className="flex flex-col space-y-4 px-6 py-4 text-gray-800 font-medium">
              <Link
                to="/"
                className="block border-b border-gray-200 pb-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>

              {/* You can replace these with the actual components if needed, or replicate their UI here */}
              <div onClick={() => setMobileMenuOpen(false)}>
                <Shop />
              </div>

              <Link
                to="/about"
                className="block border-b border-gray-200 pb-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>

              <Link
                to="/contact"
                className="block border-b border-gray-200 pb-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>

              <div onClick={() => setMobileMenuOpen(false)}>
                <Search />
              </div>
              <div onClick={() => setMobileMenuOpen(false)}>
                <Admin />
              </div>
              <div onClick={() => setMobileMenuOpen(false)}>
                <Card />
              </div>
              <div onClick={() => setMobileMenuOpen(false)}>
                <CurrencyButton />
              </div>
            </div>
          </nav>
        )}
      </header>
    </>
  );
};

export default Header;
