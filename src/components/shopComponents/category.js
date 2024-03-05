import { Link } from "react-router-dom";
import styles from "./category.module.css";

function Category(props) {
  // reset init val searching when click to category link
  function resetValInput() {
    props.changeHandler("");
  }

  return (
    <div className={styles.category}>
      <h3 className="mb-3">CATEGORIES</h3>
      <ul>
        <li className={styles.brand}>
          <p>APPLE</p>
        </li>
        <Link to="#" onClick={resetValInput}>
          <p>All</p>
        </Link>
        <li className={styles.type}>
          <p>IPHONE & MAC</p>
        </li>
        <Link to="?category=iphone" onClick={resetValInput}>
          <p>iphone</p>
        </Link>
        <Link to="?category=ipad" onClick={resetValInput}>
          <p>ipad</p>
        </Link>
        <Link to="?category=macbook" onClick={resetValInput}>
          <p>Macbook</p>
        </Link>
        <li className={styles.type}>
          <p>WIRELESS</p>
        </li>
        <Link to="?category=airpod" onClick={resetValInput}>
          <p>Airpod</p>
        </Link>
        <Link to="?category=watch" onClick={resetValInput}>
          <p>Watch</p>
        </Link>
        <li className={styles.type}>
          <p>OTHER</p>
        </li>
        <Link to="?category=mouse" onClick={resetValInput}>
          <p>Mouse</p>
        </Link>
        <Link to="?category=keyboard" onClick={resetValInput}>
          <p>Keyboard</p>
        </Link>
        <Link to="?category=other" onClick={resetValInput}>
          <p>Other</p>
        </Link>
      </ul>
    </div>
  );
}

export default Category;
