import axios from "axios";
import { useEffect, useState } from "react";
import "./CartPage.css";

// Format price in INR
const formatPrice = (price) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);

const shipping = 150;
const taxRate = 0.18;

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);

  console.log("cartItems", cartItems);


  const fetchCart = async () => {
    try {
      const res = await axios.get(
        "https://meeyalbackendnode-production.up.railway.app/api/cart/",
        {
          withCredentials: true,
        });
        

      setCartItems(res.data || []);
    } catch (err) {
      console.error("Error fetching cart:", err);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // Increase quantity using /add
  const increaseQuantity = async (item) => {
    try {
      await axios.post(
        "https://meeyalbackendnode-production.up.railway.app/api/cart/add",
        { productId: item.productId._id },
        {
          withCredentials: true,
        }
      );
      fetchCart();
    } catch (err) {
      console.error("Error increasing quantity:", err);
    }
  };

  // Reduce quantity using /reduce
  const reduceQuantity = async (item) => {
    if (item.quantity <= 1) return;
    try {
      await axios.put(
        "https://meeyalbackendnode-production.up.railway.app/api/cart/reduce",
        { productId: item.productId._id },  // <- Ensure this is a valid ObjectId
        {
          withCredentials: true,
        }
      );
      fetchCart();
    } catch (err) {
      console.error("Error reducing quantity:", err);
    }
  };

  // Remove item using /remove
  const removeItem = async (item) => {
    try {
      await axios.delete(
        `https://meeyalbackendnode-production.up.railway.app/api/cart/remove`,
        {
          withCredentials: true,
          data: { productId: item.productId._id },
        }
      );
      fetchCart();
    } catch (err) {
      console.error("Error removing item:", err);
    }
  };

const handleClearCart = async () => {
  try {
    const res = await axios.delete('https://meeyalbackendnode-production.up.railway.app/api/cart/clear', {
      withCredentials: true, // this sends the cookie to the backend
    });

    console.log(res.data.message);
    setCartItems([]); // clear frontend cart
  } catch (err) {
    console.error('Error clearing cart:', err.response?.data?.message || err.message);
  }
};


  const subtotal = cartItems.reduce(
    (total, item) => total + item.productId.discountPrice * item.quantity,
    0
  );
  const tax = Math.round(subtotal * taxRate);
  const total = subtotal + shipping + tax;


  return (
   <div className="cart_page_fullPage">
     <div className="cart-page">
      <div className="container">
        <h1 className="page-title">Your Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <svg
              className="empty-cart-icon"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
            <h2 className="empty-cart-title">Your cart is empty</h2>
            <p className="empty-cart-message">
              Looks like you haven't added any sarees to your cart yet.
            </p>
            <button className="checkout-button">Continue Shopping</button>
          </div>
        ) : (
          <div className="cart-grid">
            <div>
              <div className="card">
                <div className="card-header">
                  <h2 className="card-title">
                    Cart Items ({cartItems.length})
                  </h2>
                </div>
                <div className="cart-items">
                  {cartItems.map((item) => {
                    const product = item.productId;
                    return (
                      <div key={product._id} className="cart-item">
                        <div className="item-image-container">
                          <img
                            src={product.productImages[0].imageUrl}
                            alt={product.productName}
                            className="item-image"
                          />
                        </div>
                        <div className="item-details">
                          <h3 className="item-name">{product.productName}</h3>
                          <p className="item-description">{product.details}</p>
                          <div className="item-actions">
                            <div className="quantity-control">
                              <button
                                onClick={() => reduceQuantity(item)}
                                className="quantity-button"
                              >
                                {/* minus icon */}
                                <svg className="icon-sm" xmlns="http://www.w3.org/2000/svg" fill="none"
                                  viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round"
                                    strokeWidth={2} d="M20 12H4" />
                                </svg>
                              </button>
                              <span className="quantity-value">{item.quantity}</span>
                              <button
                                onClick={() => increaseQuantity(item)}
                                className="quantity-button"
                              >
                                {/* plus icon */}
                                <svg className="icon-sm" xmlns="http://www.w3.org/2000/svg" fill="none"
                                  viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round"
                                    strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                              </button>
                            </div>
                            <div style={{ display: "flex", gap: "1rem" }}>
                              <span className="item-price">
                                {formatPrice(product.discountPrice * item.quantity)}
                              </span>
                              <button
                                onClick={() => removeItem(item)}

                                className="remove-button"
                              >
                                {/* trash icon */}
                                <svg className="icon" xmlns="http://www.w3.org/2000/svg" fill="none"
                                  viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                  />
                                </svg>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="cart-actions">
                <button onClick={handleClearCart} className="clear-cart">
                  Clear Cart
                </button>
              </div>
            </div>

            <div>
              <div className="card">
                <div className="card-header">
                  <h2 className="card-title">Order Summary</h2>
                </div>
                <div style={{ padding: "1.5rem" }}>
                  <div className="summary-row">
                    <span>Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="summary-row">
                    <span>Shipping</span>
                    <span>{formatPrice(shipping)}</span>
                  </div>
                  <div className="summary-row">
                    <span>Tax (18% GST)</span>
                    <span>{formatPrice(tax)}</span>
                  </div>
                  <div className="summary-divider"></div>
                  <div className="summary-total">
                    <span>Total</span>
                    <span className="total-amount">{formatPrice(total)}</span>
                  </div>

                  <button className="checkout-button">
                    Proceed to Checkout
                  </button>

                  <div className="coupon-section">
                    <h3 className="coupon-title">Have a coupon?</h3>
                    <div className="coupon-form">
                      <input
                        type="text"
                        placeholder="Enter coupon code"
                        className="coupon-input"
                      />
                      <button className="apply-button">Apply</button>
                    </div>
                  </div>

                  <div className="payment-methods">
                    <p>We accept:</p>
                    <div className="payment-icons">
                      <div className="payment-icon">
                        <span className="payment-name">Visa</span>
                      </div>
                      <div className="payment-icon">
                        <span className="payment-name">Mastercard</span>
                      </div>
                      <div className="payment-icon">
                        <span className="payment-name">PayTM</span>
                      </div>
                      <div className="payment-icon">
                        <span className="payment-name">UPI</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="help-section">
                <h3 className="help-title">Need Help?</h3>
                <p className="help-text">
                  Our customer service team is available 24/7 to assist you with
                  any questions.
                </p>
                <a href="/contact" className="help-link">
                  Contact Support →
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
   </div>
  );
};

export default CartPage;
