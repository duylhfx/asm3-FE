import styles from "./ShopPage.module.css";
import { GiPreviousButton, GiNextButton } from "react-icons/gi";
import Category from "../shopComponents/category";
import { useState } from "react";
import { delayComponent } from "../../util/delayComponent";
import { Suspense, lazy } from "react";

const ProductList = lazy(() =>
  delayComponent(import("../shopComponents/ProductList"), 500)
);

function ShopPage() {
  const [inputVal, setInputVal] = useState("");

  function changeHandler(val) {
    setInputVal(val);
  }

  return (
    <section>
      <Banner name="SHOP" subName="SHOP" />
      <div className={`${styles.content} mt-5`}>
        <div>
          <Category changeHandler={changeHandler} />
        </div>
        <div className={styles.item}>
          <SearchBar inputVal={inputVal} changeHandler={changeHandler} />
          <div className={styles.listItems}>
            <Suspense fallback={<div>Loading...</div>}>
              <ProductList inputVal={inputVal} />
            </Suspense>
          </div>
          {/* <Pagination /> */}
        </div>
      </div>
    </section>
  );
}

export default ShopPage;

//UI banner
export function Banner({ name, subName, className }) {
  return (
    <div
      className={`${styles.banner} d-flex justify-content-between ${className}`}
    >
      <h2 className="ps-5">{name}</h2>
      <h6 className="opacity-50 pe-5 text-end">{subName}</h6>
    </div>
  );
}

// UI Pagination
function Pagination({ inputVal }) {
  return (
    <nav className={styles.pagination}>
      <ul>
        <li className="page-item">
          <button type="button">
            <GiPreviousButton />
          </button>
        </li>
        <li className="page-item active" aria-current="page">
          1
        </li>
        <li className="page-item">
          <button type="button">
            <GiNextButton />
          </button>
        </li>
      </ul>
      <p>Showing 1-9 of 9 results</p>
    </nav>
  );
}

// UI SearchBar
function SearchBar(props) {
  return (
    <div className={styles.filter}>
      <input
        type="search"
        placeholder="Enter Search Here!"
        value={props.inputVal}
        onChange={(e) => {
          props.changeHandler(e.target.value);
        }}
      />
      <select name="sorting" id="sort">
        <option value="default">Default sorting</option>
      </select>
    </div>
  );
}
