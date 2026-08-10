import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import Slider from "react-slick";

export default function CategorySlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 7000,
    slidesToShow: 7,
    slidesToScroll: 7,
    autoplay: true,
    utoplaySpeed: 100,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };

  function getCategorySlider() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
  }

  let { data } = useQuery(
    "CategorySlider",
    getCategorySlider
  );

  return (
    <>
      <div className="mb-5 container ">
        {data?.data.data ? (
          <Slider {...settings}>
            {data?.data.data.map((category) => (
              <img
                key={category._id}
                src={category.image}
                alt={category.name}
                className="w-100 cursor-pointer"
                height={200}
              />
            ))}
          </Slider>
        ) : (
          ""
        )}
      </div>
    </>
  );
}
