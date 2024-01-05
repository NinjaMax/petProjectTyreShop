import React, { useState } from 'react';
import '../../../css/AdminComponentCss/AdminContentCss/AdminReportContent.css';
import { Chart } from "react-google-charts";
import ButtonAction from '../../buttons/ButtonAction';
import { getSalesAllBydate } from '../../../restAPI/restAdminAPI';

type IData = { 
    name: string; 
    chartType: string; 
    data: (string | number)[][]; 
    options: { title: string; subtitle?: undefined; }; 
    width: string; 
    height: string; 
}

type IResponse = { 
    version: number; 
    totalCharts: number; 
    charts: [ IData 
       // { name: string; chartType: string; data: (string | number)[][]; options: { title: string; subtitle?: undefined; }; width: string; height: string; }
    ]
}

type DateConditions = {date_start: string | null, date_end: string | null};

const AdminReportsContent = () => {
    const [activeTitle, setActiveTitle] = useState<string>('');
    const [dataSalesDate, setDataSalesDate] = useState<any [] | null>();
    const [dateCondStart, setDateCondStart] = useState<string>();
    const [dateCondEnd, setDateCondEnd] = useState<string>();
    //const [data, setData] = useState<IResponse | null>(null);

    //useEffect(() => {
    // let getData = true;

    // if(data && getData){
    //      setData(response);
    // }

    //   return () => { getData = false;}

    // }, [data]);
    const activeChartSales = async () => {
        try {
            if (dateCondStart && dateCondEnd) {
            console.log('CREATE_REPORT', dateCondStart, dateCondEnd);
            const getSalesReport: any = await getSalesAllBydate(dateCondStart, dateCondEnd);
            console.log('SALES_DATA: ', getSalesReport?.data);
                if (getSalesReport?.status === 200) {
                    const ordersToChart: any[] = getSalesReport?.data.rows.map(
                        (entity: any) => ({date: new Date(entity.updatedAt).toLocaleDateString(), 
                            count: 1, countAll: getSalesReport?.data.count})
                        ).sort((a: any, b: any) => a.date.localeCompare(b.date));
                
                    const reduceSalesCount = ordersToChart.reduce(
                        (acc: any, item: any, index: any) => { 
                            acc[item.date] = (acc[item.date] || 0) + 1;
                            //acc[item.date] = `${acc[item.date]},${item.countAll}`;
                            return acc;
                        }, {} 
                    );
                    console.log('REDUCE_SALES: ', reduceSalesCount);
                    const getSales = Object.entries(reduceSalesCount);
                    getSales.map((item: any) => item.push(getSalesReport?.data.count));
                    console.log('FOR_REPORT_SALES: ', getSales);
                    setDataSalesDate([
                        [
                            "Дата",
                            "Замовленя",
                            "Замовлення весь період"
                        ],
                        ...getSales,
                    ]);
                }
            } else {
                alert('НЕ ВИБРАНА ДАТА')
            }
        } catch (error) {
            alert('ПОМИЛКА ПРИ ФОРМУВАННІ ЗВІТУ. НЕ ВІРНІ ДАННІ.');
            console.log('CREATE_SALES_REPORT_ERROR: ', error);
        }
    };
    
    const optionsSales = {
        title: "Замовлення за період",
        сurveType: "function",
        legend: { position: "bottom" },
    };

    const chooseTitleReport = (e: any) => {
        setActiveTitle(e.target.textContent);
    };

    return (
        <div className='admReportContentBox'>
            <div className='admReportTitleList'
                onClick={chooseTitleReport}
            >
                <span className={
                    activeTitle === 'Продажі' ? 'admReportTitleListItem activeTitleReport' 
                    : 'admReportTitleListItem'}
                >Продажі</span>
                <span className={activeTitle === 'Прибуток' ? 'admReportTitleListItem activeTitleReport' 
                    : 'admReportTitleListItem'}
                >Прибуток</span>
                <span className={activeTitle === 'Залишки' ? 'admReportTitleListItem activeTitleReport' 
                    : 'admReportTitleListItem'}
                >Залишки</span>   
            </div>
            {activeTitle === 'Прибуток' ||
                activeTitle === 'Продажі' ||
                activeTitle === 'Залишки' ?
            <div className='admReportMain'>
                { dataSalesDate ?
                <>
                {activeTitle === 'Продажі' && dataSalesDate ?
                    <div className='admChartsItem'>     
                        <Chart 
                            chartType="LineChart"
                            width="500px"
                            height="500px"
                            data={dataSalesDate}
                            options={optionsSales}
                        />
                    </div>  
                    : null
                }
                {activeTitle === 'Прибуток' ?
                    <span>PROFIT CHART</span>
                    : null
                }
                {activeTitle === 'Залишки' ?
                    <span>REMAINDERS CHART</span>
                    : null
                }
                </>
                : <div className='admReportMainNoData'>
                    <i className='fas fa-chart-pie fa-10x'></i>
                    <i className='fas fa-chart-line fa-10x'></i>
                </div>
                }
                <div className='admReportMainInput'>
                    <input type='date'
                        onChange={e => setDateCondStart(e.target.value)}
                    />
                    <input type='date'
                        onChange={e => setDateCondEnd(e.target.value)
                        }
                    /> 
                </div>
                <ButtonAction 
                    eventItem={activeChartSales}
                    props={'СФОРМУВАТИ'}
                    widthBtn={150}
                />
            </div>
            : 
            <div className='admReportNoTitleList'>
                <i className='fas fa-chart-pie fa-10x'></i>
                <i className='fas fa-chart-line fa-10x'></i>
            </div>
            }
        </div>
    );
};

export default AdminReportsContent;