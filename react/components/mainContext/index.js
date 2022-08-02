import React, { useState, useEffect } from "react";
import styles from './mainContext.css'
import { Context } from './context'

const mainContext = (props) => {
  const [context, setContext] = useState(Context);

  return (
    <React.Fragment>
      <div className={styles.mainContext}>
        <div className={styles.sort}>
          <p>Showing 1-11 of 1,000 result</p>
          <div className={styles.sortBy}>
            <h4>Sort By :</h4>
            <select className={styles.select} name="A to Z" id="A to Z">
              <option value="none" selected> A to Z </option>
            </select>
          </div>
        </div>

        {context &&
          context.map((item) => {
            return (
              <div>
                <div className={styles.contentRow}>
                  <div>
                    <img className={styles.icon} src={item.img} />
                  </div>
                  <div className={styles.contentText}>
                    <h4>{item.text1}</h4>
                    <h5>{item.text2}</h5>
                    <h5>{item.text3}</h5>
                  </div>
                  <div className={styles.article}>
                    <a href={item.pdf} target="_blank" className={styles.anchorTag}>
                      <img className={styles.viewImage} src="https://images.vexels.com/media/users/3/140160/isolated/lists/2d4e09879b6f017f74ffaee0b0011c0a-eye-icon.png" />
                    </a>
                    <p>View Article</p>
                  </div>
                  <div className={styles.vertical}>
                    <p>{item.size}</p>
                  </div>
                  <div className={styles.vertical}>
                    <img className={styles.image} src={item.bookmark} />
                  </div>
                </div>
                <div><br /></div>
              </div>
            );
          })
        }
        <button className={styles.button}>Load More (20)</button>
        <br /><br />
      </div>
    </React.Fragment>
  );

};

export default mainContext;