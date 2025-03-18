import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const testimonialsData = [
    {
        image: "assets/images/testimonial/1.png",
        name: "Noelle Salar",
        role: "Customer",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida."
    },
    {
        image: "assets/images/testimonial/2.png",
        name: "Smith Anthor",
        role: "Customer",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida."
    },
    {
        image: "assets/images/testimonial/3.png",
        name: "Mariya Lorem",
        role: "Customer",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida."
    }
];

const Testimonials = () => {
    const settings = {
        dots: true,  // Show navigation dots
        infinite: true,  // Infinite loop scrolling
        speed: 1000,  // Transition speed (1 second)
        slidesToShow: 1,  // Show one slide at a time
        slidesToScroll: 1,
        autoplay: true,  // Enable auto-scroll
        autoplaySpeed: 3000,  // Auto-scroll every 3 seconds
        arrows: false,  // Hide left/right arrows
        pauseOnHover: false  // Pause auto-scroll on hover
    };

    return (
        <div className="vipodha-testimonial-block top-margin-all wow fadeInUp">
            <div className="vipodha-testimonial container box-module box-content">
                <div className="page-title customers-text">
                    <h3>Our Testimonials</h3>
                </div>
                <div className="block_box">
                    <div className="row">
                        <div className="category-box">
                            <Slider {...settings}>
                                {testimonialsData.map((testimonial, index) => (
                                    <div className="row-items category-layout col-xs-12" key={index}>
                                        <div className="tetimonial-image-content">
                                            <div className="vipodha-testimonial-images">
                                                <i className="icon-squarequote hidden"></i>
                                                <img src={testimonial.image} alt={testimonial.name} className="img-circle img-responsive customers-img" />
                                            </div>
                                            <div className="vipodha-testimonial-content">
                                                <div className="vipodha-testimonial-author">{testimonial.name}</div>
                                                <div className="vipodha-testimonial-customer">{testimonial.role}</div>
                                            </div>
                                        </div>
                                        <div className="vipodha-testimonial-text">
                                            <p>{testimonial.text}</p>
                                        </div>
                                        <i className="testimonial-quotes icon-quotes"></i>
                                    </div>
                                ))}
                            </Slider>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Testimonials;
