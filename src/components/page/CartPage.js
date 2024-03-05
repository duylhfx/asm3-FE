import styles from "./CartPage.module.css";
import { Banner } from "./ShopPage";
import { GrLinkPrevious, GrLinkNext } from "react-icons/gr";
import { AiFillGift } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { BsTrash } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { NumberInputController } from "./DetailPage";
import { removeItem, addItem, minusItem } from "../../store/cartReducer";
import { useEffect, useState } from "react";
import { serverUrl } from "../../util/getPostData";

function CartPage() {
  // logic total amount of items cart
  const items = useSelector((state) => state.cart.items);
  const totalAmount =
    items.length > 0
      ? items
          .reduce((total, item) => total + item.quantity * item.price, 0)
          .toLocaleString("de-DE") + " VND"
      : "";

  return (
    <section>
      <Banner name="CART" subName="CART" />
      <h3 className="mt-5">SHOPPING CART</h3>
      {items.length > 0 ? (
        <div>
          <div className={`${styles.content} d-lg-flex gap-3`}>
            <ShoppingCart items={items} />
            <CartTotal totalAmount={totalAmount} />
          </div>
          <CartNavigateBanner items={items} />
        </div>
      ) : (
        <p style={{ color: "red", marginTop: "20px", marginBottom: "30px" }}>
          No item in cart
        </p>
      )}
    </section>
  );
}

export default CartPage;

// SHOPPING CART UI
function ShoppingCart({ items }) {
  const dispatch = useDispatch();

  return (
    <div className="d-flex flex-column col-12 col-lg-8">
      <ul className={`${styles.title} ${styles.bgGray} p-1 p-md-2 fw-semibold`}>
        <li>IMAGE</li>
        <li>PRODUCT</li>
        <li>PRICE</li>
        <li>QUANTITY</li>
        <li>TOTAL</li>
        <li>REMOVE</li>
      </ul>
      {items.map((el, index) => (
        <ul className={`${styles.title} p-1 p-md-2`} key={index}>
          <li>
            <img
              src={
                el.img.slice(0, 6) === "images"
                  ? `${serverUrl}/${el.img}`
                  : el.img
              }
              alt={el.name}
              width="60px"
              height="60px"
            />
          </li>
          <li className="fw-semibold">
            <p>{el.name}</p>
          </li>
          <li className="opacity-50">
            <p>{el.price.toLocaleString("de-DE") + " VND"}</p>
          </li>
          <li>
            <NumberInputController
              num={el.quantity}
              minusHandler={() => dispatch(minusItem(el.id))}
              plusHandler={() => dispatch(addItem(el.id))}
              changeHandler={() => console.log("update quantity!")}
            />
          </li>
          <li className="opacity-50">
            <p>{(el.price * el.quantity).toLocaleString("de-DE") + " VND"}</p>
          </li>
          <li
            className="opacity-50 btn"
            onClick={() => dispatch(removeItem(el.id))}
          >
            <BsTrash />
          </li>
        </ul>
      ))}
    </div>
  );
}

// CART TOTAL UI
function CartTotal({ totalAmount }) {
  return (
    <div className={`w-100 p-3 p-lg-4 ${styles.cartTotal}`}>
      <h3>CART TOTAL</h3>
      <p className="mt-4 pb-2 border-bottom">
        SUBTOTAL <span className="opacity-50 ps-2">{totalAmount}</span>
      </p>
      <p className="mb-4">
        TOTAL <span className="ps-2">{totalAmount}</span>
      </p>

      <input
        type="text"
        placeholder="Enter your coupon"
        className="w-100 py-2 px-3 border border-50 opacity-50"
      />
      <button
        type="button"
        className="w-100 p-2 border border-0 bg-dark text-light d-flex align-items-center justify-content-center gap-1"
      >
        <AiFillGift />
        <p>Apply coupon</p>
      </button>
    </div>
  );
}

// CART NAVIGATE UI
function CartNavigateBanner({ items }) {
  const navigate = useNavigate();
  const [lock, setLock] = useState(true);

  useEffect(() => {
    if (items.length > 0) {
      setLock(false);
    } else {
      setLock(true);
    }
  }, [items]);

  return (
    <div className={`${styles.checkout} col-12 col-lg-8 mb-5`}>
      <button type="button" onClick={() => navigate("/shop")}>
        <GrLinkPrevious />
        Continue shopping
      </button>
      <button
        type="button"
        onClick={() => navigate("checkout")}
        disabled={lock}
      >
        Proceed to checkout
        <GrLinkNext />
      </button>
    </div>
  );
}
