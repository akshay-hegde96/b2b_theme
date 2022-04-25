import React, { useEffect, useState } from "react";
import styles from "./localSwitcher.css";

const LocaleSwitcher = () => {
  const [status, setStatus] = useState("");
  const [select, setSelect] = useState("EN");

  const onChangeHandler = (e) => {
    //console.log(params);
    if (status == "EN") {
      window.location.replace("/?cultureInfo=en-US");
      window.localStorage.setItem("language", "EN");

      //console.log(status);
    } else if (status == "PT") {
      window.location.replace("/?cultureInfo=pt-BR");
      window.localStorage.setItem("language", "PT");
      //console.log(status);
    }
  };

  useEffect(() => {
    let localData = window.localStorage.getItem("language");
    setSelect(localData);
    console.log("localData",localData);
  }, []);

  return (
    <>
      <div className={styles.mainDropDown}>
        <div className={styles.dropdown}>
          <select onChange={(e) => setStatus(e.target.value)} value={select}>
            <option name="eng"> EN</option>

            <option name="prt"> PT</option>
          </select>
        </div>

        {status ? onChangeHandler() : null}
      </div>
    </>
  );
};

export default LocaleSwitcher;
