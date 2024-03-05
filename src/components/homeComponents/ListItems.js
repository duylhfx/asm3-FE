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
        <ImageItem data={data} />
      </div>
    </section>
  );
}

export default ListItems;

export async function listImgLoader() {
  const res = fetch(`${serverUrl}/products`);

  if (!res) {
    throw json({ message: "Can't fetch data" }, { status: 500 });
  }

  return res;
}
