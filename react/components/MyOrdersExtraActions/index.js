import React, { useEffect, useState } from "react";
import { makeAPICall } from "../../Utils/httpCall";

const ShowIdButton = ({ orderId }) => {
  const [PoNumber, setPoNumber] = useState();
const [userName, setUserName] = useState();

  useEffect(() => {
    const makeOrderApicall = async () => {
      const data = await makeAPICall(
        "api/oms/pvt/orders/" + `${orderId}`,
        "GET"
      );
      const getPO = data?.customData?.customApps[0]?.fields?.poNumber;
      setPoNumber(getPO);

      const userData = data?.clientProfileData?.firstName
      setUserName(userData)
    };
    makeOrderApicall();
  }, []);
  return (
    <React.Fragment>
    <div>
      {PoNumber ? (
        <h4 style={{ color: "green" }}>
          Purchase Order No: <span style={{ color: "blue" }}>{PoNumber}</span>
        </h4>
      ) : null}
    </div>
    <h4>Ordered By : <span>{userName}</span></h4>
    </React.Fragment>
  );
};

export default ShowIdButton;
