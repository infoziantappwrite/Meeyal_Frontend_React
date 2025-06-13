import React, { useEffect, useState } from 'react';
import { useCurrency } from "../../CurrencyContext";
import { useNavigate } from "react-router-dom";
import TopProductActions from './ProductActions';
import axios from "axios";
import "./Mainbody.css";

const API = import.meta.env.VITE_API_URL;

const ProductCard = ({ productsTotal, backgroundColor = "#ffffff" }) => {
    const navigate = useNavigate();
    const { currency } = useCurrency();
    const [sareeCategories, setSareeCategories] = useState([]);

    const fetchSubcategoriesAndCategories = async () => {
        try {
            const res = await axios.get(`${API}/api/subcategory/all`, {
                withCredentials: true,
            });

            const subcategories = res.data.data;

            const grouped = subcategories.reduce((acc, curr) => {
                if (!curr.category || !curr.category.name) return acc;
                const categoryName = curr.category.name;
                if (!acc[categoryName]) acc[categoryName] = [];
                acc[categoryName].push({ id: curr._id, name: curr.name });
                return acc;
            }, {});

            const formatted = Object.entries(grouped).map(([category, subs]) => ({
                category,
                subcategories: subs,
            }));

            setSareeCategories(formatted);
        } catch (error) {
            console.error("Error fetching subcategories:", error);
        }
    };

    useEffect(() => {
        fetchSubcategoriesAndCategories();
    }, []);

    const handleViewAllClick = () => {
        const category = productsTotal[0]?.category;
        const formattedCategory = category.toLowerCase().replace(/\s+/g, "-");

        const matched = sareeCategories.find(c => c.category === category);
        const relatedSubcategories = matched?.subcategories || [];

        console.log("Related Subcategories:", relatedSubcategories);
        

        navigate(`/shop/${formattedCategory}`, {
            state: {
                sareeCategories,
                category,
                catoname: category,
                subcatoname:  category || "",
                relatedSubcategories,
                catid: "All",
            }
        });
    };

    return (
        <div className='top-product'>
            <div className="product-tab-block wow fadeInUp top-margin-all">
                <div className="container">
                    <div className="main-tab">
                        <div className="grid-container">
                            {productsTotal.map((product) => (
                                <div key={product.id} className="product-layout">
                                    <div className="product-card" style={{ backgroundColor }}>
                                        <div className="product-thumb transition">
                                            <div className="image">
                                                {product.stock === 0 && (
                                                    <span className="badge out-of-badge">out of stock</span>
                                                )}
                                                <a href={`/productdetails/${product.id}`} className="thumb-image">
                                                    <img
                                                        src={product.image}
                                                        alt="Product"
                                                        onError={(e) => {
                                                            e.target.onerror = null;
                                                            e.target.src = "https://dummyimage.com/300";
                                                        }}
                                                    />
                                                </a>
                                                <div className="button-group">
                                                    <TopProductActions
                                                        productId={product.id}
                                                        stock={product.stock}
                                                    />
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
                                                    <a href="#" className="product-link">
                                                        {product.title}
                                                        {product.discountPrice && product.discountPrice > 0 && (
                                                            <span className="discount-badge">-{product.discountPrice}%</span>
                                                        )}
                                                    </a>
                                                </h4>
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

                    <div className="text-center mt-6">
                        <button
                            onClick={handleViewAllClick}
                            className="inline-block py-2 w-48 bg-[#faaa9e] text-white font-semibold text-sm uppercase tracking-wide hover:bg-[#a91e1e] transition-colors duration-300 rounded-none"
                            style={{ fontFamily: 'Montserrat, sans-serif' }}
                        >
                            View All
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
