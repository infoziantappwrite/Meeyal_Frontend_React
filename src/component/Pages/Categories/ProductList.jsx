import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCurrency } from "../../../CurrencyContext";
import ProductActions from "../../Mainbody/ProductActions";

const ProductList = ({ productsdata, filters }) => {
  console.log("Filters:", filters.viewMode);
  const viewMode = filters?.viewMode || "grid";
  const products = productsdata.map((doc) => {
    const imageUrl = doc.productImages?.[0]?.imageUrl || "/public/assets/images/No image.png";
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
      productImages: doc.productImages.map((img) => img.imageUrl),
    };
  });


  const navigate = useNavigate();
  const { currency } = useCurrency();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = filters?.limit || 8;

  // Step 1: Filter by price range
  const filteredProducts = products.filter((product) => {
    const finalPrice =
      product.discountPrice > 0
        ? (product.originalPrice * (100 - product.discountPrice)) / 100
        : product.originalPrice;

    return (
      finalPrice >= parseFloat(filters?.price?.min || 0) &&
      finalPrice <= parseFloat(filters?.price?.max || Infinity)
    );
  });

  // Step 2: Sorting
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (filters?.sort) {
      case "price-low-high":
        return (a.originalPrice * (100 - a.discountPrice)) / 100 - (b.originalPrice * (100 - b.discountPrice)) / 100;
      case "price-high-low":
        return (b.originalPrice * (100 - b.discountPrice)) / 100 - (a.originalPrice * (100 - a.discountPrice)) / 100;
      case "name-asc":
        return a.productName.localeCompare(b.productName);
      case "name-desc":
        return b.productName.localeCompare(a.productName);
      default:
        return 0;
    }
  });

  // Step 3: Pagination
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentProducts = sortedProducts.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);


  return (
    <div>
      {sortedProducts.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <>
          <div className={`category-row row ${viewMode === "grid" ? "grid-view" : "list-view"}`}>

            {currentProducts.map((product) => {
              const hasDiscount = product.discountPrice > 0;
              const discountedPrice =
                (product.originalPrice * (100 - product.discountPrice)) / 100;
              const finalPrice = hasDiscount ? discountedPrice : product.originalPrice;

              return (
                <div
  key={product.id}
  className={`product-layout ${
    viewMode === "grid" ? "product-grid col-xl-3 col-lg-4 col-md-4 col-sm-6 col-xs-6" : "product-list col-12"
  }`}
>

                  <div className="product-thumb product-card">
                    <div className="image">
                      <img src={product.image} alt={product.title} className="img-responsive" />
                      {product.stock === 0 && <span className="badge out-of-badge">Out of stock</span>}
                      <div className="button-group">
                        <ProductActions
                          productId={product.id}
                          stock={product.stock}
                        />
                        <button
                          className="vipodha_quickview-button"
                          type="button"
                          title="Quickview"
                          onClick={() =>
                            navigate(`/productdetails/${product.id}`, {
                              state: {
                                product,
                                allProducts: products,
                              },
                            })
                          }
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
                      <p className="sub-cat">{product.category}</p>
                      <p className="price">
                        {hasDiscount ? (
                          <>
                            <span className="original-price">
                              <s>{currency.symbol} {(product.originalPrice / currency.rate).toFixed(2)}</s>
                            </span>
                            <span className="discount">-{product.discountPrice}%</span>
                            <span className="discounted-price">
                              {currency.symbol} {(discountedPrice / currency.rate).toFixed(2)}
                            </span>
                          </>
                        ) : (
                          <span className="discounted-price">
                            {currency.symbol} {(finalPrice / currency.rate).toFixed(2)}
                          </span>
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pagination-main mb-5">
            <div className="row">
              <div className="col-sm-6 text-left">
                Showing {indexOfFirst + 1} to {Math.min(indexOfLast, sortedProducts.length)} of {sortedProducts.length} products
              </div>
              <div className="col-sm-6 text-right">
                <nav>
                  <ul className="pagination">
                    <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                      <button className="page-link" onClick={() => setCurrentPage(currentPage - 1)}>Previous</button>
                    </li>
                    {[...Array(totalPages)].map((_, index) => (
                      <li key={index} className={`page-item ${currentPage === index + 1 ? "active" : ""}`}>
                        <button
                          className="page-link"
                          onClick={() => setCurrentPage(index + 1)}
                          style={{
                            backgroundColor: currentPage === index + 1 ? "#dc4298" : "#fff",
                            color: currentPage === index + 1 ? "white" : "#dc4298",
                            border: `1px solid #dc4298`
                          }}
                        >
                          {index + 1}
                        </button>
                      </li>
                    ))}
                    <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                      <button className="page-link" onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
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
