import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../Header.css";
import { databases, DatabaseId, subcategoriesCollectionId } from "../../../appwriteConfig";

const Shop = () => {
    const navigate = useNavigate();
    const [sareeCategories, setSareeCategories] = useState([]);
    const [isDropdownOpen, setDropdownOpen] = useState(false);

    // ✅ Fetch subcategories first and then get categories
    const fetchSubcategoriesAndCategories = async () => {
        try {
            const subcategoriesResponse = await databases.listDocuments(DatabaseId, subcategoriesCollectionId);
            const subcategories = subcategoriesResponse.documents;


            const categoryNames = [...new Set(subcategories.map((sub) => sub.categories.name))];

            // Match subcategories with their respective category
            const formattedCategories = categoryNames.map((category) => ({
                category, // Category name
                subcategories: subcategories
                    .filter((sub) => sub.categories.name === category) // Match category
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

    return (
        <div
            className="shop-section"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
        >
            <div className={`with-sub-menu ${isDropdownOpen ? "open" : ""}`}>
               
                    Shop <b className={`fa ${isDropdownOpen ? "fa-angle-up" : "fa-angle-down"}`}></b>
                {/* Submenu */}
                <div className="sub-menu">
                    <div className="categories">
                        {sareeCategories.map((category, index) => (
                            <div key={index} className="static-menu">
                                <span className="main-menu">{category.category}</span>
                                <ul>
                                    {category.subcategories.map((sub) => (
                                        <li key={sub.id}>
                                            <button
                                                className="sub-item-btn"
                                                onClick={() => navigate(`/shop/SingplesareePage/${sub.id}`)}
                                            >
                                                {sub.name}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Shop;
