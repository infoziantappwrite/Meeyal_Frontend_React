import { useState } from "react";
import { databases, DatabaseId,account,cartcollectionID } from "../../../appwriteConfig";



const AddToCartButton = ({ product }) => {
    const [loading, setLoading] = useState(false);

    const handleAddToCart = async () => {
        if (loading) return;
        setLoading(true);

        try {
            // Get the authenticated user
            const user = await account.get();
            const userId = user.$id; // This will be the Cart Collection ID

            let cartDocument;
            try {
                cartDocument = await databases.getDocument(DatabaseId,cartcollectionID, userId);
            } catch (error) {
                if (error.code !== 404) throw error; // If error is not "document not found," rethrow
            }
            let cartItems = cartDocument ? cartDocument.items : [];

            console.log("Product added to cart!");
            alert("Product added to cart!");
        } catch (error) {
            console.error("Error adding product to cart:", error);
            alert("Failed to add product to cart.");
        }

        setLoading(false);
    };

    return (
        <button
            className="addcart"
            type="button"
            title="Add to Cart"
            disabled={product.stock === 0 || loading}
            onClick={handleAddToCart}
        >
            {loading ? "Adding..." : <i className="icon-bag"></i>}
        </button>
    );
};

export default AddToCartButton;
