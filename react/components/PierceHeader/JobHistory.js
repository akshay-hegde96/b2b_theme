import React from "react";
import styles from "./JobHistory.css"
import jobTruck from "../../../assets/fire-truck.png";
const JobHistory = () => {
  return(
    <React.Fragment>
 <div className={styles.historyJobRight}>
<img src={jobTruck} width="87px" height="60px"/>
<div>
  <div className={styles.jobNumberHeaderHistory}>JOB 13590</div>
  <div className={styles.workorderHeaderHistory}>Work Order 03243887  |  Unit 2</div>
  <div className={styles.cityNameHeaderHistory}>City of Los Angeles</div>
</div>
</div>
    </React.Fragment>
  )
}
export default JobHistory;
