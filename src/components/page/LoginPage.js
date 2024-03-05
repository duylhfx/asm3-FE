import { useEffect, useState } from "react";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import styles from "./LoginPage.module.css";
import { usePostData } from "../../util/getPostData";

const LoginPage = () => {
  const [data, setData] = useState(null);
  const { updateUser } = useOutletContext();

  // function addition when login
  const cbLogin = () => {
    localStorage.setItem("user", JSON.stringify(data.email));
    updateUser(data.email);
  };

  // custom hook post data
  const [postData, loading, error] = usePostData("/login", data, "/", cbLogin);

  // update data input
  function changeHandler(e) {
    let updated = { [e.target.name]: e.target.value };
    setData((data) => ({ ...data, ...updated }));
  }

  function submitHandler(e) {
    e.preventDefault();
    postData();
  }

  return (
    <section className={styles.login} onSubmit={submitHandler}>
      <img src="./Resource img/banner1.jpg" alt="banner" />
      <form method="post" className={styles.auth}>
        <h2 className="py-5">Sign In</h2>
        <div className={styles.control}>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            onChange={changeHandler}
            required
          />
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            onChange={changeHandler}
            required
          />
        </div>
        <div className={styles.actions}>
          <button type="submit" disabled={loading}>
            {!loading ? "SIGN IN" : "SIGNIN..."}
          </button>
          {error && <span style={{ color: "red" }}>{error.msg}</span>}
          <p className={styles.switch}>
            Create an account?
            <Link to="/register">Sign up</Link>
          </p>
        </div>
      </form>
    </section>
  );
};

export default LoginPage;
