import React, { useState } from "react";
import { Tabs, Tab } from "vtex.styleguide";

const AnalyticsReports = () => {
  const [state, setState] = useState({ currentTab: 1 });
  return (
    <>
      <div>
        <Tabs fullWidth>
          <Tab
            label="Acquisition Overview"
            active={state.currentTab === 1}
            onClick={() => setState({ currentTab: 1 })}
          >
            <iframe
              width="100%"
              height="1200"
              src="https://datastudio.google.com/embed/reporting/8363458b-87ad-44be-a4e9-604f571ee178/page/nXDGB"
              frameborder="0"
              style={{ border: 0 }}
            ></iframe>
          </Tab>
          <Tab
            label="Audience Overview"
            active={state.currentTab === 2}
            onClick={() => setState({ currentTab: 2 })}
          >
            <iframe
              width="100%"
              height="1200px"
              src="https://datastudio.google.com/embed/reporting/46f2fc92-d894-42ad-892b-36ac4dd69c40/page/tWDGB"
              frameborder="0"
              style={{ border: 0 }}
            ></iframe>
          </Tab>
          <Tab
            label="Behaviors Overview"
            active={state.currentTab === 3}
            onClick={() => setState({ currentTab: 3 })}
          >
            <iframe
              width="100%"
              height="1200px"
              src="https://datastudio.google.com/embed/reporting/ba021017-2686-495f-be59-dc35e2a8c86f/page/4VDGB"
              frameborder="0"
              style={{ border: 0 }}
            ></iframe>
          </Tab>
        </Tabs>
      </div>
    </>
  );
};

export default AnalyticsReports;
