import "./Wishlist.css";
import { Trash2, Heart } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Eye } from "lucide-react";

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [cartProductIds, setCartProductIds] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const api = axios.create({
    baseURL: "https://meeyalbackendnode-production.up.railway.app/api",
    withCredentials: true,
  });

  useEffect(() => {
    const loadData = async () => {
      await fetchCart();
      await fetchWishlist();
    };
    loadData();
  }, []);

  useEffect(() => {
    if (cartProductIds.length > 0) {
      fetchWishlist();
    }
  }, [cartProductIds]);

  const fetchCart = async () => {
    try {
      const res = await api.get('/cart');
      const productIdsInCart = res.data.map(item => item.productId._id.toString());
      setCartProductIds(productIdsInCart);
    } catch (error) {
      console.error("Failed to fetch cart:", error);
      toast.error("Failed to load cart.");
    }
  };

  const fetchWishlist = async () => {
    try {
      setLoading(true);
      const res = await api.get("/wishlist");

      const mappedItems = res.data
        .map((item) => {
          if (!item.productId) return null;

          const productIdStr = item.productId._id.toString();

          return {
            id: item._id, // wishlistId
            productId: productIdStr, // actual productId
            name: item.productId.productName || "Unnamed Product",
            originalPrice: item.productId.originalPrice,
            discountPrice: item.productId.discountPrice,
            stock: item.productId.stock > 0 ? "In Stock" : "Out of Stock",
            addedDate: new Date(item.createdAt).toLocaleDateString(),
            image:
              item.productId.productImages && item.productId.productImages.length > 0
                ? item.productId.productImages[0].imageUrl
                : "/placeholder.svg",

            isInCart: cartProductIds.includes(productIdStr), // ✅ check here
          };
        })
        .filter(Boolean);

      setWishlistItems(mappedItems);
    } catch (error) {
      console.error("Failed to fetch wishlist:", error);
      toast.error("Failed to load wishlist.");
    } finally {
      setLoading(false);
    }
  };
  const handleRemoveFromWishlist = async (wishlistId) => {
    try {
      await api.delete("/wishlist", { data: { wishlistId } });
      setWishlistItems(prev => prev.filter(item => item.id !== wishlistId));
      toast.success("Removed from wishlist");
    } catch (error) {
      console.error("Error removing item:", error);
      toast.error("Failed to remove item.");
    }
  };

  const handleAddToCart = async (productId) => {
    try {
      const res = await api.post('/cart/add', { productId, quantity: 1 });
      setCartProductIds(prev => [...prev, productId]);
      setWishlistItems(prev =>
        prev.map(item =>
          item.productId === productId ? { ...item, isInCart: true } : item
        )
      );
      toast.success(res.data.message || "Added to cart");
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Failed to add to cart.");
    }
  };

  const handleViewProduct = (productId) => {
    
    navigate(`/productdetails/${productId}`);
  };

  return (
    <div className="wishlist_page">
      <div className="wishlist-container">
        <nav className="breadcrumb">
          <span>HOME / WISHLIST</span>
        </nav>

        <div className="wishlist-header">
          <div className="heart-icon">
            <Heart size={24} strokeWidth={1.5} fill="white" color="black" />
          </div>
          <h1>My Wishlist</h1>
        </div>

        <div className="wishlist-table">
          <div className="table-header">
            <div className="header-cell"></div>
            <div className="header-cell product-name">Product name</div>
            <div className="header-cell unit-price">Unit price</div>
            <div className="header-cell stock-status">Stock status</div>
            <div className="header-cell actions"></div>
          </div>

          {loading ? (
            <p style={{ textAlign: "center" }}>Loading wishlist...</p>
          ) : wishlistItems.length === 0 ? (
            <p style={{ textAlign: "center" }}>Your wishlist is empty.</p>
          ) : (
            wishlistItems.map((item) => (
              <div key={item.id} className="table-row">
                <div className="cell delete-cell">
                  <button
                    className="delete-btn"
                    onClick={() => handleRemoveFromWishlist(item.id)}
                    aria-label="Remove item"
                  >
                    <Trash2 size={16} strokeWidth={2} />
                  </button>
                </div>

                <div className="cell product-cell">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="product-image"
                  />
                  <span className="product-name">{item.name}</span>
                </div>

                <div className="cell price-cell">
                  {typeof item.originalPrice === "number" && (
                    <span className="original-price">
                      ${item.originalPrice.toFixed(2)}
                    </span>
                  )}
                  {typeof item.discountPrice === "number" &&
                    typeof item.originalPrice === "number" && (
                      <span className="sale-price">
                        $
                        {(
                          item.originalPrice *
                          (1 - item.discountPrice / 100)
                        ).toFixed(2)}
                      </span>
                    )}
                </div>

                <div className="cell stock-cell">
                  <span className="stock-status">{item.stock}</span>
                </div>

                <div className="cell action-cell">
                  <div className="added-date">
                    Added on: {item.addedDate}
                  </div>

                  <button
                    className="view-btn"
                    onClick={() => handleViewProduct(item.productId)}
                    aria-label="View product"
                  >
                    <Eye size={16} strokeWidth={2} />
                  </button>

                  <button
                    className="add-to-cart-btn"
                    onClick={() => handleAddToCart(item.productId)}
                    disabled={item.isInCart}
                  >
                    {item.isInCart ? "Already in cart" : "Add to cart"}
                  </button>

                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
