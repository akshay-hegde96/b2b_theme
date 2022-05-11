import React, { useState } from "react";
import styles from "./Chart.css";
import { useQuery } from "react-apollo";
import GetcustomerOrders from "../../queries/customerOrders.graphql";
const ChartData = (props) => {
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
  const [currentMonth, setMonth] = useState(monthNames[0]);
  const [currentYear, setYear] = useState("2021");

  const { data } = useQuery(GetcustomerOrders, {
    variables: {
      orderId: "",
      value: "",
    },
    ssr: false,
  });
  // console.log(data?.customerOrders?.list)
  const orderStatus = [
    "ready-for-handling",
    "cancellation-requested",
    "invoiced",
    "canceled",
    "handling",
  ];

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
  };
  // =========== Steps to get data object for  pie chart ================
  const COLORS = ["#00C49F", "#0088FE", "#FFBB28", "#FF8042"];
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
  // ================== data for line , bar chart ,composed and area chart =========
  const mydata = [
      {
        name: "Page A",
        uv: 4000,
        pv: 2400,
        amt: 2400,
        ak: 5000,
      },
      {
        name: "Page B",
        uv: 3000,
        pv: 1398,
        amt: 2210,
        ak: 2300,
      },
      {
        name: "Page C",
        uv: 2000,
        pv: 9800,
        amt: 2290,
        ak: 2800,
      },
      {
        name: "Page D",
        uv: 2780,
        pv: 3908,
        amt: 2000,
        ak: 7000,
      },
      {
        name: "Page E",
        uv: 1890,
        pv: 4800,
        amt: 2181,
        ak: 9500,
      },
      {
        name: "Page F",
        uv: 2390,
        pv: 3800,
        amt: 2500,
        ak: 4000,
      },
      {
        name: "Page G",
        uv: 3490,
        pv: 4300,
        amt: 2100,
        ak: 2000,
      },
    ],
    // ================ All graphs customizatios ==============
    arrayofLines = [
      {
        dataKey: "value",
        type: "monotone",
        stroke: "#a16a38",
        strokeWidth: 3,
        legendType: "none",
      },
      {
        dataKey: "status",
        type: "monotone",
        stroke: "green",
        legendType: "none",
      },
    ],
    arrayofBars = [
      {
        dataKey: "uv",
        fill: "#413ea0",
      },
      {
        dataKey: "pv",
        fill: "#9bd4b0",
      },
    ],
    // ======== Area chart ==========
    arrayofArea = [
      {
        dataKey: "uv",
        type: "monotone",
        stroke: "red",
        fillOpacity: 1,
        fill: "url(#colorUv)", //id value from the areaGradiant object.
      },
      {
        dataKey: "pv",
        type: "monotone",
        stroke: "green",
        fillOpacity: 1,
        fill: "url(#colorPv)",
      },
    ],
    areaGradients = [
      {
        id: "colorPv",
        x1: "0",
        y1: "0",
        x2: "0",
        y2: "1",
        offset1: "5%",
        offset2: "95%",
        stopColor1: "#82ca9d",
        stopColor2: "#82ca9d",
        stopOpacity1: 0.8,
        stopOpacity2: 0,
      },
      {
        id: "colorUv",
        x1: "0",
        y1: "0",
        x2: "0",
        y2: "1",
        offset1: "5%",
        offset2: "95%",
        stopColor1: "#8884d8",
        stopColor2: "#8884d8",
        stopOpacity1: 0.8,
        stopOpacity2: 0,
      },
    ],
    composedGraphArray = [
      {
        areaType: "monotone",
        areaDataKey: "value",
        areaFill: "#8884d8",
        areaStroke: "#8884d8",
        barDataKey: "productIds",
        barSize: 20,
        barFill: "#413ea0",
        lineType: "monotone",
        lineDataKey: "totalItems",
        lineStroke: "#ff7300",
      },
    ],
    // ========data and customizations for pie chart==================
    arrayofPie = [
      {
        dataKey: "count",
        nameKey: "status",
        cx: "50%",
        cy: "50%",
        // "innerRadius":20,      //mention inner radius only if u want to make hollow at center
        outerRadius: 130, //outer radius should be greater than inner radius
        fill: "#8884d8",
        label: true,
        pieData: PieStatus,
      },
    ];

  // ======== data for treeMap========
  const treeData = [
    {
      name: "axis",
      children: [
        {
          name: "Axis",
          size: 24593,
        },
        {
          name: "Axes",
          size: 1302,
        },
        {
          name: "AxisGridLine",
          size: 652,
        },
        {
          name: "AxisLabel",
          size: 636,
        },
        {
          name: "CartesianAxes",
          size: 6703,
        },
      ],
    },
    {
      name: "controls",
      children: [
        {
          name: "TooltipControl",
          size: 8435,
        },
        {
          name: "SelectionControl",
          size: 7862,
        },
        {
          name: "PanZoomControl",
          size: 5222,
        },
        {
          name: "HoverControl",
          size: 4896,
        },
        {
          name: "ControlList",
          size: 4665,
        },
        {
          name: "ClickControl",
          size: 3824,
        },
        {
          name: "ExpandControl",
          size: 2832,
        },
        {
          name: "DragControl",
          size: 2649,
        },
        {
          name: "AnchorControl",
          size: 2138,
        },
        {
          name: "Control",
          size: 1353,
        },
        {
          name: "IControl",
          size: 763,
        },
      ],
    },
    {
      name: "data",
      children: [
        {
          name: "Data",
          size: 20544,
        },
        {
          name: "NodeSprite",
          size: 19382,
        },
        {
          name: "DataList",
          size: 19788,
        },
        {
          name: "DataSprite",
          size: 10349,
        },
        {
          name: "EdgeSprite",
          size: 3301,
        },
        {
          name: "render",
          children: [
            {
              name: "EdgeRenderer",
              size: 5569,
            },
            {
              name: "ShapeRenderer",
              size: 2247,
            },
            {
              name: "ArrowType",
              size: 698,
            },
            {
              name: "IRenderer",
              size: 353,
            },
          ],
        },
        {
          name: "ScaleBinding",
          size: 11275,
        },
        {
          name: "TreeBuilder",
          size: 9930,
        },
        {
          name: "Tree",
          size: 7147,
        },
      ],
    },
    {
      name: "events",
      children: [
        {
          name: "DataEvent",
          size: 7313,
        },
        {
          name: "SelectionEvent",
          size: 6880,
        },
        {
          name: "TooltipEvent",
          size: 3701,
        },
        {
          name: "VisualizationEvent",
          size: 2117,
        },
      ],
    },
    {
      name: "legend",
      children: [
        {
          name: "Legend",
          size: 20859,
        },
        {
          name: "LegendRange",
          size: 10530,
        },
        {
          name: "LegendItem",
          size: 4614,
        },
      ],
    },
    {
      name: "operator",
      children: [
        {
          name: "distortion",
          children: [
            {
              name: "Distortion",
              size: 6314,
            },
            {
              name: "BifocalDistortion",
              size: 4461,
            },
            {
              name: "FisheyeDistortion",
              size: 3444,
            },
          ],
        },
        {
          name: "encoder",
          children: [
            {
              name: "PropertyEncoder",
              size: 4138,
            },
            {
              name: "Encoder",
              size: 4060,
            },
            {
              name: "ColorEncoder",
              size: 3179,
            },
            {
              name: "SizeEncoder",
              size: 1830,
            },
            {
              name: "ShapeEncoder",
              size: 1690,
            },
          ],
        },
        {
          name: "filter",
          children: [
            {
              name: "FisheyeTreeFilter",
              size: 5219,
            },
            {
              name: "VisibilityFilter",
              size: 3509,
            },
            {
              name: "GraphDistanceFilter",
              size: 3165,
            },
          ],
        },
        {
          name: "IOperator",
          size: 1286,
        },
        {
          name: "label",
          children: [
            {
              name: "Labeler",
              size: 9956,
            },
            {
              name: "RadialLabeler",
              size: 3899,
            },
            {
              name: "StackedAreaLabeler",
              size: 3202,
            },
          ],
        },
        {
          name: "layout",
          children: [
            {
              name: "RadialTreeLayout",
              size: 12348,
            },
            {
              name: "NodeLinkTreeLayout",
              size: 12870,
            },
            {
              name: "CirclePackingLayout",
              size: 12003,
            },
            {
              name: "CircleLayout",
              size: 9317,
            },
            {
              name: "TreeMapLayout",
              size: 9191,
            },
            {
              name: "StackedAreaLayout",
              size: 9121,
            },
            {
              name: "Layout",
              size: 7881,
            },
            {
              name: "AxisLayout",
              size: 6725,
            },
            {
              name: "IcicleTreeLayout",
              size: 4864,
            },
            {
              name: "DendrogramLayout",
              size: 4853,
            },
            {
              name: "ForceDirectedLayout",
              size: 8411,
            },
            {
              name: "BundledEdgeRouter",
              size: 3727,
            },
            {
              name: "IndentedTreeLayout",
              size: 3174,
            },
            {
              name: "PieLayout",
              size: 2728,
            },
            {
              name: "RandomLayout",
              size: 870,
            },
          ],
        },
        {
          name: "OperatorList",
          size: 5248,
        },
        {
          name: "OperatorSequence",
          size: 4190,
        },
        {
          name: "OperatorSwitch",
          size: 2581,
        },
        {
          name: "Operator",
          size: 2490,
        },
        {
          name: "SortOperator",
          size: 2023,
        },
      ],
    },
  ];

  // Logic for monthwise filter of customer order---------------------------------------------------

  // const customerOrderData = data?.customerOrders?.list;

  const allmnthsData = ordersData?.map((eachOrder) => {
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
  // console.log("allmnthsData", allmnthsData);
  const orderBymnthsData = allmnthsData?.reverse();

  const selectMnthHandler = (e) => {
    const selectedmnth = e.target.value;
    setMonth(selectedmnth);
    // console.log(selectedmnth);
  };
  const selectYearHandler = (e) => {
    const selectedYear = e.target.value;
    setYear(selectedYear);
    // console.log(selectedYear);
  };

  const currentMnthData = orderBymnthsData?.filter(
    (order) =>
      order.orderMonth == currentMonth && order.orderYear == currentYear
  );
  // console.log(currentMnthData);

  //-----------------------------------------------------------------------
  return (
    <React.Fragment>
      <div className={styles.dashBoardContainer}>
        <div className={styles.chartRow}>
          <div className={styles.chartCol}>
            <select
              name="orderMonth"
              id="orderMonth"
              value={currentStatus}
              onChange={statusHandler}
              className={styles.dropdownContainer}
            >
              {orderStatus.map((order, i) => {
                return (
                  <option key={i} value={order}>
                    {order}
                  </option>
                );
              })}
            </select>
            {selectedStatus?.length == 0 ? (
              <div style={{ color: "red" }} className={styles.warningStatus}>
                {" "}
                <h2>
                  Sorry, there are no orders in{" "}
                  <span style={{ color: "blue" }}>{currentStatus}</span> status!
                </h2>
              </div>
            ) : (
              <div>
                <h3 className={styles.chartHeadings}>Orders</h3>

                <props.LineChartApp
                  data={selectedStatus}
                  height={300}
                  width="100%"
                  gridStrokeDasharray="5 5"
                  horizontalDataKey="orderId"
                  arrayofLines={arrayofLines}
                />
              </div>
            )}
          </div>

          <div className={styles.chartCol}>
            <div>
              <span>Filter By Year and Month : </span>
              <select
                name="orderYear"
                id="orderYear"
                value={currentYear}
                onChange={selectYearHandler}
                className={styles.dropdownContainer}
              >
                {yearNames.map((year, i) => {
                  return (
                    <option key={i} value={year}>
                      {year}
                    </option>
                  );
                })}
              </select>
              <select
                name="orderMonth"
                id="orderMonth"
                value={currentMonth}
                onChange={selectMnthHandler}
                className={styles.dropdownContainer}
              >
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
              <h2
                className={styles.noDataAlert}
                style={{ color: "red", textAlign: "center" }}
              >
                Sorry, there are no orders in {currentMonth}!
              </h2>
            )}
            {currentMnthData?.length !== 0 && (
              <div>
                <h3 className={styles.chartHeadings}>Customer Orders</h3>

                <props.LineChartApp
                  data={currentMnthData}
                  height={300}
                  width="100%"
                  gridStrokeDasharray="5 5"
                  horizontalDataKey="orderID"
                  arrayofLines={arrayofLines}
                />
              </div>
            )}
          </div>
        </div>
        <div className={styles.chartRow}>
          <div className={styles.chartCol}>
            <h3 className={styles.chartHeadings}>Composed Chart</h3>
            <props.ComposedChartApp
              height={300}
              width="100%"
              data={ordersData}
              horizontalDataKey="orderId"
              gridStrokeDasharray="5 5"
              composedGraphArray={composedGraphArray}
            />
          </div>
          <div className={styles.chartCol}>
            <h3 className={styles.chartHeadings}>Orders Status</h3>
            <props.PieChartApp
              arrayofPie={arrayofPie}
              height={300}
              width="100%"
              colors={COLORS}
            />
          </div>
        </div>
        <div className={styles.chartRow}>
          <div className={styles.chartCol}>
            <h3 className={styles.chartHeadings}>Area Chart</h3>
            <props.AreaChartApp
              height={300}
              width="100%"
              data={mydata}
              horizontalDataKey="name"
              gridStrokeDasharray="5 5"
              arrayofArea={arrayofArea}
              areaGradients={areaGradients}
            />
          </div>
          <div className={styles.chartCol}>
            <h3 className={styles.chartHeadings}>Bar Chart</h3>
            <props.BarChartApp
              data={mydata}
              height={300}
              width="100%"
              horizontalDataKey="name"
              gridStrokeDasharray="5 5"
              arrayofBars={arrayofBars}
            />
          </div>
        </div>
        <div className={styles.chartRow}>
          <div className={styles.chartCol}>
            <h3 className={styles.chartHeadings}>Tree Map</h3>
            <props.TreeMapApp
              data={treeData}
              height={300}
              width="100%"
              dataKey="size"
              ratio={4 / 3}
              stroke="#fff"
              fill="#8884d8"
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default ChartData;
