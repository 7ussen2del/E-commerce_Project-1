import React, { useContext } from "react";
import axios from "axios";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { RotatingLines } from "react-loader-spinner";
import { CartContext } from "../Context/CartContext";

export default function FeatureProduct() {
  let { addtocart, setnumOfCartItems } = useContext(CartContext);

  async function addProduct(productId) {
    let response = await addtocart(productId);

    if (response.data.status === "success") {
      setnumOfCartItems(response.data.numOfCartItems);
      toast.success("The product is added", {
        duration: 3000,
        position: "top-center",
        className: "text-white bg-main",
      });
    } else {
      toast.error("This is an error!", {
        duration: 3000,
        position: "top-center",
        className: "text-white bg-danger",
      });
    }
  }

  async function getFeatureProduct() {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    return await axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
  }

  let { data } = useQuery("FeatureProduct", getFeatureProduct);
  return (
    <>
      <div className="container my-5">
        <div className="row gy-5">
          {data?.data.data ? (
            <>
              {data?.data.data.map((product) => {
                return (
                  <div key={product._id} className="col-md-4 col-lg-3">
                    <div className="rounded-2 product shadow1 overflow-hidden px-3 pb-3">
                      <Link
                        className=" text-decoration-none"
                        to={`/productDetails/${product._id}`}
                      >
                        <img
                          src={product.imageCover}
                          alt={product.title}
                          className="w-100"
                        />
                        <span className=" text-main font-sm fw-bolder">
                          {product.category.name}
                        </span>
                        <h6 className="text-main">
                          {product.title.split(" ").slice(0, 2).join(" ")}
                        </h6>
                        <div className=" d-flex justify-content-between mt-2">
                          <span className=" text-black">
                            {product.price} EGP
                          </span>
                          <span className=" text-black">
                            <i className="fas fa-star rating-color"></i>
                            {product.ratingsAverage}
                          </span>
                        </div>
                      </Link>
                      <button
                        onClick={() => addProduct(product._id)}
                        className=" btn bg-main text-white w-100 btn-sm mt-2"
                      >
                        add to cart
                      </button>
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
