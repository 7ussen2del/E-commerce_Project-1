import React, { useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { CartContext } from "../Context/CartContext";
import {  useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { OrderContext } from "../Context/OrderContext";

export default function Address() {
  let { cartId, setnumOfCartItems } = useContext(CartContext);
  let { makeOrder } = useContext(OrderContext);
  let navigate = useNavigate();

  async function paymentSubmit(value) {
    await makeOrder(cartId, value);
    console.log(cartId);
    setnumOfCartItems(0);
    navigate("/userOrder");
  }

  const validationSchema = Yup.object({
    details: Yup.string().required("Address Details is Required"),
    phone: Yup.string()
      .required("phone is required")
      .matches(
        /^(\+2){0,1}(01)[0125][0-9]{8}$/gm,
        "Enter a valid phone number"
      ),
    city: Yup.string().required("city is required"),
  });

  const formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    validationSchema,
    onSubmit: paymentSubmit,
  });

  return (
    <>
      <Helmet>
        <title>Address</title>
        <meta name="description" content="pay online Address Form Page" />
      </Helmet>{" "}
      <div className="container  my-5">
        <form className="marginTop" onSubmit={formik.handleSubmit}>
          <label htmlFor="details">details:</label>
          <input
            className=" form-control"
            type="text"
            id="details"
            name="details"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.details}
          />
          {formik.errors.details && formik.touched.details ? (
            <div className="alert alert-danger p-2 mt-2">
              {formik.errors.details}
            </div>
          ) : null}
          <label htmlFor="phone">Phone:</label>
          <input
            className=" form-control"
            type="tel"
            id="phone"
            name="phone"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.phone}
          />
          {formik.errors.phone && formik.touched.phone ? (
            <div className="alert alert-danger p-2 mt-2">
              {formik.errors.phone}
            </div>
          ) : null}
          <label htmlFor="city">city:</label>
          <input
            className=" form-control"
            type="text"
            id="city"
            name="city"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.city}
          />
          {formik.errors.city && formik.touched.city ? (
            <div className="alert alert-danger p-2 mt-2">
              {formik.errors.city}
            </div>
          ) : null}
          <button className="btn bg-main text-white mt-2" type="submit">
            Pay By Cash
          </button>
        </form>
      </div>
    </>
  );
}
