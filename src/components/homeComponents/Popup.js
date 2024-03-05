import { FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import styles from "./Popup.module.css";

function Popup(props) {
  const navigate = useNavigate();

  return (
    <div
      className={styles.backdrop}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          props.closeModalHandler();
        }
      }}
    >
      <div className={styles.modal}>
        <img src={props.img1} alt={props.name} />
        <div className={styles.content}>
          <h3 className="my-2 fw-semibold">{props.name}</h3>
          <p className="opacity-50 mb-2">{`${parseFloat(
            props.price
          ).toLocaleString("de-DE")} VND`}</p>
          <picture>{props.short_desc}</picture>
          <button
            type="button"
            className="btn btn-dark fst-italic mt-3"
            onClick={() => {
              navigate(`/shop/detail/${props.id}`);
              window.scrollTo(0, 0);
            }}
          >
            <FaShoppingCart />
            <p>View Detail</p>
          </button>
        </div>
        <button
          type="button"
          onClick={() => props.closeModalHandler()}
          className={styles.close}
        >
          X
        </button>
      </div>
    </div>
  );
}

export default Popup;
