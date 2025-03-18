import React, { useEffect, useState } from "react";
import "./Header.css";
import Blog from "./NavBar";
import Home from "./Button/Home";
import Shop from "./Button/Shop";
import Search from "./Button/Search";
import Admin from "./Button/Admin";
import Card from "./Button/Card";



const Header = () => {
            
    const [isSticky, setIsSticky] = useState(false);



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
        <div>
            <Blog />

            <div className="header-section">
                <header className={`main-header ${isSticky ? "sticky" : ""}`}>
                    <div className="container">
                        <div className="header-inner">
                            
                            <div className="header-left">
                                <div id="logo">
                                    <a href="index.html">
                                        <img src="assets/images/logo.png" title="Your Store" alt="Your Store" className="img-responsive" />
                                    </a>
                                </div>
                            </div>
                            <div className="header-center">
                                <div className="vipodha_megamenu-style-dev">
                                    <div className="responsive vipodha_default">

                                        <div className="navbar-default">
                                            <div className=" container-vipodha_megamenu   horizontal ">

                                                <div className="vipodha_megamenu-wrapper megamenu_typeheader">

                                                    <span id="remove-vipodha_megamenu" className="fa fa-times"></span>

                                                    <div className="vipodha_megamenu-pattern">
                                                        <div className="container">
                                                            <ul className="vipodha_megamenu" data-megamenuid="55" data-transition="slide" data-animationtime="500">
                                                                {/* Home Link */}
                                                              <Home />
                                                                {/* Shop Dropdown */}
                                                               <Shop />
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="header-right">
                               <Search />

                         <Admin />
                              <Card />
                            </div>
                        </div>
                    </div>
                </header>
            </div>
        </div>
    );
};

export default Header;
