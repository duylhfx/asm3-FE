import { useNavigate, useParams } from "react-router-dom";
import style from "./HistoryDetail.module.css";
import { serverUrl, useGetData } from "../../util/getPostData";
import { useEffect } from "react";

function HistoryDetail() {
  const { orderId } = useParams();
  const [order, getOder, loading, error] = useGetData(`/orders/${orderId}`);
  const navigate = useNavigate();

  useEffect(() => {
    getOder();
  }, []);

  useEffect(() => {
    if (error && error.status === 500)
      navigate("/error", { state: { msg: error.data.msg } });
  }, [error]);

  return (
    <section className={style.historyDetail}>
      <div className={style.userInfo}>
        <h1>INFORMATION ORDER</h1>
        <p>ID User: {order && order.userId._id}</p>
        <p>Full Name: {order && order.userId.name}</p>
        <p>Phone: {order && order.userId.phone}</p>
        <p>Address: {order && order.userId.address}</p>
        <p>Total: {order && order.totalPrice.toLocaleString("de-DE")} VND</p>
      </div>
      <div className={style.tableContainer}>
        <table>
          <thead>
            <tr>
              <th>ID PRODUCT</th>
              <th>IMAGE</th>
              <th>NAME</th>
              <th>PRICE</th>
              <th>COUNT</th>
            </tr>
          </thead>
          {order && <HistoryDetailTable order={order} />}
        </table>
      </div>
    </section>
  );
}

export default HistoryDetail;

function HistoryDetailTable({ order }) {
  const result = order.products?.map((el, i) => (
    <tr key={i}>
      <HistoryDetailTableItem
        id={el._id}
        img={el.img}
        name={el.name}
        price={el.price}
        qty={el.quantity}
      />
    </tr>
  ));
  return <tbody>{result}</tbody>;
}

function HistoryDetailTableItem({ id, img, name, price, qty }) {
  return (
    <>
      <td>{id}</td>
      <td>
        <img
          src={img.slice(0, 6) === "images" ? `${serverUrl}/${img}` : img}
          alt={name}
          width={150}
        />
      </td>
      <td>{name}</td>
      <td>{price.toLocaleString("de-DE")} VND</td>
      <td>{qty}</td>
    </>
  );
}
