import React from 'react';
import { useRuntime } from 'vtex.render-runtime'
import { useQuery } from "react-apollo";
// import { useOrder } from 'vtex.order-placed/OrderContext';
// import { useOrderGroup } from 'vtex.order-placed/OrderGroupContext'
import getOrderGroup from '../../queries/getOrderGroup.graphql'
const POnumber = () =>{
// const current = useOrder()
// const orderGroup = useOrderGroup()
const runtime = useRuntime()
const { data } = useQuery(getOrderGroup, {
  variables: {
    orderGroup: runtime.query.og,
  },
})

const orderData = data?.orderGroup?.orders?.map((cdata)=> cdata.customData).map((capp)=>capp.customApps[0])
const POfields = orderData?.map((po)=>po.fields).map((p)=>p.purchaseOrderNumber)

console.log(POfields)
return(
  <div>
   <h3>Purchase Order: {POfields}</h3>
  </div>
)

}
export default POnumber;
