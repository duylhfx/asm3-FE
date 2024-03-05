import { useNavigate } from "react-router-dom";
import styles from "./Category.module.css";

function Category() {
  const navigate = useNavigate();

  return (
    <section className={styles.category}>
      <div className={styles.content}>
        <h6 className="opacity-50">CAREFULLY CREATED COLLECTIONS</h6>
        <h3>BROWSE OUR CATEGORIES</h3>
      </div>
      <div className={styles.imgGroup1}>
        <img
          src="./Resource img/product_1.png"
          alt="product_1"
          onClick={() => {
            navigate("/shop?category=iphone");
            window.scrollTo(0, 200);
          }}
        />
        <img
          src="./Resource img/product_2.png"
          alt="product_2"
          onClick={() => {
            navigate("/shop?category=macbook");
            window.scrollTo(0, 200);
          }}
        />
      </div>
      <div className={styles.imgGroup2}>
        <img
          src="./Resource img/product_3.png"
          alt="product_3"
          onClick={() => {
            navigate("/shop?category=ipad");
            window.scrollTo(0, 200);
          }}
        />
        <img
          src="./Resource img/product_4.png"
          alt="product_4"
          onClick={() => {
            navigate("/shop?category=watch");
            window.scrollTo(0, 200);
          }}
        />
        <img
          src="./Resource img/product_5.png"
          alt="product_5"
          onClick={() => {
            navigate("/shop?category=airpod");
            window.scrollTo(0, 200);
          }}
        />
      </div>
    </section>
  );
}

export default Category;
