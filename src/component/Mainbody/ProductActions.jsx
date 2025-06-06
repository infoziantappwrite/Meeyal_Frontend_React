import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const API = import.meta.env.VITE_API_URL;


const ProductActions = ({ productId, stock }) => {
  const [inWishlist, setInWishlist] = useState(false);
  const [inCart, setInCart] = useState(false);
  

  useEffect(() => {
  const fetchStatus = async () => {
    try {
      // Fetch Wishlist
      const wishlistRes = await axios.get(`${API}/api/wishlist`, {
        withCredentials: true,
      });
      const wishlistItems = wishlistRes.data;
      const isInWishlist = wishlistItems.some(item =>
        item.productId === productId || (item.productId && item.productId._id === productId)
      );
      setInWishlist(isInWishlist);

      // Fetch Cart
      const cartRes = await axios.get(`${API}/api/cart`, {
        withCredentials: true,
      });
      const cartItems = cartRes.data;
      const isInCart = cartItems.some(item =>
        item.productId === productId || (item.productId && item.productId._id === productId)
      );
      setInCart(isInCart);
    } catch (err) {
      console.error('Error fetching status:', err);
    }
  };

  fetchStatus();
}, [productId]);


  const handleAction = async (action) => {
    
    try {
      if (action === 'Add to Cart') {
        if (inCart) {
          // Remove from cart
          const res = await axios.delete(`${API}/api/cart/remove`, {
            data: { productId },
            withCredentials: true,
          });
          toast.success(res.data.message || 'Removed from cart');
          //alert(res.data.message || 'Removed from cart');
          setInCart(false);
        } else {
          // Add to cart
          const res = await axios.post(
            `${API}/api/cart/add`,
            { productId, quantity: 1 },
            { withCredentials: true }
          );
          toast.success(res.data.message || 'Added to cart');
          //alert(res.data.message || 'Added to cart');
          setInCart(true);
        }
      }

      if (action === 'Add to Wishlist') {
        if (inWishlist) {
          const res = await axios.delete(`${API}/api/wishlist`, {
            data: { productId },
            withCredentials: true,
          });
          toast.success(res.data.message || 'Removed from wishlist');
          //alert(res.data.message || 'Removed from wishlist');
          setInWishlist(false);
        } else {
          const res = await axios.post(
            `${API}/api/wishlist`,
            { productId },
            { withCredentials: true }
          );
          toast.success(res.data.message || 'Added to wishlist');
          //alert(res.data.message || 'Added to wishlist');
          setInWishlist(true);
        }
      }
    } catch (error) {
      console.error(`Error in ${action.toLowerCase()} toggle:`, error);
      alert(`Something went wrong with ${action.toLowerCase()} action.`);
    }
  };

  return (
    <div className="product-actions">
      <button
        className="addcart"
        type="button"
        title="Add to Cart"
        disabled={stock === 0}
        onClick={() => handleAction('Add to Cart')}
      >
        <i
          className="icon-bag"
          style={{ color: inCart ? 'green' : 'inherit' }}
        ></i>
      </button>

      <button
        className="wishlist"
        type="button"
        title="Add to wishlist"
        disabled={stock === 0}
        onClick={() => handleAction('Add to Wishlist')}
      >
        <i
          className="icon-like"
          style={{ color: inWishlist ? 'hotpink' : 'inherit' }}
        ></i>
      </button>
    </div>
  );
};

export default ProductActions;
