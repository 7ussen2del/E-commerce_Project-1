import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import { RotatingLines } from "react-loader-spinner";
import { Helmet } from "react-helmet";
export default function Brand() {

  async function getBrand(pageNum = 1) {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    return await axios.get(`https://ecommerce.routemisr.com/api/v1/brands`);
  }

  let { data } = useQuery("getBrand", getBrand);

  return (
    <>
      <Helmet>
        <title>Brands</title>
        <meta name="description" content="User FreshCart Website" />
      </Helmet>
      <div className="container my-5 ">
        <h3 className=" fw-bold mb-3 marginTop">All Brands</h3>
        <div className="row g-3">
          {data?.data.data ? (
            <>
              {data?.data.data.map((brands) => {
                return (
                  <div key={brands._id} className=" col-md-4 col-lg-3 ">
                    <div className="rounded-2 px-3 cursor-pointer product shadow1 overflow-hidden">
                      {" "}
                      <img
                        className="w-100 "
                        src={brands.image}
                        alt={brands.name}
                      />
                      <h2 className=" h5 fw-bold text-center p-3">
                        {brands.name}
                      </h2>
                    </div>
                  </div>
                );
              })}
            </>
          ) : (
            <section className=" d-flex justify-content-center align-items-center">
              {" "}
              <RotatingLines
                visible={true}
                height="96"
                width="96"
                color="grey"
                strokeWidth="5"
                animationDuration="0.75"
                ariaLabel="rotating-lines-loading"
                wrapperStyle={{}}
                wrapperClass=""
              />
            </section>
          )}
        </div>
      </div>
    </>
  );
}
