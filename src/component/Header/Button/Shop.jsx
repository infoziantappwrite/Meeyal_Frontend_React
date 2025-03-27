import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../Header.css";
import { databases, DatabaseId, subcategoriesCollectionId } from "../../../appwriteConfig";

const Shop = ({ setShowNav }) => {
    const navigate = useNavigate();
    const [sareeCategories, setSareeCategories] = useState([]);
    const [isDropdownOpen, setDropdownOpen] = useState(false);

    const handleClickOutside = (event) => {
        if (!event.target.closest(".shop-section")) {
            setDropdownOpen(false);
           
        }
    };

    useEffect(() => {
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

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
             onClick={(e) => {
                e.stopPropagation(); // Prevent closing when clicking inside
                setDropdownOpen(prev => !prev);
            }}
            
        >
            <div className={`with-sub-menu ${isDropdownOpen ? "open" : ""}`}>

                <li>Shop <b className={`fa ${isDropdownOpen ? "fa-angle-up" : "fa-angle-down"}`}></b></li>
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
                                                onClick={() =>
                                                   {navigate(`/shop/${category.category}/${sub.name}`, {
                                                        state: {
                                                            sareeCategories,
                                                            category,
                                                            relatedSubcategories: category.subcategories,
                                                            catid: sub.id
                                                        },
                                                    });
                                                    setShowNav(false);
                                                }
                                                }
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
