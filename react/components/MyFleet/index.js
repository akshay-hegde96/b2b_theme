import React, { useState, useEffect } from "react";
import { InputSearch, Card, Dropdown } from "vtex.styleguide";
import styles from "./MyFleet.css";
import { makeAPICall } from "../../Utils/httpCall";
import CardPaginate from "./CardPaginate";

const SearchUI = () => {
  const [state, setState] = useState({ value: "" });
  const [allData, setAllData] = useState();
  const [dropdown, setDropDown] = useState({ selected: "" });
  const [err, setErr] = useState(false);
  // const [jobData, setJobData] = useState();
  // const [workOrderData, setWorkOrderData] = useState();

  console.log(dropdown.selected);
  //API url's
  const getData =
    "/api/dataentities/PM/search?_fields=Job,WorkOrder,Unit,SalesmanName,ContractAdministratorName,DealerNumber,DealerName,Address1,Address4,City,State,Zip,Country&_schema=MyFleet";
  const getDataByJob = `${getData}&_where=Job="${state.value}"`;
  const getWorkOrder = `${getData}&_where=WorkOrder="${state.value}"`;
  const getSalesman = `${getData}&_where=SalesmanName=*${state.value}*`;
  const getDealerNumber = `${getData}&_where=DealerNumber="${state.value}"`;
  const getState = `${getData}&_where=State="${state.value}"`;
  const getCity = `${getData}&_where=City=*${state.value}*`;

  const options = [
    { value: "All Records", label: "All Records" },
    { value: "Job", label: "Job" },
    { value: "Work Order", label: "Work Order" },
    { value: "State", label: "State" },
    { value: "City", label: "City" },
    { value: "Salesman", label: "Sales Man Name" },
    { value: "DealerNumber", label: "DealerNumber" },
  ];

  // API call funtions

  const getDataHandler = async () => {
    const response = await makeAPICall(getData, "GET");
    //console.log("AllData", response);
    setAllData(response);
  };

  const getJobDataHandler = async () => {
    const response = await makeAPICall(getDataByJob, "GET");
    //console.log("AllData", response);
    setAllData(response);
  };

  const getWorkOrderHandler = async () => {
    const response = await makeAPICall(getWorkOrder, "GET");
    //console.log("AllData", response);
    setAllData(response);
  };

  const getSalesmanHandler = async () => {
    const response = await makeAPICall(getSalesman, "GET");
    //console.log("AllData", response);
    setAllData(response);
  };

  const getDealerNumberHandler = async () => {
    const response = await makeAPICall(getDealerNumber, "GET");
    //console.log("AllData", response);
    setAllData(response);
  };

  const getStateHandler = async () => {
    const response = await makeAPICall(getState, "GET");
    //console.log("AllData", response);
    setAllData(response);
  };

  const getCityHandler = async () => {
    const response = await makeAPICall(getCity, "GET");
    //console.log("AllData", response);
    setAllData(response);
  };

  const handleInput = () => {
    let value = dropdown.selected;
    if (value == "All Records") {
      getDataHandler();
    }
    if (value == "Job") {
      getJobDataHandler();
    }
    if (value == "Work Order") {
      getWorkOrderHandler();
    }
    if (value == "Salesman") {
      getSalesmanHandler();
    }
    if (value == "DealerNumber") {
      getDealerNumberHandler();
    }
    if (value == "State") {
      getStateHandler();
    }
    if (value == "City") {
      getCityHandler();
    }
  };

  return (
    // <>
    //   <div style={{ marginLeft: "35%" }}>
    //     <h1>Search in Master Data</h1>
    //   </div>

    //   <div className={styles.main}>
    //     <div className={styles.mainCotainer}>
    //       <div className={styles.Searchdropdown}>
    //         <Dropdown
    //           size="large"
    //           options={options}
    //           value={dropdown.selected}
    //           onChange={(e) => setDropDown({ selected: e.target.value })}
    //           onFocus={() => console.log("onFocus fired!")}
    //           onBlur={() => console.log("onBlur fired!")}
    //           onMouseEnter={() => console.log("onMouseEnter fired!")}
    //           onMouseLeave={() => console.log("onMouseLeave fired!")}
    //         />
    //       </div>
    //       <div className={styles.searchContainer}>
    //         <InputSearch
    //           placeholder="Search..."
    //           value={state.value}
    //           // label="Large"
    //           size="large"
    //           onChange={(e) => setState({ value: e.target.value })}
    //           onSubmit={handleInput}
    //         />
    //       </div>
    //     </div>
    //   </div>

    //   <div>{allData ? <CardPaginate data={allData} /> : null}</div>
    // </>
    <React.Fragment>
      <div className={styles.peirceSearchBarContainer}>
      <div className={styles.sarchText}>Search</div>
      <div className={styles.myFleetText}>My Fleet</div>
      <div className={styles.resourcesText}>Resources</div>
      <div className={styles.searchBar}>
              <InputSearch
              placeholder="Enter Job ID, VIN, Customer Name"
              value={state.value}
              size="regular"
              onChange={(e) => setState({ value: e.target.value })}
              onSubmit={handleInput}
             />
             </div>
             <div className={styles.advancedDropdown}>
                  <Dropdown
              placeholder="Advanced"
              size="regular"
              options={options}
              value={dropdown.selected}
              onChange={(e) => setDropDown({ selected: e.target.value })}
              onFocus={() => console.log("onFocus fired!")}
              onBlur={() => console.log("onBlur fired!")}
              onMouseEnter={() => console.log("onMouseEnter fired!")}
              onMouseLeave={() => console.log("onMouseLeave fired!")}
            />

             </div>

      </div>
      <div className={styles.searchResult}>{allData ? <CardPaginate data={allData} /> : null}</div>
    </React.Fragment>
  );
};

export default SearchUI;
