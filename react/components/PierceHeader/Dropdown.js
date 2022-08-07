import React, { useEffect, useState, useRef } from "react";
import styles from "./Dropdown.css";

const Dropdown = () => {
  const ref = useRef();
  const [dropdown, setDropdown] = useState(false);

  useEffect(() => {
    const checkOutsideClick = (e) => {
      if (dropdown && ref.current && !ref.current.contains(e.target)) {
        setDropdown(false);
      }
    };
    document.addEventListener("mousedown", checkOutsideClick);
    return () => {
      document.removeEventListener("mousedown", checkOutsideClick);
    };
  }, [dropdown]);

  return (
    <React.Fragment>
      <div className={styles.dropdownButtonContainer} ref={ref}>
        <button
          onClick={() => setDropdown((oldState) => !oldState)}
          className={styles.dropdownButton}
        >
          +
        </button>
        {dropdown && (
        <div className={`${styles.box} ${styles.arrowTop}`}>
          <ul>
         <li>Search A Job</li>
         <li>Stock Parts Catalog</li>
         <li>All Pierce Catalog</li>
         </ul>
       </div>
        )}
      </div>
    </React.Fragment>
  );
};
export default Dropdown;
