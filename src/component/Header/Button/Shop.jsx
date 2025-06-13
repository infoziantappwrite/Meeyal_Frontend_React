import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";

const API = import.meta.env.VITE_API_URL;

const Shop = ({ setShowNav }) => {
  const navigate = useNavigate();
  const [sareeCategories, setSareeCategories] = useState([]);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const fetchSubcategoriesAndCategories = async () => {
    try {
      const res = await axios.get(`${API}/api/subcategory/all`, {
        withCredentials: true,
      });

      const subcategories = res.data.data;
      

      const grouped = subcategories.reduce((acc, curr) => {
        if (!curr.category || !curr.category.name) return acc;
        const categoryName = curr.category.name;
        if (!acc[categoryName]) acc[categoryName] = [];
        acc[categoryName].push({ id: curr._id, name: curr.name });
        return acc;
      }, {});

    //  console.log("grouped subcategories:", grouped);
     

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

  const handleCategoryClick = (categoryName) => {
    const formattedCategory = categoryName.toLowerCase().replace(/\s+/g, "-");
    navigate(`/shop/${formattedCategory}`, {
      state: {
        catoname: categoryName,
        sareeCategories,
      },
    });
    setDropdownOpen(false);
    if (setShowNav) setShowNav(false);
  };

  const handleSubcategoryClick = (category, sub) => {
    const formattedCategory = category.category.toLowerCase().replace(/\s+/g, "-");
    const formattedSub = sub.name.toLowerCase().replace(/\s+/g, "-");
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
    setDropdownOpen(false);
    if (setShowNav) setShowNav(false);
  };

  return (
    <div
      className="relative group font-sans"
      ref={dropdownRef}
      onMouseEnter={() => window.innerWidth >= 1024 && setDropdownOpen(true)}
      onMouseLeave={() => window.innerWidth >= 1024 && setDropdownOpen(false)}
    >
      <button
        type="button"
        className="flex items-center text-gray-700 hover:text-pink-600 font-medium text-lg transition-colors duration-200 focus:outline-none relative py-1"
        onClick={(e) => {
          e.stopPropagation();
          if (window.innerWidth < 1024) setDropdownOpen((prev) => !prev);
        }}
        aria-expanded={isDropdownOpen}
        aria-haspopup="true"
      >
        Shop
        {window.innerWidth >= 1024 ? (
          isDropdownOpen ? (
            <FaAngleUp className="ml-1 text-xs transition-transform duration-200" />
          ) : (
            <FaAngleDown className="ml-1 text-xs transition-transform duration-200" />
          )
        ) : null}
        <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-pink-600 transition-all duration-300 group-hover:w-full"></span>
      </button>

      <div
        className={`absolute left-1/2 -translate-x-1/2 w-max min-w-[320px] md:min-w-[760px] lg:min-w-[960px]
                    bg-white border border-gray-200 shadow-2xl z-50 p-6 rounded-xl
                    transition-all duration-300 ease-in-out origin-top
                    ${
                      isDropdownOpen
                        ? "opacity-100 scale-100 visible pointer-events-auto"
                        : "opacity-0 scale-95 invisible pointer-events-none"
                    }`}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 lg:gap-10" role="menu">
          {/* Handwoven */}
          <div className="flex flex-col gap-2 pr-4">
            <h4 className="font-bold text-gray-900 text-xl mb-2">Handwoven</h4>
            <ul className="space-y-1">
              <li>
                <button
                  className="block w-full text-left py-2 px-3 text-base text-gray-700 hover:bg-pink-50 hover:text-pink-600 rounded-md transition"
                  onClick={() => handleCategoryClick("handwoven-silk")}
                >
                  Silk Sarees
                </button>
              </li>
              <li>
                <button
                  className="block w-full text-left py-2 px-3 text-base text-gray-700 hover:bg-pink-50 hover:text-pink-600 rounded-md transition"
                  onClick={() => handleCategoryClick("handwoven-cotton")}
                >
                  Cotton Sarees
                </button>
              </li>
              <li>
                <p className="text-sm text-gray-500 italic px-3">More styles coming soon!</p>
              </li>
            </ul>
          </div>

          {/* Weaves */}
          <div className="flex flex-col gap-2 px-4">
            <h4 className="font-bold text-gray-900 text-xl mb-2">Weaves</h4>
            <ul className="space-y-1">
              {sareeCategories.length > 0 ? (
                sareeCategories.map((category) => (
                  <li key={category.category}>
                    <button
                      className="block w-full text-left py-2 px-3 text-base text-gray-700 hover:bg-pink-50 hover:text-pink-600 rounded-md transition"
                      onClick={() => handleCategoryClick(category.category)}
                    >
                      {category.category}
                    </button>
                  </li>
                ))
              ) : (
                <li>
                  <p className="text-sm text-gray-500 italic px-3">No categories found.</p>
                </li>
              )}
            </ul>
          </div>

          {/* Colors */}
          <div className="flex flex-col gap-2 pl-4">
            <h4 className="font-bold text-gray-900 text-xl mb-2">Colors</h4>
            <ul className="grid grid-cols-2 gap-3">
              {["Red", "Blue", "Green", "Yellow", "Pink", "Black", "White", "Purple"].map(
                (color) => (
                  <li key={color}>
                    <button
                      className="flex items-center space-x-2 py-2 px-3 text-base text-gray-700 hover:bg-pink-50 hover:text-pink-600 rounded-md transition"
                      onClick={() => handleCategoryClick(`color-${color.toLowerCase()}`)}
                    >
                      <span
                        className="w-4 h-4 rounded-full border border-gray-300"
                        style={{ backgroundColor: color.toLowerCase() }}
                      ></span>
                      <span>{color}</span>
                    </button>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
