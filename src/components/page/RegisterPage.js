import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./RegisterPage.module.css";
import { usePostData } from "../../util/getPostData";

const RegisterPage = () => {
  const [data, setData] = useState(null);
  const [postData, loading, error] = usePostData("/signup", data, "/login");

  function changeHandler(e) {
    let updated = { [e.target.name]: e.target.value };
    setData((data) => ({ ...data, ...updated }));
  }

  function submitHandler(e) {
    e.preventDefault();
    postData();
    console.log(error);
  }

  return (
    <section className={styles.login} onSubmit={submitHandler}>
      <img src="./Resource img/banner1.jpg" alt="banner" />
      <form method="post" className={styles.auth}>
        <h2 className="py-5">Sign Up</h2>
        <div className={styles.control}>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Full Name"
            onChange={changeHandler}
            required
          />
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
          <input
            type="text"
            id="phone"
            name="phone"
            placeholder="Phone"
            onChange={changeHandler}
            required
          />
        </div>
        <div className={styles.actions}>
          <button type="submit" disabled={loading}>
            <h3>{!loading ? "SIGN UP" : "SINGIN..."}</h3>
          </button>
          {error && <span style={{ color: "red" }}>{error.msg}</span>}
          <p className={styles.switch}>
            Login?
            <Link to="/login">Click</Link>
          </p>
        </div>
      </form>
    </section>
  );
};

export default RegisterPage;
