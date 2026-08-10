import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../Context/CartContext";
import { MutatingDots } from "react-loader-spinner";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import toast from "react-hot-toast";
export default function Cart() {
  let {
    getLoogedUserCart,
    removeCartItem,
    updateProductQuantity,
    clearCartItem,
    setnumOfCartItems,
    setcartId,
  } = useContext(CartContext);

  const [cartDetails, setcartDetails] = useState(null);
  const [isLoading, setisLoading] = useState(true);

useEffect(() => {
    async function getCart() {
        let { data } = await getLoogedUserCart();

        setisLoading(false);

        if (data?.status === "success") {
            setcartDetails(data);
            setcartId(data?.data?._id);
        }
    }

    getCart();
}, [getLoogedUserCart,setcartId]);

  async function updateCount(id, count) {
    let { data } = await updateProductQuantity(id, count);
    if (data?.status === "success") {
      setcartDetails(data);
    }

    setnumOfCartItems(data.numOfCartItems);
  }

  async function removeCart(id) {
    let { data } = await removeCartItem(id);
    if (data?.status === "success") {
      setcartDetails(data);
      toast.success("cart is cleared successfully", {
        duration: 3000,
        position: "top-center",
        className: "text-white bg-main",
      });
    } else {
      toast.error("error in clearing the cart, try again", {
        duration: 3000,
        position: "top-center",
        className: "text-white bg-main",
      });
    }
    setnumOfCartItems(data.numOfCartItems);
  }

  async function clearCart() {
    let { data } = await clearCartItem();
    if (data?.message === "success") {
      setcartDetails(null);
      toast.success("cart is cleared successfully", {
        duration: 3000,
        position: "top-center",
        className: "text-white bg-main",
      });
    } else {
      toast.error("error in clearing the cart, try again", {
        duration: 3000,
        position: "top-center",
        className: "text-white bg-main",
      });
    }
    setnumOfCartItems(data.numOfCartItems);
  }

  
  return (
    <>
      <Helmet>
        <title>Cart</title>
        <meta name="description" content="User FreshCart Website" />
      </Helmet>
      {isLoading ? (
        <section className=" d-flex justify-content-center marginTop align-items-center">
          <MutatingDots
            visible={true}
            height="100"
            width="100"
            color="#4fa94d"
            secondaryColor="#4fa94d"
            radius="12.5"
            ariaLabel="mutating-dots-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </section>
      ) : cartDetails === null ? (
        <h3 className="h2 marginTop text-center px-3">Shop Cart is empty</h3>
      ) : (
        <div className="container my-5 ">
          <div className="w-75 mx-auto marginTop bg-main-light">
            <div>
              {" "}
              <h3 className="h4">Shop Cart :</h3>
              <h4 className="h6 fw-bold mt-4">
                Total Cart Price :{" "}
                <span className="text-main">
                  {cartDetails.data.totalCartPrice} EGP
                </span>
              </h4>
              <h2 className="h6 fw-bold mt-4">
                Total number of items:{" "}
                <span className="text-main">{cartDetails.numOfCartItems}</span>
              </h2>
            </div>
            <div className="text-end ">
              <button
                onClick={() => clearCart()}
                className="btn bg-danger w-25 text-white m-3"
              >
                {" "}
                Clear Cart
              </button>
            </div>

            {cartDetails?.data.products.map((product) => (
              <div
                key={product.product.id}
                className="row mt-2 border-bottom px-2 py-2"
              >
                <div className="col-md-1">
                  <img
                    className="w-100 "
                    src={product.product.imageCover}
                    alt=""
                  />
                </div>
                <div className="col-md-11">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h4 className="h6">{product.product.title}</h4>
                      <h6 className="text-main">price : {product.price} EGP</h6>
                    </div>
                    <div>
                      <button
                        onClick={() =>
                          updateCount(product.product.id, product.count + 1)
                        }
                        className="btn"
                      >
                        +
                      </button>
                      <span className="mx-2 ">{product.count}</span>
                      <button
                        onClick={() =>
                          updateCount(product.product.id, product.count - 1)
                        }
                        className="btn "
                      >
                        -
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => removeCart(product.product.id)}
                    className="btn btn-outline-danger m-2 p-2 p-0"
                  >
                    <i className="me-2 fas fa-trash-can"></i>Remove
                  </button>
                </div>
              </div>
            ))}
            <div className="d-flex justify-content-center align-items-center">
              <Link className="btn bg-main mt-3  text-white w-50" to="/address">
                Cach On Delivary
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
