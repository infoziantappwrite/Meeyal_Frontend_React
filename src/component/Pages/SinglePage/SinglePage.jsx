import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useCurrency } from "../../../CurrencyContext";
import "./SinglePage.css";
import axios from "axios";


import {
  ArrowLeft,
  ShieldCheck,
  BadgeCheck,
  Truck,
  Tag,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

export default function SinglePage() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { currency } = useCurrency();

  const allProducts = location.state?.allProducts || [];
  const product = allProducts.find((p) => p.id === id);
  const [selectedImage, setSelectedImage] = useState(0);
  const [discountsOpen, setDiscountsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("FABRIC");
  const [carouselIndex, setCarouselIndex] = useState(0);

  const [inCart, setInCart] = useState(false);

  useEffect(() => {
    if (!product) {
      navigate("/products");
    }
  }, [product, navigate]);





  const {
    title,
    description,
    originalPrice,
    discountPrice,
    productImages,
    stock,
    subcategory,
  } = product;

  const discountedPrice =
    discountPrice && discountPrice > 0
      ? (originalPrice * (100 - discountPrice)) / 100
      : originalPrice;

  const images =
    productImages?.length > 0 ? productImages : ["/placeholder.svg"];

  const relatedProducts = allProducts.filter(
    (p) => p.subcategory === subcategory && p.id !== id
  );

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
      await axios.post(
        'https://meeyalbackendnode-production.up.railway.app/api/cart/add',
        { productId: product.id, quantity: 1 },
        { withCredentials: true }
      );



      setInCart(true);
    } catch (err) {
      console.error("Error adding to cart:", err);
    }
  };

  useEffect(() => {
    const fetchCartStatus = async () => {
      try {
        const result = await fetch(`https://meeyalbackendnode-production.up.railway.app/api/cart/${product.id}`, {
          credentials: 'include' // same as axios `withCredentials: true`
        });
        if (result.ok) {
          setInCart(true);
        } else {
          setInCart(false);
        }
      } catch (err) {
        console.error('Error fetching cart status:', err);
      }
    };

    if (product) {
      fetchCartStatus();
    }
  }, [product]);
  if (!product) return null;
  console.log("Product:", relatedProducts);


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
                  className={`thumbnail ${selectedImage === index ? "selected" : ""
                    }`}
                  onClick={() => setSelectedImage(index)}
                >
                  <img src={img} alt={`Product thumbnail ${index + 1}`} />
                </div>
              ))}
            </div>
            <div className="main-image">
              <img src={images[selectedImage]} alt="Product main" />
            </div>
          </div>

          <div className="product-details">
            <div className="product-title">
              <h1>{title}</h1>
              <p className="designer">Designer Collection</p>
            </div>

            <div className="product-price">
              {discountPrice && discountPrice > 0 ? (
                <>
                  
                  <span className="original-price">
                   {currency.symbol}{" "}
                    {(originalPrice / currency.rate).toFixed(2)}
                  </span>
                  <span className="current-price">
                    {currency.symbol}{" "}
                    {(discountedPrice / currency.rate).toFixed(2)}
                  </span>
                  <span className="discount text-white">{discountPrice}% OFF</span>
                </>
              ) : (
                <span className="current-price">
                  {currency.symbol} {(originalPrice / currency.rate).toFixed(2)}
                </span>
              )}
            </div>

            <p className="tax-info">
              Inclusive of all taxes. Free Shipping above ₹1500.
            </p>

            <div className="product-guarantees">
              <div className="guarantee-item">
                <ShieldCheck size={20} />
                <span>Authentic & Quality Assured</span>
              </div>
              <div className="guarantee-item">
                <BadgeCheck size={20} />
                <span>
                  100% money back guarantee{" "}
                  <a href="#" className="learn-more">
                    *Learn more
                  </a>
                </span>
              </div>

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
            <div className="discounts-section">
              <button
                className="discounts-header"
                onClick={() => setDiscountsOpen(!discountsOpen)}
              >
                <span>AVAILABLE DISCOUNTS!</span>
                {discountsOpen ? (
                  <ChevronUp size={16} />
                ) : (
                  <ChevronDown size={16} />
                )}
              </button>
              {discountsOpen && (
                <div className="discounts-content">
                  <div className="discount-grid">
                    <div className="discount-item">
                      <div className="discount-title">
                        FLAT 5% off above ₹3999
                      </div>
                      <div className="discount-subtitle">
                        Discount applicable at checkout
                      </div>
                    </div>
                    <div className="discount-item">
                      <div className="discount-title">
                        FLAT 10% off above ₹5999
                      </div>
                      <div className="discount-subtitle">
                        Discount applicable at checkout
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>





          </div>
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
            {activeTab === "FABRIC" && (
              <div>
                <h3>Blended Organza</h3>
                <p>
                  Elegant saree crafted with a blend of organza and premium
                  fabrics. Lightweight, perfect for special occasions.
                </p>
                <div className="material-care">
                  <h4>Material & Care</h4>
                  <p>Dry Wash Only</p>
                </div>
              </div>
            )}
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
          </div>

        </div>



        {relatedProducts.length > 0 && (
          <div className="related-products-carousel">
            <h2 className="related-products-title">
              <Tag size={24} style={{ marginRight: "10px" }} />
              Related Products
            </h2>

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
                    key={item.id}
                    onClick={() =>
                      navigate(`/productdetails/${item.id}`, {
                        state: { allProducts },
                      })
                    }
                    style={{ cursor: "pointer" }}
                  >

                    <div className="product-image">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.title}
                      />
                    </div>
                    <div className="product-info">
                      <div className="product-description">
                        <h4 className="product-title">
                          <a href="#">{item.title}</a>
                        </h4>
                        <p className="sub-cat">
                          {item.subcategory}
                        </p>
                        <p className="price">
                          {item.discountPrice &&
                            item.discountPrice > 0 ? (
                            <>
                              {/* Strikethrough Original Price */}
                              <span className="original-price">
                                <s>
                                  {currency.symbol}{" "}
                                  {(
                                    item.originalPrice /
                                    currency.rate
                                  ).toFixed(2)}
                                </s>
                              </span>

                              {/* Discount Percentage */}
                              <span className="discount text-white">
                                -{item.discountPrice}%
                              </span>

                              {/* Discounted Price */}
                              <span className="discounted-price">
                                {currency.symbol}&nbsp;
                                {(
                                  (item.originalPrice *
                                    (100 -
                                      item.discountPrice)) /
                                  100 /
                                  currency.rate
                                ).toFixed(2)}
                              </span>
                            </>
                          ) : (
                            // If no discount, show only the original price
                            <span className="discounted-price">
                              {currency.symbol}{" "}
                              {(
                                item.originalPrice /
                                currency.rate
                              ).toFixed(2)}
                            </span>
                          )}
                        </p>
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
