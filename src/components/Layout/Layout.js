import { Outlet, useLoaderData } from "react-router-dom";
import Navigation from "../Layout/Navigation";
import Footer from "./Footer";
import styles from "./Layout.module.css";
import { AiFillWechat } from "react-icons/ai";
import { useEffect, useState } from "react";
import LiveChat from "./LiveChat";

function Layout() {
  let data = useLoaderData();
  let userOnline = JSON.parse(data);
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(userOnline);

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
  const user = localStorage.getItem("user") || null;
  return user;
}

export { layoutLoader };
