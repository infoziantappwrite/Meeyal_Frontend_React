import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { databases, DatabaseId, ProductsCollectionId } from "../../appwriteConfig";
import { Query } from "appwrite";
import "./SinglePage.css";
 
const SinglePage = () => {
  const { id } = useParams();
  const productId = id;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]); // Related products state
 
 
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await databases.getDocument(DatabaseId, ProductsCollectionId, productId);
        setProduct(response);
        setSelectedImage(response.productimages[0]?.imageurl); // Set initial image
 
        console.log(response);
 
 
        if (response.categories?.$id && response.subcategories?.$id) {
          const relatedResponse = await databases.listDocuments(DatabaseId, ProductsCollectionId, [
            Query.equal("categories", response.categories.$id), // Match category by ID
            Query.equal("subcategories", response.subcategories.$id), // Match subcategory by ID
            Query.limit(5),
            Query.orderDesc("$createdAt")
          ]);
 
          // Exclude the current product from the related list
          const filteredProducts = relatedResponse.documents.filter(prod => prod.$id !== productId);
          setRelatedProducts(filteredProducts);
 
 
 
 
 
 
        } else {
          console.log("Category or Subcategory ID not found, skipping related products query.");
          setRelatedProducts([]); // Set empty array if no valid categories/subcategories
        }
 
 
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };
 
    fetchProduct();
  }, [productId]);
 
  if (loading) return <h2>Loading...</h2>;
  if (!product) return <h2>Product not found</h2>;
 
  return (
    <div>
      <section>
        <div className="breadcrumb-main">
          <div className="container">
            <div className="breadcrumb-container">
              <h2 className="page-title">{product.productname}</h2>
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="/">
                    <i className="fas fa-home"></i>
                  </a>
                </li>
                <li className="breadcrumb-item">
                  <a href="/category">{product.categories?.name}</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
 
      <div className="blog-section product-details">
        <div className="container">
          <div className="row">
            <div id="content" className="col-sm-12">
              <div className="pro-detail product-content">
                <div className="row">
                  <div className="col-md-6 product-left">
                    <div className="thumbnails">
                      <div className="pro-image">
                        <img
                          src={selectedImage}
                          alt={product.productname}
                          title={product.productname}
                          style={{ width: "80%", objectFit: "cover", marginLeft: "40px" }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 product-right">
                    <h1>{product.productname}</h1>
                    <div className="rating">
                      <div className="product-rating">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className="fa fa-stack">
                            <i className="fa-regular fa-star"></i>
                          </span>
                        ))}
                      </div>
                      <a href="#" className="review">
                        {product.reviews || 0} reviews
                      </a>
                    </div>
                    <hr />
                    <ul className="list-unstyled manufacturer-listpro">
                      <li>
                        <span className="disc">Category:</span>{" "}
                        <span className="disc1">{product.categories?.name}</span>
                      </li>
                      <li>
                        <span className="disc">Availability:</span>{" "}
                        <span className="disc1">{product.stock > 0 ? "In Stock" : "Out of Stock"}</span>
                      </li>
                      <li>
                        <span className="disc">Price:</span>{" "}
                        <span className="disc1">
                          <div className="price-container">
                            <div className="price-left">
                              {product.discountprice ? (
                                <>
                                  <span className="old-price">₹{product.originalprice}</span>
                                  <span className="discounted-price"> ₹{product.originalprice - product.discountprice}</span>
                                </>
                              ) : (
                                <span className="regular-price">₹{product.originalprice}</span>
                              )}
                            </div>
 
                            {product.discountprice && (
                              <div className="price-right">
                                <span className="discount-badge">🔥 You Save  ₹{product.discountprice}!</span>
                              </div>
                            )}
                          </div>
 
 
 
                        </span>
                      </li>
                    </ul>
                    <button className="btn btn-primary">Add to Cart</button>
                    <div className="product-gallery">
                      {product.productimages.map((image, index) => (
                        <img
                          key={index}
                          src={image.imageurl}
                          alt={`Product Image ${index + 1}`}
                          className={selectedImage === image.imageurl ? "selected" : ""} // Apply CSS class conditionally
                          onClick={() => setSelectedImage(image.imageurl)}
                        />
 
                      ))}
                    </div>
                  </div>
                </div>
 
                <div className="product-description">
                  <h3>Product Description</h3>
                  <p>{product.details}</p>
                </div>
 
 
                {/* Related Products Section */}
                <div className="related-products">
                  <h3>Related Products</h3>
                  <div className="related-products-grid">
                    {relatedProducts.map((related) => (
                      <div key={related.$id} className="related-product-card">
                        <Link to={`/productdetails/${related.$id}`}>
                          <div className="product-image-container">
                            <img src={related.productimages[0]?.imageurl} alt={related.productname} />
 
                            {/* Sold Out Overlay */}
                            {related.sold === 0 && <div className="overlay"><span>Sold Out</span></div>}
 
                            {/* Status Badges */}
                            {related.status === "on_sale" && <span className="product-badge onsale">On Sale</span>}
                            {related.status === "featured" && <span className="product-badge featured">Featured</span>}
                            {related.status === "bestseller" && <span className="product-badge bestseller">Bestseller</span>}
                          </div>
 
                          <h4>{related.productname}</h4>
                          <p>₹{related.discountprice || related.originalprice}</p>
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
 
 
                {/* End Related Products */}
 
 
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
 
export default SinglePage;