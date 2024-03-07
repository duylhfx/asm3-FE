import {
  useNavigate,
  useRouteLoaderData,
  useSearchParams,
} from "react-router-dom";
import { Item } from "../homeComponents/ImageItem";
import styles from "./ProductList.module.css";
import { useEffect } from "react";

function ProductList({ inputVal }) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const searchCategory = searchParams.get("category");
  let filterData, result;

  // data pass from parent component
  const dataLoader = useRouteLoaderData("shop"); // list items
  const dataSearch = inputVal; // user input

  //-- LOGIC TO SEARCH ITEM --//
  // logic with multi conditions searching
  if (searchCategory || dataSearch) {
    filterData = dataLoader
      ?.filter((el) =>
        // filter by data input
        dataSearch
          ? el.name.toLowerCase().includes(dataSearch.toLowerCase())
          : el
      )
      .filter((el) =>
        // filter by category
        searchCategory ? el.category === searchCategory : el
      );
  } else {
    filterData = structuredClone(dataLoader);
  }

  result =
    filterData?.length > 0 ? (
      filterData.map((el, index) => (
        <li key={index}>
          <Item
            img1={el.img1}
            alt={el.name}
            price={el.price}
            name={el.name}
            onClick={() => {
              navigate(`detail/${el._id}`);
              window.scrollTo(0, 0);
            }}
          />
        </li>
      ))
    ) : (
      <li>
        <p
          style={{ width: "100%", color: "red", marginTop: 0 }}
        >{`No item found!`}</p>
      </li>
    );

  return (
    <section className={styles.list}>
      <ul>{result}</ul>
    </section>
  );
}

export default ProductList;
