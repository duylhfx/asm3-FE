import { useLocation } from "react-router-dom";
import style from "./ErrorPage.module.css";

function ErrorComponent() {
  const { state } = useLocation();

  return (
    <div className={style.errorContainer}>
      <h1>An error occurred</h1>
      {state && <p>{state.msg}</p>}
    </div>
  );
}

export default ErrorComponent;
