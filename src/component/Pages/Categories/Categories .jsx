import React from "react";
import {  useLocation, Link, useNavigate } from "react-router-dom";
import CategorySection from "./CategorySection";
import CategoryBanner from "./CategoryBanner,";


const Categories = () => {
    const navigate = useNavigate();
    const location = useLocation();
   

    // Get saree categories from the navigation state
    const sareeCategories = location.state?.sareeCategories || [];
    const category = location.state?.category || {};
    //console.log(category);
    const categoryName = category.category || "";
    const relatedSubcategories = location.state?.relatedSubcategories || [];
    const categoryID = location.state?.catid || "";
    const subcategory = category?.subcategories.find(sub => sub.id ===categoryID) || {};
    //console.log(subcategory);
    const subcategoryName = subcategory.name || "";
    console.log(categoryID)

    return (
        <section>
            {/* Breadcrumb Section */}
            <div className="breadcrumb-main">
                <div className="container">
                    <div className="breadcrumb-container">
                        <h2 className="page-title">{subcategoryName}</h2>
                        <ul className="breadcrumb">
                            <li className="breadcrumb-item">
                                <Link to="/">
                                    <i className="fas fa-home"></i>
                                </Link>
                            </li>
                            <li className="breadcrumb-item">
                            <Link to="#" onClick={(e) => e.preventDefault()}>{categoryName}</Link>
                            </li>
                            <li className="breadcrumb-item active"><Link to="#" onClick={(e) => e.preventDefault()}>{subcategoryName}</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="blog-section donuts">
                <div class="container">
                    <div class="row">
                        <aside id="column-left" class="col-sm-3">
                            <CategorySection sareeCategories={sareeCategories} />
                        </aside>
                        <div id="content" class="col-sm-9  all-blog">
                            <CategoryBanner></CategoryBanner>
                            <div className="category-refine mt-5">
                                <h3>Refine Search</h3>
                                <div className="row">
                                    <div className="col-sm-12">
                                        <ul>
                                            {relatedSubcategories.map((sub, index) => (
                                                <li key={index}>
                                                    <a
                                                        href="#"
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            navigate(`/shop/${location.state.category.category}/${sub.name}`, {
                                                                state: {
                                                                    sareeCategories: location.state.sareeCategories,
                                                                    category: location.state.category,
                                                                    relatedSubcategories: location.state.category.subcategories,
                                                                    catid: sub.id,
                                                                },
                                                            });
                                                        }}
                                                    >
                                                        {sub.name}
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                           
                        </div>

                    </div>
                </div>
            </div>

            {/* Subcategory Details */}

        </section>
    );
};

export default Categories;
