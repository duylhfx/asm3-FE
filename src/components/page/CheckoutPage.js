import { Banner } from "./ShopPage";
import styles from "./CheckoutPage.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useGetData, usePostData } from "../../util/getPostData";
import { useEffect, useState } from "react";
import { removeCart } from "../../store/cartReducer";
import { useNavigate } from "react-router-dom";
import CartDetailTotal from "../UIUX/CartDetailTotal";
import Form from "../UIUX/Form";

function CheckoutPage() {
  const dispatch = useDispatch();
  const [user, getUser, loadUser, errUser] = useGetData("/user");
  const navigate = useNavigate();
  // logic total amount of items cart
  const items = useSelector((state) => state.cart.items);
  const totalAmount =
    items.length > 0
      ? items
          .reduce((total, item) => total + item.quantity * item.price, 0)
          .toLocaleString("de-DE") + " VND"
      : "";

  // all products in order
  const products = items.map((el) => ({
    productId: el.id,
    quantity: el.quantity,
    name: el.name,
    img: el.img,
    price: el.price,
  }));
  // total prices in order
  const totalPrice = items.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  );

  // creating new order
  const order = {
    user: user,
    products: products,
    totalPrice: totalPrice,
  };

  // post new order
  const [postData, loading, error] = usePostData(
    "/orders/add-order",
    order,
    "/",
    callInsidePosting
  );

  // post email after order
  const [postEmail] = usePostData("/orders/send-email", order, "/");

  // exec when posting data
  function callInsidePosting() {
    // remove all items in cart
    dispatch(removeCart());
    alert(
      "Thank you for you order. You will receive a confirmation mail shortly!"
    );
  }

  function changeHandler(e) {
    const updated = { [e.target.name]: e.target.value };
    getUser((user) => ({ ...user, ...updated }));
  }

  function submitHandler(e) {
    e.preventDefault();
    postData();
    postEmail();
  }

  useEffect(() => {
    getUser();
  }, []);

  // handle error 500
  useEffect(() => {
    if (errUser && errUser.status === 500)
      navigate("/error", { state: { msg: errUser.data.msg } });
  }, [errUser]);

  return (
    <section>
      <Banner name="CHECKOUT" subName="HOME / CART / CHECKOUT" />
      <h3 className="mt-5">BILLING DETAILS</h3>
      <div className={`${styles.content} d-lg-flex gap-3`}>
        {user && (
          <Form
            changeHandler={changeHandler}
            submitHandler={submitHandler}
            user={user}
            error={error}
            loading={loading}
          />
        )}
        <CartDetailTotal items={items} totalAmount={totalAmount} />
      </div>
    </section>
  );
}

export default CheckoutPage;
