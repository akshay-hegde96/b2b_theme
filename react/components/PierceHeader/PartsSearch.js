import React,{useState} from "react";
import styles from "./PartsSearch.css";
import { InputSearch } from "vtex.styleguide";
import jobTruck from "../../../assets/fire-truck.png";
const PartsSearch = () => {
  const [state, setState] = useState({ value: "" });
  return(
    <React.Fragment>
<div className={styles.PartsSearchWrapper}>
<div className={styles.activityJobLeft}>
<img src={jobTruck} width="87px" height="60px"/>
<div>
  <div className={styles.jobNumberHeader}>JOB 13590</div>
  <div className={styles.workorderHeader}>Work Order 03243887  |  Unit 2</div>
  <div className={styles.cityNameHeader}>City of Los Angeles</div>
</div>
</div>
<div className={styles.partsSearchTabsWrapper}>
<div className={styles.partsSearchText}>
        Search
        </div>
        <div className={styles.partsText}>
          Parts
        </div>
        <div className={styles.partsSearchBarContainer}>
    <div className={styles.partsSearchBar}>
    <InputSearch
              placeholder="Enter Part #, Name, Category, Assembly"
              value={state.value}
              size="regular"
              onChange={(e) => setState({ value: e.target.value })}
              onSubmit={console.log("clicked")}
             />

      </div>
    </div>
</div>
</div>
    </React.Fragment>
  )
}
export default PartsSearch;
