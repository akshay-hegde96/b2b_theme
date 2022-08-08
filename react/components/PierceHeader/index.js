import React, { useState } from 'react';
import styles from './Header.css';
import Dropdown from './Dropdown';
import { ButtonGroup,Button } from 'vtex.styleguide';
import MyFleet from './MyFleet';
import ResourceSearch from './ResourceSearch';
import PartsSearch from './PartsSearch';
import JobHistory from './JobHistory';

const Header = (props) => {
const[buttonState, setButtonState]=useState({active:1})
const[jobClick,setJobClick]=useState(1);
// const[clickedData,setClickedData]=useState();
const childToParent = () => {
   setJobClick(2)
  //  setClickedData(data,i)
}
return(
  <React.Fragment>
    <div className={styles.headerWrapper}>
      <div>
       <Dropdown/>
      </div>

      {jobClick == 2 ?
      <div className={styles.temp}><button className={styles.homeButtonJobPage} onClick={()=>setJobClick(3)}><img src='https://s3.amazonaws.com/freestock-prod/450/freestock_562779385.jpg' width="21px" height="21px"/></button></div>
      : null}
      <div className={styles.searchBarWrapper}>
        {jobClick == 1||jobClick==3?
        <div style={{display:"flex",alignItems:"center"}}>
      <div className={styles.conditionalRenderHeader1}>
      <img src='https://s3.amazonaws.com/freestock-prod/450/freestock_562779385.jpg' width="21px" height="21px"/>
      <h3>DASHBOARD</h3>
      </div>
        <div className={styles.searchTabsWrapper}>
        <div className={styles.searchText}>
        Search
        </div>
        <div className={styles.buttonGroups}>
        <ButtonGroup
    buttons={[
      <Button
        isActiveOfGroup={buttonState.active === 1}
        onClick={() => setButtonState({ active: 1 })}
        >
        {buttonState.active === 1 ? <div style={{color:"black"}}>My Fleet</div> : <div style={{color:"#C1C3C1"}}>My Fleet</div>}
      </Button>,
      <Button
        isActiveOfGroup={buttonState.active === 2}
        onClick={() => setButtonState({ active: 2 })}
        >
 {buttonState.active === 2 ? <div style={{color:"black"}}>Resources</div> : <div style={{color:"#C1C3C1"}}>Resources</div>}
      </Button>,
    ]}
  />
      </div>
      {buttonState.active===1?
       <div>
        <MyFleet childToParent={childToParent}/>

     </div>:<div>
      <ResourceSearch/>
     </div>
    }
</div>
{jobClick == 3?<JobHistory/>:null}
</div>:null}
{jobClick == 2 ?<PartsSearch/>:null }

      </div>
    </div>
  </React.Fragment>
)
}
export default Header;
