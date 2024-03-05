import { useState } from "react";
import style from "./Dropdown.module.css";
import { Link } from "react-router-dom";

function Dropdown({ options }) {
  const [isOpen, setOpen] = useState(false);

  function toggleDropdown() {
    setOpen(!isOpen);
  }

  function handleClick() {
    setOpen(false);
  }

  return (
    <div className={style.dropdown}>
      <p onClick={toggleDropdown}>User</p>
      {isOpen && (
        <ul className={style.dropdownList}>
          {options.map((option, i) => (
            <Link key={i} onClick={handleClick} to={option.direction}>
              {option.label}
            </Link>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Dropdown;
