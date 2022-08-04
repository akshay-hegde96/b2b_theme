import React, { useState, useEffect } from "react";
import { InputSearch, Dropdown } from "vtex.styleguide";
import styles from "./resourceSearch.css";
import { makeAPICall } from "../../Utils/httpCall";
import img from '../../../assets/pdficon.png'

const ResourceSearch = () => {
  const [state, setState] = useState({ value: "" });
  const [dropdown, setDropDown] = useState({ selected: "" });
  const [suggest, setSuggest] = useState([]);
  const value = dropdown.selected;


  //API url's
 // const APIfields =
    "Job,WorkOrder,Unit,SalesmanName,ContractAdministratorName,DealerNumber,DealerName,CustomerName,CustomerNumber,Address1,Address4,City,State,Zip,Country,WarrantyStartDate";
  const getData = `/api/dataentities/RS/search?_fields=ResourceName,ResourceType,DocLinkURL,id&_schema=PMIResource`;

  useEffect(() => {
    const getResDataHandler = async () => {
      const response = await makeAPICall(getData, "GET");
     console.log(response);
      setSuggest([...response]);
    };
    getResDataHandler();
  }, []);

  const options = [
    { value: "RN", label: "Resource Name" },
    { value: "RT", label: "Resource Type" },
    { value: "GWI", label: "Guides & Work Instruction" },
    { value: "Manuals", label: "Manuals" },
    { value: "Diagrams", label: "Diagrams" },
    { value: "Forms", label: "Forms" },
    { value: "KCR", label: "Kits & Cross Refrences" },
    { value: "CC", label: "Component Catalogs" },
    { value: "PF", label: "Price Files" },
    { value: "Bulletins", label: "Bulletins" },
    { value: "Campaigns", label: "Campaigns" },
    { value: "Publication", label: "Publications" },
    { value: "Articles", label: "Articles" },
    { value: "Software", label: "Software" },
    { value: "Training", label: "Training" }
  ];

  //filter Function
  function newFilterData() {
    let resSuggestResult = suggest?.filter((item) => {
      if (state.value == "") {
        return;
      } else if (value == "RN" && item.ResourceName.toLowerCase().includes(state.value.toLowerCase())) {
        return item;
      } else if (
        value == "RT" && item.ResourceType.toLowerCase().includes(state.value.toLowerCase())
      ) {
        return item;
      }
    });
    return resSuggestResult;
  }

  const check = newFilterData();
  console.log(check);

  return (
    <React.Fragment>
      <div className={styles.resContainer}>
        <div className={styles.resSearchBar}>
          <InputSearch
            placeholder="Enter Job ID, VIN, Customer Name"
            value={state.value}
            size="regular"
            onChange={(e) => setState({ value: e.target.value })}
          />
        </div>
        <div className={styles.resAdvancedDropdown}>
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

      <div className={styles.resSearchResults}>
        <div>
          {state.value &&
            check.slice(0, 4).map((data) => {
              return (
                <div key={data.id} className={styles.ressearchSuggests}>
                  <div className={styles.resleftSide}>
                    <p style={{fontSize:"16px", margin:"0px", fontWeight:"500"}}>{data.ResourceName}</p>
                    <p style={{fontSize:"12px"}}>{data.ResourceType}</p>
                  </div>

                  <div className={styles.resrightSide}>
                    <img src={img} alt="icon" height="40px" width="40px" />
                  </div>
                </div>
              );
            })}
          {state.value && value && check?.length != 0 ? (
            <div className={styles.ressuggestBottom}>
              <div className={styles.resleftBottom}>
                <p>Total {check.length} Results Found</p>
                <div className={styles.resrightBottom}>VIEW All RESULTS</div>
              </div>

            </div>
          ) : null}
          {state.value && value && check.length == 0 ? (
            <div className={styles.ressuggestBottom}>
              <div className={styles.notfount}><p>No results in the current tab for: {state.value}</p></div>
            <div className={styles.resleftBottom}>
              <p>Total {check.length} Results Found</p>
              <div className={styles.resrightBottom}>VIEW All RESULTS</div>
            </div>

          </div>
          ) : null}
        </div>
      </div>
    </React.Fragment>
  );
};

export default ResourceSearch;
