import React, { useEffect, useState } from 'react';
import BannerSection from './BannerSection';
import TopProduct from './TopProduct';
import SubBanner from './SubBanner';
import Testimonials from './Testimonials';
const AdminAPI = import.meta.env.VITE_Admin_API_URL;

const Mainbody = () => {
  const [banners, setMainBanners] = useState([]);
  const [offerBanners, setOfferBanners] = useState([]);
  
  const [newCollectionBanners, setNewCollectionBanners] = useState([]);
 

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

        setMainBanners(formatBanners("main"));
        setOfferBanners(formatBanners("offer"));
        
        setNewCollectionBanners(formatBanners("newcollection"));
        
      } catch (error) {
        console.error("Error fetching banners:", error);
      }
    };

    fetchBannerImages();
  }, []);



    return (
        <div>
            <section className="main_section">

                {/* Banner Section */}
                 <BannerSection banners={banners} />

                {/* <!-- service Section --> */}
                <div className="service-box  wow fadeInUp top-margin-all ">
                    <div className="container">
                        <div className="promo-item ">
                            <div className="row row-cols-2 row-cols-sm-2 row-cols-lg-4">
                                <div className="service-item">
                                    <div className="service">
                                        <div className=" icon-shipping service-icon-foor"></div>
                                        <div className="service-content">
                                            <h4 className="promo-title">Free shipping</h4> <span className="promo-desc">On order over
                                                $150</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="service-item">
                                    <div className="service">
                                        <div className=" icon-wallet service-icon-foor"></div>
                                        <div className="service-content">
                                            <h4 className="promo-title">Cash On Delivery</h4> <span className="promo-desc">100% money back
                                                guarantee</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="service-item">
                                    <div className="service">
                                        <div className="icon-gift service-icon-foor"></div>
                                        <div className="service-content">
                                            <h4 className="promo-title">Special Gift Card</h4> <span className="promo-desc">Offer special
                                                bonuses with gift</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="service-item">
                                    <div className="service">
                                        <div className="icon-customer-service service-icon-foor"></div>
                                        <div className="service-content">
                                            <h4 className="promo-title">24/7 customer service</h4> <span className="promo-desc">Call us 24/7
                                                at 123-456-789</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* {/* <!-- .service Section --> */}


                {/* Top-Product Section */}
                <TopProduct />



                {/* <!-- banner section --> */}
              <SubBanner
        newCollectionBanners={newCollectionBanners}
        offerBanners={offerBanners}
      />
                {/* <!-- .banner section -->

		<!-- Newsletter section -->	 */}
              
                {/* <!-- .Newsletter section -->	

		<!-- Customers Said --> */}
               {/* <Testimonials /> */}
        {/* <!-- .Customers Said --> */}

            </section>

        </div>
    )
}

export default Mainbody
