import React, { useEffect, useState } from "react";
import { databases,DatabaseId, BannerImageCollectionId  } from "../../../appwriteConfig"; // Update with your actual Appwrite config import


const CategoryBanner = () => {
  const [categoryBanner, setCategoryBanner] = useState(null);

  useEffect(() => {
    const fetchCategoryBanner = async () => {
      try {
        const response = await databases.listDocuments(DatabaseId, BannerImageCollectionId);
        
        // Find the banner with the "category" tag
        const banner = response.documents.find((doc) => doc.tag === "category");

        if (banner) {
          setCategoryBanner({
            id: banner.$id,
            url: banner.imageurl, // Ensure imageurl is the correct field name
            alt: banner.tag || "Category Banner",
          });
        }
      } catch (error) {
        console.error("Error fetching category banner:", error);
      }
    };

    fetchCategoryBanner();
  }, []);

  return (
    <div className="row">
      {categoryBanner ? (
        <>
          <div className="category-img col-sm-12">
            <img
              src={categoryBanner.url}
              alt={categoryBanner.alt}
              title={categoryBanner.alt}
              className="img-thumbnail"
            />
          </div>
          <div className="category-desc col-sm-12">
            <p className="text-md">
            Discover exclusive saree deals at unbeatable prices! From traditional Banarasi sarees 
          to modern designer collections, our special offers bring you the best in ethnic fashion. 
          Limited-time discounts on handwoven silk, embroidered georgettes, and much more. 
          Grab your favorite saree now before the offer ends!
            </p>
          </div>
        </>
      ) : (
        <p>Loading category banner...</p>
      )}
    </div>
  );
};

export default CategoryBanner;
