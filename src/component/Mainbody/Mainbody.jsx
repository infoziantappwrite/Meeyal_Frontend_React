import React from 'react'
import BannerSection from './BannerSection'
import TopProduct from './TopProduct'
import SubBanner from './SubBanner'
import Testimonials from './Testimonials'

const Mainbody = () => {
    return (
        <div>
            <section class="main_section">

                {/* Banner Section */}
                <BannerSection />

                {/* <!-- service Section --> */}
                <div class="service-box  wow fadeInUp top-margin-all ">
                    <div class="container">
                        <div class="promo-item ">
                            <div class="row row-cols-2 row-cols-sm-2 row-cols-lg-4">
                                <div class="service-item">
                                    <div class="service">
                                        <div class=" icon-shipping service-icon-foor"></div>
                                        <div class="service-content">
                                            <h4 class="promo-title">Free shipping</h4> <span class="promo-desc">On order over
                                                $150</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="service-item">
                                    <div class="service">
                                        <div class=" icon-wallet service-icon-foor"></div>
                                        <div class="service-content">
                                            <h4 class="promo-title">Cash On Delivery</h4> <span class="promo-desc">100% money back
                                                guarantee</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="service-item">
                                    <div class="service">
                                        <div class="icon-gift service-icon-foor"></div>
                                        <div class="service-content">
                                            <h4 class="promo-title">Special Gift Card</h4> <span class="promo-desc">Offer special
                                                bonuses with gift</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="service-item">
                                    <div class="service">
                                        <div class="icon-customer-service service-icon-foor"></div>
                                        <div class="service-content">
                                            <h4 class="promo-title">24/7 customer service</h4> <span class="promo-desc">Call us 24/7
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
              <SubBanner />
                {/* <!-- .banner section -->

		<!-- Newsletter section -->	 */}
              
                {/* <!-- .Newsletter section -->	

		<!-- Customers Said --> */}
               <Testimonials />
        {/* <!-- .Customers Said --> */}

            </section>

        </div>
    )
}

export default Mainbody
