import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../Header.css";
const API = import.meta.env.VITE_API_URL;


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
      const res = await axios.get(`${API}/api/subcategory/all`, {
        withCredentials: true
      });

      const subcategories = res.data.data;
      //console.log("Fetched Subcategories:", subcategories);

      const grouped = subcategories.reduce((acc, curr) => {
        if (!curr.category || !curr.category.name) {
          // Skip subcategories with missing or invalid category
          return acc;
        }

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

      const formatted = Object.entries(grouped).map(([category, subs]) => ({
        category,
        subcategories: subs,
      }));

      setSareeCategories(formatted);
    } catch (error) {
      console.error("Error fetching subcategories:", error);
    }
  };

  //console.log("Saree Categories:", sareeCategories);

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
        <span>
          Shop{" "}
          <b
            className={`fa ${isDropdownOpen ? "fa-angle-up" : "fa-angle-down"
              }`}
          ></b>
        </span>

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
                          const formattedCategory = category.category.toLowerCase().replace(/\s+/g, '-');
                          const formattedSub = sub.name.toLowerCase().replace(/\s+/g, '-');

                          navigate(`/shop/${formattedCategory}/${formattedSub}`, {
                            state: {
                              sareeCategories,
                              category,
                              catoname: category.category,
                              subcatoname: sub.name,
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
