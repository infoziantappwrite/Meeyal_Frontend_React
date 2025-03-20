import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../Header.css";
import { databases, DatabaseId, categoriesCollectionId, subcategoriesCollectionId } from "../../../appwriteConfig";

const Shop = () => {
    const navigate = useNavigate();
    const [sareeCategories, setSareeCategories] = useState([]);
    const [isDropdownOpen, setDropdownOpen] = useState(false);

    // ✅ Fetch subcategories first and then get categories
    const fetchSubcategoriesAndCategories = async () => {
        try {
            // 1️⃣ Fetch all subcategories
            const subcategoriesResponse = await databases.listDocuments(DatabaseId, subcategoriesCollectionId);
            const subcategories = subcategoriesResponse.documents;
            

            // 2️⃣ Extract unique category IDs from subcategories
            const categoryName = [...new Set(subcategories.map((sub) => sub.categories.name))];
            
            

            // 4️⃣ Match subcategories with their respective category
            const formattedCategories = categoryName.map((category) => ({
                category: category, // Category name
                subcategories: subcategories
                    .filter((sub) => sub.categories.name === category) // Match category ID
                    .map((sub) => ({
                        id: sub.$id,
                        name: sub.name,
                    })),
            }));
            

            setSareeCategories(formattedCategories);
        } catch (error) {
            console.error("Error fetching subcategories and categories:", error);
        }
    };

    // ✅ Fetch data when the component mounts
    useEffect(() => {
        fetchSubcategoriesAndCategories();
    }, []);

    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };

    return (
        <div className="shop-section">
            <li className={`with-sub-menu click ${isDropdownOpen ? "open" : ""}`} onClick={toggleDropdown}>
                <p className="close-menu" onClick={(e) => { e.stopPropagation(); setDropdownOpen(false); }}></p>
                <strong className="shop-text" onClick={(e) => { e.stopPropagation(); toggleDropdown(); }}>Shop</strong>
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
                                                                    {/* 🔹 Navigate to subcategory page */}
                                                                    <button
                                                                        className="sub-item-btn"
                                                                        onClick={() => navigate(`/shop/SingplesareePage/${sub.id}`)}
                                                                    >
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
