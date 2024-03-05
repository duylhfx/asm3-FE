import { Outlet, Navigate, useLoaderData } from "react-router-dom";

function PrivateRoutes() {
  let user = useLoaderData();

  return user ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoutes;

async function privateRoutesLoader() {
  const user = localStorage.getItem("user") || null;
  return user;
}

export { privateRoutesLoader };
