import { useEffect } from "react";
import { useGetData } from "../../util/getPostData";
import style from "./History.module.css";
import { Banner } from "./ShopPage";
import { GrLinkNext } from "react-icons/gr";
import { useNavigate } from "react-router-dom";

function History() {
  const [data, getData, loading, error] = useGetData("/orders");
  const navigate = useNavigate();

  useEffect(() => {
    getData();
  }, []);

  // handle error 500
  useEffect(() => {
    if (error && error.status === 500)
      navigate("/error", { state: { msg: error.data.msg } });
  }, [error]);

  return (
    <section className={style.history}>
      <Banner name="HISTORY" subName="HISTORY" />
      <div className={style.tableContainer}>
        <table>
          <thead>
            <tr>
              <th>ID ORDER</th>
              <th>ID USER</th>
              <th>NAME</th>
              <th>PHONE</th>
              <th>ADDRESS</th>
              <th>TOTAL</th>
              <th>DELIVERY</th>
              <th>STATUS</th>
              <th>DETAIL</th>
            </tr>
          </thead>
          {!data && (
            <tbody>
              <tr>
                <th>LOADING...</th>
              </tr>
            </tbody>
          )}
          {data && <HistoryTable data={data} />}
        </table>
      </div>
    </section>
  );
}

export default History;

function HistoryTable({ data }) {
  const result = data?.map((el, i) => (
    <tr key={i}>
      <HistoryTableItem
        id={el._id}
        userId={el.userId._id}
        name={el.userId.name}
        phone={el.userId.phone}
        address={el.userId.address}
        total={el.totalPrice}
      />
    </tr>
  ));
  return <tbody>{result}</tbody>;
}

function HistoryTableItem({ id, userId, name, phone, address, total }) {
  const navigate = useNavigate();

  return (
    <>
      <td>{id}</td>
      <td>{userId}</td>
      <td>{name}</td>
      <td>{phone}</td>
      <td>{address}</td>
      <td>{total.toLocaleString("de-De")} VND</td>
      <td>waiting for progressing</td>
      <td>waiting for pay</td>
      <td>
        <button type="button" onClick={() => navigate(id)}>
          View
          <GrLinkNext />
        </button>
      </td>
    </>
  );
}
