import React, { useEffect, useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { databases, DatabaseId, BannerImageCollectionId } from "../../appwriteConfig"; // Import Appwrite config
import "swiper/css";
import "swiper/css/pagination";
import "font-awesome/css/font-awesome.min.css"; // Ensure FontAwesome is imported

const BannerSection = () => {
  const [banners, setMainBanners] = useState([]);
  const swiperRef = useRef(null);




  useEffect(() => {
    const fetchBannerImages = async () => {
      try {
        const response = await databases.listDocuments(DatabaseId, BannerImageCollectionId);
        const banners = response.documents.map((doc) => ({
          id: doc.$id,
          url: doc.imageurl,
          tag: doc.tag,
        }));

     
        setMainBanners(banners.filter((banner) => banner.tag === "main"));
      } catch (error) {
        console.error("Error fetching banner images:", error);
      }
    };

    fetchBannerImages();
  }, []);

  return (
    <div className="banner-section">
      <div className="container-full position-relative">
        <div className="vipodha-banner box-module">
          <div className="block_box">
            <Swiper
              modules={[Autoplay, Pagination]}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              loop={true}
              pagination={{ clickable: true }}
              onSwiper={(swiper) => (swiperRef.current = swiper)}
              slidesPerView={1}
              className="banner-swiper"
            >
              {banners.length > 0 ? (
                banners.map((banner) => (
                  <SwiperSlide key={banner.id}>
                    <img src={banner.url} alt="Banner" className="img-fluid" />
                  </SwiperSlide>
                ))
              ) : (
                <SwiperSlide>
                  <p>Loading banners...</p>
                </SwiperSlide>
              )}
            </Swiper>

            {/* Custom Navigation */}
            <div className="owl-prev" onClick={() => swiperRef.current?.slidePrev()}>
              <i className="fa fa-angle-left" aria-hidden="true"></i>
            </div>
            <div className="owl-next" onClick={() => swiperRef.current?.slideNext()}>
              <i className="fa fa-angle-right" aria-hidden="true"></i>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default BannerSection;
