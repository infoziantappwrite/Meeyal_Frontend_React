import React, { useEffect, useState, useRef } from "react";
import { Tab, Nav } from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { useNavigate } from "react-router-dom";
import { useCurrency } from "../../CurrencyContext";
import { databases, DatabaseId, ProductsCollectionId } from "../../appwriteConfig";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Mainbody.css";
import TopProductActions from "./ProductActions"; // Import the ProductActions component

const TopProduct = () => {
    const [activeTab, setActiveTab] = useState("latest");
    const [products, setProducts] = useState({ latest: [], onsale: [], featured: [], bestseller: [] });
    const swiperRefs = useRef({});
    const navigate = useNavigate();
    const { currency } = useCurrency();


useEffect(() => {
  const fetchProducts = async () => {
    try {
      const response = await fetch("https://meeyaladminbackend-production.up.railway.app/api/products");
      const data = await response.json();

      const fetchedProducts = data.map((doc) => {
        // Safely get the image URL from the first productImage object
        let imageUrl = "https://dummyimage.com/300";
        if (Array.isArray(doc.productImages) && doc.productImages.length > 0) {
          imageUrl = doc.productImages[0]?.imageUrl || imageUrl;
        }

        return {
          id: doc._id,
          title: doc.productName,
          description: doc.details,
          discountPrice: doc.discountPrice,
          originalPrice: doc.originalPrice,
          stock: doc.stock,
          status: doc.status,
          sold: doc.sold,
          createdAt: doc.createdAt,
          updatedAt: doc.updatedAt,
          image: imageUrl,
          category: doc.category?.name || "Uncategorized",
          subcategory: doc.subCategory?.name || "Uncategorized",
          productImages: doc.productImages.map(img => img.imageUrl), // Safely map image URLs
        };
      });

      setProducts({
        latest: fetchedProducts
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 20),
        onSale: fetchedProducts.filter((p) => p.status === "on_sale"),
        featured: fetchedProducts.filter((p) => p.status === "featured"),
        bestseller: fetchedProducts.sort((a, b) => b.sold - a.sold).slice(0, 10),
      });
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  fetchProducts();
}, []);


    return (
        <div className="top-product">
            <div className="product-tab-block wow fadeInUp top-margin-all">
                <div className="container">
                    <div className="main-tab">
                        <div className="product-tabs box-content clearfix">
                            <div className="page-title toggled">
                                <h3>Top Products</h3>
                            </div>

                            <Tab.Container defaultActiveKey="latest">
                                <Nav variant="tabs" className="vipodha-tabs section">
                                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                                        {Object.keys(products).map(category => (
                                            category.toLowerCase() !== "onsale" && (
                                                <li className="nav-item" role="presentation" key={category}>
                                                    <Nav.Link
                                                        className={`nav-link hscp-hover ${activeTab === category ? "active" : ""}`}
                                                        id={`${category}-tab`}
                                                        onClick={() => setActiveTab(category)}
                                                        role="tab"
                                                        aria-controls={category}
                                                        aria-selected={activeTab === category}
                                                        eventKey={category.toLowerCase()}
                                                    >
                                                        <span>{category.charAt(0).toUpperCase() + category.slice(1)}</span>
                                                    </Nav.Link>
                                                </li>
                                            )
                                        ))}
                                    </ul>

                                </Nav>

                                <Tab.Content>
                                    {Object.keys(products).map(category => {
                                        const chunkSize = 8;
                                        const productChunks = [];

                                        for (let i = 0; i < products[category].length; i += chunkSize) {
                                            productChunks.push(products[category].slice(i, i + chunkSize));
                                        }

                                        return (
                                            <Tab.Pane key={category} eventKey={category.toLowerCase()}>
                                                <div className="block_box">
                                                    <div className="custom-navigation">
                                                        <button
                                                            className="owl-prev"
                                                            onClick={() => swiperRefs.current[category]?.slidePrev()}
                                                        >
                                                            <i className="fa fa-angle-left" aria-hidden="true"></i>
                                                        </button>
                                                        <button
                                                            className="owl-next"
                                                            onClick={() => swiperRefs.current[category]?.slideNext()}
                                                        >
                                                            <i className="fa fa-angle-right" aria-hidden="true"></i>
                                                        </button>
                                                    </div>

                                                    <Swiper

                                                        modules={[Navigation, Pagination]}
                                                        navigation={false}
                                                        pagination={{ clickable: true }}
                                                        spaceBetween={20}
                                                        slidesPerView={1}
                                                        onSwiper={swiper => (swiperRefs.current[category] = swiper)}
                                                    >
                                                        {productChunks.map((chunk, index) => (
                                                            <SwiperSlide key={index}>
                                                                <div className="grid-container">
                                                                    {chunk.map(product => (
                                                                        <div key={product.id} className="product-layout">
                                                                            <div className="product-card">
                                                                                <div className="product-thumb transition">
                                                                                    <div className={`image `}>
                                                                                        {products["onSale"].some(p => p.id === product.id) && (
                                                                                            <span className="badge sale-badge">On Sale</span>
                                                                                        )}
                                                                                        {products["featured"].some(p => p.id === product.id) && (
                                                                                            <span className="badge featured-badge">Featured</span>
                                                                                        )}
                                                                                        {product.stock === 0 && <span className="badge out-of-badge">out of stock</span>}

                                                                                        <a href="#" className="thumb-image" onClick={e => e.preventDefault()}>
                                                                                            <img
                                                                                                src={product.image}
                                                                                                alt="Product"
                                                                                                onError={(e) => e.target.src = "https://dummyimage.com/300"}
                                                                                            />
                                                                                        </a>

                                                                                        

                                                                                        <div className="button-group">
                                                                                            <TopProductActions productId={product.id} stock={product.stock} /> {/* Pass productId and stock to ProductActions */}
                                                                                            <button
                                                                                                className="vipodha_quickview-button"
                                                                                                type="button"
                                                                                                title="Quickview"
                                                                                                onClick={() => navigate(`/productdetails/${product.id}`)}
                                                                                                disabled={product.stock === 0}
                                                                                            >
                                                                                                <i className="icon-eye"></i>
                                                                                            </button>
                                                                                            
                                                                                        </div>
                                                                                    </div>

                                                                                    <div className="product-description">
                                                                                       
                                                                                        <h4 className="product-title">
                                                                                        
                                                                                            <a href="#">{product.title}</a>
                                                                                        </h4>
                                                                                        <p className="sub-cat">{product.subcategory}</p>
                                                                                        <p className="price">
                                                                                            {product.discountPrice && product.discountPrice > 0 ? (
                                                                                                <>
                                                                                                    {/* Strikethrough Original Price */}
                                                                                                    <span className="original-price">
                                                                                                        <s>{currency.symbol} {(product.originalPrice / currency.rate).toFixed(2)}</s>
                                                                                                    </span>

                                                                                                    {/* Discount Percentage */}
                                                                                                    <span className="discount">
                                                                                                        -{product.discountPrice}%
                                                                                                    </span>

                                                                                                    {/* Discounted Price */}
                                                                                                    <span className="discounted-price">
                                                                                                        {currency.symbol}&nbsp;{((product.originalPrice * (100 - product.discountPrice)) / 100 / currency.rate).toFixed(2)}
                                                                                                    </span>

                                                                                                </>
                                                                                            ) : (
                                                                                                // If no discount, show only the original price
                                                                                                <span className="discounted-price">
                                                                                                    {currency.symbol} {(product.originalPrice / currency.rate).toFixed(2)}
                                                                                                </span>
                                                                                            )}
                                                                                        </p>



                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </SwiperSlide>
                                                        ))}
                                                    </Swiper>
                                                </div>
                                            </Tab.Pane>
                                        );
                                    })}
                                </Tab.Content>
                            </Tab.Container>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TopProduct;
