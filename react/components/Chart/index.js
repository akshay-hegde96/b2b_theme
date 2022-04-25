import React from 'react';
import styles from "./Chart.css";

const Chart = (props) => {

    function getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1) ) + min;
      };

    const BarChartlabelsName = ["January", "February", "March", "April", "May", "June", "July", "August"];
    const BarChartDataset = [
        {
            label: 'Echidna Dataset 1',
            data: BarChartlabelsName.map(() => getRndInteger(0, 1000)),
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
            label: 'Echidna Dataset 2',
            data: BarChartlabelsName.map(() => getRndInteger(0, 1000)),
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
    ];

    const LineChartlabelsName = ["January", "February", "March", "April", "May", "June", "July", "August"];
    const LineChartDataset = [
        {
            label: 'Echidna Dataset Jan',
            data: LineChartlabelsName.map(() => getRndInteger(-1000, 1000)),
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
            label: 'Echidna Dataset Feb',
            data: LineChartlabelsName.map(() => getRndInteger(-1000, 1000)),
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
    ];

    const PieChartlabelsName = ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"];
    const PieChartDataset = [
        {
            label: '# of Echidnites Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
        },
    ];

    const RefChartlabelsName = ["January", "February", "March", "April", "May", "June", "July", "August"];
    const RefChartDataset = [
        {
            type: 'line',
            label: 'Dataset 1',
            borderColor: 'rgb(255, 99, 132)',
            borderWidth: 2,
            fill: false,
            data: RefChartlabelsName.map(() => getRndInteger(-1000, 1000)),
        },
        {
            type: 'bar',
            label: 'Dataset 2',
            backgroundColor: 'rgb(75, 192, 192)',
            data: RefChartlabelsName.map(() => getRndInteger(-1000, 1000)),
            borderColor: 'white',
            borderWidth: 2,
        },
        {
            type: 'bar',
            label: 'Dataset 3',
            backgroundColor: 'rgb(53, 162, 235)',
            data: RefChartlabelsName.map(() => getRndInteger(-1000, 1000)),
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
        <div className={styles.container}>
        <props.BarChart className={styles.BarChart} legendPosition="left" responsive="true" displayTitle="true" dataset={BarChartDataset}
            titleText="Echidna Sales Bar Chart" labelsName={BarChartlabelsName} ></props.BarChart>,
        
        <props.LineChart className={styles.LineChart} legendPosition="bottom" responsive="true" displayTitle="true" dataset={LineChartDataset}
            titleText="Echidna Sales Line Chart" labelsName={LineChartlabelsName} ></props.LineChart>,

        <props.PieChart className={styles.PieChart} legendPosition="bottom" responsive="true" displayTitle="true" dataset={PieChartDataset}
            titleText="Echidna Sales Line Chart" labelsName={PieChartlabelsName} ></props.PieChart>,

        <props.ChartRef className={styles.ChartRef} legendPosition="bottom" responsive="true" displayTitle="true" dataset={RefChartDataset}
            titleText="Echidna Sales Ref Chart" labelsName={RefChartlabelsName} ></props.ChartRef>,

        <props.ScatterChart className={styles.ScatterChart} beginAtZero="true" dataset={ScatterChartDataset} ></props.ScatterChart>,

        <props.BubbleChart className={styles.BubbleChart} beginAtZero="true" dataset={BubbleChartDataset} ></props.BubbleChart>,

        </div>)
}

export default Chart;