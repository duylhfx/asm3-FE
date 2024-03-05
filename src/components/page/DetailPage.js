import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./DetailPage.module.css";
import { Item } from "../homeComponents/ImageItem";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { serverUrl, useGetData } from "../../util/getPostData";
import { addCart } from "../../store/cartReducer";
import { useDispatch } from "react-redux";

function DetailPage() {
  // logic to find detail item
  const { productId } = useParams();
  const [id, setId] = useState(productId);
  const [product, getProduct, loadproduct, errProduct] = useGetData(
    `/products/${id}`
  );
  const [allProduct, getAllProduct, loadproducts, errProducts] =
    useGetData(`/products`);
  const [num, setNum] = useState(1);
  const [loading, setLoading] = useState(false);
  const [errorQty, setErrorQty] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // update quantity of product
  function changeHandler() {
    if (num < 1) return setNum(1);
    if (num > product.inventory) return setNum(product.inventory);
    setNum(num);
  }

  function plusHandler() {
    num < product.inventory && setNum(+num + 1);
  }

  function minusHandler() {
    num > 1 && setNum(+num - 1);
  }

  // update product render when choose a new product
  function updateId(newId) {
    setId(newId);
  }

  // update product to cart
  function addToCart() {
    setLoading(true);
    const item = {
      id: id,
      quantity: num,
      name: product.name,
      img: product.img1,
      price: product.price,
      category: product.category,
      inventory: product.inventory,
    };
    dispatch(addCart(item));
    setNum(1);
    setTimeout(() => setLoading(false), 1000);
    window.scrollTo(0, 0);
  }

  // logic to find related Items
  const relatedItems =
    product && allProduct
      ? allProduct.filter(
          (el) => el.category === product.category && el._id !== product._id
        )
      : null;

  // update new page by product id changed
  useEffect(() => {
    getProduct();
    getAllProduct();
  }, [id]);

  // handle error 500
  useEffect(() => {
    if (errProduct && errProduct.status === 500)
      navigate("/error", { state: { msg: errProduct.data.msg } });
    if (errProducts && errProducts.status === 500)
      navigate("/error", { state: { msg: errProducts.data.msg } });
  }, [errProduct, errProducts]);

  useEffect(() => {
    // handle item out of stock
    if (product && product.inventory === 0) setErrorQty(true);
  }, [product]);

  return (
    <section className={styles.detail}>
      {!product ? (
        <h2 style={{ textAlign: "center", margin: "20px" }}>LOADING...</h2>
      ) : (
        <div className={styles.detailItem}>
          <ImgSlider product={product} />
          <div className={styles.infoProduct}>
            <ShortDescribe product={product} />
            <div>
              <div className={styles.groupBtn_addCart}>
                <div className={styles.controlNumItem}>
                  <input type="text" placeholder="QUANTITY" disabled />
                  <NumberInputController
                    num={num}
                    changeHandler={changeHandler}
                    minusHandler={minusHandler}
                    plusHandler={plusHandler}
                  />
                </div>
                {!errorQty && (
                  <button
                    type="button"
                    className={styles.addCart}
                    onClick={addToCart}
                    disabled={loading}
                  >
                    {loading ? "Adding..." : "Add to cart"}
                  </button>
                )}
                {errorQty && (
                  <p style={{ color: "red", marginLeft: "20px" }}>
                    out of stock
                  </p>
                )}
              </div>
              <p className="mt-2">
                inventory:{" "}
                <span style={{ color: "red" }}>{product.inventory}</span>
              </p>
            </div>
          </div>
        </div>
      )}
      {product && <LongDescribe product={product} />}
      {relatedItems && (
        <RelatedItems relatedItems={relatedItems} updateId={updateId} />
      )}
    </section>
  );
}

export default DetailPage;

// IMG SLIDER UI
function ImgSlider({ product }) {
  // hook control IMG default when reload or click to relevant items
  const [img, setImg] = useState(null);

  useEffect(() => {
    setImg(product.img1);
  }, [product]);

  return (
    <>
      <div className={styles.slider}>
        <img
          src={
            product.img1.slice(0, 6) === "images"
              ? `${serverUrl}/${product.img1}`
              : product.img1
          }
          alt={product.name}
          onClick={() => setImg(product.img1)}
        />
        <img
          src={
            product.img2.slice(0, 6) === "images"
              ? `${serverUrl}/${product.img2}`
              : product.img2
          }
          alt={product.name}
          onClick={() => setImg(product.img2)}
        />
        <img
          src={
            product.img3.slice(0, 6) === "images"
              ? `${serverUrl}/${product.img3}`
              : product.img3
          }
          alt={product.name}
          onClick={() => setImg(product.img3)}
        />
        <img
          src={
            product.img4.slice(0, 6) === "images"
              ? `${serverUrl}/${product.img4}`
              : product.img4
          }
          alt={product.name}
          onClick={() => setImg(product.img4)}
        />
      </div>
      <div className={styles.mainImg}>
        <img
          src={img?.slice(0, 6) === "images" ? `${serverUrl}/${img}` : img}
          alt={product.name}
          width={330}
        />
      </div>
    </>
  );
}

// SHORT DESCRIBE ITEM UI
function ShortDescribe({ product }) {
  return (
    <>
      <h3 className="my-2 fw-semibold">{product.name}</h3>
      <p className="opacity-50 mb-2">{`${parseFloat(
        product.price
      ).toLocaleString("de-DE")} VND`}</p>
      <p className="opacity-50">{product.short_desc}</p>
      <p className="my-3">
        CATEGORY: <span className="opacity-50">{product.category}</span>
      </p>
    </>
  );
}

// LONG DESCRIBE ITEM UI
function LongDescribe({ product }) {
  return (
    <div className={styles.description}>
      <h3>DESCRIPTION</h3>
      <h3>PRODUCT DESCRIPTION</h3>
      <p className="opacity-50">{product.long_desc}</p>
    </div>
  );
}

// HANDLER NUMBER INPUT OR CHANGE
export function NumberInputController({
  num,
  changeHandler,
  plusHandler,
  minusHandler,
}) {
  return (
    <div className={`${styles.btnControl}`}>
      <button type="button" onClick={minusHandler}>
        <AiOutlineMinus />
      </button>
      <input type="number" value={num} onChange={changeHandler} />
      <button type="button" onClick={plusHandler}>
        <AiOutlinePlus />
      </button>
    </div>
  );
}

// RELATED ITEMS UI
function RelatedItems({ relatedItems, updateId }) {
  const navigate = useNavigate();

  return (
    <div className={styles.related}>
      <h3>RELATED PRODUCT</h3>
      <ul>
        {relatedItems.length > 0 ? (
          relatedItems.slice(0, 5).map((el, index) => (
            <li key={index}>
              <Item
                img1={el.img1}
                name={el.name}
                price={el.price}
                onClick={() => {
                  navigate(`/shop/detail/${el._id}`);
                  updateId(el._id);
                  window.scrollTo(0, 0);
                }}
              />
            </li>
          ))
        ) : (
          <li>
            <p
              style={{
                width: "100%",
                color: "red",
              }}
            >
              No item found!
            </p>
          </li>
        )}
      </ul>
    </div>
  );
}
