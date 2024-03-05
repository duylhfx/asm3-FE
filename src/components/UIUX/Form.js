import { useEffect } from "react";
import styles from "./Form.module.css";

// FORM UI
export default function Form({
  changeHandler,
  submitHandler,
  user,
  error,
  loading,
}) {
  useEffect(() => {
    // console.log(error);
  }, [error]);
  return (
    <form
      className="d-flex flex-column  col-12 col-lg-8 "
      onSubmit={submitHandler}
    >
      <label htmlFor="name">FULL NAME:</label>
      <input
        type="text"
        name="name"
        id="name"
        placeholder="Enter Your Full Name Here!"
        value={user.name}
        onChange={changeHandler}
        required
      />
      <label htmlFor="email">EMAIL:</label>
      <input
        type="email"
        name="email"
        id="email"
        placeholder="Enter Your Email Here!"
        value={user.email}
        onChange={changeHandler}
        required
      />
      <label htmlFor="phone">PHONE NUMBER:</label>
      <input
        type="tel"
        id="phone"
        name="phone"
        placeholder="Enter Your Phone Number Here!"
        value={user.phone}
        onChange={changeHandler}
        required
      />
      <label htmlFor="address">ADDRESS:</label>
      <input
        type="text"
        name="address"
        id="address"
        placeholder="Enter Your Address Here!"
        value={user.address}
        onChange={changeHandler}
        required
      />
      <button type="submit" disabled={loading}>
        {loading ? "LOADING..." : "PLACE ORDER"}
      </button>
      {error && <span style={{ color: "red" }}>{error}</span>}
    </form>
  );
}
