import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../Header.css";

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

  const fetchSubcategoriesAndCategories = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/subcategory/all", {
        withCredentials: true
      });

      const subcategories = res.data.data;

      // Group by category name
      const grouped = subcategories.reduce((acc, curr) => {
        const categoryName = curr.category.name;
        if (!acc[categoryName]) {
          acc[categoryName] = [];
        }
        acc[categoryName].push({
          id: curr._id,
          name: curr.name,
        });
        return acc;
      }, {});

      // Convert to array of objects
      const formatted = Object.entries(grouped).map(([category, subs]) => ({
        category,
        subcategories: subs,
      }));

      setSareeCategories(formatted);
    } catch (error) {
      console.error("Error fetching subcategories:", error);
    }
  };

  useEffect(() => {
    fetchSubcategoriesAndCategories();
  }, []);

  return (
    <div
      className="shop-section"
      onClick={(e) => {
        e.stopPropagation();
        setDropdownOpen((prev) => !prev);
      }}
    >
      <div className={`with-sub-menu ${isDropdownOpen ? "open" : ""}`}>
        <li>
          Shop{" "}
          <b
            className={`fa ${
              isDropdownOpen ? "fa-angle-up" : "fa-angle-down"
            }`}
          ></b>
        </li>

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
                        onClick={() => {
                          navigate(`/shop/${category.category}/${sub.name}`, {
                            state: {
                              sareeCategories,
                              category,
                              relatedSubcategories: category.subcategories,
                              catid: sub.id,
                            },
                          });
                          setShowNav(false);
                        }}
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
