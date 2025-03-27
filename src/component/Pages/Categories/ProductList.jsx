import React, { useEffect, useState } from "react";
import { databases, DatabaseId, ProductsCollectionId,Query } from "../../../appwriteConfig";

const ProductList = ({ subCategoryId }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    console.log(subCategoryId);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await databases.listDocuments(
                    DatabaseId, // Replace with your Appwrite database ID
                    ProductsCollectionId , // Replace with your Appwrite collection ID
                    [Query.equal("sub_category_id", subCategoryId)] // Filter by sub-category ID
                );
                setProducts(response.documents);
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [subCategoryId]);

    if (loading) return <p>Loading products...</p>;

    return (
        <div className="category-row row">
            {products.length > 0 ? (
                products.map((product) => (
                    <div key={product.$id} className="product-layout product-list col-xs-12">
                        <div className="product-thumb">
                            <div className="image">
                                <a href={`/product/${product.$id}`} className="thumb-image">
                                    <img src={product.imageUrl} alt={product.name} title={product.name} className="img-responsive" />
                                </a>
                                <div className="button-group">
                                    <button className="addcart" type="button" title="Add to Cart">
                                        <i className="icon-shopping-bag"></i>
                                    </button>
                                    <button className="wishlist" type="button" title="Add to Wish List">
                                        <i className="icon-like"></i>
                                    </button>
                                    <button className="vipodha_quickview-button" type="button" title="Quickview">
                                        <i className="icon-eye"></i>
                                    </button>
                                    <button className="compare" type="button" title="Compare this Product">
                                        <i className="icon-shuffle-arrows"></i>
                                    </button>
                                </div>
                            </div>
                            <div className="product-description">
                                <div className="caption">
                                    <div className="title-rating clearfix">
                                        <h4 className="product-title">
                                            <a href={`/product/${product.$id}`}>{product.name}</a>
                                        </h4>
                                    </div>
                                    <div className="price-cartbtn clearfix">
                                        <p className="price">${product.price}</p>
                                    </div>
                                    <div className="description">{product.description}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <p>No products found.</p>
            )}
        </div>
    );
};

export default ProductList;
