import React, { useState, useEffect } from "react";
import styles from "./Departments.css";
import { deparmentURL, categoryURL } from "../../Config/url";
import { makeAPICall } from "../../Utils/httpCall";
//import img from "../../../assets/CLPassets/engine_135.png";

const Departments = (props) => {
  const id = parseInt(props.params.clp_id);
  const [depart, setDepart] = useState([]);
  const [catg, setCatg] = useState([]);
  useEffect(() => {
    const makeDepartmentAPICall = async () => {
      const data = await makeAPICall(deparmentURL, "GET");
      console.log({ data });
      setDepart([...data]);
    };

    const makeCategoryAPICall = async () => {
      const res = await makeAPICall(categoryURL, "GET");
      console.log(res);
      setCatg(res);
    };

    makeDepartmentAPICall();
    makeCategoryAPICall();
  }, []);
  //---------------------------------------------
  const deptName =
    depart &&
    depart.filter((depart) => depart.id === id).map((ele) => ele.name);
  const bannerText = deptName && deptName[0];
  console.log(bannerText);
  const catArray = catg && catg.filter((arr) => arr.category_id === id);
  const banner_Link = catArray && catArray.map((ele) => ele.banner_link);
  console.log(banner_Link[0]);
  const sub_category = catArray && catArray.map((ele) => ele.sub_category);
  const sub_catImgArr = sub_category[0] && sub_category[0].split(",");
  console.log(sub_catImgArr);
  const sub_catImgArrlength = sub_catImgArr && sub_catImgArr.length;
  // ===================================

  return (
    <React.Fragment>
      <div className={styles.banner}>
        {banner_Link[0] && (
          <img
            src={`${banner_Link[0]}`}
            alt="Banner_img"
            className={styles.banner}
          />
        )}
      </div>

      <h2 className={styles.textAlignment}>
        Launching Our Wide Range Of {bannerText}
      </h2>
      {depart &&
        depart
          .filter((depart) => depart.id === id)
          .map((CarDepart) => {
            return (
              <div key={CarDepart.id} className={styles.catrow}>
                {CarDepart &&
                  CarDepart.children.map((category, i) => {
                    return (
                      (i < sub_catImgArrlength && (
                        <div key={category.id} className={styles.catcolumn}>
                          <a href={category.url}>
                            {sub_catImgArr && (
                              <img
                                src={`${sub_catImgArr[i]}`}
                                alt="img"
                                //className={styles.imgCont}
                                className={styles.imgSize}
                              />
                            )}
                            <h3 className={styles.imgName}>{category.name}</h3>
                          </a>
                        </div>
                      )) ||
                      (i >= sub_catImgArrlength && (
                        <div key={category.id} className={styles.catcolumn}>
                          <a href={category.url}>
                            <img
                              src={`${sub_catImgArr[0]}`}
                              alt="img"
                              //className={styles.imgCont}
                              className={styles.imgSize}
                            />
                            <h3 className={styles.imgName}>{category.name}</h3>
                          </a>
                        </div>
                      ))
                    );
                  })}
              </div>
            );
          })}
      <div>
      </div>
    </React.Fragment>
  );
};
export default Departments;