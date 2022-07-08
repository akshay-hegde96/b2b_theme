import React, { useState } from "react";
import { PageBlock, Button, Card } from "vtex.styleguide";
import { makeAPICall } from "../../Utils/httpCall";
import styles from "./SearchByFilter.css";

const SearchByFilter = () => {
  const [allData, setAllData] = useState();
  const [keyword, setKeyword] = useState();
  const [range, setRange] = useState();
  const [sort, setSort] = useState();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const getAllDataAPI =
    "/api/dataentities/CF/search?_fields=name,age,useremail,createdIn";

  const filterByKeywordAPI = `${getAllDataAPI}&_keyword=${keyword}`;

  const filterByRangeAPI = `${getAllDataAPI}&_where=${range}`;

  const filterBySortAPI = `${getAllDataAPI}&_sort=${sort}`;

  const filterByDateAPI = `${getAllDataAPI}&_where=createdIn between ${startDate} AND ${endDate}`;

  const getAllDataHandler = async () => {
    const response = await makeAPICall(getAllDataAPI, "GET");
    console.log("AllData", response);
    setAllData(response);
  };

  const filterByKeywordHandler = async () => {
    const response = await makeAPICall(filterByKeywordAPI, "GET");
    setAllData(response);
    setKeyword("");
  };

  const filterByRangeHandler = async () => {
    const response = await makeAPICall(filterByRangeAPI, "GET");
    setAllData(response);
    setRange("");
  };

  const filterBySortHandler = async () => {
    const response = await makeAPICall(filterBySortAPI, "GET");
    setAllData(response);
    setSort("");
  };

  const filterByDateHandler = async () => {
    const response = await makeAPICall(filterByDateAPI, "GET");
    setAllData(response);
    setStartDate("");
    setEndDate("");
  };

  return (
    <div className="bg-muted-5 pa8">
      <PageBlock
        title="SearchFilter"
        subtitle="To perform filter of documents using search api."
        variation="full"
      >
        <div className={styles.mainButtonsContainer}>
          <Button variation="primary" onClick={getAllDataHandler}>
            Get All Data
          </Button>

          <div>
            <Button
              variation="primary"
              onClick={() => {
                filterByDateHandler();
              }}
            >
              Filter By Date
            </Button>

            <div className={styles.dateContainer}>
              <input
                type="text"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                placeholder="YYYY-MM-DD"
                style={{ marginRight: "10px" }}
              />
              <strong style={{ color: "white" }}>TO</strong>
              <input
                type="text"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                placeholder="YYYY-MM-DD"
                style={{ marginLeft: "10px" }}
              />
            </div>
          </div>

          <Button variation="primary" onClick={() => setAllData([])}>
            Clear All Data
          </Button>
        </div>
        <div className={styles.filterButtonsContainer}>
          <div>
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Keyword"
              style={{ height: "39px" }}
            />
            <Button
              variation="primary"
              onClick={() => {
                filterByKeywordHandler();
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
              placeholder="eg:age>25 or age=26"
              style={{ height: "39px" }}
            />
            <Button variation="primary" onClick={() => filterByRangeHandler()}>
              Filter Age By Range
            </Button>
          </div>
          <div>
            <input
              type="text"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              placeholder="FieldName ASC or DESC"
              style={{ height: "39px" }}
            />
            <Button
              variation="primary"
              onClick={() => {
                filterBySortHandler();
              }}
            >
              SORT
            </Button>
          </div>
        </div>
        <div className={styles.cardsContainer}>
          {allData?.map((data) => (
            <div style={{ padding: "10px", width: "400px" }}>
              <Card>
                <p> Name : {data.name}</p>
                <p> Age : {data.age}</p>
                <p> Email : {data.useremail}</p>
                <p>Created In : {data.createdIn}</p>
              </Card>
            </div>
          ))}
        </div>
      </PageBlock>
    </div>
  );
};

export default SearchByFilter;
