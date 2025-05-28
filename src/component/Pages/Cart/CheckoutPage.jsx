import { useEffect, useState } from "react";
import axios from "axios";
import "./CheckoutPage.css";

// Helper function to format price in INR
const formatPrice = (price) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);

const CheckoutPage = () => {
  const [cartData, setCartData] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [newAddress, setNewAddress] = useState({
    name: "",
    address: "",
    city: "",
    country: "",
    postalCode: "",
    phone: "",
  });

  useEffect(() => {
    // Load cart data from localStorage
    const storedCart = localStorage.getItem("cartData");
    if (storedCart) {
      setCartData(JSON.parse(storedCart));
    }

    // Fetch saved user addresses
    fetchUserAddresses();
  }, []);

  const fetchUserAddresses = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/addresses", {
        withCredentials: true,
      });

      setAddresses(response.data);

      // Auto-select the default address if one exists
      const defaultAddr = response.data.find((addr) => addr.isDefault);
      if (defaultAddr) {
        setSelectedAddressId(defaultAddr._id);
      }
    } catch (error) {
      console.error("Error fetching addresses:", error);
      alert("Failed to load addresses. Please check your connection.");
    }
  };

  const handlePaymentChange = (e) => {
    setPaymentMethod(e.target.value);
  };

const handlePlaceOrder = async () => {
    const selectedAddress = addresses.find((addr) => addr._id === selectedAddressId);
    if (!selectedAddress) {
      alert("Please select a shipping address before placing the order.");
      return;
    }

    const orderData = {
      items: cartData.map((item) => ({
        productId: item.productId._id,
        quantity: item.quantity,
        price: item.productId.originalPrice,
        discount: item.productId.discountPrice,
      })),
      subtotal,
      tax,
      shipping,
      total,
      paymentMethod
    };

    try {
      const response = await axios.post(
        "http://localhost:8000/api/orders",
        orderData,
        { withCredentials: true }
      );

      console.log("Order placed:", response.data);
      alert("Order placed successfully!");

       await axios.delete('http://localhost:8000/api/cart/clear', {
      withCredentials: true,
    });

      localStorage.removeItem("cartData");
      setCartData([]);
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place order. Please try again later.");
    }
};


  const handleAddAddress = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/api/addresses", newAddress, {
        withCredentials: true,
      });
      alert("Address added successfully!");
      setShowAddressForm(false);
      setNewAddress({
        name: "",
        address: "",
        city: "",
        country: "",
        postalCode: "",
        phone: "",
      });
      fetchUserAddresses();
    } catch (error) {
      console.error("Error adding address:", error);
      alert("Failed to add address. Please try again.");
    }
  };

  const handleDeleteAddress = async (addressId) => {
  if (!window.confirm("Are you sure you want to delete this address?")) {
    return;
  }

  try {
    await axios.delete(`http://localhost:8000/api/addresses/${addressId}`, {
      withCredentials: true,
    });

    alert("Address deleted successfully!");
    fetchUserAddresses(); // Refresh the list
  } catch (error) {
    console.error("Error deleting address:", error);
    alert("Failed to delete address. Please try again.");
  }
};


  // Calculate totals
  const subtotal = cartData.reduce((total, item) => {
    const product = item.productId;
    const discountAmount = product.originalPrice * (product.discountPrice / 100);
    const discountedPrice = product.originalPrice - discountAmount;
    return total + discountedPrice * item.quantity;
  }, 0);

  const shipping = 150;
  const tax = Math.round(subtotal * 0.18);
  const total = subtotal + shipping + tax;

  return (
    <div className="checkout-page">
      <h1>Checkout Page</h1>

      <div className="checkout-grid">
        {/* Left Side - Address & Payment */}
        <div className="checkout-left">
  <h2 className="section-title">Select Shipping Address</h2>
  {addresses.length === 0 ? (
    <p className="no-address-message">
      No saved addresses. Please add one below or in your{" "}
      <a href="/profile" className="profile-link">profile page</a>.
    </p>
  ) : (
    <div className="address-list">
     {addresses.map((addr) => (
  <label key={addr._id} className={`address-card ${selectedAddressId === addr._id ? 'selected' : ''}`}>
    <input
      type="radio"
      name="selectedAddress"
      value={addr._id}
      checked={selectedAddressId === addr._id}
      onChange={() => setSelectedAddressId(addr._id)}
    />
    <div className="address-details">
      <strong>{addr.name}</strong>
      <div>{addr.address}, {addr.city}, {addr.country}</div>
      <div>Postal Code: {addr.postalCode}</div>
      <div>Phone: {addr.phone}</div>
      {addr.isDefault && <span className="default-tag">Default</span>}
    </div>

    {/* DELETE BUTTON HERE */}
    <button
      className="delete-address-button"
      onClick={() => handleDeleteAddress(addr._id)}
    >
      Delete
    </button>
  </label>
))}

    </div>
  )}

  <button
    className="add-address-button"
    onClick={() => setShowAddressForm(!showAddressForm)}
  >
    {showAddressForm ? "Cancel" : "+ Add New Address"}
  </button>

  {showAddressForm && (
    <form className="address-form" onSubmit={handleAddAddress}>
      <input
        type="text"
        placeholder="Name"
        value={newAddress.name}
        onChange={(e) =>
          setNewAddress({ ...newAddress, name: e.target.value })
        }
        required
      />
      <input
        type="text"
        placeholder="Address"
        value={newAddress.address}
        onChange={(e) =>
          setNewAddress({ ...newAddress, address: e.target.value })
        }
        required
      />
      <input
        type="text"
        placeholder="City"
        value={newAddress.city}
        onChange={(e) =>
          setNewAddress({ ...newAddress, city: e.target.value })
        }
        required
      />
      <input
        type="text"
        placeholder="Country"
        value={newAddress.country}
        onChange={(e) =>
          setNewAddress({ ...newAddress, country: e.target.value })
        }
        required
      />
      <input
        type="text"
        placeholder="Postal Code"
        value={newAddress.postalCode}
        onChange={(e) =>
          setNewAddress({ ...newAddress, postalCode: e.target.value })
        }
        required
      />
      <input
        type="text"
        placeholder="Phone"
        value={newAddress.phone}
        onChange={(e) =>
          setNewAddress({ ...newAddress, phone: e.target.value })
        }
        required
      />
      <button type="submit" className="save-address-button">
        Save Address
      </button>
    </form>
  )}

  <h2 className="section-title">Payment Method</h2>
  <div className="payment-methods">
    <label className={`payment-option ${paymentMethod === 'cod' ? 'selected' : ''}`}>
      <input
        type="radio"
        value="cod"
        checked={paymentMethod === "cod"}
        onChange={handlePaymentChange}
      />
      Cash on Delivery
    </label>
    <label className={`payment-option ${paymentMethod === 'upi' ? 'selected' : ''}`}>
      <input
        type="radio"
        value="upi"
        checked={paymentMethod === "upi"}
        onChange={handlePaymentChange}
      />
      UPI / PayTM
    </label>
    <label className={`payment-option ${paymentMethod === 'card' ? 'selected' : ''}`}>
      <input
        type="radio"
        value="card"
        checked={paymentMethod === "card"}
        onChange={handlePaymentChange}
      />
      Credit/Debit Card
    </label>
  </div>
</div>


        {/* Right Side - Order Summary */}
        <div className="checkout-right">
          <h2>Order Summary</h2>
          {cartData.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <>
              {cartData.map((item) => (
                <div key={item.productId._id} className="checkout-item">
                  <span>
                    {item.productId.productName} (x{item.quantity})
                  </span>
                  <span>
                    {formatPrice(
                      (item.productId.originalPrice -
                        (item.productId.originalPrice * item.productId.discountPrice) /
                          100) * item.quantity
                    )}
                  </span>
                </div>
              ))}

              <div className="summary-line">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="summary-line">
                <span>Shipping</span>
                <span>{formatPrice(shipping)}</span>
              </div>
              <div className="summary-line">
                <span>Tax (18%)</span>
                <span>{formatPrice(tax)}</span>
              </div>
              <div className="summary-total">
                <strong>Total</strong>
                <strong>{formatPrice(total)}</strong>
              </div>

              <button
                className="place-order-button"
                onClick={handlePlaceOrder}
                disabled={addresses.length === 0}
              >
                Place Order
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
