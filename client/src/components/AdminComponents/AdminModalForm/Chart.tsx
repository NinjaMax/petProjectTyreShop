import React from 'react';
import { Chart, GoogleChartTicks } from "react-google-charts";

const Charts = (prop: { chart: { chartType?: any; data: {} | any[] | undefined; options: Partial<{ [otherOptionKey: string]: any; width: number; height: number; is3D: boolean; title: string; backgroundColor: string; hAxis?: { [otherOptionKey: string]: any; minValue?: any; maxValue?: any; ticks?: GoogleChartTicks | undefined; title?: string | undefined; viewWindow?: { max?: any; min?: any; } | undefined; } | undefined; vAxis?: { [otherOptionKey: string]: any; minValue?: any; maxValue?: any; ticks?: GoogleChartTicks | undefined; title?: string | undefined; viewWindow?: { max?: any; min?: any; } | undefined; } | undefined; legend: any; colors: string[]; }> | undefined; }; }) => {

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