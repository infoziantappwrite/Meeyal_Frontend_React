import React from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { useCurrency } from "../../CurrencyContext";
import { Link, useNavigate } from "react-router-dom";
import TopProductActions from './ProductActions';
import "./Mainbody.css";



const ProductCard = ({ productsTotal, backgroundColor = "#ffffff"  }) => {


    const navigate = useNavigate();
    const { currency } = useCurrency();
    return (
        <div className='top-product'>
            <div className="product-tab-block wow fadeInUp top-margin-all">
                <div className="container">
                    <div className="main-tab">
                        <div className="grid-container">
                            {productsTotal.map((product) => (
                                <div
                                    key={product.id}
                                    className="product-layout"
                                >
                                     <div
                                        className="product-card"
                                        style={{ backgroundColor }}
                                    >
                                        <div className="product-thumb transition">
                                            <div className={`image `}>
                                                {product.stock === 0 && (
                                                    <span className="badge out-of-badge">
                                                        out of stock
                                                    </span>
                                                )}

                                                <Link
                                                    to={`/productdetails/${product.id}`}
                                                    className="thumb-image"
                                                >
                                                    <img
                                                        src={product.image}
                                                        alt="Product"
                                                        onError={(e) => {
                                                            e.target.onerror = null;
                                                            e.target.src = "https://dummyimage.com/300";
                                                        }}
                                                    />
                                                </Link>


                                                <div className="button-group">
                                                    <TopProductActions
                                                        productId={product.id}
                                                        stock={product.stock}
                                                    />{" "}
                                                    <button
                                                        className="vipodha_quickview-button"
                                                        type="button"
                                                        title="Quickview"
                                                        onClick={() =>
                                                            navigate(
                                                                `/productdetails/${product.id}`,
                                                            )
                                                        }
                                                        disabled={product.stock === 0}
                                                    >
                                                        <i className="icon-eye"></i>
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="product-description">
                                                <h4 className="product-title">
                                                    <a href="#" className="product-link">
                                                        {product.title}
                                                        {product.discountPrice && product.discountPrice > 0 && (
                                                            <span className="discount-badge">-{product.discountPrice}%</span>
                                                        )}
                                                    </a>
                                                </h4>
                                                {/* <p className="sub-cat">
                                              {product.subcategory}
                                            </p> */}
                                                <p className="price">
                                                    {product.discountPrice && product.discountPrice > 0 ? (
                                                        <>
                                                            <span className="original-price">
                                                                <s>
                                                                    {currency.symbol}{" "}
                                                                    {(product.originalPrice / currency.rate).toFixed(2)}
                                                                </s>
                                                            </span>

                                                            <span className="discounted-price">
                                                                {currency.symbol}&nbsp;
                                                                {(
                                                                    (product.originalPrice * (100 - product.discountPrice)) /
                                                                    100 /
                                                                    currency.rate
                                                                ).toFixed(2)}
                                                            </span>
                                                        </>
                                                    ) : (
                                                        <span className="discounted-price">
                                                            {currency.symbol}{" "}
                                                            {(product.originalPrice / currency.rate).toFixed(2)}
                                                        </span>
                                                    )}
                                                </p>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="text-center">
                    <Link
                        to={`/categories/${productsTotal[0]?.category.toLowerCase().replace(/\s+/g, "-")}`}
                        className="inline-block py-2 w-48 bg-[#faaa9e] text-white font-semibold text-sm uppercase tracking-wide hover:bg-[#a91e1e] transition-colors duration-300 rounded-none"
                        style={{ fontFamily: 'Montserrat, sans-serif' }}
                    >
                        View All
                    </Link>

                </div>
            </div>
        </div>
    );
};

export default ProductCard;
