import React, { useState, useEffect } from "react";
import { InputSearch, Card, Dropdown } from "vtex.styleguide";
import styles from "./MyFleet.css";
import { makeAPICall } from "../../Utils/httpCall";
import CardPaginate from "./CardPaginate";

const SearchUI = () => {
  const [state, setState] = useState({ value: "" });
  const [allData, setAllData] = useState();
  const [dropdown, setDropDown] = useState({ selected: "" });
  const [suggest, setSuggest] = useState([]);
  const [newData, setNewData] = useState([]);

  // console.log(state.value);
  const value = dropdown.selected;
  const input = state.value;
  // let newFilterData;
  // console.log("newFilterData",newFilterData)

  //API url's
  const APIfields =
    "Job,WorkOrder,Unit,SalesmanName,ContractAdministratorName,DealerNumber,DealerName,CustomerName,CustomerNumber,Address1,Address4,City,State,Zip,Country,WarrantyStartDate";
  const getData = `/api/dataentities/PM/search?_fields=${APIfields}&_schema=MyFleet`;
  const getDataByJob = `${getData}&_where=Job="${state.value}"`;
  const getWorkOrder = `${getData}&_where=WorkOrder="${state.value}"`;
  const getSalesman = `${getData}&_where=SalesmanName=*${state.value}*`;
  const getDealerNumber = `${getData}&_where=DealerNumber="${state.value}"`;
  const getState = `${getData}&_where=State="${state.value}"`;
  const getCity = `${getData}&_where=City=*${state.value}*`;
  const getCountry = `${getData}&_where=Country="${state.value}"`;
  const getCustName = `${getData}&_where=CustomerName=*${state.value}*`;
  // const getCustNumber = `${getData}&_where=CustomerNumber=*${state.value}*`;

  const options = [
    // { value: "All Records", label: "All Records" },
    { value: "Job", label: "Job" },
    { value: "Work Order", label: "Work Order" },
    { value: "State", label: "State" },
    { value: "City", label: "City" },
    { value: "Salesman", label: "Sales Man Name" },
    { value: "DealerNumber", label: "Dealer Number" },
    { value: "CustomerName", label: "Customer Name" },
    { value: "Country", label: "Country" },
  ];

  // API call funtions
  useEffect(() => {
    const getDataHandler = async () => {
      const response = await makeAPICall(getData, "GET");
      // console.log(response)
      setSuggest([...response]);

    };
    getDataHandler();
  }, []);

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

  const getCountryHandler = async () => {
    const response = await makeAPICall(getCountry, "GET");
    //console.log("AllData", response);
    setAllData(response);
  };

  const getCustNameHandler = async () => {
    const response = await makeAPICall(getCustName, "GET");
    //console.log("AllData", response);
    setAllData(response);
  };

  const handleInput = () => {
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
    if (value == "Country") {
      getCountryHandler();
    }
    if (value == "CustomerName") {
      getCustNameHandler();
    }
  };

  //filter Function
  function newFilterData() {
    return suggest.filter(
      (item) =>
        item.Job.toString().includes(input) ||
        item.WorkOrder.toString().includes(input) ||
        item.Unit.toString().includes(input) ||
        item.State.toLowerCase().includes(input)
    );
  }

  const check = newFilterData();
  //console.log();

  return (
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

             {/* ======= result container ====== */}
      <div className={styles.suggestContainer}>
        {input && check
          .slice(0, 4)
          .map((data) => {
            return (

              <div className={styles.searchSuggests}>
                <div className={styles.leftSide}>
                  <div className={styles.leftSideData}>
                    <p> JOB {data.Job}</p>
                    <p> | UNIT {data.Unit}</p>
                  </div>
                  <div className={styles.workorder}>
                    <p style={{ color: "gray" }}>WORK ORDER {data.WorkOrder}</p>
                    <p style={{ color: "gray" }}>{data.SalesmanName}</p>
                  </div>
                </div>
                <div className={styles.rightSide}>
                  <p> {data.CustomerName}</p>
                  <p> {data.CustomerName}</p>
                </div>
              </div>
            );
          })}

        {(input && check?.length != 0) || check?.length == 0 ? (
          <div className={styles.suggestBottom}>
            <div className={styles.leftBottom}>
              <p>Total {check.length} Results Found</p>
              <a href="#">Show me results from All Pierce Fleet</a>
            </div>
            <div className={styles.rightBottom}>VIEW All RESULTS</div>
          </div>
        ) : null}
      </div>

      {/* <div>{allData ? <CardPaginate data={allData} /> : null}</div> */}




    </React.Fragment>
  );
};

export default SearchUI;
