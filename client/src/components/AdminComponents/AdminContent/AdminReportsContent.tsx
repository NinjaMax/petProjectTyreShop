import React, { useState } from 'react';
import '../../../css/AdminComponentCss/AdminContentCss/AdminReportContent.css';
import { Chart } from "react-google-charts";
import ButtonAction from '../../buttons/ButtonAction';
import { getPaynmentAllBydate, getSalesAllBydate } from '../../../restAPI/restAdminAPI';

type ProfitOverAll = {
    sumSalesAll: number;
    sumPayIncomeAll: number;
    sumPayOutcomeAll: number;
};

const AdminReportsContent = () => {
    const [activeTitle, setActiveTitle] = useState<string>('');
    const [dataProfitDate, setDataProfitDate] = useState<any [] | null>();
    const [dataProfitAllDate, setDataProfitAllDate] = useState<ProfitOverAll | null>();
    const [dataSalesDate, setDataSalesDate] = useState<any [] | null>();
    const [dateCondStart, setDateCondStart] = useState<string | null>();
    const [dateCondEnd, setDateCondEnd] = useState<string | null>();

    const activeChartSales = async () => {
        //try {
            if (dateCondStart && dateCondEnd) {
                if(String(activeTitle) === 'Продажі') {
                    const getSalesReport: any = await getSalesAllBydate(dateCondStart, dateCondEnd);
                    if (getSalesReport?.status === 200) {
                        const salesToChart: any[] = getSalesReport?.data.rows.map(
                        (entity: any) => ({date: new Date(entity.updatedAt).toLocaleDateString(), 
                            count: 1, countAll: getSalesReport?.data.count, total_cost: entity?.order?.total_cost ?? 0,                        })
                        ).sort((a: any, b: any) => a.date.localeCompare(b.date));
                        //console.log('SALES_TO_CHART: ', salesToChart);   
                        const reduceSalesCount = salesToChart.reduce(
                        (acc: any, item: any, index: any) => { 
                            acc[item.date] = (acc[item.date] || 0) + 1;
                            return acc;
                        }, {} 
                        );
                       
                        const getSales = Object.entries(reduceSalesCount);
                    
                        getSales.map((item: any) => item.push(getSalesReport?.data.count));

                        setDataSalesDate([
                            [
                                "Дата",
                                "Продажі",
                                "Продажі за весь період",
                            ],
                            ...getSales,
                        ]);
                    }
                }
                if (activeTitle === 'Прибуток') {
                    const getPaynment: any = await getPaynmentAllBydate(dateCondStart, dateCondEnd);
                    const getSalesReportProfit: any = await getSalesAllBydate(dateCondStart, dateCondEnd);
                    if (getPaynment?.status === 200 && getSalesReportProfit?.status === 200) {
                        const salesProfToChart: any[] = [...getPaynment?.data.rows, ...getSalesReportProfit?.data.rows].map(
                            (entity: any) => ({date: new Date(entity.updatedAt).toLocaleDateString(), 
                                count: 1, total_cost: entity?.order?.total_cost ?? 0,                        })
                            ).sort((a: any, b: any) => a.date.localeCompare(b.date));
                        const paynmentIn: any[] = getPaynment?.data.rows.filter((value: any) =>
                            value.id_paytype === 1
                        ).map((items: any) => ({date: new Date(items.createdAt).toLocaleDateString(), price: items.price})
                        ).sort((a: any, b: any) => a.date.localeCompare(b.date)); 
                        const paynmentOut: any[] = getPaynment?.data.rows.filter(
                            (values: any) => values.id_paytype === 2
                        ).map((items: any) => ({date: new Date(items.createdAt).toLocaleDateString(), 
                            price: items.price})).sort((a: any, b: any) => a.date.localeCompare(b.date)); 
                        const reduceSalesCount = salesProfToChart.reduce(
                            (acc: any, item: any, index: any) => { 
                                acc[item.date] = (acc[item.date] || 0) + item.total_cost;
                                    return acc;
                            }, {} 
                        );
                        const reducePaynmentIn = paynmentIn.reduce(
                            (acc: any, item: any) => { 
                                acc[item.date] = (acc[item.date] || 0) + item.price;
                                return acc;
                                }
                            , {} 
                        );
                        const reducePaynmentOut = paynmentOut.reduce(
                            (acc: any, item: any) => { 
                                acc[item.date] = (acc[item.date] || 0) + item.price;
                                return acc;
                            }
                            , {} 
                        );
                        const reducePaynmentinAll = paynmentIn.reduce(
                            (acc: any, item: any) => acc + item.price, 0
                        );
                        const reducePaynmentOutAll = paynmentOut.reduce(
                            (acc: any, item: any) => acc + item.price, 0
                        );
                        const reduceSalesnAll = salesProfToChart.reduce(
                            (acc: any, item: any) => acc + item.total_cost, 0
                        );
                       
                        const getSalesProfit: any[] = Object.entries(reduceSalesCount);
                        const getPaynmentIn: any[] = Object.entries(reducePaynmentIn);
                        const getPaynmentOut: any[] = Object.entries(reducePaynmentOut);
                
                        getSalesProfit.map((item: any, index: any) => 
                            getPaynmentOut?.find((entity: any) => entity?.[0] === item[0]) ? 
                            item.push(getPaynmentOut?.find((entity: any) => entity?.[0] === item[0])[1]) : 
                            item.push(0)
                        );
                        
                        getSalesProfit.map((item: any, index: any) => 
                            getPaynmentIn?.find((entity: any) => entity?.[0] === item[0]) ? 
                            item.push(getPaynmentIn?.find((entity: any) => entity?.[0] === item[0])[1]) : 
                            item.push(0)
                        );

                        setDataProfitDate([
                            [
                                "Дата",
                                "Продажі грн.",
                                "Витрати грн.",
                                "Надходження грн."
                            ],
                            ...getSalesProfit,
                        ]);
                        setDataProfitAllDate({
                            sumSalesAll: reduceSalesnAll, 
                            sumPayIncomeAll: reducePaynmentinAll,
                            sumPayOutcomeAll: reducePaynmentOutAll,
                        });
                    }
                }
                if (activeTitle === 'Залишки') {
                    const getSalesReportProfit: any = await getSalesAllBydate(dateCondStart, dateCondEnd);
                    if (getSalesReportProfit?.status === 200 && getSalesReportProfit?.status === 200) {
                        const salesProfToChart: any[] = getSalesReportProfit?.data.rows.map(
                            (entity: any) => ({date: new Date(entity.updatedAt).toLocaleDateString(), 
                                count: 1, countAll: getSalesReportProfit?.data.count, total_cost: entity?.order?.total_cost ?? 0,                        })
                            ).sort((a: any, b: any) => a.date.localeCompare(b.date));
                        const reduceSalesCount = salesProfToChart.reduce(
                            (acc: any, item: any, index: any) => { 
                                acc[item.date] = (acc[item.date] || 0) + item.total_cost;
                                return acc;
                            }, {} 
                        );
 
                        const getSales = Object.entries(reduceSalesCount);
                            
                        getSales.map((item: any) => item.push(getSalesReportProfit?.data.count));

                        setDataSalesDate([
                            [
                                "Дата",
                                "Продажі",
                                "Продажі за весь період",
                            ],
                                ...getSales,
                        ]);
                    }
                }
            } else {
                alert('НЕ ВИБРАНА ДАТА')
            }
        // } catch (error) {
        //     alert('ПОМИЛКА ПРИ ФОРМУВАННІ ЗВІТУ. НЕ ВІРНІ ДАННІ.');
        //     console.log('CREATE_SALES_REPORT_ERROR: ', error);
        // }
    };
    
    const optionsSales = {
        title: "Продажі (кількість) за період",
        сurveType: "function",
        legend: { position: "bottom" },
    };
    const optionsProfit = {
        title: "Продажі / Прибуток (грн) за період",
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
                { dataSalesDate || dataProfitDate ?
                <>
                {activeTitle === 'Продажі' && dataSalesDate ?
                    <div className='admChartsItem'>     
                        <Chart 
                            chartType="LineChart"
                            width="450px"
                            height="450px"
                            data={dataSalesDate}
                            options={optionsSales}
                        />
                    </div>  
                    : null
                }
                {activeTitle === 'Прибуток' && dataProfitDate ?
                    <div className='admChartsItem'> 
                        <div className='admChartsItemInTotal'>
                            <span>Всього продажі за період: {dataProfitAllDate?.sumSalesAll}</span>
                            <span>Всього надходження за період: {dataProfitAllDate?.sumPayIncomeAll}</span>
                            <span>Всього видатки за період: {dataProfitAllDate?.sumPayOutcomeAll}</span>
                            <span>Підсумок: {dataProfitAllDate?.sumPayIncomeAll! - dataProfitAllDate?.sumPayOutcomeAll!}</span>
                        </div>    
                        <Chart 
                            chartType="Bar"
                            width="480px"
                            height="450px"
                            data={dataProfitDate}
                            options={optionsProfit}
                        />
                    </div>  
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
                        value={dateCondStart ?? ''}
                        onChange={e => setDateCondStart(e.target.value)}
                    />
                    <input type='date'
                        value={dateCondEnd ?? ''}
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