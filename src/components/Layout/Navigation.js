import { useNavigate } from "react-router-dom";
import styles from "./Navigation.module.css";
import { FaShoppingCart, FaUserAlt } from "react-icons/fa";
import axios from "axios";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Dropdown from "../UIUX/Dropdown";

function Navigation({ user, updateUser }) {
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);

  function logoutHandler() {
    axios
      .get("/logout", {
        withCredentials: true,
      })
      .then((res) => {
        // remove user in local storage
        localStorage.removeItem("user");
        navigate("/");
        updateUser(null);
      })
      .catch((err) => console.log(err));
  }

  // dropdown option
  const options = [
    { direction: null, label: user },
    { direction: "/history", label: "History" },
  ];

  return (
    <nav className={styles.nav}>
      <ul className="d-flex">
        <li>
          <button type="button" onClick={() => navigate("/")} className="btn">
            <span>Home</span>
          </button>
        </li>
        <li>
          <button
            type="button"
            onClick={() => navigate("shop")}
            className="btn"
          >
            Shop
          </button>
        </li>
      </ul>
      <ul>
        <h2 className="text-center">BOUTIQUE</h2>
      </ul>
      <ul className="d-flex justify-content-end">
        <li>
          <button
            type="button"
            onClick={() => navigate("cart")}
            className="btn text-black-50 d-flex align-items-center position-relative"
          >
            <span
              className={`badge text-bg-primary fst-normal position-absolute top-100 start-0 translate-middle ${styles.cartItems}`}
            >
              {cartItems ? cartItems.length : 0}
            </span>
            <FaShoppingCart />
            Cart
          </button>
        </li>
        {!user && (
          <li>
            <button
              type="button"
              onClick={() => navigate("login")}
              className="btn text-black-50 d-flex align-items-center"
            >
              <FaUserAlt />
              Login
            </button>
          </li>
        )}
        {user && (
          <li>
            <div className="text-black-50 d-flex align-items-center">
              <FaUserAlt />
              <Dropdown options={options} />
            </div>
          </li>
        )}
        {user && (
          <li>
            <button
              type="button"
              onClick={logoutHandler}
              className="btn text-black-50"
            >
              (Logout)
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navigation;
