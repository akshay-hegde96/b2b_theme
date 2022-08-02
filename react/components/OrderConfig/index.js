import React, { useState } from "react";
import styles from "./orderConfig.css";
import { Button } from "vtex.styleguide";
import { OrderConfigAPI } from "../../Config/url";
import { makeAPICall } from "../../Utils/httpCall";
import { FormattedMessage } from 'react-intl'

const OrderConfig = () => {
  const [orderType, setOrderType] = useState();
  const [stateCode, setStateCode] = useState();
  const [cart, setCart] = useState();
  const [confirm, setConfirm] = useState("");
  const [err, seterr] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);

  const validate = () => {
    if (!orderType) {
      seterr(true);
    }
    if (!stateCode) {
      seterr(true);
    }
    if (!cart) {
      seterr(true);
    }
    return;
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    validate();
    if (orderType && stateCode && cart) {
      console.log({ orderType, stateCode, cart });
      let data = { orderType: orderType, state: stateCode };
      let cartdata = {
        paymentConfiguration: {
          requiresAuthenticationForPreAuthorizedPaymentOption: true,
          allowInstallmentsMerge: false,
        },
        minimumQuantityAccumulatedForItems: 1,
        decimalDigitsPrecision: 1,
        minimumValueAccumulated: "",
        allowMultipleDeliveries: true,
        allowManualPrice: true,
      };

      cartdata["minimumValueAccumulated"] = cart;

      const response = await makeAPICall(
        "/api/dataentities/oo/documents",
        "PUT",
        data
      );
      console.log("result", response);

      const cartResponse = await makeAPICall(OrderConfigAPI, "POST", cartdata);
      console.log(cartResponse);
      setConfirm("Your data is submitted successfully.");
    }
  };

  return (
    <>
      <form>
        <div className={styles.mainContainer}>
          <div className={styles.orderType}>
            <label className="label">
              <FormattedMessage id="store/my-app.orderType" />
            </label>
            <div className="types">
              <input
                type="radio"
                name="order"
                value="resale"
                onChange={(e) => {
                  setOrderType(e.target.value);
                }}
              />{" "}
              <FormattedMessage id="store/my-app.resale" />
            </div>
            <div className="types">
              <input
                type="radio"
                name="order"
                value="consumption"
                onChange={(e) => {
                  setOrderType(e.target.value);
                }}
              />{" "}
              <FormattedMessage id="store/my-app.consumption" />
              {err ? <span className={styles.err}>Required field</span> : null}
            </div>
          </div>

          <div className={styles.stateContainer}>
            <label>
              {" "}
              <FormattedMessage id="store/my-app.state" />{" "}
            </label>
            <div className={styles.statesOptions}>
              <select
                value={stateCode}
                onChange={(e) => {
                  setStateCode(e.target.value);
                }}
              >
                {/* <option disabled hidden selected>
                <FormattedMessage id="store/my-app.selectState" />
                </option> */}
                <FormattedMessage id="store/my-app.selectState">
                  {(option) => ( <option disabled hidden selected>{option}</option>)}

                </FormattedMessage>

                <option value="US" name="state">
                  {" "}
                  US
                </option>
                <option value="BR" name="state">
                  {" "}
                  BR
                </option>
                <option value="AR" name="state">
                  {" "}
                  AR
                </option>
                <option value="NY" name="state">
                  {" "}
                  NY
                </option>
                <option value="ES" name="state">
                  {" "}
                  ES
                </option>
              </select>
              {err ? <span className={styles.err}>Required field</span> : null}
            </div>
          </div>

          <label className={styles.cartLabel}>
            <FormattedMessage id="store/my-app.cart" />{" "}
          </label>
          <div className={styles.cartValue}>
            <FormattedMessage id="store/my-app.cartPlaceholder">
              {(placeholder) => (
                <input
                  type="text"
                  name="cartValue"
                  onChange={(e) => {
                    setCart(e.target.value);
                  }}
                  placeholder={placeholder}
                />
              )}
            </FormattedMessage>

            {err ? <span className={styles.err}>Required field</span> : null}
          </div>

          <div className={styles.submitBtn}>
            <span className="mb4">
              <Button variation="primary" onClick={submitHandler}>
                Submit
              </Button>
            </span>
          </div>
          <p className={styles.confirm}>{confirm}</p>
        </div>
      </form>
    </>
  );
};

export default OrderConfig;
