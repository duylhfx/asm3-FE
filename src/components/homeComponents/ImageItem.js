import { serverUrl } from "../../util/getPostData";
import styles from "./ImageItem.module.css";
import Popup from "./Popup";
import { Fragment, useState } from "react";

function ImageItem({ data }) {
  const result = data
    .slice(0, 8)
    .map((el, index) => (
      <Image
        key={index}
        id={el._id}
        img1={el.img1}
        name={el.name}
        price={el.price}
        short_desc={el.short_desc}
      />
    ));

  return <ul className={styles.image}>{result}</ul>;
}

export default ImageItem;

// Image UI
function Image(props) {
  // hook to control modal toggle
  const [popup, setPopup] = useState(false);

  function closeModalHandler() {
    setPopup(false);
  }
  function openModalHandler() {
    setPopup(true);
  }

  return (
    <li>
      <Item
        img1={props.img1}
        name={props.name}
        onClick={openModalHandler}
        price={props.price}
      />
      {popup && (
        <Popup
          id={props.id}
          img1={props.img1}
          name={props.name}
          price={props.price}
          short_desc={props.short_desc}
          closeModalHandler={closeModalHandler}
        />
      )}
    </li>
  );
}

export function Item({ img1, name, price, onClick }) {
  return (
    <Fragment>
      <img
        src={img1.slice(0, 6) === "images" ? `${serverUrl}/${img1}` : img1}
        alt={name}
        className={styles.img1}
        onClick={onClick}
      />
      <div className={styles.des}>
        <h3 className="mt-3 fw-semibold">{name}</h3>
        <p className="opacity-50">{`${parseFloat(price).toLocaleString(
          "de-DE"
        )} VND`}</p>
      </div>
    </Fragment>
  );
}
