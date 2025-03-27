import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { databases, DatabaseId, ProductsCollectionId } from "../../../appwriteConfig";
import { useCurrency } from "../../../CurrencyContext"; // Import currency context

const ProductList = ({ subcatid }) => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const { currency } = useCurrency(); // Get currency info

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await databases.listDocuments(DatabaseId, ProductsCollectionId);

        // Filtering products based on the subcategory ID
        const filteredProducts = response.documents.filter(
          (product) => product.subcategories?.$id === subcatid
        );

        setProducts(filteredProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [subcatid]);

  return (
    <div>
      {products.length === 0 ? (
        <p>No products found for this subcategory.</p>
      ) : (
        <div className="category-row row">
          {products.map((product) => {
            const firstImage = product.productimages?.[0]?.imageurl || "default-image.jpg";
            const formattedStatus = product.status.replace(/_([a-z])/g, (match, letter) => letter.toUpperCase());

            // Calculate discounted price based on currency
            const discountedPrice = (
              (product.originalprice * (100 - product.discountprice)) /
              100 /
              currency.rate
            ).toFixed(2);

            return (
              <div
                key={product.$id}
                className="product-layout product-list col-xs-12"
                onClick={() => navigate(`/productdetails/${product.$id}`)}
                style={{ cursor: "pointer" }}
              >
                <div className="product-thumb">
                  <div className="image">
                    <img
                      src={firstImage}
                      alt={product.productname}
                      title={product.productname}
                      className="img-responsive"
                    />
                  </div>
                  <div className="product-description">
                    <div className="caption">
                      <div className="title-rating clearfix">
                        <h4 className="product-title">{product.productname}</h4>
                        <span className="status">Status: {formattedStatus}</span>
                      </div>
                      <div className="price-cartbtn clearfix">
                        <p className="price">
                          <span className="original-price">
                            {currency.symbol}&nbsp;
                            {(product.originalprice / currency.rate).toFixed(2)}
                          </span>
                          {product.discountprice > 0 && (
                            <span className="discounted-price">
                              {currency.symbol}&nbsp;{discountedPrice}
                            </span>
                          )}
                        </p>
                      </div>
                      <div className="description">
                        {product.details || "No description available."}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ProductList;
