import { delayComponent } from "../../util/delayComponent";
import { Suspense, lazy } from "react";
import Banner from "../homeComponents/Banner";
import Information from "../homeComponents/Information";

const Category = lazy(() =>
  delayComponent(import("../homeComponents/Category"), 500)
);
const ListItems = lazy(() =>
  delayComponent(import("../homeComponents/ListItems"), 1000)
);

function HomePage() {
  return (
    <section>
      <Banner />
      <Suspense fallback={<div>Loading...</div>}>
        <Category />
        <ListItems />
      </Suspense>
      <Information />
    </section>
  );
}

export default HomePage;
