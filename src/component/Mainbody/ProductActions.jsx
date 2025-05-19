import React from 'react';
import { account, databases } from '../../appwriteConfig';
import { ProfileCollectionId, DatabaseId } from '../../appwriteConfig';

const ProductActions = ({ productId, stock }) => {
  const handleAction = async (action) => {
    if (action === 'Add to Cart') {
      alert(`${action} clicked for Product ID: ${productId}`);
      return;
    }

    if (action === 'Add to Wishlist') {
      try {
        const user = await account.get();

        // Search for an existing profile document
        const profileRes = await databases.listDocuments(
          DatabaseId,
          ProfileCollectionId,
          user.$id
        );
        console.log('Profile Search Result:', profileRes);

        // if (profileRes.total === 0) {
        //   // No profile exists, create one with current product ID
        //   await databases.createDocument(
        //     DatabaseId,
        //     ProfileCollectionId,
        //     user.$id, 
        //     {
        //       products: [productId], // initialize with one product
        //     }
        //   );
        // } else {
        //   const profile = profileRes.documents[0];
        //   const existingProducts = profile.products || [];

        //   // Add product only if not already in wishlist
        //   if (!existingProducts.includes(productId)) {
        //     await databases.updateDocument(
        //       DatabaseId,
        //       ProfileCollectionId,
        //       profile.$id,
        //       {
        //         products: [...existingProducts, productId],
        //       }
        //     );
        //   }
        // }

        alert(`Product ID ${productId} added to wishlist.`);
      } catch (error) {
        console.error('Error adding to wishlist:', error);
        alert('Failed to add to wishlist.');
      }
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
        <i className="icon-bag"></i>
      </button>

      <button
        className="wishlist"
        type="button"
        title="Add to wishlist"
        disabled={stock === 0}
        onClick={() => handleAction('Add to Wishlist')}
      >
        <i className="icon-like"></i>
      </button>
    </div>
  );
};

export default ProductActions;
