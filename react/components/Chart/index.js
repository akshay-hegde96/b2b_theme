import React, { useState } from 'react';
import { useQuery } from 'react-apollo';
import styles from "./Chart.css";
import GetcustomerOrderDetails from '../../queries/searchOrderId.graphql'


const Chart = (props) => {

    function getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    function getOrderValue(item) {
        return item.value;
    };

    function getOrderDate(item) {
        return item.orderDate;
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
    const yearNames = ["2021", "2022"];
    const [currentYear, setYear] = useState("2021");
    const [currentMonth, setMonth] = useState(monthNames[0]);
    const [CatArr, setCatArr] = useState([]);

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
            orderID: eachOrder.orderId,
        };
    });
    console.log("allmnthsData", allmnthsData);
    const orderBymnthsData = allmnthsData?.reverse();

    const selectMnthHandler = (e) => {
        const selectedmnth = e.target.value;
        setMonth(selectedmnth);
        console.log(selectedmnth);
    };

    const selectYearHandler = (e) => {
        const selectedYear = e.target.value;
        setYear(selectedYear);
        console.log(selectedYear);
    };

    const currentMnthData = orderBymnthsData?.filter(
        (MnthOrder) =>
            MnthOrder.orderMonth == currentMonth && MnthOrder.orderYear == currentYear
    );
    console.log("## currentMnthData", currentMnthData);
    const monthlyValue = currentMnthData?.map(getOrderValue);
    const monthOrderID = currentMnthData?.map(getOrderID);
    function getOrderID(item) {
        return item.orderID;
    };

    console.log("## monthlyValue", monthlyValue);
    console.log("## monthOrderID", monthOrderID);

    const MonthLineChartlabelsName = monthOrderID;
    const MonthLineChartDataset = [
        {
            label: 'Order ID',
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

    // =========== Steps to get all Order Status object for  pie chart ================
    // Step1: Filtering and counting each status in OMS data
    const Readylength = ordersData?.filter(function (item) {
        return item.status == "ready-for-handling";
    }).length;

    const Canceledlength = ordersData?.filter(function (item) {
        return item.status == "canceled";
    }).length;

    const Cancellationlength = ordersData?.filter(function (item) {
        return item.status == "cancellation-requested";
    }).length;

    const Invoicedlength = ordersData?.filter(function (item) {
        return item.status == "invoiced";
    }).length;

    const Handlinglength = ordersData?.filter(function (item) {
        return item.status == "handling";
    }).length;

    // Converting status and counts to key,value pairs
    let ReadyObj = {};
    ReadyObj["status"] = "ready-for-handling";
    ReadyObj["count"] = Readylength;

    let CanceledObj = {};
    CanceledObj["status"] = "canceled";
    CanceledObj["count"] = Canceledlength;

    let CancellationObj = {};
    CancellationObj["status"] = "cancellation-requested";
    CancellationObj["count"] = Cancellationlength;

    let InvoicedObj = {};
    InvoicedObj["status"] = "invoiced";
    InvoicedObj["count"] = Invoicedlength;

    let HandlingObj = {};
    HandlingObj["status"] = "handling";
    HandlingObj["count"] = Handlinglength;

    // ===Final data for Piechart(Array of objects)
    const PieStatus = [
        ReadyObj,
        CanceledObj,
        CancellationObj,
        InvoicedObj,
        HandlingObj,
    ];

    const orderPieStatus = PieStatus?.map(getOrderStatus);
    function getOrderStatus(item) {
        return item.status;
    };
    const orderPieCount = PieStatus?.map(getOrderCount);
    function getOrderCount(item) {
        return item.count;
    };

    console.log("## Pie Order Status : ", orderPieStatus);
    console.log("## Pie Order Count : ", orderPieCount);

    const StatusPieChartlabelsName = orderPieStatus;
    const StatusPieChartDataset = [
        {
            label: 'OrderId',
            data: orderPieCount,
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
    //----------------------------------------------------------------------------

    //================ For category name vs totalproducts chart ==================
    const productId = ordersData?.map((prod) => prod.productIds);
    let newArr = productId?.join(",").split(",");
    console.log(newArr);
    const productURL = newArr?.map(
        (arr) => "/api/catalog/pvt/product/" + `${arr}`
    );

    const CategoryArr = [];
    async function fetchAll() {
        const result = await Promise.all(
            productURL?.map((url) => fetch(url).then((r) => r.json()))
        );
        const result2 = await result?.map((cat) => cat.CategoryId);
        console.log(result2);

        const resCatname = await Promise.all(
            result2.map((catid) =>
                fetch(`/api/catalog/pvt/category/${catid}`).then((res) => res.json())
            )
        );
        const catNameRes = await resCatname?.map((category) => category.Name);
        console.log("catNameRes", catNameRes);
        CategoryArr.push(...catNameRes);
    }

    function processFetchedData() {
        CategoryArr.length !== 0 &&
            CategoryArr.forEach((element) => {
                CatCount[element] = (CatCount[element] || 0) + 1;
            });
        console.log("CatCount", CatCount);

        for (const char in CatCount) {
            newCatArrData.push({ name: `${char}`, products: CatCount[char] });
        }
        console.log("newCatArrData", newCatArrData);

        if (newCatArrData.length > 0) {
            console.log("setdata", newCatArrData);

            if (CatArr?.length == newCatArrData?.length) {
                return;
            } else setCatArr(newCatArrData);
        }
    }

    const CatCount = {};
    const newCatArrData = [];

    async function datahandler() {
        await fetchAll();
        await processFetchedData();
    }

    datahandler();

    console.log("## CatCount", CatCount);
    console.log("## newCatArrData", newCatArrData);
    console.log("## CatArr", CatArr);

    const catName = CatArr?.map(getCatName);
    function getCatName(item) {
        return item.name;
    };

    const catProdCount = CatArr?.map(getCatProdCount);
    function getCatProdCount(item) {
        return item.products;
    };

    const CatBarChartlabelsName = catName;
    const CatBarChartDataset = [
        {
            label: 'Product Category',
            data: catProdCount,
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        }
    ];
    //----------------------------------------------------------------------------

    // =========== Steps to get Order Status object for all chart ================
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
    };

    //const value = data?.customerOrders?.list.map(getOrderValue);
    const value = selectedStatus?.map(getOrderValue);

    console.log("## data : ", selectedStatus);
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
                            <span style={{ "font-weight": "bold", "text-decoration": "underline", "text-decoration-color": "red" }}>"{currentStatus}"</span> status !!
                        </h2>
                    </div>
                ) : (
                    <div>
                        <div className={styles.reactChartRow}>
                            <div className={styles.reactChartCol}>
                                <h3 className={styles.reactChartHeadings}>Bar Chart</h3>
                                <props.BarChart className={styles.BarChart} legendPosition="bottom" responsive="true" displayTitle="true" dataset={BarChartDataset}
                                    titleText="Echidna Sales Bar Chart" labelsName={BarChartlabelsName} ></props.BarChart>
                            </div>
                            <div className={styles.reactChartCol}>
                                <h3 className={styles.reactChartHeadings}>Line Chart</h3>
                                <props.LineChart className={styles.LineChart} legendPosition="bottom" responsive="true" displayTitle="true" dataset={LineChartDataset}
                                    titleText="Echidna Sales Line Chart" labelsName={LineChartlabelsName} ></props.LineChart>
                            </div>
                            <div className={styles.reactChartCol}>
                                <h3 className={styles.reactChartHeadings}>Ref Chart</h3>
                                <props.ChartRef className={styles.ChartRef} legendPosition="bottom" responsive="true" displayTitle="true" dataset={RefChartDataset}
                                    titleText="Echidna Sales Ref Chart" labelsName={RefChartlabelsName} ></props.ChartRef>
                            </div>
                        </div>
                        <div className={styles.reactChartRow}>
                            <div className={styles.reactChartCol}>
                                <h3 className={styles.reactChartHeadings}>Order Status Pie Chart</h3>
                                <props.PieChart className={styles.PieChart} legendPosition="bottom" responsive="true" displayTitle="true" dataset={StatusPieChartDataset}
                                    titleText="Echidna Sales Pie Chart" labelsName={StatusPieChartlabelsName} ></props.PieChart>
                            </div>
                            <div className={styles.reactChartCol}>
                                <h3 className={styles.reactChartHeadings}>Order ID Pie Chart</h3>
                                <props.PieChart className={styles.PieChart} legendPosition="bottom" responsive="true" displayTitle="true" dataset={PieChartDataset}
                                    titleText="Echidna Sales Pie Chart" labelsName={PieChartlabelsName} ></props.PieChart>
                            </div>
                        </div>
                        <div className={styles.reactChartRow}>
                            <div className={styles.reactChartCol}>
                                <h3 className={styles.reactChartHeadings}>Scatter Chart</h3>
                                <props.ScatterChart className={styles.ScatterChart} beginAtZero="true" dataset={ScatterChartDataset} ></props.ScatterChart>
                            </div>
                            <div className={styles.reactChartCol}>
                                <h3 className={styles.reactChartHeadings}>Bubble Chart</h3>
                                <props.BubbleChart className={styles.BubbleChart} beginAtZero="true" dataset={BubbleChartDataset} ></props.BubbleChart>
                            </div>
                        </div>
                    </div>
                )}
                <div className={styles.reactChartRow}>
                    <div className={styles.reactChartCol}>

                        <div>
                            <span>Filter By Year and Month : </span>
                            <select name="orderYear" id="orderYear" value={currentYear}
                                onChange={selectYearHandler} className={styles.reactDropdownContainer} >
                                {yearNames.map((year, i) => {
                                    return (
                                        <option key={i} value={year}>
                                            {year}
                                        </option>
                                    );
                                })}
                            </select>
                            <select name="orderMonth" id="orderMonth" value={currentMonth}
                                onChange={selectMnthHandler} className={styles.reactDropdownContainer} >
                                {monthNames.map((month, i) => {
                                    return (
                                        <option key={i} value={month}>
                                            {month}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                        {currentMnthData?.length == 0 && (
                            <h2 className={styles.reactWarningStatus} >
                                Sorry, there are no orders in {" "}
                                <span style={{ "font-weight": "bold", "text-decoration": "underline", "text-decoration-color": "red" }}>{currentMonth} - {currentYear}</span> !!
                            </h2>
                        )}
                        {currentMnthData?.length !== 0 && (
                            <div>
                                <h3 className={styles.reactChartHeadings}>Customer Orders</h3>
                                <props.LineChart className={styles.LineChart} legendPosition="bottom" responsive="true" displayTitle="true" dataset={MonthLineChartDataset}
                                    titleText="Echidna Sales Line Chart" labelsName={MonthLineChartlabelsName} ></props.LineChart>
                            </div>
                        )}
                    </div>
                </div>
                <div className={styles.reactChartRow}>
                    <div className={styles.reactChartCol}>
                        <h3 className={styles.reactChartHeadings}>Product Category Bar Chart</h3>
                        <props.BarChart className={styles.BarChart} legendPosition="bottom" responsive="true" displayTitle="true" dataset={CatBarChartDataset}
                            titleText="Echidna Sales Bar Chart" labelsName={CatBarChartlabelsName} ></props.BarChart>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Chart;