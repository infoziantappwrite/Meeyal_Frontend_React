import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CategorySection = ({ sareeCategories }) => {
    const [activeIndex, setActiveIndex] = useState(null);
    const navigate=useNavigate();

    const toggleCategory = (index) => {
        setActiveIndex(prevIndex => (prevIndex === index ? null : index)); // Close previous and open new
    };

    return (
        <div className="category-content">
            <div className="box-category">
                <h3 className="toggled relative">Categories</h3>
                <ul className="list-unstyled parent" id="select-category">
                    {sareeCategories.map((category, index) => (
                        <li key={index} className={category.subcategories.length > 0 ? "has-more-category" : ""}>
                            <a
                                href="#"
                                className="list-group-item main-item"
                                onClick={(e) => {
                                    e.preventDefault();
                                    toggleCategory(index);
                                }}
                            >
                                {category.category}
                                {category.subcategories.length > 0 && (
                                    <span className="toggled">
                                        <i className={`fa ${activeIndex === index ? "fa-minus" : "fa-plus"}`}></i>
                                    </span>
                                )}
                            </a>
                            {category.subcategories.length > 0 && (
                                <ul
                                    className="list-unstyled child-categories group"
                                    style={{
                                        display: activeIndex === index ? "block" : "none",
                                        transition: "all 0.3s ease-in-out"
                                    }}
                                >
                                    {category.subcategories.map((sub, subIndex) => (
                                        <li key={subIndex}>
                                            <a href="#" className="list-group-item"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                navigate(`/shop/${category.category}/${sub.name}`, {
                                                    state: {
                                                        sareeCategories,
                                                        category,
                                                        relatedSubcategories: category.subcategories,
                                                        catid: sub.id
                                                    },
                                                });
                                            }}>
                                                &nbsp;&nbsp; {sub.name}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default CategorySection;
