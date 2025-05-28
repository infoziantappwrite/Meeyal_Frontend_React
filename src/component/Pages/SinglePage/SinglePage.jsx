import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCurrency } from "../../../CurrencyContext";
import axios from "axios";
import "./SinglePage.css";

import {
  ArrowLeft,
  ShieldCheck,
  BadgeCheck,
  Truck,
  Undo2,
  Contact,
  PackageCheck,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

export default function SinglePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currency } = useCurrency();

  const [product, setProduct] = useState(null);
  
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [selectedImage, setSelectedImage] = useState(0);
  const [supplierOpen, setSupplierOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("FABRIC");
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [inCart, setInCart] = useState(false);
  


  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(
          `https://meeyaladminbackend-production.up.railway.app/api/products/${id}`
        );
        setProduct(res.data);
      } catch (error) {
        console.error("Failed to fetch product:", error);
        navigate("/products");
      }
    };

    fetchProduct();
  }, [id, navigate]);

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      try {
        const res = await axios.get(
          `https://meeyaladminbackend-production.up.railway.app/api/products/${id}/related`
        );
        setRelatedProducts(res.data);
      } catch (error) {
        console.error("Failed to fetch related products:", error);
      }
    };

    fetchRelatedProducts();
  }, [id]);



  
  useEffect(() => {
  const checkIfInCart = async () => {    
    try {
      const res = await axios.get(
        `https://meeyalbackendnode-production.up.railway.app/api/cart/${id}`,
        { withCredentials: true }
      );

      if (res.data) {
        setInCart(true);
      } else {
        setInCart(false);
      }
    } catch (err) {
      console.error('Error checking cart:', err);
    }
  };
    checkIfInCart();
}, [product]);



  if (!product) return null;

  const {
    productName: title,
    details: description,
    originalPrice,
    discountPrice,
    stock,
    productImages = [],
  } = product;

  const images = productImages.map((img) => img.imageUrl) || [
    "/placeholder.svg",
  ];
  const discountedPrice = discountPrice
    ? (originalPrice * (100 - discountPrice)) / 100
    : originalPrice;

  const getProductsPerView = () =>
    window.innerWidth < 768
      ? 1
      : window.innerWidth < 1024
      ? 2
      : window.innerWidth < 1280
      ? 3
      : 4;

  const productsPerView = getProductsPerView();

  const visibleRelated = relatedProducts.slice(
    carouselIndex,
    carouselIndex + productsPerView
  );

  const handlePrev = () => {
    setCarouselIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCarouselIndex((prev) =>
      Math.min(relatedProducts.length - productsPerView, prev + 1)
    );
  };


   const handleAddToCart = async () => {
    try {
      const res = await axios.post(
        'https://meeyalbackendnode-production.up.railway.app/api/cart/add',
        { productId: product.id, quantity: 1 },
        { withCredentials: true }
      );

      const data = res.data;

      setInCart(true);
    } catch (err) {
      console.error("Error adding to cart:", err);
    }
  };




  return (
    <div className="single_page">
      <div className="container">
        <button className="back-link" onClick={() => navigate(-1)}>
          <ArrowLeft size={16} /> Back to products
        </button>

        <div className="product-grid">
          <div className="product-images">
            <div className="thumbnails">
              {images.map((img, index) => (
                <div
                  key={index}
                  className={`thumbnail ${
                    selectedImage === index ? "selected" : ""
                  }`}
                  onClick={() => setSelectedImage(index)}
                >
                  <img src={img} alt={`Thumbnail ${index + 1}`} />
                </div>
              ))}
            </div>
            <div className="main-image">
              <img src={images[selectedImage]} alt="Product main" />
            </div>
          </div>

          <div className="product-details">
            <h1>{title}</h1>
            <div className="product-price">
              {discountPrice ? (
                <>
                  <span className="current-price">
                    {currency.symbol}{" "}
                    {(discountedPrice / currency.rate).toFixed(2)}
                  </span>
                  <span className="original-price">
                    MRP {currency.symbol}{" "}
                    {(originalPrice / currency.rate).toFixed(2)}
                  </span>
                  <span className="discount">{discountPrice}% OFF</span>
                </>
              ) : (
                <span className="current-price">
                  {currency.symbol} {(originalPrice / currency.rate).toFixed(2)}
                </span>
              )}
            </div>

            <div className="action-buttons">
              <button
                className="add-to-cart-btn"
                disabled={stock === 0 || inCart}
                onClick={handleAddToCart}
              >
                {stock === 0
                  ? "OUT OF STOCK"
                  : inCart
                    ? "ALREADY IN CART"
                    : "ADD TO CART"}
              </button>
              <button className="buy-now-btn" disabled={stock === 0}>
                BUY NOW
              </button>
            </div>

            <div className="product-tabs">
              <div className="tabs-header">
                {["STORY", "DESCRIPTION", "SHIPPING", "FABRIC"].map((tab) => (
                  <button
                    key={tab}
                    className={activeTab === tab ? "active" : ""}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              <div className="tab-content">
                {activeTab === "DESCRIPTION" && <p>{description}</p>}
                {activeTab === "SHIPPING" && (
                  <p>
                    Free shipping on orders above ₹1500. Delivery within 5-7
                    business days.
                  </p>
                )}
                {activeTab === "STORY" && (
                  <p>
                    This product is part of our exclusive designer collection,
                    crafted for elegance and timeless beauty.
                  </p>
                )}
                {activeTab === "FABRIC" && (
                  <>
                    <h3>Blended Organza</h3>
                    <p>
                      Elegant saree crafted with a blend of organza and premium
                      fabrics. Lightweight, perfect for special occasions.
                    </p>
                    <div className="material-care">
                      <h4>Material & Care</h4>
                      <p>Dry Wash Only</p>
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="supplier-section">
              <button
                className="supplier-header"
                onClick={() => setSupplierOpen(!supplierOpen)}
              >
                <span>SUPPLIER INFORMATION</span>
                {supplierOpen ? (
                  <ChevronUp size={16} />
                ) : (
                  <ChevronDown size={16} />
                )}
              </button>
              {supplierOpen && (
                <div className="supplier-content">
                  <p>
                    Marketed By: Pyxis Brand Technologies Private Limited,
                    Vaishnavi Silicon Terraces, #30/1, 2nd and 3rd Floor,
                    Adugodi, Hosur Main Road, Bengaluru – 560 095
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <div className="related-products-carousel">
            <div className="related-carousel-wrapper">
              <button
                className="carousel-arrow carousel-arrow-left"
                onClick={handlePrev}
                disabled={carouselIndex === 0}
              >
                <ArrowLeft size={20} />
              </button>

              <div className="products-wrapper">
                {visibleRelated.map((item) => (
                  <div
                    className="product-card-1"
                    key={item._id}
                    onClick={() => navigate(`/productdetails/${item._id}`)}
                    style={{ cursor: "pointer" }}
                  >
                    <div className="product-image">
                      <img
                        src={
                          item.productImages[0].imageUrl || "/placeholder.svg"
                        }
                        alt={item.productName}
                      />
                    </div>
                    <div className="product-info">
                      <h3 className="product-name">{item.productName}</h3>
                      <div className="product-price">
                        <span className="current-price">
                          ₹{" "}
                          {(
                            item.originalPrice *
                            (1 - item.discountPrice / 100)
                          ).toFixed(0)}
                        </span>
                        <span className="original-price">
                          ₹ {item.originalPrice}
                        </span>
                        <span className="discount">
                          ({item.discountPrice}% off)
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button
                className="carousel-arrow carousel-arrow-right"
                onClick={handleNext}
                disabled={
                  carouselIndex >= relatedProducts.length - productsPerView
                }
              >
                <ArrowLeft size={20} style={{ transform: "rotate(180deg)" }} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
