
import { useCurrency } from "../../../CurrencyContext"; // Import currency context

const Bestsellers = ({ topProducts }) => {
  const { currency } = useCurrency();

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
                {topProducts.map((product) => (
                  <div className="product-layout col-xs-12" key={product._id}>
                    <div className="product-thumb transition">
                      <div className="image">
                        <a href={`/productdetails/${product._id}`} className="thumb-image">
                          <img
                            src={product.image}
                            alt={product.title}
                            title={product.title}
                            className="img-responsive"
                          />
                        </a>
                      </div>
                      <div className="product-description">
                        <div className="caption">
                          <div className="title-rating clearfix">
                            <h4 className="product-title">
                              <a href={`/productdetails/${product._id}`}>{product.title}</a>
                            </h4>
                            <div className="price-cartbtn clearfix">
                              <span className="price">
                                {currency.symbol}&nbsp;{(
                                (product.originalPrice *
                                  (100 -
                                    product.discountPrice)) /
                                100 /
                                currency.rate
                              ).toFixed(2)}
                              </span>
                            </div>
                             <span className="discount">
                              -{product.discountPrice}%
                            </span>
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
