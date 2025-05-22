import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import "./css/Categories.css";
import { useParams } from "react-router-dom";


const Categories = () => {
  const location = useLocation();

  
  const subCategoryId = location?.state?.catid || null;
  const { subCategoryName } = useParams();

  
console.log("Subcategory Name:", subCategoryName); // This will log 'Test12'

  
  const allSubcategories = location?.state?.relatedSubcategories || [];

  const relatedSubcategories = allSubcategories.filter(
    (sub) => sub.id !== subCategoryId
  );

  const [products, setProducts] = useState([]);
  const [availabilityOpen, setAvailabilityOpen] = useState(true);
  const [priceOpen, setPriceOpen] = useState(true);
  const [typeOpen, setTypeOpen] = useState(true);
  const [priceRange, setPriceRange] = useState([0, 10000]);

  useEffect(() => {
    axios
      .get("https://meeyaladminbackend-production.up.railway.app/api/products")
      .then((res) => {
        const allProducts = res.data;

        if (subCategoryId) {
          const filtered = allProducts.filter(
            (product) => product.subCategory?._id === subCategoryId
          );
          setProducts(filtered);
        } else {
          setProducts(allProducts);
        }
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
      });
  }, [subCategoryId]);

  return (
    <div className="product-page">
      <aside className="filter-sidebar">
        <h2>Filters</h2>

        {/* Availability */}
        <div className="filter-group">
          <div
            className="filter-header"
            onClick={() => setAvailabilityOpen(!availabilityOpen)}
          >
            Availability <span>{availabilityOpen ? "−" : "+"}</span>
          </div>
          {availabilityOpen && (
            <div className="filter-options">
              <label><input type="checkbox" /> In stock (310)</label>
              <label><input type="checkbox" /> Out of stock (0)</label>
            </div>
          )}
        </div>

        {/* Price */}
        <div className="filter-group">
          <div
            className="filter-header"
            onClick={() => setPriceOpen(!priceOpen)}
          >
            Price <span>{priceOpen ? "−" : "+"}</span>
          </div>
          {priceOpen && (
            <div className="filter-options">
              <Slider
              className="price-slider"
                range
                min={0}
                max={10000}
                defaultValue={priceRange}
                onChange={(value) => setPriceRange(value)}
              />
              <div className="price-range-display">
                ₹ {priceRange[0]} - ₹ {priceRange[1]}
              </div>
            </div>
          )}
        </div>

        {/* Product Type */}
        <div className="filter-group">
          <div
            className="filter-header"
            onClick={() => setTypeOpen(!typeOpen)}
          >
            Product Type <span>{typeOpen ? "−" : "+"}</span>
          </div>
          {typeOpen && (
            <div className="filter-options">
              {relatedSubcategories.map((sub) => (
                <label key={sub.id}>
                  <input type="checkbox" /> {sub.name}
                </label>
              ))}
            </div>
          )}
        </div>
      </aside>

      <main className="product-grid-container">
        <h1 className="heading">Banarasi Sarees</h1>
        <p className="description">
          We at Meeyal have one of the best collections of sarees online. Explore our finest collection below.
        </p>

        <div className="product-grid">
          {products.map((product) => {
            const {
              _id,
              productName,
              originalPrice,
              discountPrice,
              productImages,
              category,
              stock,
            } = product;

            const discountPercent = Math.round(
              ((originalPrice - discountPrice) / originalPrice) * 100
            );

            return (
              <div key={_id} className="product-card">
                <img
                  src={productImages[0]?.imageUrl || "https://via.placeholder.com/300"}
                  alt={productName}
                  className="product-image"
                />

                <h3 className="product-title">{productName}</h3>

                <p className="product-price">
                  ₹ {discountPrice}
                  <span className="original-price">₹ {originalPrice}</span>
                </p>

                <p className="product-discount">({discountPercent}% off)</p>

                <p className="product-category">
                  <strong>Category:</strong> {category?.name || "N/A"}
                </p>

                <p className="product-stock">
                  <strong>In Stock:</strong> {stock}
                </p>

                <button className="add-to-cart-btn">ADD TO CART</button>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default Categories;
