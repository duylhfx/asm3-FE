import axios from "axios";
import { serverUrl } from "../../util/getPostData";
import ImageItem from "./ImageItem";
import { json, useLoaderData } from "react-router-dom";

function ListItems() {
  const data = useLoaderData();

  return (
    <section className="mt-4">
      <div>
        <h6 className="opacity-50">MADE THE HARD WAY</h6>
        <h3>TOP TRENDING PRODUCTS</h3>
      </div>
      <div>
        {data ? (
          <ImageItem data={data} />
        ) : (
          <h3 style={{ marginTop: "20px" }}>Loading...</h3>
        )}
      </div>
    </section>
  );
}

export default ListItems;

export async function listImgLoader() {
  let res;
  try {
    let fetch = await axios.get(`${serverUrl}/products`, {
      withCredentials: true,
    });
    res = fetch.data;
    if (!res) {
      throw json({ message: "Can't fetch data" }, { status: 500 });
    }
  } catch (err) {
    console.log(err);
    res = null;
  }

  return res;
}
