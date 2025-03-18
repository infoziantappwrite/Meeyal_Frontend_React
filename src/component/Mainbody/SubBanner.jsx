import React from 'react'

const SubBanner = () => {
    const banners = [
        {
          image: "assets/images/banners/banner1.png",
          link: "#",
          discount: "60%",
          desc2: "Tips to Choose a",
          title: "Fancy Saree",
          desc1: "as per your body shape",
          buttonText: "Shop Now",
        },
        {
          image: "assets/images/banners/banner2.png",
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
