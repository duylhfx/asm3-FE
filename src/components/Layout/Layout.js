import { Outlet, useLoaderData } from "react-router-dom";
import Navigation from "../Layout/Navigation";
import Footer from "./Footer";
import styles from "./Layout.module.css";
import { AiFillWechat } from "react-icons/ai";
import { useEffect, useState } from "react";
import LiveChat from "./LiveChat";
import axios from "axios";

function Layout() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(0);
  const userOnline = useLoaderData();

  function updateUser(data) {
    setUser(data);
  }

  function closeChatBot() {
    setOpen(false);
  }

  // control chat popup
  function clickHandler() {
    open ? setOpen(false) : setOpen(true);
  }

  useEffect(() => {
    userOnline ? setUser(userOnline.email) : setUser(null);
  }, [userOnline]);

  return (
    <div className={styles.app}>
      <Navigation user={user} updateUser={updateUser} />
      <main className={styles.main}>
        <Outlet context={{ updateUser }} />
      </main>
      <div className={styles.icon} onClick={clickHandler}>
        <AiFillWechat />
      </div>
      {open && <LiveChat closeChatBot={closeChatBot} />}
      <Footer />
    </div>
  );
}

export default Layout;

async function layoutLoader() {
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

export { layoutLoader };
