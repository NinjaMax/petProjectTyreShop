import { GoogleChartTicks } from "react-google-charts";

export type IChartType = { 
    chart: { 
        chartType?: any; 
        data: {} | any[] | undefined; 
        options: Partial<{ [otherOptionKey: string]: any; 
            width: number; 
            height: number; 
            is3D: boolean; 
            title: string; 
            backgroundColor: string; 
            hAxis?: { [otherOptionKey: string]: any; 
                minValue?: any; 
                maxValue?: any; 
                ticks?: GoogleChartTicks | undefined; 
                title?: string | undefined; 
                viewWindow?: { 
                    max?: any; 
                    min?: any; 
                } | undefined; } | undefined; 
                vAxis?: { [otherOptionKey: string]: any; 
                    minValue?: any; 
                    maxValue?: any; 
                    ticks?: GoogleChartTicks | undefined; 
                    title?: string | undefined; 
                    viewWindow?: { 
                        max?: any; 
                        min?: any; 
                    } | undefined; } | undefined; 
                    legend: any; 
                    colors: string[]; }> | undefined; }; 
}