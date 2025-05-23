import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useCurrency } from "../../../CurrencyContext";
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
  const location = useLocation();
  const navigate = useNavigate();
  const { currency } = useCurrency();

  const product = location.state?.product;
  const allProducts = location.state?.allProducts || [];

  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [discountsOpen, setDiscountsOpen] = useState(false);
  const [supplierOpen, setSupplierOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("FABRIC");
  const [carouselIndex, setCarouselIndex] = useState(0);

  const productId = useParams().id;
  const [cartItems, setCartItems] = useState([]);
  const isInCart = cartItems?.productId?._id === productId;



  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await fetch(`https://meeyalbackendnode-production.up.railway.app/api/cart/${productId}`, {
          credentials: 'include' // same as axios `withCredentials: true`
        });

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();

        setCartItems(data || []); // Adjust based on response structure
      } catch (err) {
        console.error("Error fetching cart:", err);
      }
    };

    fetchCart();
  }, []);


  useEffect(() => {
    if (!product) {
      navigate("/products");
    }
  }, [product, navigate]);

  if (!product) return null;



  const {
    id,
    title,
    description,
    originalPrice,
    discountPrice,
    productImages,
    stock,
    subcategory,
    image,
  } = product;

  const discountedPrice =
    discountPrice && discountPrice > 0
      ? (originalPrice * (100 - discountPrice)) / 100
      : originalPrice;

  const images =
    productImages?.length > 0 ? productImages : ["/placeholder.svg"];

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

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
              <div className="guarantee-item">
                <Truck size={20} />
                <span>
                  Free Shipping & Returns{" "}
                  <a href="#" className="learn-more">
                    *Learn more
                  </a>
                </span>
              </div>
            </div>

            <div className="quantity-section">
              <label htmlFor="quantity">QUANTITY:</label>
              <div className="quantity-selector">
                <button onClick={decrementQuantity} className="quantity-btn">
                  -
                </button>
                <input
                  type="text"
                  id="quantity"
                  value={quantity}
                  readOnly
                  className="quantity-input"
                />
                <button onClick={incrementQuantity} className="quantity-btn">
                  +
                </button>
              </div>
            </div>

            <div className="action-buttons">
              <button
                className="add-to-cart-btn"
                disabled={stock === 0 || isInCart}
                onClick={() => {
                  if (!isInCart) {
                    // your add-to-cart logic here
                  }
                }}
              >
                {stock === 0
                  ? "OUT OF STOCK"
                  : isInCart
                    ? <span style={{ color: "green", fontStyle: "italic", fontWeight: 600 }}>ALREADY IN CART</span>
                    : "ADD TO CART"}
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

            <div className="safety-section">
              <h3>YOUR SAFETY IS OUR PRIORITY</h3>
              <div className="safety-features">
                <div className="safety-feature">
                  <Undo2 size={48} />
                  <span>Easy Returns</span>
                </div>
                <div className="safety-divider"></div>
                <div className="safety-feature">
                  <Contact size={48} />
                  <span>No Contact Delivery</span>
                </div>
                <div className="safety-divider"></div>
                <div className="safety-feature">
                  <PackageCheck size={48} />
                  <span>Safe & Clean Packaging</span>
                </div>
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
                    Vaishnavi Silicon Terraces, #30/1, 2nd and 3rd Floor, Adugodi,
                    Hosur Main Road, Bengaluru – 560 095
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
                  <div className="product-card-1" key={item.id}>
                    <div className="product-image">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.title}
                      />
                    </div>
                    <div className="product-info">
                      <h3 className="product-name">{item.title}</h3>
                      <div className="product-price">
                        <span className="current-price">
                          ₹{" "}
                          {(
                            item.originalPrice *
                            (1 - item.discountPrice / 100)
                          ).toFixed(0)}
                        </span>
                        <span className="original-price">
                          ₹ {item.originalPrice.toLocaleString()}
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
