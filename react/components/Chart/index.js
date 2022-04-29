import React, { useState } from 'react';
import { useQuery } from 'react-apollo';
import styles from "./Chart.css";
import GetcustomerOrderDetails from '../../queries/searchOrderId.graphql'


const Chart = (props) => {

    function getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    const orderStatus = [
        "ready-for-handling",
        "cancellation-requested",
        "invoiced",
    ];

    const { data } = useQuery(GetcustomerOrderDetails, {
        variables: {
            orderId: "",
            value: "",
        },
        ssr: false,
    });

    const ordersData = data?.customerOrders?.list;
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
                <select name="orderMonth" id="orderMonth" value={currentStatus} onChange={statusHandler} className={styles.dropdownContainer} >
                    {orderStatus.map((orderData, i) => {
                        return (
                            <option key={i} value={orderData} className={styles.option} >
                                {orderData}
                            </option>
                        );
                    })}
                </select>
                <div className={styles.chartRow}>
                    <div className={styles.chartCol}>
                        <h3 className={styles.chartHeadings}>Bar Chart</h3>
                        <props.BarChart className={styles.BarChart} legendPosition="bottom" responsive="true" displayTitle="true" dataset={BarChartDataset}
                            titleText="Echidna Sales Bar Chart" labelsName={BarChartlabelsName} ></props.BarChart>,
                    </div>
                    <div className={styles.chartCol}>
                        <h3 className={styles.chartHeadings}>Line Chart</h3>
                        <props.LineChart className={styles.LineChart} legendPosition="bottom" responsive="true" displayTitle="true" dataset={LineChartDataset}
                            titleText="Echidna Sales Line Chart" labelsName={LineChartlabelsName} ></props.LineChart>,
                    </div>
                    <div className={styles.chartCol}>
                        <h3 className={styles.chartHeadings}>Ref Chart</h3>
                        <props.ChartRef className={styles.ChartRef} legendPosition="bottom" responsive="true" displayTitle="true" dataset={RefChartDataset}
                            titleText="Echidna Sales Ref Chart" labelsName={RefChartlabelsName} ></props.ChartRef>,
                    </div>
                </div>
                <div className={styles.chartRow}>
                    <div className={styles.chartCol}>
                        <h3 className={styles.chartHeadings}>Pie Chart</h3>
                        <props.PieChart className={styles.PieChart} legendPosition="bottom" responsive="true" displayTitle="true" dataset={PieChartDataset}
                            titleText="Echidna Sales Pie Chart" labelsName={PieChartlabelsName} ></props.PieChart>,
                    </div>
                    <div className={styles.chartCol}>
                        <h3 className={styles.chartHeadings}>Scatter Chart</h3>
                        <props.ScatterChart className={styles.ScatterChart} beginAtZero="true" dataset={ScatterChartDataset} ></props.ScatterChart>,
                    </div>
                    <div className={styles.chartCol}>
                        <h3 className={styles.chartHeadings}>Bubble Chart</h3>
                        <props.BubbleChart className={styles.BubbleChart} beginAtZero="true" dataset={BubbleChartDataset} ></props.BubbleChart>,
                    </div>
                </div>
            </div>

        </React.Fragment>
    )
}

export default Chart;