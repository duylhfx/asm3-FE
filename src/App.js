import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import HomePage from "./components/page/HomePage";
import PageNotFound from "./components/page/PageNotFound";
import Layout, { layoutLoader } from "./components/Layout/Layout";
import ShopPage from "./components/page/ShopPage";
import CartPage from "./components/page/CartPage";
import CheckoutPage from "./components/page/CheckoutPage";
import LoginPage from "./components/page/LoginPage";
import RegisterPage from "./components/page/RegisterPage";
import { listImgLoader } from "./components/homeComponents/ListItems";
import DetailPage from "./components/page/DetailPage";
import PrivateRoutes, { privateRoutesLoader } from "./util/PrivateRouter";
import History from "./components/page/History";
import HistoryDetail from "./components/page/HistoryDetail";
import ErrorComponent from "./components/page/ErrorPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Layout />} id="layout" loader={layoutLoader}>
        <Route index element={<HomePage />} loader={listImgLoader} />
        <Route path="shop" id="shop" loader={listImgLoader}>
          <Route index element={<ShopPage />} />
          <Route path="detail/:productId" element={<DetailPage />} />
        </Route>
        <Route path="cart" element={<CartPage />} />
        <Route element={<PrivateRoutes />} loader={privateRoutesLoader}>
          <Route path="cart/checkout" element={<CheckoutPage />} />
          <Route path="history" element={<History />} />
          <Route path="history/:orderId" element={<HistoryDetail />} />
        </Route>
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="error" element={<ErrorComponent />} />
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Route>
  )
);

export default function App() {
  return <RouterProvider router={router} />;
}
