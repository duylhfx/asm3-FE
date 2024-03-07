import axios from "axios";
import { useEffect, useState } from "react";
import { Outlet, Navigate, useLoaderData } from "react-router-dom";

function PrivateRoutes() {
  let user = useLoaderData();
  useEffect(() => {
    console.log(user);
  }, [user]);

  return user?.name ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoutes;

async function privateRoutesLoader() {
  let user;
  try {
    const response = await axios.get("/user", {
      withCredentials: true,
    });
    user = response.data;
  } catch (err) {
    console.log(err);
    user = "";
  }

  return user;
}

export { privateRoutesLoader };
