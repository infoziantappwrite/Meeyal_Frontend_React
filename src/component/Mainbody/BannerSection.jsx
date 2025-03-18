import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "font-awesome/css/font-awesome.min.css"; // Ensure FontAwesome is imported

const BannerSection = () => {
  const swiperRef = useRef(null);

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
            onSwiper={(swiper) => (swiperRef.current = swiper)} // Store Swiper instance
            slidesPerView={1}
            className="banner-swiper"
          >
            <SwiperSlide>
              <img src="/assets/images/banners/mainbanner1.png" alt="Banner 1" className="img-fluid" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="/assets/images/banners/mainbanner2.png" alt="Banner 2" className="img-fluid" />
            </SwiperSlide>
          </Swiper>

          {/* Custom Navigation Divs (Matching HTML Template) */}
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
