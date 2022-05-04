import React, { useState } from 'react';
import { useQuery } from 'react-apollo';
import styles from "./Chart.css";
import GetcustomerOrderDetails from '../../queries/searchOrderId.graphql'


const Chart = (props) => {

    function getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];
    const [currentMonth, setMonth] = useState(monthNames[0]);

    const orderStatus = [
        "ready-for-handling",
        "cancellation-requested",
        "invoiced",
        "canceled",
        "handling"
    ];

    const { data } = useQuery(GetcustomerOrderDetails, {
        variables: {
            orderId: "",
            value: "",
        },
        ssr: false,
    });

    // Logic for monthwise filter of customer order---------------------------------------------------

    const customerOrderData = data?.customerOrders?.list;

    const allmnthsData = customerOrderData?.map((eachOrder) => {
        const date = new Date(eachOrder.creationDate);

        return {
            orderYear: date.getFullYear(),
            orderMonth: monthNames[date.getMonth()],
            orderDate: date.getDate(),
            value: eachOrder.value,
            status: eachOrder.status,
        };
    });
    console.log("allmnthsData", allmnthsData);
    const orderBymnthsData = allmnthsData?.reverse();

    const selectMnthHandler = (e) => {
        const selectedmnth = e.target.value;
        setMonth(selectedmnth);
        console.log(selectedmnth);
    };

    const currentMnthData = orderBymnthsData?.filter(
        (order) => order.orderMonth == currentMonth
    );
    console.log("## currentMnthData", currentMnthData);
    const monthlyValue = currentMnthData?.map(getOrderValue);
    function getOrderValue(item) {
        return item.value;
    }

    const monthOrderDate = currentMnthData?.map(getOrderDate);
    function getOrderDate(item) {
        return item.orderDate;
    }
    console.log("## monthlyValue", monthlyValue);
    console.log("## monthOrderDate", monthOrderDate);

    const MonthLineChartlabelsName = monthOrderDate;
    const MonthLineChartDataset = [
        {
            label: 'OrderId',
            data: monthlyValue,
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        }
    ];

    //-----------------------------------------------------------------------

    //const ordersData = data?.customerOrders?.list;
    const ordersData = data?.customerOrders?.list?.map((item) => {
        return Object.assign({}, item, {
            value: item.value ? Number((item.value / 100).toFixed(2)) : "",
        });
    });

    const [currentStatus, setStatus] = useState(orderStatus[0]);

    const selectedStatus = ordersData?.filter(
        (urdata) => urdata.status == currentStatus
    );

    const statusHandler = (e) => {
        const selectedStatus = e.target.value;
        setStatus(selectedStatus);
        console.log("## selectedStatus", selectedStatus);
    };

    //var order = data?.customerOrders?.list.map(getOrderId);
    const order = selectedStatus?.map(getOrderId);
    function getOrderId(item) {
        return item.orderId;
    }

    //const value = data?.customerOrders?.list.map(getOrderValue);
    const value = selectedStatus?.map(getOrderValue);
    function getOrderValue(item) {
        return item.value;
    }

    console.log("## data : ", data?.customerOrders?.list);
    console.log("## Order Id : ", order);
    console.log("## Order Value : ", value);

    const BarChartlabelsName = order;
    const BarChartDataset = [
        {
            label: 'OrderId',
            data: value,
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        }
    ];

    const LineChartlabelsName = order;
    const LineChartDataset = [
        {
            label: 'OrderId',
            data: value,
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        }
    ];

    const PieChartlabelsName = order;
    const PieChartDataset = [
        {
            label: 'OrderId',
            data: value,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
            ],
            borderWidth: 1,
        },
    ];

    const RefChartlabelsName = order;
    const RefChartDataset = [
        {
            type: 'line',
            label: 'OrderId Line',
            borderColor: 'rgb(255, 99, 132)',
            borderWidth: 2,
            fill: false,
            data: value,
        },
        {
            type: 'bar',
            label: 'OrderId Bar',
            backgroundColor: 'rgb(75, 192, 192)',
            data: value,
            borderColor: 'white',
            borderWidth: 2,
        }
    ];

    const ScatterChartlabelsName = "Echidna dataset";
    const ScatterChartDataset = [
        {
            label: ScatterChartlabelsName,
            data: Array.from({ length: 100 }, () => ({
                x: getRndInteger(-100, 100),
                y: getRndInteger(-100, 100),
            })),
            backgroundColor: 'rgba(255, 99, 132, 1)',
        },
    ];

    const BubbleChartDataset = [
        {
            label: 'Red dataset',
            data: Array.from({ length: 50 }, () => ({
                x: getRndInteger(-100, 100),
                y: getRndInteger(-100, 100),
                r: getRndInteger(5, 20),
            })),
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
            label: 'Blue dataset',
            data: Array.from({ length: 50 }, () => ({
                x: getRndInteger(-100, 100),
                y: getRndInteger(-100, 100),
                r: getRndInteger(5, 20),
            })),
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
    ];

    return (
        <React.Fragment>
            <div className={styles.dashBoardContainer}>
                <select name="orderMonth" id="orderMonth" value={currentStatus} onChange={statusHandler} className={styles.reactDropdownContainer} >
                    {orderStatus.map((orderData, i) => {
                        return (
                            <option key={i} value={orderData} className={styles.reactOption} >
                                {orderData}
                            </option>
                        );
                    })}
                </select>

                {selectedStatus?.length == 0 ? (
                    <div className={styles.reactWarningStatus}>
                        {" "}
                        <h2>
                            Sorry, there are no orders in{" "}
                            <span style={{ "font-weight": "bold", "text-decoration": "underline", "text-decoration-color": "red" }}>"{currentStatus}"</span> status!
                        </h2>
                    </div>
                ) : (
                    <div>
                        <div className={styles.reactChartRow}>
                            <div className={styles.reactChartCol}>
                                <h3 className={styles.reactChartHeadings}>Bar Chart</h3>
                                <props.BarChart className={styles.BarChart} legendPosition="bottom" responsive="true" displayTitle="true" dataset={BarChartDataset}
                                    titleText="Echidna Sales Bar Chart" labelsName={BarChartlabelsName} ></props.BarChart>,
                            </div>
                            <div className={styles.reactChartCol}>
                                <h3 className={styles.reactChartHeadings}>Line Chart</h3>
                                <props.LineChart className={styles.LineChart} legendPosition="bottom" responsive="true" displayTitle="true" dataset={LineChartDataset}
                                    titleText="Echidna Sales Line Chart" labelsName={LineChartlabelsName} ></props.LineChart>,
                            </div>
                            <div className={styles.reactChartCol}>
                                <h3 className={styles.reactChartHeadings}>Ref Chart</h3>
                                <props.ChartRef className={styles.ChartRef} legendPosition="bottom" responsive="true" displayTitle="true" dataset={RefChartDataset}
                                    titleText="Echidna Sales Ref Chart" labelsName={RefChartlabelsName} ></props.ChartRef>,
                            </div>
                        </div>
                        <div className={styles.reactChartRow}>
                            <div className={styles.reactChartCol}>
                                <h3 className={styles.reactChartHeadings}>Pie Chart</h3>
                                <props.PieChart className={styles.PieChart} legendPosition="bottom" responsive="true" displayTitle="true" dataset={PieChartDataset}
                                    titleText="Echidna Sales Pie Chart" labelsName={PieChartlabelsName} ></props.PieChart>,
                            </div>
                            <div className={styles.reactChartCol}>
                                <h3 className={styles.reactChartHeadings}>Scatter Chart</h3>
                                <props.ScatterChart className={styles.ScatterChart} beginAtZero="true" dataset={ScatterChartDataset} ></props.ScatterChart>,
                            </div>
                            <div className={styles.reactChartCol}>
                                <h3 className={styles.reactChartHeadings}>Bubble Chart</h3>
                                <props.BubbleChart className={styles.BubbleChart} beginAtZero="true" dataset={BubbleChartDataset} ></props.BubbleChart>,
                            </div>
                        </div>
                    </div>
                )}
                <div className={styles.reactChartRow}>
                    <div className={styles.reactChartCol}>
                        <span>Filter By Month : </span>
                        <select name="orderMonth" id="orderMonth" value={currentMonth} onChange={selectMnthHandler} >
                            {monthNames.map((month, i) => {
                                return (
                                    <option key={i} value={month}>
                                        {month}
                                    </option>
                                );
                            })}
                        </select>
                        {currentMnthData?.length == 0 && (
                            <span style={{ color: "red" }}>
                                {" "}
                                Sorry, there were no orders in {currentMonth}!
                            </span>
                        )}
                        <h3 className={styles.reactChartHeadings}>Customer Orders</h3>
                        <props.LineChart className={styles.LineChart} legendPosition="bottom" responsive="true" displayTitle="true" dataset={MonthLineChartDataset}
                            titleText="Echidna Sales Line Chart" labelsName={MonthLineChartlabelsName} ></props.LineChart>
                    </div>
                </div>
            </div>

        </React.Fragment>
    )
}

export default Chart;