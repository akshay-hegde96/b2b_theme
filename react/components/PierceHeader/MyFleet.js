import React, { useState, useEffect } from "react";
import { InputSearch,Dropdown } from "vtex.styleguide";
import styles from "./MyFleet.css";
import { makeAPICall } from "../../Utils/httpCall";


const MyFleet=({childToParent})=>{
  const [state, setState] = useState({ value: "" });
  const [dropdown, setDropDown] = useState({ selected: "Job" });
  // const [allData, setAllData] = useState();
  const [suggest, setSuggest] = useState([]);
  const value = dropdown.selected;
  const input = state.value;


  const options = [
    { value: "Job", label: "Job" },
    { value: "Work Order", label: "Work Order" },
    { value: "State", label: "State" },
    { value: "City", label: "City" },
    { value: "Salesman", label: "Sales Man Name" },
    { value: "DealerNumber", label: "Dealer Number" },
    { value: "CustomerName", label: "Customer Name" },
    { value: "Country", label: "Country" },
  ];
   //API url's
   const baseUrl = `/api/dataentities/PM/search`
   const APIfields =
   "Job,WorkOrder,Unit,SalesmanName,ContractAdministratorName,DealerNumber,DealerName,CustomerName,CustomerNumber,Address1,Address4,City,State,Zip,Country,WarrantyStartDate";
 const getData = `/api/dataentities/PM/search?_fields=${APIfields}&_schema=MyFleet`;
 const getDataByJob = `${baseUrl}?_fields=Job&_schema=MyFleet&_where=Job=${state.value}`;
 const getWorkOrder = `${baseUrl}?_fields=WorkOrder&_schema=MyFleet&_where=WorkOrder="${state.value}"`;
 const getSalesman = `${baseUrl}?_fields=SalesmanName&_schema=MyFleet&_where=SalesmanName=*${state.value}*`;
 const getDealerNumber = `${baseUrl}?_fields=DealerNumber&_schema=MyFleet&_where=DealerNumber="${state.value}"`;
 const getState = `${baseUrl}?_fields=State&_schema=MyFleet&_where=State=*${state.value}*`;
 const getCity = `${baseUrl}?_fields=City&_schema=MyFleet&_where=City=*${state.value}*`;
 const getCountry = `${baseUrl}?_fields=Country&_schema=MyFleet&_where=Country=*${state.value}*`;
 const getCustName = `${baseUrl}?_fields=CustomerName&_schema=MyFleet&_where=CustomerName=*${state.value}*`;
 // const getCustNumber = `${getData}&_where=CustomerNumber=*${state.value}*`;

   // Main API call functions
   useEffect(() => {
    const getDataHandler = async () => {
      const response = await makeAPICall(getData, "GET");
      setSuggest([...response]);
    };
    getDataHandler();
  }, []);

const getJobDataHandler = async () => {
  const response = await makeAPICall(getDataByJob, "GET");
  // setAllData(response);
  setSuggest([...response])
};

const getWorkOrderHandler = async () => {
  const response = await makeAPICall(getWorkOrder, "GET");
  // setAllData(response);
  setSuggest([...response])
};

const getSalesmanHandler = async () => {
  const response = await makeAPICall(getSalesman, "GET");
  // setAllData(response);
  setSuggest([...response])
};

const getDealerNumberHandler = async () => {
  const response = await makeAPICall(getDealerNumber, "GET");
  // setAllData(response);
  setSuggest([...response])
};

const getStateHandler = async () => {
  const response = await makeAPICall(getState, "GET");
  // setAllData(response);
  setSuggest([...response])
};

const getCityHandler = async () => {
  const response = await makeAPICall(getCity, "GET");
  // setAllData(response);
  setSuggest([...response])
};

const getCountryHandler = async () => {
  const response = await makeAPICall(getCountry, "GET");
  // setAllData(response);
  setSuggest([...response])
};

const getCustNameHandler = async () => {
  const response = await makeAPICall(getCustName, "GET");
  // setAllData(response);
  setSuggest([...response])
};


const handleInput = () => {
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
      item.Job?.toString().includes(input) ||
      item.WorkOrder?.toString().includes(input) ||
      item.Unit?.toString().includes(input) ||
      item.State?.toLowerCase().includes(input)
  );
}

const check = newFilterData();

return(
  <React.Fragment>
    <div className={styles.myFleetSearchBarContainer}>
    <div className={styles.myFleetSearchBar}>
             <InputSearch
              placeholder="Enter Job ID, VIN, Customer Name"
              value={state.value}
              size="regular"
              onChange={(e) => setState({ value: e.target.value })}
              onSubmit={()=>handleInput()}
             />
             </div>
             <div className={styles.myFleetDropdown}>
              <Dropdown
              // placeholder="Advanced"
              size="regular"
              options={options}
              value={dropdown.selected}
              onChange={(e) => setDropDown({ selected: e.target.value })}
            />
            </div>
            </div>
{input?
<div className={`${styles.searchSuggestContainer} ${styles.suggestContainerArrowTop}`}>
{input && check
          .slice(0, 4)
          .map((data,i) => {
            return (

              <div className={styles.searchSuggests} onClick={()=>childToParent()} key={i}>
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
            )
          })}
          {(input && check?.length == 0)?
          <div className={styles.searchSuggests}>
       <p>No results in the current tab for:&nbsp;&nbsp;<b>"{input}"</b></p>
        </div>:null }
        <div className={styles.suggestBottom}>
            <div className={styles.leftBottom}>
              <p>Total {check.length} Results Found</p>
              <a href="#">Show me results from All Pierce Fleet</a>
            </div>
            <div className={styles.rightBottom}>VIEW All RESULTS</div>
          </div>
</div>:null

}

  </React.Fragment>
)
}
export default MyFleet;
