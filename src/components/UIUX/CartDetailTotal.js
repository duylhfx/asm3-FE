import styles from "./CartDetailTotal.module.css";
// CART DETAIL TOTAL UI
export default function CartDetailTotal({ items, totalAmount }) {
  return (
    <div className={`p-3 p-lg-4 ${styles.cartTotal}`}>
      <h3 className="mb-3">YOUR ORDER</h3>
      <ul>
        {items.map((el, index) => (
          <li key={index} className="border-bottom">
            <span className="w-50">{el.name}</span>
            <span className="ps-1 opacity-50">
              {el.price.toLocaleString("de-DE") + " VND"} x{el.quantity}
            </span>
          </li>
        ))}
      </ul>
      <h5 className="mb-4 d-flex justify-content-between align-items-center">
        TOTAL <span className="ps-2">{totalAmount}</span>
      </h5>
    </div>
  );
}
