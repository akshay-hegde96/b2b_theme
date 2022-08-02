import React, { useState, useEffect } from "react";
import styles from './sidebar.css'
import { Categories } from './categories'
import { FilterBy } from './categories'

const sidebar = (props) => {
  const [categories, setCategories] = useState(Categories);
  const [filterBy, setFilterBy] = useState(FilterBy);
  return (
    <React.Fragment>
      <div className={styles.catContainer}>
        <h2>Categories</h2>
        <hr />
        <ul className={styles.ul}>
          {categories &&
            categories.map((item) => {
              return (<li>{item}</li>);
            })
          }
        </ul>

        <br></br>

        <h2>Filter By</h2>
        <hr />
        <form className={styles.form}>
          {filterBy &&
            filterBy.map((itemFilter) => {
              return (
                <div><input type="checkbox" id={itemFilter} name={itemFilter} value={itemFilter} />
                  <label for={itemFilter}> {itemFilter}</label></div>
              );
            })
          }
        </form>

        <br></br>

        <div className={styles.dropdown}>
          <h2>Keywords</h2>
          <select className={styles.selectDropdown} name="Keywords" id="Keywords"></select>
        </div>
        <hr />

        <div className={styles.dropdown}>
          <h2>Lorem Ipsum</h2>
          <select className={styles.selectDropdown} name="Keywords" id="Keywords"></select>
        </div>
        <hr />

        <div className={styles.dropdown}>
          <h2>Lorem Ipsum</h2>
          <select className={styles.selectDropdown} name="Keywords" id="Keywords"></select>
        </div>
        <hr />

        <div className={styles.dropdown}>
          <h2>Lorem Ipsum</h2>
          <select className={styles.selectDropdown} name="Keywords" id="Keywords"></select>
        </div>
        <hr />

      </div>
    </React.Fragment>
  );

};

export default sidebar;