import React from 'react';
import { Chart } from "react-google-charts";

const Charts = (prop) => {

    return (
        <Chart
            chartType={prop.chart.chartType}
            data={prop.chart.data}
            options={prop.chart.options}
            width={200}
            height={200}
        />
    );
};

export default Charts;