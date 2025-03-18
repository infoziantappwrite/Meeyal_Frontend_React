import React, { useEffect, useState } from 'react'
import { databases, DatabaseId, BannerImageCollectionId } from "../../appwriteConfig"; // Import Appwrite config

const SubBanner = () => {
    const [offerBanner, setOfferBanner] = useState(null);
    const [newCollectionBanner, setNewCollectionBanner] = useState(null);
    

    useEffect(() => {
      const fetchBannerImages = async () => {
        try {
          const response = await databases.listDocuments(DatabaseId, BannerImageCollectionId);
          const banners = response.documents.map((doc) => ({
            id: doc.$id,
            url: doc.imageurl,
            tag: doc.tag,
          }));
  
          setOfferBanner(banners.find((banner) => banner.tag === "offer") || null);
          setNewCollectionBanner(banners.find((banner) => banner.tag === "newcollection") || null);
        } catch (error) {
          console.error("Error fetching banner images:", error);
        }
      };
  
      fetchBannerImages();
    }, []);


    const banners = [
        {
          image: offerBanner?.url,
          link: "#",
          discount: "50%",
          desc2: "Tips to Choose a",
          title: "Fancy Saree",
          desc1: "as per your body shape",
          buttonText: "Shop Now",
        },
        {
          image: newCollectionBanner?.url,
          link: "#",
          title: "New Collection",
          desc1: "Saree",
          buttonText: "Shop Now",
        },
      ];
  return (
    <div className="html1 mt-20">
      <div className="container">
        <div className="banner-all">
          {banners.map((banner, index) => (
            <div className="banner-outer" key={index}>
              <div className={`banner${index + 1}`}>
                <div className="inner1">
                  <a href={banner.link}>
                    <img alt={banner.title} className="img-responsive w-100" src={banner.image} />
                  </a>
                </div>
                {banner.discount && <div className="banner-desc">{banner.discount} <span>off</span></div>}
                <div className="inner2">
                  {banner.desc2 && <div className="banner-desc2">{banner.desc2}</div>}
                  <div className="banner-title">{banner.title}</div>
                  {banner.desc1 && <div className="banner-desc1">{banner.desc1}</div>}
                  <div className="btn btn-info">{banner.buttonText}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SubBanner
