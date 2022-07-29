import React, { useEffect, useState } from "react";
import { makeAPICall } from "../../Utils/httpCall";
import { allOrders } from "../../Config/url";
import styles from "./HomeDealer.css";
import img from '../../../assets/pdficon.png'


const MyReturns = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getAllOrders = async () => {
      const response = await makeAPICall(allOrders, "GET");
      //  console.log(response);
      setOrders(response["list"]);
    };
    getAllOrders();
  }, []);

  return (
    <>
      <div className={styles.topContainer}>
        <div className={styles.letside}>
          <div className={styles.myorders}>
            <p>My Orders</p>
            <a href="#">View All</a>
          </div>
          <table className={styles.mainTable}>
            <tr>
              <th style={{ borderRadius: "3px" }}>Date Order</th>
              <th>Purchase Order #</th>
              <th>Incident #</th>
              <th>Total</th>
              <th>Origin</th>
              <th>Est Ship Date</th>
              <th>Status</th>
              <th>|</th>
              <th style={{ borderRadius: "3px" }}>Action</th>
            </tr>
            {orders &&
              orders.slice(0, 8).map((item) => {
                return (
                  <tr>
                    <td>{new Date(item.creationDate).toLocaleDateString()}</td>
                    <td>{(item.orderId).slice(0,13)}</td>
                    <td>{item.sequence}</td>
                    <td>${item.totalValue}</td>
                    <td>{item.origin}</td>
                    <td>
                      {new Date(
                        item.ShippingEstimatedDate
                      ).toLocaleDateString()}
                    </td>
                    <td>{item.status}</td>
                    <td>|</td>
                    <td>
                      <a href="#">Action Required</a>
                    </td>
                  </tr>
                );
              })}
          </table>
          <div className={styles.myTicketsContainer}>
            <div className={styles.myTicket}>
              <p>My Tickets</p>
              <a href="#" style={{}}>View All Tickets on Service Cloud</a>
            </div>
            <table className={styles.mainTable}>
              <tr>
                <th style={{ borderRadius: "3px" }}>Refrence #</th>
                <th>Ticket Type</th>
                <th>Subject</th>
                <th>Job #</th>
                <th>Created Time</th>
                <th>|</th>
                <th style={{ borderRadius: "3px" }} >Status</th>

              </tr>
              {orders &&
              orders.slice(0, 3).map((item) => {
                return (
              <tr>
                <td>XXXXXXX</td>
                <td>Lorem Ipsum Unum</td>
                <td>{item.statusDescription}</td>
                <td>XXXXXXX</td>
                <td>July 14, 12:00:00pm</td>
                <td>|</td>
                <td>
                  <a href="#">Loren Ipsum</a>
                </td>
              </tr>
               );
              })}
            </table>
          </div>
        </div>
        <div className={styles.rightSide}>
          <div className={styles.bulletins}>
            <p
              style={{
                paddingLeft: "10px",
                color: "red",
                fontSize: "18px",
                fontWeight: "500",
              }}
            >
              Bulletins
            </p>
            <a href="#" style={{ paddingRight: "10px" }}>
              View All
            </a>
          </div>
          <div className={styles.bulletinsFirst}>
            <h4>Service Topic #567 - water Pressure Governer Change</h4>
            <p>
              improvement is important in any career path. To keep growing your
              skills and improving your work performance, you need to identify
              and address your areas of improvement. Knowing what you can
              improve is the first step towards overcoming your weaknesses for
              becoming a better employee
            </p>
            <a href="#">Learn More</a>
          </div>
          <div className={styles.bulletinsFirst}>
            <h4>Service Topic #588 - MCC HVAC Upgrade </h4>
            <p>
              Addressing fault codes and upgrade to the MNC HVAC system
            </p>
            <a href="#">Learn More</a>
          </div>
          <div className={styles.bulletinsFirst}>
            <h4>Warrenty Bulletin #613 - Goodyear Alcoa Warranty </h4>
            <p>
              improvement is important in any career path. To keep growing your
              skills and improving your work performance.
            </p>
            <a href="#">Learn More</a>
          </div>
        </div>
      </div>
      <div >
        <div className={styles.bottommain}>
      <div className={styles.dealerBottom}>
              <div className={styles.leftSideDealer}>
                <img src={img} alt="image" width="52px" height="52px" style={{padding:"5px"}}/>
              </div>
              <div className={styles.rightSideDealer}>
                <p>Aerial Platform Parts Manual(non-Multiplex)</p>
              </div>
      </div>

      <div className={styles.dealerBottom}>
              <div className={styles.leftSideDealer}>
                <img src={img} alt="image" width="52px" height="52px"/>
              </div>
              <div className={styles.rightSideDealer}>
                <p>Aerial Platform Parts Manual(non-Multiplex)</p>
              </div>
      </div>
      <div className={styles.dealerBottom}>
              <div className={styles.leftSideDealer}>
                <img src={img} alt="image" width="52px" height="52px"/>
              </div>
              <div className={styles.rightSideDealer}>
                <p>Aerial Platform Parts Manual(non-Multiplex)</p>
              </div>
      </div>
      <div className={styles.dealerBottom}>
              <div className={styles.leftSideDealer}>
                <img src={img} alt="image" width="52px" height="52px"/>
              </div>
              <div className={styles.rightSideDealer}>
                <p>Aerial Platform Parts Manual(non-Multiplex)</p>
              </div>
      </div>
      </div>
      </div>
    </>
  );
};

export default MyReturns;
