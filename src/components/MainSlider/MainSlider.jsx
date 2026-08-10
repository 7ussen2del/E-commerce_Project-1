import React from "react";
import Slider from "react-slick";
import img1 from "../../Assets/images/slider-image-1.jpeg";
import img2 from "../../Assets/images/slider-image-2.jpeg";
import img3 from "../../Assets/images/slider-image-3.jpeg";
import img4 from "../../Assets/images/slider-2.jpeg";
import img5 from "../../Assets/images/grocery-banner-2.jpeg";

export default function MainSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2500,
  };

  return (
    <>
      <div className="container my-4">
        <div className="row g-0">
          <div className="col-md-9">
            <Slider {...settings}>
              <img height={400} src={img5} className="w-100" alt="Main slider" />
              <img height={400} src={img4} className="w-100" alt="Main slider"/>
              <img height={400} src={img3} className="w-100" alt="Main slider"/>
            </Slider>
          </div>
          <div className="col-md-3">
            <img height={200} src={img1} className="w-100" alt="Promotional banner"/>
            <img height={200} src={img2} className="w-100" alt="Promotional banner"/>
          </div>
        </div>
      </div>
    </>
  );
}
