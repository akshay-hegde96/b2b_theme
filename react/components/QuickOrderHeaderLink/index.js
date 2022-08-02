import React from 'react';

const QuickOrderHeaderLink = () =>{
  return(
    <React.Fragment>
     <div style={{display:"flex",borderLeft: "1px solid gray", paddingLeft: "15px"}}>
      <img src="https://cdn-icons-png.flaticon.com/512/4972/4972348.png" width="40"/>

      <a href='/quickOrder' style={{textDecoration:"none"}}><div style={{color:"white",fontSize:"12px"}}>Quick</div><div style={{color:"white",fontWeight:600}}>Order</div></a>
      </div>
    </React.Fragment>
  )
}
export default QuickOrderHeaderLink;
