import { useEffect, useState } from "react";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import styles from "./LoginPage.module.css";
import { usePostData } from "../../util/getPostData";
import axios from "axios";

const LoginPage = () => {
  const [data, setData] = useState(null);
  const { updateUser } = useOutletContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // custom hook post data
  // const [postData, loading, error] = usePostData("/login", data, "/", cbLogin);

  // update data input
  function changeHandler(e) {
    let updated = { [e.target.name]: e.target.value };
    setData((data) => ({ ...data, ...updated }));
  }

  function submitHandler(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    axios
      .post("/login", data, {
        withCredentials: true,
      })
      .then((res) => {
        // console.log(res.data);
        localStorage.setItem("jwt", res.data);
        cbLogin();
        navigate("/");
      })
      .catch((err) => {
        setError(err.response.data);
      })
      .finally((rs) => setLoading(false));
  }

  // function addition when login
  function cbLogin() {
    localStorage.setItem("user", JSON.stringify(data.email));
    updateUser(data.email);
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
