import React from "react";
import { ResponsiveBar } from "@nivo/bar";

import data from "../../data/data";
import config from "./chart_config";

import "./chart.css";

class Chart extends React.Component {
  render() {
    return (
      <div className="chart" style={{ width: "450px", height: "400px" }}>
        <ResponsiveBar
          data={data}
          keys={config.keys}
          indexBy="year"
          margin={config.margin}
          padding={0.3}
          colorBy="id"
          defs={config.defs}
          fill={config.fill}
          borderColor="inherit:darker(1.6)"
          axisTop={null}
          axisRight={null}
          axisBottom={config.axisBottom}
          axisLeft={config.axisLeft}
          labelSkipWidth={12}
          labelSkipHeight={12}
          labelTextColor="inherit:darker(1.6)"
          animate={true}
          motionStiffness={90}
          motionDamping={15}
          legends={config.legends}
        />
      </div>
    );
  }
}

export default Chart;
