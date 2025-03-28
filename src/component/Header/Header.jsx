import React, { useEffect, useState } from "react";
import { FaTimes, FaBars } from "react-icons/fa"; // Import icons
import { Link } from "react-router-dom";
import "./Header.css";
import NavBar from "./NavBar";
import Shop from "./Button/Shop";
import Search from "./Button/Search";
import Admin from "./Button/Admin";
import Card from "./Button/Card";



const Header = () => {

    const [isSticky, setIsSticky] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [showNav, setShowNav] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 993);

    // ✅ Detect screen width and update state
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 993);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);


    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {  // When scrolled more than 50px
                setIsSticky(true);
            } else {
                setIsSticky(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <div className="top-nav">
            <NavBar />

            <div className="header-section">
                <header className={`main-header ${isSticky ? "sticky" : ""}`}>
                    <div className="container">
                        <div className="header-inner">

                            <div className="header-left">
                                <div id="logo">
                                    <a href="index.html">
                                    <img src="/assets/images/logo.png" title="Your Store" alt="Your Store" className="img-responsive" />

                                    </a>
                                </div>
                            </div>
                            <div className="header-center">
                                <div className="vipodha_megamenu-style-dev">
                                    <div className="responsive vipodha_default">
                                        <div className="navbar-default">
                                            <div className="container-vipodha_megamenu horizontal">
                                                <div className="vipodha_megamenu-wrapper megamenu_typeheader">
                                                    {/* Mobile Menu Icon */}
                                                    <div className="menu-icon" onClick={() => setIsOpen(!isOpen)}>
                                                        {isOpen ? <FaTimes className="close-icon" /> : <FaBars className="bar-icon" />}
                                                    </div>

                                                    {/* Navigation Links */}
                                                    <div className={`nav-links ${isOpen ? "open" : ""}`}>
                                                        <ul className="vipodha_megamenu">
                                                            <li className="li"><Link to="/" onClick={() => setShowNav(false)}>Home</Link></li>
                                                            <li className="li"><a><Shop setShowNav={setShowNav}/></a></li>
                                                            <li className="li"><Link to="/about" onClick={() => setShowNav(false)}>About</Link></li>
                                                            <li className="li"><Link to="/contact" onClick={() => setShowNav(false)}>Contact</Link></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="header-right">
                                {isMobile && (
                                    <button className="hamburger-menu" onClick={() => setShowNav(!showNav)}>
                                        {showNav ? <FaTimes size={24} /> : <FaBars size={24} />}
                                    </button>
                                )}
                                <Search />
                                <Admin />
                                <Card />
                            </div>
                        </div>
                    </div>
                    {showNav && (
                        <nav className="mobile-nav">
                            <ul className="ul">
                                <li className="li"><Link to="/" onClick={() => setShowNav(false)}>Home</Link></li>
                                <li className="li"  ><Shop setShowNav={setShowNav}/></li>
                                <li className="li"><Link to="/about" onClick={() => setShowNav(false)}>About</Link></li>
                                <li className="li"><Link to="/contact" onClick={() => setShowNav(false)}>Contact</Link></li>
                            </ul>
                        </nav>
                    )}
                </header>
            </div>
        </div>
    );
};

export default Header;
