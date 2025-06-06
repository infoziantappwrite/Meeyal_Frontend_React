import React, { useEffect, useState } from "react";
 // Update with your actual Appwrite config import
 const AdminAPI = import.meta.env.VITE_Admin_API_URL;


const CategoryBanner = () => {
  const [categoryBanner, setCategoryBanner] = useState(null);
 
  

  useEffect(() => {
    const fetchBannerImages = async () => {
      try {
        const response = await fetch(`${AdminAPI}/api/offer`);
        const data = await response.json();

        const formatBanners = (tag) =>
          data
            .filter((banner) => banner.tag === tag)
            .map((banner) => ({
              id: banner._id || banner.id,
              url: banner.imageurl || banner.imagesUrl,
            }));
        setCategoryBanner(formatBanners("category")[0]|| null);
        //console.log("Category Banner:", formatBanners("category"));
        
      } catch (error) {
        console.error("Error fetching banners:", error);
      }
    };

    fetchBannerImages();
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
              className="img-thumbnail rounded img-fluid"
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
