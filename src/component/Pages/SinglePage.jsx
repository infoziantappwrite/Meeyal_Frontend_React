import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCurrency } from "../../CurrencyContext";
import "../../assets/css/SinglPage.css";

const SinglePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { currency } = useCurrency();

  const product = location.state?.product;
  const allProducts = location.state?.allProducts || [];

  const [selectedImage, setSelectedImage] = useState(
    product?.productImages && product.productImages.length > 0
      ? product.productImages[0]
      : product?.image
  );

  const [otherProducts, setOtherProducts] = useState([]);

  useEffect(() => {
    if (product && allProducts.length > 0) {
      const filtered = allProducts.filter((p) => p.id !== product.id);
      setOtherProducts(filtered);
    }
    console.log("Current Product:", product);
    console.log("All Products:", allProducts);
    console.log("Other Products:", otherProducts);
  }, [product, allProducts]);

  if (!product) {
    return (
      <div className="error-container">
        <h2>Product data not found</h2>
        <p>
          The product details are not available. Please go back and try again.
        </p>
        <button onClick={() => navigate(-1)}>Go Back</button>
      </div>
    );
  }

  const {
    title,
    description,
    image,
    productImages,
    discountPrice,
    originalPrice,
    stock,
    category,
    subcategory,
  } = product;

  const discountedPrice =
    discountPrice && discountPrice > 0
      ? (originalPrice * (100 - discountPrice)) / 100
      : originalPrice;

  return (
    <div className="product-details-container">
      <button className="back-button" onClick={() => navigate(-1)}>
        ← Back to Products
      </button>

      <h1 className="product-title">{title}</h1>
      <p className="product-category">
        <strong>Category:</strong> {category} / {subcategory}
      </p>

      <div className="product-content">
        <div className="product-images">
          <div className="main-image-container">
            <img
              className="main-image"
              src={selectedImage || "/placeholder.svg"}
              alt={title}
              onError={(e) => (e.target.src = "https://dummyimage.com/600x400")}
            />
          </div>

          {productImages && productImages.length > 1 && (
            <div className="thumbnail-container">
              {productImages.map((imgUrl, idx) => (
                <img
                  className={`thumbnail ${
                    selectedImage === imgUrl ? "active-thumbnail" : ""
                  }`}
                  key={idx}
                  src={imgUrl || "/placeholder.svg"}
                  alt={`${title} ${idx + 1}`}
                  onError={(e) => (e.target.src = "https://dummyimage.com/80")}
                  onClick={() => setSelectedImage(imgUrl)}
                />
              ))}
            </div>
          )}
        </div>

        <div className="product-info">
          <p className="product-description">{description}</p>

          <div className="price-container">
            {discountPrice && discountPrice > 0 ? (
              <>
                <span className="original-price">
                  {currency.symbol} {(originalPrice / currency.rate).toFixed(2)}
                </span>
                <span className="discount-badge">-{discountPrice}%</span>
                <span className="final-price">
                  {currency.symbol}{" "}
                  {(discountedPrice / currency.rate).toFixed(2)}
                </span>
              </>
            ) : (
              <span className="final-price">
                {currency.symbol} {(originalPrice / currency.rate).toFixed(2)}
              </span>
            )}
          </div>

          <p className="stock-info">
            <strong>Stock: </strong>
            {stock > 0 ? (
              <span className="in-stock">{stock} available</span>
            ) : (
              <span className="out-of-stock">Out of stock</span>
            )}
          </p>

          <button className="add-to-cart-button" disabled={stock === 0}>
            {stock > 0 ? "Add to Cart" : "Out of Stock"}
          </button>
        </div>
      </div>

      {/* View Other Products Section */}
      {otherProducts.length > 0 && (
        <div className="related-products-section" style={{ marginTop: "3rem" }}>
          <h2>View Other Products</h2>
          <div
            className="related-products-grid"
            style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}
          >
            {otherProducts.map((item) => (
              <div
                key={item._id}
                className="related-product-card"
                style={{
                  cursor: "pointer",
                  border: "1px solid #ddd",
                  padding: "10px",
                  width: "150px",
                }}
                onClick={() =>
                  navigate(`/productdetails/${item._id}`, {
                    state: { product: item, allProducts },
                  })
                }
              >
                <img
                  src={item.image || "https://dummyimage.com/150"}
                  alt={item.title}
                  className="related-product-image"
                  style={{
                    width: "100%",
                    height: "auto",
                    marginBottom: "0.5rem",
                  }}
                  onError={(e) => (e.target.src = "https://dummyimage.com/150")}
                />
                <div className="related-product-info">
                  <p
                    className="related-product-title"
                    style={{ fontWeight: "bold", marginBottom: "0.25rem" }}
                  >
                    {item.title}
                  </p>
                  <p className="related-product-price">
                    {currency.symbol}{" "}
                    {(item.originalPrice / currency.rate).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SinglePage;
