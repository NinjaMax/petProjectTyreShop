import React from 'react';
import { Chart } from "react-google-charts";

export const data = [
    ["Task", "Hours per Day"],
    ["Work", 11],
    ["Eat", 2],
    ["Commute", 2],
    ["Watch TV", 2],
    ["Sleep", 7],
  ];
  export const options = {
    title: "My Daily Activities",
  };

const Charts = (prop) => {

    return (
        <Chart
            chartType={prop.chart.chartType}
            data={prop.chart.data}
            options={prop.chart.options}
            width={'250px'}
            height={'175px'}
        />
    );
};

export default Charts;