import React from 'react'

const Footer = () => {
    return (
            <footer style={{marginTop: "20px"}}>
                <div className="container">
                    <div className="footer-top">
                        <div className="row">
                            <div className="col-md-3">
                                <div className="position-footer-left">
                                    <h5 className="toggled title">
                                        contact
                                    </h5>
                                    <ul className="list-unstyled">
                                        <li>
                                            <div className="site">
                                                <div className="contact_title"><i className="fa-solid fa-location-dot"></i></div>
                                                <div className="contact_site">National park,d1 588436,United States</div>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="phone">
                                                <div className="contact_title"><i className="fa fa-phone"></i></div>
                                                <div className="contact_site"><a href="tel:+91123456789" className="contact_site">+91 123 456 789</a></div>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="fax">
                                                <div className="contact_title"><i className="fa fa-fax"></i></div>
                                                <div className="contact_site">0123-456-789</div>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="email">
                                                <div className="contact_title"><i className="fa fa-envelope"></i></div>
                                                <div className="contact_site"><a href="mailto:info@Yourstore.com" className="contact_site">demo@Yourstore.com</a></div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <h5 className="toggled">Information</h5>
                                <ul className="list-unstyled">
                                    <li><a href="index.html">Terms & Conditions</a></li>
                                    <li><a href="delivery-information.html">Delivery Information</a></li>
                                    <li><a href="about.html">About Us</a></li>
                                    <li><a href="privacy-policy.html">Privacy Policy</a></li>
                                    <li><a href="contact.html">Contact Us</a></li>
                                </ul>
                            </div>
                            <div className="col-md-3">
                                <h5 className="toggled">Extras</h5>
                                <ul className="list-unstyled">
                                    <li><a href="index.html#">Brands</a></li>
                                    <li><a href="index.html#">Gift Certificates</a></li>
                                    <li><a href="index.html#">Affiliate</a></li>
                                    <li><a href="index.html#">Special</a></li>
                                    <li><a href="site-map.html">Site Map</a></li>
                                </ul>
                            </div>
                            <div className="col-md-3">
                                <h5 className="toggled">My Account</h5>
                                <ul className="list-unstyled">
                                    <li><a href="my-account.html">My Account</a></li>
                                    <li><a href="index.html#">Order History</a></li>
                                    <li><a href="index.html#">Wish list</a></li>
                                    <li><a href="index.html#">Newsletter</a></li>
                                    <li><a href="index.html#">Returns</a></li>
                                </ul>
                            </div>
                            <div className="col-md-3">
                                <div className="position-footer-right">
                                    <div className="follow-link">
                                        <h4>find us on</h4>
                                        <div className="social-media">
                                            <a href="index.html#"><i className="fa-brands fa-facebook-f"></i></a>
                                            <a href="index.html#"><i className="fa-brands fa-instagram"></i></a>
                                            <a href="index.html#"><i className="fa-brands fa-whatsapp"></i></a>
                                            <a href="index.html#"><i className="fa-brands fa-pinterest-p"></i></a>
                                        </div>
                                    </div>
                                    <div className="payment-link">
                                        <h4>payment</h4>
                                        <div className="payment-method">
                                            <a href="index.html#"><i className="fa-brands fa-cc-visa"></i></a>
                                            <a href="index.html#"><i className="fa-brands fa-cc-mastercard"></i></a>
                                            <a href="index.html#"><i className="fa-brands fa-cc-paypal"></i></a>
                                            <a href="index.html#"><i className="fa-brands fa-cc-discover"></i></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <p className="copyright">Designed By Infoziant © 2025</p>
                </div>
                <a className="scrollToTop back-to-top" title="Top" ></a>
            </footer>
    )
}

export default Footer
