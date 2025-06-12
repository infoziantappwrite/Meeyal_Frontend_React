import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCurrency } from "../../../CurrencyContext";
import axios from "axios";
import "./SinglePage.css";
const API = import.meta.env.VITE_API_URL;
const AdminAPI = import.meta.env.VITE_Admin_API_URL;


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
  const [activeTab, setActiveTab] = useState("Material");
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [inCart, setInCart] = useState(false);
  


  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(
          `${AdminAPI}/api/products/${id}`
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
          `${AdminAPI}/api/products/${id}/related`
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
        `${API}/api/cart/${id}`,
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
    material:material,
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
     await axios.post(
        `${API}/api/cart/add`,
        { productId: product._id, quantity: 1 },
        { withCredentials: true }
      );

      
      setInCart(true);
    } catch (err) {
      console.error("Error adding to cart:", err);
    }
  };




  return (
    <div className="single_page">
    <div className="single-page-v2">
  <div className="container">
    <button className="back-button" onClick={() => navigate(-1)}>
      <ArrowLeft size={18} /> Back to Products
    </button>

    <div className="product-section">
      <div className="gallery">
        <div className="thumbnail-list">
          {images.map((img, i) => (
            <div
              key={i}
              className={`thumb ${selectedImage === i ? "active" : ""}`}
              onClick={() => setSelectedImage(i)}
            >
              <img src={img} alt={`Thumbnail ${i + 1}`} />
            </div>
          ))}
        </div>
        <div className="main-display">
          <img src={images[selectedImage]} alt="Selected product" />
        </div>
      </div>

      <div className="details">
        <h1 className="title">{title}</h1>

        <div className="pricing">
          {discountPrice ? (
            <>
              <span className="price">
                {currency.symbol}
                {(discountedPrice / currency.rate).toFixed(2)}
              </span>
              <span className="mrp">
                MRP {currency.symbol}
                {(originalPrice / currency.rate).toFixed(2)}
              </span>
              <span className="off">({discountPrice}% OFF)</span>
            </>
          ) : (
            <span className="price">
              {currency.symbol}
              {(originalPrice / currency.rate).toFixed(2)}
            </span>
          )}
        </div>

        <button
          className="add-cart"
          disabled={stock === 0 || inCart}
          onClick={handleAddToCart}
        >
          {stock === 0
            ? "Out of Stock"
            : inCart
            ? "Already in Cart"
            : "Add to Cart"}
        </button>

        <div className="info-tabs">
          {["DESCRIPTION", "SHIPPING", "Material"].map((tab) => (
            <button
              key={tab}
              className={activeTab === tab ? "active" : ""}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="tab-body">
          {activeTab === "DESCRIPTION" && <p>{description}</p>}
          {activeTab === "SHIPPING" && (
            <p>
              Free shipping on orders above ₹1500. Delivered in 5–7 business
              days.
            </p>
          )}
          {activeTab === "Material" && <p>{material || "NA"}</p>}
        </div>
      </div>
    </div>

    {relatedProducts.length > 0 && (
      <div className="related-products-v2">
        <h3 className="section-title">You may also like</h3>
        <div className="related-grid">
          {visibleRelated.map((item) => (
            <div
              className="related-item"
              key={item._id}
              onClick={() => navigate(`/productdetails/${item._id}`)}
            >
              <img
                src={item.productImages[0].imageUrl || "/placeholder.svg"}
                alt={item.productName}
              />
              <div className="info">
                <h4>{item.productName}</h4>
                <div className="price-wrap">
                  <span className="final">
                    ₹
                    {(
                      item.originalPrice *
                      (1 - item.discountPrice / 100)
                    ).toFixed(0)}
                  </span>
                  <span className="strike">₹{item.originalPrice}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )}
  </div>
</div>

    </div>
  );
}