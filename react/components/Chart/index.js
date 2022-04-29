import React from 'react';
import { useQuery } from 'react-apollo';
import styles from "./Chart.css";
import GetcustomerOrders from '../../queries/searchOrderId.graphql'


const Chart = (props) => {

    function getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    const { data } = useQuery(GetcustomerOrders, {
        variables: {
            orderId: "",
            value: "",
        },
        ssr: false,
    });

    const order = data?.customerOrders?.list.map(getOrderId);
    function getOrderId(item) {
        return item.orderId;
    }

    const value = data?.customerOrders?.list.map(getOrderValue);
    function getOrderValue(item) {
        return item.value;
    }

    console.log("## data : ", data?.customerOrders?.list);
    console.log("## Order Id : ", order);
    console.log("## Order Value : ", value);

    const BarChartlabelsName = order;
    const BarChartDataset = [
        {
            label: 'Echidna Order Sales Data',
            data: value,
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        }
    ];

    const LineChartlabelsName = order;
    const LineChartDataset = [
        {
            label: 'Echidna Order Sales Data',
            data: value,
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        }
    ];

    const PieChartlabelsName = order;
    const PieChartDataset = [
        {
            label: '# of Echidnites Votes',
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
            label: 'Dataset 1',
            borderColor: 'rgb(255, 99, 132)',
            borderWidth: 2,
            fill: false,
            data: value,
        },
        {
            type: 'bar',
            label: 'Dataset 2',
            backgroundColor: 'rgb(75, 192, 192)',
            data: value,
            borderColor: 'white',
            borderWidth: 2,
        },
        {
            type: 'bar',
            label: 'Dataset 3',
            backgroundColor: 'rgb(53, 162, 235)',
            data: value,
        },
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
                <div className={styles.chartRow}>
                    <div className={styles.chartCol}>
                        <select name="orderStatus" id="orderStatus">
                            <option value="SOPA">Sheduled Orders Pending Approval</option>
                            <option value="FAO">Failed Approval Orders</option>
                            <option value="SO">Scheduled Orders</option>
                            <option value="IO">Incomplete Orders</option>
                            <option value="SFO">Submitted to fulfillment Orders</option>
                            <option value="PAO">Pending Approval Orders</option>
                        </select>
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