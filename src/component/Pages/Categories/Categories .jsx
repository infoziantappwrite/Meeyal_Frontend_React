import React from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import CategorySection from "./CategorySection";
import CategoryBanner from "./CategoryBanner,";
import ProductList from "./ProductList";
import FilterComponent from "./FilterComponent";
import Bestsellers from "./Bestsellers";
import OfferBanner from "./OfferBanner";


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
    const subcategory = category?.subcategories.find(sub => sub.id === categoryID) || {};
    //console.log(subcategory);
    const subcategoryName = subcategory.name || "";
    //console.log(categoryID)
    const applyFilters = (selectedFilters) => {
        console.log("Applied Filters:", selectedFilters);
        // Implement filtering logic here
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
                            <CategorySection sareeCategories={sareeCategories} />
                            <FilterComponent onApplyFilters={applyFilters} />
                            <Bestsellers></Bestsellers>
                            <OfferBanner/>
                            
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
                            <div class="category-info">
                                <div class="row">
                                    <div class="col-sm-2 col-xs-5 category-list-grid text-start">
                                        <div class="btn-group btn-group-sm">
                                            <button type="button" id="grid-view" class="btn btn-default active"
                                                data-toggle="tooltip" title="" data-original-title="Grid"><i
                                                    class="icon-grid"></i></button>
                                            <button type="button" id="list-view" class="btn btn-default" data-toggle="tooltip"
                                                title="" data-original-title="List"><i class="icon-list"></i></button>
                                        </div>
                                    </div>
                                    <div class="col-sm-3 col-xs-7 category-compare">
                                        <div class="form-group"><a href="category.html#" id="compare-total" class="btn btn-link">Product
                                            Compare (0)</a></div>
                                    </div>
                                    <div class="col-sm-7 col-xs-12 category-sorting">
                                        <div class="sort-cat">
                                            <div class="text-category-sort">
                                                <label class="input-group-addon" for="input-sort">Sort By:</label>
                                            </div>
                                            <div class="select-cat-sort">
                                                <select id="input-sort" class="form-control" onchange="location = this.value;">
                                                    <option value="#" selected="selected">Default</option>
                                                    <option value="#">
                                                        Name (A - Z)</option>
                                                    <option value="#">
                                                        Name (Z - A)</option>
                                                    <option value="#">
                                                        Price (Low &gt; High)</option>
                                                    <option value="#">
                                                        Price (High &gt; Low)</option>
                                                    <option value="#">
                                                        Rating (Highest)</option>
                                                    <option value="#">
                                                        Rating (Lowest)</option>
                                                    <option value="#">
                                                        Model (A - Z)</option>
                                                    <option value="#">
                                                        Model (Z - A)</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="limit-cat">
                                            <div class="text-category-limit">
                                                <label class="input-group-addon" for="input-limit">Show:</label>
                                            </div>
                                            <div class="select-cat-limit">
                                                <select id="input-limit" class="form-control" onchange="location = this.value;">
                                                    <option value="#" selected="selected">12</option>
                                                    <option value="#">
                                                        25</option>
                                                    <option value="#">
                                                        50</option>
                                                    <option value="#">
                                                        75</option>
                                                    <option value="#">
                                                        100</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <ProductList subcatid={categoryID}></ProductList>

                        </div>

                    </div>
                </div>
            </div>

            {/* Subcategory Details */}

        </section>
    );
};

export default Categories;
