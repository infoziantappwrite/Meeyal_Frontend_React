import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { databases, DatabaseId, ProductsCollectionId } from "../../../appwriteConfig";
import { useCurrency } from "../../../CurrencyContext"; // Import currency context

const ProductList = ({ subcatid, filter }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const { currency } = useCurrency(); // Get currency info

  const itemsPerPage = filter.limit || 1; // Default to 12 items per page

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await databases.listDocuments(DatabaseId, ProductsCollectionId);

        // Filtering products based on subcategory ID
        const filtered = response.documents.filter(
          (product) => product.subcategories?.$id === subcatid
        );

        setProducts(filtered);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [subcatid]);

  useEffect(() => {
    let updatedProducts = [...products];

    // Apply Price Filter
    updatedProducts = updatedProducts.filter((product) => {
      const price = product.originalprice / currency.rate;
      return price >= filter.price.min && (filter.price.max === null || price <= filter.price.max);
    });

    // Apply Sorting
    switch (filter.sort) {
      case "price-low-high":
        updatedProducts.sort((a, b) => a.originalprice - b.originalprice);
        break;
      case "price-high-low":
        updatedProducts.sort((a, b) => b.originalprice - a.originalprice);
        break;
      case "name-asc":
        updatedProducts.sort((a, b) => a.productname.localeCompare(b.productname));
        break;
      case "name-desc":
        updatedProducts.sort((a, b) => b.productname.localeCompare(a.productname));
        break;
      default:
        break;
    }

    setFilteredProducts(updatedProducts);
    setCurrentPage(1); // Reset to first page on filter change
  }, [products, filter, currency]);

  // Pagination Logic
  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  console.log(currentProducts);

  return (
    <div>
      {filteredProducts.length === 0 ? (
        <p>No products found for this subcategory.</p>
      ) : (
        <>
          <div className={`category-row row ${filter.viewMode === "list" ? "list-view" : "grid-view"}`}>
            {currentProducts.map((product) => {
              const firstImage = product.productimages?.[0]?.imageurl || "https://dummyimage.com/300";
              return (
                <div
                  key={product.$id}
                  className={`product-layout product-card ${filter.viewMode === "list" ? " product-list col-xs-12" : "product-grid col-xl-3 col-lg-4 col-md-4 col-sm-6 col-xs-6"}`}

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
                      {product.stock === 0 && <span className="badge out-of-badge">out of stock</span>}

                      <div className="button-group">
                        <button className="addcart" type="button" title="Add to Cart" disabled={product.stock === 0}>
                          <i className="icon-bag"></i>
                        </button>
                        <button className="wishlist" type="button" title="Add to wishlist" disabled={product.stock === 0}>
                          <i className="icon-like"></i>
                        </button>
                        <button
                          className="vipodha_quickview-button"
                          type="button"
                          title="Quickview"
                          onClick={() => navigate(`/productdetails/${product.$id}`)}
                          disabled={product.stock === 0}
                        >
                          <i className="icon-eye"></i>
                        </button>

                      </div>
                    </div>

                    <div className="product-description">
                      <div className="caption">
                        <div className="title-rating clearfix">
                          <h4 className="product-title">{product.productname}</h4>
                
                        </div>
                        
                        <p className="sub-cat">{product.subcategories.name}</p>
                        <div className="price-cartbtn clearfix">
                          <p className="price">
                            {product.discountprice && product.discountprice > 0 ? (
                              <>
                                {/* Strikethrough Original Price */}
                                <span className="original-price">
                                  <s>{currency.symbol} {(product.originalprice / currency.rate).toFixed(2)}</s>
                                </span>

                                {/* Discount Percentage */}


                                {/* Discounted Price */}
                                <span className="discounted-price">
                                  {currency.symbol}&nbsp;{((product.originalprice * (100 - product.discountprice)) / 100 / currency.rate).toFixed(2)}
                                </span>
                                <span className="discount">
                                  {product.discountprice}% OFFER
                                </span>

                              </>
                            ) : (
                              <span className="discounted-price">
                                {currency.symbol} {(product.originalprice / currency.rate).toFixed(2)}
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

          {/* Pagination Controls */}
          <div className="pagination-main mb-5">
            <div className="row">
              <div className="col-sm-6 text-left">
                Showing {indexOfFirstProduct + 1} to {Math.min(indexOfLastProduct, filteredProducts.length)} of {filteredProducts.length} products
              </div>
              <div className="col-sm-6 text-right">
                <nav>
                  <ul className="pagination">
                    <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                      <button
                        className="page-link "
                        
                        onClick={() => setCurrentPage(currentPage - 1)}
                      >
                        Previous
                      </button>
                    </li>
                    {[...Array(totalPages)].map((_, index) => (
                      <li key={index} className={`page-item ${currentPage === index + 1 ? "active" : ""}`}>
                        <button
                          className="page-link"
                          style={{
                            backgroundColor: currentPage === index + 1 ? "#dc4298" : "#fff",
                            color: currentPage === index + 1 ? "white" : "#dc4298",
                            border: `1px solid #dc4298`,
                            outline: "none",
                            
                          }}
                          
                          onClick={() => setCurrentPage(index + 1)}
                        >
                          {index + 1}
                        </button>
                      </li>
                    ))}
                    <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                      <button
                        className="page-link"
                       
                        onClick={() => setCurrentPage(currentPage + 1)}
                      >
                        Next
                      </button>
                    </li>
                  </ul>
                </nav>
              </div>

            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductList;
