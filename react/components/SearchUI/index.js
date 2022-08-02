import React, { useState } from "react";
import { InputSearch, Card, Button,DatePicker } from "vtex.styleguide";
import styles from "./SearchUI.css";
import { makeAPICall } from "../../Utils/httpCall";

const SearchUI = () => {
  const [state, setState] = useState({ value: "" });
  const [allData, setAllData] = useState();
  const [keyword, setKeyword] = useState();
  const [range, setRange] = useState();
  const [startDate, setStartDate] = useState({ startDate1: new Date() });

  //API url's
  const getData =
    "/api/dataentities/UF/search?_fields=_all&_schema=UIFilterSchema";

  const rangeData = "/api/dataentities/CF/search?_fields=name,age,useremail,createdIn"

  const getDataByName = `${getData}&_where=name="${state.value}"`;
  const getDataByEmail = `${getData}&_where=email="${state.value}"`;
  const filterByKeywordAPI = `${getData}&_keyword=${keyword}`;
  const filterByRangeAPI = `${rangeData}&_where=${range}`;
  //const filterByDateAPI = `${getData}&_where=createdIn=${startDate.startDate1}`;

  //console.log(formatDate)
  //console.log(filterByDateAPI)

  async function test(){
    const formatDate = startDate.startDate1.toISOString();
    const filterByDateAPI = `${getData}&_where=createdIn=${formatDate}`;
    const data = filterByDateAPI.split('T')[0];
    setStartDate(data)
    //console.log("setDate"+ startDate.startDate1)
    return data;
  }

  //console.log(formatDate)
  //Search in Master Data
  const handleInput = () => {
    let inputValue = state.value;
    if (inputValue == "") {
      getDataHandler();
    }
    if (inputValue.includes("@")) {
      getEmailDataHandler();
    } else getNameDataHandler();
  };


  // API call funtions
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

  const filterByKeyword = async () => {
    const response = await makeAPICall(filterByKeywordAPI, "GET");
    setAllData(response);
    setKeyword("");
  };

  const filterByRange = async () => {
    const response = await makeAPICall(filterByRangeAPI, "GET");
    setAllData(response);
    setRange("");
  };

  const filterByDate = async () => {
    //const formatDate = startDate.startDate1.toISOString().slice(0, 10)
    const dt = await test();

   // console.log('trail' + dt);
    const response = await makeAPICall(dt, "GET");
    //const response = await makeAPICall(filterByDateAPI, "GET");
    setAllData(response);
    setStartDate("");
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
        <div className={styles.filterContainer}>
          <div className={styles.filters}>
            <div>
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Keyword"
                style={{ height: "39px", margin: "10px" }}
              />
              <Button
                variation="secondary"
                onClick={() => {
                  filterByKeyword();
                }}
              >
                Filter By Keyword
              </Button>
            </div>
            <div>
              <input
                type="text"
                value={range}
                onChange={(e) => setRange(e.target.value)}
                placeholder="Enter Range"
                style={{ height: "39px", margin: "10px" }}
              />
              <Button
                variation="secondary"
                onClick={() => {
                  filterByRange();
                }}
              >
                Filter By Range
              </Button>
            </div>
          </div>
          <div className={styles.Otherfilters}>
            <div className={styles.datefilter}>
              <div className="mb5">
                <DatePicker
                  size="small"
                  value={startDate.startDate1}
                  onChange={(date) => setStartDate({ startDate1: date })}
                  locale="en-US"
                />
              </div>

              <Button
                variation="secondary"
                onClick={() => {
                  filterByDate();
                }}
              >
                Filter By Date
              </Button>
            </div>

            <div>
              <Button
                variation="secondary"
                onClick={() => {
                  getDataHandler();
                }}
              >
                Display All Data
              </Button>
            </div>
          </div>
          <div className={styles.cardsContainer}>
            {allData?.map((data) => (
              <div style={{ padding: "10px", width: "400px" }}>
                <Card>
                  <p> Name : {data.name}</p>
                  <p> Email : {data.email}</p>
                  <p> Phone : {data.phone}</p>
                  <p> Date : {data.createdIn}</p>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchUI;
