import React, { useState,useEffect } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import CategoryBanner from "./CategoryBanner,";
import ProductList from "./ProductList";
import FilterComponent from "./FilterComponent";
import Bestsellers from "./Bestsellers";


const Categories = () => {
   
    const navigate = useNavigate();
    const location = useLocation();
    
    // Extract data from location state
    const category = location.state?.category || null;
    const categoryID = location.state?.catid || "";
    const relatedSubcategories = location.state?.relatedSubcategories || [];
    
    // Get category and subcategory names
    const categoryName = category?.category || "";
    const subcategory = category?.subcategories?.find(sub => sub.id === categoryID) || null;
    const subcategoryName = subcategory?.name || "";

    // If any required data is missing, redirect to home
    useEffect(() => {
        if (!category || !categoryID || !subcategory) {
            navigate("/");
        }
    }, [category, categoryID, subcategory, navigate]);



    const [filters, setFilters] = useState({
        price: { min: 0, max: Infinity },
        sort: "default",
        limit: 12,
      });
    
      // Function to apply filters
      const handleApplyFilters = (newFilters) => {
        console.log("New Filters Applied:", newFilters);
        setFilters(prevFilters => {
            if (JSON.stringify(prevFilters) !== JSON.stringify(newFilters)) {
                return newFilters;
            }
            return prevFilters;
        });
    };
    


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
                        <Bestsellers></Bestsellers>
                        
                            
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
                        <FilterComponent onApplyFilters={handleApplyFilters} />
                        <ProductList subcatid={categoryID} filter={filters}></ProductList>

                    </div>
                </div>
            </div>

            {/* Subcategory Details */}

        </section>
    );
};

export default Categories;
