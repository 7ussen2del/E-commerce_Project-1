import React, { useContext } from "react";
import { Link } from "react-router-dom";
import logo from "../../Assets/images/freshcart-logo.svg";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
import { CartContext } from "../Context/CartContext";

export default function Navbar() {
  let navigate = useNavigate();

  let { userToken, setUserToken } = useContext(UserContext);
  let { numOfCartItems } = useContext(CartContext);
  function logOut() {
    localStorage.removeItem("userToken");
    setUserToken(null);
    navigate("/login");
  }
  return (
    <>
      <nav className=" fixed-top navbar navbar-expand-lg bg-main-light">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <img src={logo} alt="fresh market logo" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2  mb-lg-0">
              {userToken ? (
                <>
                  <li className="nav-item ">
                    <Link className="nav-link line1 active" to={"/"}>
                      Home
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link active line1" to={"/products"}>
                      Products
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link active line1" to={"/categories"}>
                      Categories
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link active line1" to={"/brand"}>
                      Brands
                    </Link>
                  </li>
                </>
              ) : (
                " "
              )}
            </ul>
            <ul className="navbar-nav me-auto">
              <li className="nav-item d-flex align-items-center">
                <a href="https://www.instagram.com/?hl=en">
                  <i className="fab fa-instagram nav-link active"></i>
                </a>
                <a href="https://www.facebook.com/">
                  <i className="fab fa-facebook nav-link active"></i>
                </a>
                <a href="https://www.tiktok.com/en/">
                  <i className="fab fa-tiktok nav-link active"></i>
                </a>
                <a href="https://x.com/">
                  <i className="fab fa-twitter nav-link active"></i>
                </a>
                <a href="https://www.linkedin.com/feed/">
                  <i className="fab fa-linkedin nav-link active"></i>
                </a>
                <a href="https://www.youtube.com/">
                  <i className="fab fa-youtube nav-link active"></i>
                </a>
              </li>
            </ul>
            <ul className="navbar-nav">
              {userToken !== null ? (
                <>
                  <li className="nav-item position-relative px-3 ">
                    <Link className="nav-link active px-2" to={"/cart"}>
                      <i className="fas fa-shopping-cart fs-5  "></i>
                      <span className="mx-2 badge bg-main position-absolute top-0 end-0">
                        {numOfCartItems}
                      </span>
                    </Link>
                  </li>
                  <li className="nav-item line1">
                    <Link
                      to={"/login"}
                      onClick={() => logOut()}
                      className="nav-link active"
                    >
                      Logout
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  {" "}
                  <li className="nav-item">
                    <Link className="nav-link active line1" to={"/login"}>
                      Login
                    </Link>
                  </li>
                  <li className="nav-item ">
                    <Link className="nav-link line1 active" to={"/register"}>
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
