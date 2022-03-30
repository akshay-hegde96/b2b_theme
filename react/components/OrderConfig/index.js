import React ,{useState}from "react";
import { Button } from 'vtex.styleguide'
import {OrderConfigAPI} from '../../Config/url'
import {makeAPICall} from '../../Utils/httpCall'

const OrderConfig = () => {


  const [order, setOrder] = useState()
  const [finalOrder, setFinalOrder] = useState("")
  const [confirm, setConfirm] = useState("");


  const handle = async (e) => {
    let data = {
      "paymentConfiguration": {
        "requiresAuthenticationForPreAuthorizedPaymentOption": false,
        "allowInstallmentsMerge": false
   },
   "apps": {
        "fields": [
             "values"
        ],
        "id": "orderconfig",
        "major": 1
   },
   "recaptchaValidation": "vtexCriteria",
   "minimumQuantityAccumulatedForItems": 1,
   "decimalDigitsPrecision": 2,
   "minimumValueAccumulated": 30000,
   "allowMultipleDeliveries": true,
   "allowManualPrice": true
  }

  const res = await makeAPICall(OrderConfigAPI, "POST", data)
  console.log(res)

  setConfirm("Your data is submitted successfully.");

  window.location.reload()

  }

  //const initialState = { isLoading1: true, isLoading2: true, isLoading3: true  };
  return(
    <div className="flex flex-column items-center w-100">
    <span className="mb4">
      <Button variation="primary" onClick={handle}>Submit</Button>
    </span>
    <span>{confirm}</span>
    </div>
  )
}

export default OrderConfig
