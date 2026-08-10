import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  // initial value

  let phoneRegExp = /^(\+2){0,1}(01)[0125][0-9]{8}$/gm;
  let navigate = useNavigate();
  const [error, seterror] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  //register submit

  async function registerSubmit(values) {
    setisLoading(true);
    let { data } = await axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, values)
      .catch((err) => {
        setisLoading(false);
        seterror(err.response.data.message);
      });

    console.log(data);
    if (data.message === "success") {
      setisLoading(false);
      navigate('/login');
    }
  }

  // validation schema

  let validationSchema = yup.object({
    name: yup
      .string()
      .min(3, "name minlength is 3")
      .max(10, "name maxlength is 10")
      .required("name is required"),
    email: yup.string().email("email is invalid").required("email is required"),
    phone: yup
      .string()
      .matches(phoneRegExp, "phone is valied")
      .required("phone is required"),
    password: yup
      .string()
      .matches(/^[\w.-]{6,}$/gm, "password is invalid")
      .required("password is required"),
    rePassword: yup
      .string()
      .oneOf([yup.ref("password")], "rePassword is invalid")
      .required("rePassword is required"),
  });
  // formik

  let formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
      email: "",
      password: "",
      rePassword: "",
    },
    validationSchema,
    onSubmit: registerSubmit,
  });

  return (
    <>
      <div className=" w-75 py-4 mx-auto marginTop ">
        {error !== null ? (
          <div className="alert-danger alert ">{error}</div>
        ) : (
          ""
        )}
        <h2> Register Now</h2>
        <form className="mt-3" onSubmit={formik.handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input
            className=" form-control"
            type="text"
            id="name"
            name="name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
          />
          {formik.errors.name && formik.touched.name ? (
            <div className="alert alert-danger p-2 mt-2">
              {formik.errors.name}
            </div>
          ) : (
            false
          )}

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
          ) : (
            false
          )}
          <label htmlFor="email">Email:</label>
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
          <label htmlFor="password">Password:</label>
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
          <label htmlFor="rePassword">rePassword:</label>
          <input
            className=" form-control"
            type="password"
            id="rePassword"
            name="rePassword"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.rePassword}
          />
          {formik.errors.rePassword && formik.touched.rePassword ? (
            <div className="alert alert-danger p-2 mt-2">
              {formik.errors.rePassword}
            </div>
          ) : (
            false
          )}

          {isLoading? (
            <button className="btn bg-main text-white mt-2" type="button">
              <i className="fas fa-spinner fa-spin"></i>
            </button>
          ) : (
            <button
              disabled={!(formik.isValid && formik.dirty)}
              className="btn bg-main text-white mt-2"
              type="submit"
            >
              Register
            </button>
          )}
        </form>
      </div>
    </>
  );
}

// async function userRegister(values) {
//   // setLoading(true);
//   let { data } = await axios
//     .post("https://ecommerce.routemisr.com/api/v1/auth/signup", values)
//     .catch((err) => {
//       // setLoading(false);
//       setError(err.response.data.message);
//     });

//   if (data.message === "success") {
//     // setLoading(false);
//     navigate("/login");
//   }
// }
