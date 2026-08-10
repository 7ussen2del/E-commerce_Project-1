import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext";

export default function Login() {
  // initial value
  let { setUserToken } = useContext(UserContext);
  let navigate = useNavigate();
  const [error, seterror] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  //register submit

  async function loginSubmit(values) {
    setisLoading(true);
    let { data } = await axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, values)
      .catch((err) => {
        setisLoading(false);
        seterror(err.response.data.message);
      });

    if (data.message === "success") {
      localStorage.setItem("userToken", data?.token);
      setUserToken(data?.token);
      setisLoading(false);
      navigate("/");
    }
  }

  // validation schema

  let validationSchema = yup.object({
    email: yup.string().email("email is invalid").required("email is required"),
    password: yup
      .string()
      .matches(/^[\w.-]{6,}$/gm, "password is invalid")
      .required("password is required"),
  });
  // formik

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: loginSubmit,
  });

  return (
    <>
      <div className=" w-75 py-4 mx-auto marginTop ">
        {error !== null ? (
          <div className="alert-danger alert ">{error}</div>
        ) : (
          ""
        )}

        <h2> Login Now :</h2>
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="email">Email :</label>
          <input
            className=" form-control"
            type="email"
            id="email"
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.errors.email && formik.touched.email ? (
            <div className="alert alert-danger p-2 mt-2">
              {formik.errors.email}
            </div>
          ) : (
            false
          )}
          <label htmlFor="password">Password :</label>
          <input
            className=" form-control"
            type="password"
            id="password"
            name="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {formik.errors.password && formik.touched.password ? (
            <div className="alert alert-danger p-2 mt-2">
              {formik.errors.password}
            </div>
          ) : (
            false
          )}
          {isLoading === true ? (
            <button className="btn bg-main text-white mt-2" type="button">
              <i className="fas fa-spinner fa-spin"></i>
            </button>
          ) : (
            <>
              <button
                disabled={!(formik.isValid && formik.dirty)}
                className="btn bg-main text-white mt-2"
                type="submit"
              >
                Login
              </button>
              <Link
                className=" text-decoration-none px-3 text-danger"
                to={"/register"}
              >
                Register Now
              </Link>
            </>
          )}
        </form>
      </div>
    </>
  );
}
