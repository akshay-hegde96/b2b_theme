import React, { useState } from "react";
import { InputSearch, Card } from "vtex.styleguide";
import styles from "./SearchUI.css";
import { makeAPICall } from "../../Utils/httpCall";

const SearchUI = () => {
  const [state, setState] = useState({ value: "" });
  const [allData, setAllData] = useState();
  //const [err, setErr] = useState(false)

  const getData =
    "/api/dataentities/UF/search?_fields=_all&_schema=UIFilterSchema";

  const getDataByName = `${getData}&_where=name="${state.value}"`;
  const getDataByEmail = `${getData}&_where=email="${state.value}"`;

  const handleInput = () => {
    let inputValue = state.value;
    if (inputValue == "") {
      getDataHandler();
    }
    if (inputValue.includes("@")) {
      getEmailDataHandler();
    } else getNameDataHandler();
  };

  const getDataHandler = async () => {
    const response = await makeAPICall(getData, "GET");
    console.log("AllData", response);
    setAllData(response);
  };

  const getNameDataHandler = async () => {
    const response = await makeAPICall(getDataByName, "GET");
    // console.log("AllData", response);
    setAllData(response);
  };

  const getEmailDataHandler = async () => {
    const response = await makeAPICall(getDataByEmail, "GET");
    // console.log("AllData", response);
    setAllData(response);
  };

  // const handleSearch = (e) => {
  //   e.preventDefault();
  //   console.log("submitted! search this: ", state.value);
  // };
  return (
    <>
      <div style={{ marginLeft: "35%" }}>
        {" "}
        <h1>Search in Master Data</h1>
      </div>

      <div className={styles.mainCotainer}>
        <div className={styles.searchContainer}>
          <InputSearch
            placeholder="Search..."
            value={state.value}
            // label="Large"
            size="large"
            onChange={(e) => setState({ value: e.target.value })}
            onSubmit={handleInput}
          />
        </div>
        <div className={styles.cardsContainer}>
          {allData?.map((data) => (
            <div style={{ padding: "10px", width: "400px" }}>
              <Card>
                <p> Name : {data.name}</p>
                <p> Email : {data.email}</p>
                <p> Phone : {data.phone}</p>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default SearchUI;
