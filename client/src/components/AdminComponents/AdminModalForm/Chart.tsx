import React from 'react';
import { Chart } from "react-google-charts";

const Charts = (prop) => {

    return (
        <Chart
            chartType={prop.chart.chartType}
            data={prop.chart.data}
            options={prop.chart.options}
            width={300}
            height={288}
        />
    );
};

export default Charts;