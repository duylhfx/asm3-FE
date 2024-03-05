import { useNavigate } from "react-router-dom";
import styles from "./Banner.module.css";

function Banner() {
  const navigate = useNavigate();

  return (
    <div className={styles.banner}>
      <img src="./Resource img/banner1.jpg" alt="" />
      <div className={styles.content}>
        <p className="opacity-50">NEW INSPIRATION 2020</p>
        <h2>20% OFF ON NEW SEASON</h2>
        <button type="button" onClick={() => navigate("shop")}>
          Browse Collections
        </button>
      </div>
    </div>
  );
}

export default Banner;
