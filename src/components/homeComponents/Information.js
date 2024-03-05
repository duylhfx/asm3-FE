import styles from "./Information.module.css";

function Information() {
  return (
    <section className={`${styles.info} mt-4`}>
      <div className={`${styles.ads} bg-light`}>
        <div>
          <h3>FREE SHIPPING</h3>
          <p>Free shipping worldwide</p>
        </div>
        <div>
          <h3>24 x 7 SERVICE</h3>
          <p>Free shipping worldwide</p>
        </div>
        <div>
          <h3>FESTIVAL OFFER</h3>
          <p>Free shipping worldwide</p>
        </div>
      </div>
      <div
        className={`d-flex flex-column flex-md-row  align-items-center justify-content-between my-5 ${styles.subscribe}`}
      >
        <div className={`${styles.content}`}>
          <h3>LET'S BE FRIENDS!</h3>
          <p className="opacity-50">Nisi nisi tempor consequat laboris nisi</p>
        </div>
        <div className={`${styles.input} d-flex justify-content-end`}>
          <input
            type="email"
            placeholder="Enter your email address"
            className="p-2 p-lg-3 w-75"
          />
          <button type="button">Subscribe</button>
        </div>
      </div>
    </section>
  );
}

export default Information;
