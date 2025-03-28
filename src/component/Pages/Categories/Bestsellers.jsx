import React, { useState, useEffect } from "react";
import { databases, DatabaseId, ProductsCollectionId } from "../../../appwriteConfig";
import { useCurrency } from "../../../CurrencyContext"; // Import currency context

const Bestsellers = () => {
  const [bestsellers, setBestsellers] = useState([]);
   const { currency } = useCurrency(); // Get currency info
  

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
            price: doc.discountprice 
                ? ((doc.originalprice * (100 - doc.discountprice)) / (100 * currency.rate)).toFixed(2) 
                : doc.originalprice, // Apply discount if available
            sold: doc.sold,
            image: imageUrl,
        };
        
        }));

        // Sort by most sold and take top 10
        setBestsellers(
          fetchedProducts.sort((a, b) => b.sold - a.sold).slice(0, 3)
        );
        //  console.log("Bestsellers fetched:", bestsellers);

      } catch (error) {
        console.error("Error fetching bestseller products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="box mt-45">
      <div className="container">
        <div className="box-content">
          <div className="toggled relative">
            <h3>Bestsellers</h3>
          </div>
          <div className="block_box">
            <div className="row">
              <div id="featured-carousel" className="box-product product-carousel" data-items="4">
                {bestsellers.map((product) => (
                  <div className="product-layout col-xs-12" key={product.id}>
                    <div className="product-thumb transition">
                      <div className="image">
                        <a href={`/productdetails/${product.id}`} className="thumb-image">
                          <img src={product.image} alt={product.title} title={product.title} className="img-responsive"/>
                        </a>
                      </div>
                      <div className="product-description">
                        <div className="caption">
                          <div className="title-rating clearfix">
                            <h4 className="product-title">
                              <a href={`/productdetails/${product.id}`}>{product.title}</a>
                            </h4>
                            <div className="price-cartbtn clearfix">
                            <span className="discounted-price">
                                  {currency.symbol}&nbsp;{product.price}
                                </span>
                            </div>
                            <div className="rating">
                              {[...Array(5)].map((_, i) => (
                                <span key={i} className="fa fa-stack">
                                  <i className="fa-regular fa-star"></i>
                                </span>
                              ))}
                            </div>
                          </div>													
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bestsellers;
