import { Link } from "react-router-dom";
import styles from "./Footer.module.css";

function Footer() {
  return (
    <footer
      className={`${styles.footer} d-flex flex-column flex-sm-row text-bg-dark w-100 justify-content-center align-items-center text-center text-sm-start`}
    >
      <div>
        <h3 className="mb-3">CUSTOMER SERVICES</h3>
        <ul>
          <li>
            <Link to="#">
              <p>Help & Contact Us</p>
            </Link>
          </li>
          <li>
            <Link to="#">
              <p>Return & Refunds</p>
            </Link>
          </li>
          <li>
            <Link to="#">
              <p>Online Stores</p>
            </Link>
          </li>
          <li>
            <Link to="#">
              <p>Terms & Conditions</p>
            </Link>
          </li>
        </ul>
      </div>
      <div>
        <h3 className="mb-3">COMPANY</h3>
        <ul>
          <li>
            <Link to="#">
              <p>What We Do</p>
            </Link>
          </li>
          <li>
            <Link to="#">
              <p>Available Services</p>
            </Link>
          </li>
          <li>
            <Link to="#">
              <p>Latest Post</p>
            </Link>
          </li>
          <li>
            <Link to="#">
              <p>FAQs</p>
            </Link>
          </li>
        </ul>
      </div>
      <div>
        <h3 className="mb-3">SOCIAL MEDIA</h3>
        <ul>
          <li>
            <Link to="#">
              <p>Twitter</p>
            </Link>
          </li>
          <li>
            <Link to="#">
              <p>Instagram</p>
            </Link>
          </li>
          <li>
            <Link to="#">
              <p>Facebook</p>
            </Link>
          </li>
          <li>
            <Link to="#">
              <p>Pinterest</p>
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
