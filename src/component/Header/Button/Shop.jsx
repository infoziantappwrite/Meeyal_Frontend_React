import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ Import useNavigate
import "../Header.css";

const Shop = () => {
    const navigate = useNavigate(); // ✅ Initialize useNavigate

    const sareeCategories = [
        {
            category: "Banarasi Saree",
            subcategories: [
                { id: 1, name: "Net Saree" },
                { id: 2, name: "Kasavu Saree" },
                { id: 3, name: "Patola Saree" },
                { id: 4, name: "Paithani Saree" },
                { id: 5, name: "Bandhani Saree" }
            ]
        },
        {
            category: "Chanderi Saree",
            subcategories: [
                { id: 6, name: "Gadwal Saree" },
                { id: 7, name: "Clove" },
                { id: 8, name: "Phulkari Saree" },
                { id: 9, name: "Puttapaka Saree" },
                { id: 10, name: "Konard Saree" }
            ]
        },
    ];

    const [isDropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };

    return (
        <div className='shop-section'>
            <li className={`with-sub-menu click ${isDropdownOpen ? "open" : ""}`} onClick={toggleDropdown}>
                <p className="close-menu" onClick={(e) => { e.stopPropagation(); setDropdownOpen(false); }}></p>
                <strong className='shop-text' onClick={(e) => { e.stopPropagation(); toggleDropdown(); }}>Shop</strong>
                <b className="fa fa-angle-down" onClick={(e) => { e.stopPropagation(); toggleDropdown(); }}></b>

                {/* Submenu */}
                <div className={`sub-menu ${isDropdownOpen ? "show" : "hide"}`}>
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="categories hot">
                                <div className="row">
                                    {sareeCategories.map((category, index) => (
                                        <div key={index} className="col-sm-4 static-menu">
                                            <div className="menu">
                                                <ul>
                                                    <li>
                                                        <span className="main-menu">{category.category}</span>
                                                        <ul style={{ listStyle: "square" }}>
                                                            {category.subcategories.map((sub) => (
                                                                <li key={sub.id}>
                                                                    {/* 🔹 Navigate to /shop/SingplesareePage/id */}
                                                                    <button className="sub-item-btn"
                                                                        onClick={() => navigate(`/shop/SingplesareePage/${sub.id}`)}>
                                                                        {sub.name}
                                                                    </button>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </li>

            
        </div>
    );
};

export default Shop;
