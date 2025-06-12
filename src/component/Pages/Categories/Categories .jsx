import React, { useEffect, useState, useCallback } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import "./css/Categories.css";
import FilterComponent from "./FilterComponent";
import Bestsellers from "./Bestsellers";
import CategoryBanner from "./CategoryBanner";
import ProductList from "./ProductList";
import { useNavigate } from "react-router-dom";
const AdminAPI = import.meta.env.VITE_Admin_API_URL;


const Categories = () => {
  const location = useLocation();
  const navigate = useNavigate();



  const subCategoryId = location?.state?.catid || null;
  //console.log("subCategoryId :", subCategoryId); 

  const allSubcategories = location?.state?.relatedSubcategories || [];
  //nsole.log("allSubcategories", allSubcategories);

  const categoryName = location?.state?.catoname || "Sarees";
  const subCategoryName = location?.state?.subcatoname || "Banarasi Sarees";

  const relatedSubcategories = allSubcategories.filter(
    (sub) => sub.id !== subCategoryId
  );
  //nsole.log("relatedSubcategories", relatedSubcategories);

  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({});
  const [topProducts, setTopProducts] = useState([]);
  useEffect(() => {
    axios
      .get(`${AdminAPI}/api/products`)
      .then((res) => {
        const allProducts = res.data;
        //console.log("All Products:", allProducts); 
        const filtered = subCategoryId
          ? allProducts.filter(
            (product) => product.subCategory?._id === subCategoryId
          )
          : allProducts;

        setProducts(filtered);



        const available = allProducts.filter(
          (p) =>
            Array.isArray(p.productImages) &&
            p.productImages.length > 0
        );

        
        const formatted = available.map((p) => ({
          _id: p._id,
          title: p.productName,
          originalPrice: p.originalPrice,
          discountPrice: p.discountPrice,
          image: p.productImages[0].imageUrl,
          sold: typeof p.sold === "number" ? p.sold : 0,
        }));

        // Sort by sold
        const sorted = [...formatted].sort((a, b) => b.sold - a.sold);

        const allSameOrZero =
          sorted.length === 0 || sorted.every((p) => p.sold === 0 || p.sold === sorted[0].sold);

        const topProducts = allSameOrZero ? formatted.slice(0, 3) : sorted.slice(0, 5);

        setTopProducts(topProducts);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
      });
  }, [subCategoryId]);

  const handleApplyFilters = useCallback((filterData) => {

    setFilters(filterData);
    // Optionally: fetch data or apply filtering logic here
  }, []);



  //console.log(displayedProducts);


  return (
    <>
      <div className="breadcrumb-banner">
        <div className="breadcrumb-content">
          <h1 className="breadcrumb-title">{subCategoryName}</h1>
          <p className="breadcrumb-path">
            <i className="fa fa-home"></i> &nbsp;/&nbsp;
            {categoryName} &nbsp;/&nbsp; {subCategoryName}
          </p>
        </div>
      </div>
      <div className="blog-section donuts mt-5">
        <div className="container">
          <div className="row">
            <aside id="column-left" className="col-sm-3">
              <Bestsellers topProducts={topProducts}></Bestsellers>


            </aside>
            <div id="content" className="col-sm-9  all-blog">
              <CategoryBanner></CategoryBanner>
              <div className="category-refine">
                <h3>Related Subcategories</h3>
                <div className="row">
                  <div className="col-sm-12">
                    <ul>
                      {relatedSubcategories.map((sub, index) => (
                        <li key={index}>
                          <a
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              const formattedCategory = categoryName.toLowerCase().replace(/\s+/g, '-');
                              const formattedSub = sub.name.toLowerCase().replace(/\s+/g, '-');
                              navigate(`/shop/${formattedCategory}/${formattedSub}`, {
                                state: {
                                  sareeCategories: location.state.sareeCategories,
                                  category: location.state.category,
                                  catoname: categoryName,
                                  subcatoname: sub.name,
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
            <ProductList productsdata={products} filters={filters} />

          </div>
        </div>
      </div>




    </>
  );
};

export default Categories;
