import React from 'react';
import { Chart } from "react-google-charts";
import { IChartType } from './types/Chart.type';

const Charts = (prop: IChartType) => {

    return (
        <Chart
            chartType={prop?.chart?.chartType}
            data={prop.chart.data}
            options={prop.chart.options}
            width={300}
            height={288}
        />
    );
};

export default Charts;