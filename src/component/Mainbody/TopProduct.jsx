import React, { useEffect, useState, useRef } from "react";
import { Tab, Nav } from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { useNavigate } from "react-router-dom";
import { useCurrency } from "../../CurrencyContext";
import { databases, DatabaseId, ProductsCollectionId, account } from "../../appwriteConfig";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Mainbody.css";

const TopProduct = () => {
    const [activeTab, setActiveTab] = useState("latest");
    const [products, setProducts] = useState({latest: [], onsale: [], featured: [], bestseller: [] });
    const swiperRefs = useRef({});
    const navigate = useNavigate();
    const { currency } = useCurrency();



    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await databases.listDocuments(DatabaseId, ProductsCollectionId);

                
                const fetchedProducts = await Promise.all(response.documents.map(async (doc) => {
                    let imageUrl = "https://dummyimage.com/300"; // Default placeholder image

                    if (Array.isArray(doc.productimages) && doc.productimages.length > 0) {
                        imageUrl = doc.productimages[0]?.imageurl;
                    }

                    return {
                        id: doc.$id,
                        title: doc.productname,
                        description: doc.details, // Full details of the product
                        discountPrice: doc.discountprice,
                        originalPrice: doc.originalprice,
                        stock: doc.stock,
                        status: doc.status,
                        sold: doc.sold,
                        createdAt: doc.$createdAt,
                        updatedAt: doc.$updatedAt,
                        image: imageUrl,
                        category: doc.categories?.name || "Uncategorized",
                        subcategory: doc.subcategories?.name || "Uncategorized",
                        permissions: doc.$permissions,
                        productImages: doc.productimages.map(img => img.imageurl),
                    };
                }));

                setProducts({
                    latest: fetchedProducts
                        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // Sort by createdAt (newest first)
                        .slice(0, 10), // Take the top 10
                    onSale: fetchedProducts.filter(p => p.status === "on_sale"),
                    featured: fetchedProducts.filter(p => p.status === "featured"),
                    bestseller: fetchedProducts
                    .sort((a, b) => b.sold - a.sold) 
                    .slice(0, 10),
                    
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
                                        ))}
                                    </ul>
                                </Nav>

                                <Tab.Content>
                                    {Object.keys(products).map(category => {
                                        const chunkSize = 10;
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
                                                        navigation
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
                                                                            <div className="product-thumb transition">
                                                                                <div className="image">
                                                                                    <a href="#" className="thumb-image" onClick={e => e.preventDefault()}>
                                                                                        <img
                                                                                            src={product.image}
                                                                                            alt="Product"
                                                                                            onError={(e) => e.target.src = "https://dummyimage.com/300"}
                                                                                        />
                                                                                    </a>
                                                                                    <div className="button-group">
                                                                                        <button className="addcart" type="button" title="Add to Cart">
                                                                                            <i className="icon-bag"></i>
                                                                                        </button>
                                                                                        <button className="wishlist" type="button" title="Add to wishlist">
                                                                                            <i className="icon-like"></i>
                                                                                        </button>
                                                                                        <button
                                                                                            className="vipodha_quickview-button"
                                                                                            type="button"
                                                                                            title="Quickview"
                                                                                            onClick={() => navigate(`/shop/SingplesareePage/${product.id}`)}
                                                                                        >
                                                                                            <i className="icon-eye"></i>
                                                                                        </button>
                                                                                        <button className="compare" type="button" title="Compare">
                                                                                            <i className="icon-shuffle-arrows"></i>
                                                                                        </button>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="product-description">
                                                                                    <h4 className="product-title">
                                                                                        <a href="#">{product.title}</a>
                                                                                    </h4>
                                                                                    <p className="price">
                                                                                        <span className="original-price">
                                                                                            {currency.symbol} {(product.originalPrice / currency.rate).toFixed(2)}
                                                                                        </span>
                                                                                    </p>
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
