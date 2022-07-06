import React, { useState } from "react";
import { PageBlock, Button, Card } from "vtex.styleguide";
import { makeAPICall } from "../../Utils/httpCall";

const SearchByFilter = () => {
  const [allData, setAllData] = useState();

  const getAllDataAPI =
    "/api/dataentities/CF/search?_fields=name,age,useremail";

  const filterByKeywordAPI =
    "/api/dataentities/CF/search?_fields=name,age,useremail&_keyword=Reena";

  const filterByRangeAPI =
    "/api/dataentities/CF/search?_fields=name,age,useremail&_where=age>25";

  const getAllDataHandler = async () => {
    const response = await makeAPICall(getAllDataAPI, "GET");
    console.log("AllData", response);
    setAllData(response);
  };

  const filterByKeywordHandler = async () => {
    const response = await makeAPICall(filterByKeywordAPI, "GET");
    console.log("AllData", response);
    setAllData(response);
  };

  const filterByRangeHandler = async () => {
    const response = await makeAPICall(filterByRangeAPI, "GET");
    console.log("AllData", response);
    setAllData(response);
  };

  return (
    <div className="bg-muted-5 pa8">
      <PageBlock
        title="SearchFilter"
        subtitle="To perform filter on search api."
        variation="full"
      >
        <div
          style={{
            display: "flex",
            flexFlow: "row",
            justifyContent: "space-evenly",
          }}
        >
          <Button variation="primary" onClick={getAllDataHandler}>
            Get All Data
          </Button>

          <Button variation="primary" onClick={filterByKeywordHandler}>
            Filter By keyword
          </Button>
          <Button variation="primary" onClick={filterByRangeHandler}>
            Filter Age By Range
          </Button>
        </div>
        <div
          style={{
            display: "flex",
            flexFlow: "row",
            flexWrap: "wrap",
            padding: "30px",
            margin: "10px",
          }}
        >
          {allData?.map((data) => (
            <div>
              <Card>
                <p> Name : {data.name}</p>
                <p> Age : {data.age}</p>
                <p> Email : {data.useremail}</p>
              </Card>
            </div>
          ))}
        </div>
      </PageBlock>
    </div>
  );
};

export default SearchByFilter;
