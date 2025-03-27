import React, { useEffect, useState } from "react";
import { databases, DatabaseId, BannerImageCollectionId } from "../../../appwriteConfig"; // Ensure correct import

const OfferBanner = () => {
  const [offerBanner, setOfferBanner] = useState(null);

  useEffect(() => {
    const fetchOfferBanner = async () => {
      try {
        const response = await databases.listDocuments(DatabaseId, BannerImageCollectionId);
        
        // Find the banner with the "offer" tag
        const banner = response.documents.find((doc) => doc.tag === "special");

        if (banner) {
          setOfferBanner({
            id: banner.$id,
            url: banner.imageurl, // Ensure this is the correct field
            alt: banner.tag || "Offer Banner",
          });
        }
      } catch (error) {
        console.error("Error fetching offer banner:", error);
      }
    };

    fetchOfferBanner();
  }, []);

  return (
    <div className="swiper-viewport">
      <div id="offer-banner" className="swiper-container swiper-container-horizontal swiper-container-fade">
        <div className="swiper-wrapper">
          {offerBanner ? (
            <div className="swiper-slide swiper-slide-active">
              <a href="/offers">
                <img src={offerBanner.url} alt={offerBanner.alt} className="img-responsive" />
              </a>
            </div>
          ) : (
            <p>Loading offer banner...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default OfferBanner;
