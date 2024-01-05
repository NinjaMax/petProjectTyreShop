import React, {useState, useEffect} from 'react';
import '../../css/AdminComponentCss/AdminMainContent.css';
import { Chart } from "react-google-charts";
import AdminComment from './adminContent/AdminComment';
import SpinnerCarRot from '../spinners/SpinnerCarRot';

type AdminMainContent = {
    comments: any [] | null;
    orders: any [] | null;
};

interface IMainContent {
    comments: [] | null;
    version: number; 
    totalCharts: number; 
    charts: { name: string; chartType: string; data: (string | number)[][];
    options: { title: string; subtitle?: string;};
    width: string;
    height: string; }[]; 
}

const AdminMainContent = ({comments, orders}: AdminMainContent) => {
    //const [lastComments, setLastComments] = useState<[] | null>();
    const [dataOrder, setDataOrder] = useState<any>();
    const [orderOptions, setOrderOptions] = useState<any>();
    const [dataByManager, setDataByManager] =useState<any>();
    const [byManagerOptions, setByManagerOptions] =useState<any>();

    // useEffect(() => {
    //   //if(data){
    //     setDataCat(responseCat);
    //     setDataManager(responseManger);
    //     setDataOrders(responseSales);
    //   //}
    // }, [dataCat, dataManager, dataOrders]);

    const ordersData: any[] = [
        {createdAt: '2023-12-27T12:44:54.721Z', user: {name: 'Max'}, total_cost: 10624},
        {createdAt: '2023-12-26T10:44:54.721Z', user: {name: 'Артем'}, total_cost: 21624},
        {createdAt: '2023-12-26T09:44:54.721Z', user: {name: 'Max'}, total_cost: 20000},
        {createdAt: '2023-12-26T13:44:54.721Z', user: {name: 'Артем'}, total_cost: 15020},
        {createdAt: '2023-12-25T12:40:54.721Z', user: {name: 'Артем'}, total_cost: 10224},
        {createdAt: '2023-12-25T12:04:54.721Z', user: {name: 'Max'}, total_cost: 8216},
        {createdAt: '2023-12-24T12:14:50.721Z', user: {name: 'Max'}, total_cost: 9604},
        {createdAt: '2023-12-23T12:14:50.721Z', user: {name: 'Max'}, total_cost: 21000},
        {createdAt: '2023-12-22T12:14:50.721Z', user: {name: 'Max'}, total_cost: 7524},
        {createdAt: '2023-12-21T12:14:50.721Z', user: {name: 'Max'}, total_cost: 11124},
    ];
    useEffect(() => {
        if (orders) {
            const ordersToChart: any[] = orders!.slice(0, 70).map(
                (entity: any) => ({date: new Date(entity.createdAt).toLocaleDateString(), count: 1})
                ).sort((a: any, b: any) => a.date.localeCompare(b.date));
        
            const reduceOrderCount = ordersToChart.reduce(
                (acc: any, item: any) => { 
                    acc[item.date] = (acc[item.date] || 0) + 1;
                    return acc;
                }, {} 
            );
            const getOrders = Object.entries(reduceOrderCount);
    
            setDataOrder([
                [
                "Дата",
                "Замовленя",
                ],
                ...getOrders
            ]);
            setOrderOptions({
                title: "Замовлення за останні дні",
                сurveType: "function",
                legend: { position: "bottom" },
            });
            const ordersByManToChart: any[] = orders!.slice(0, 70).map(
                (entity: any) => (
                    {date: new Date(entity.createdAt).toLocaleDateString(), 
                        count: 1, 
                        user_name: entity.user.name,
                        total_cost: entity.total_cost
                    }));
            const reduceCostByManCount = ordersByManToChart.reduce(
                (acc: any, item: any, index: any) => 
                    { 
                    acc[item.user_name] = (acc[item.user_name] || 0) + item.total_cost;
                    return acc;
                    }
                , {} 
            );

            const getOrdersByMan = Object.entries(reduceCostByManCount);
            setDataByManager([
                [
                    "Менеджер",
                    "Сума",
                ],
                ...getOrdersByMan
            ]);
            setByManagerOptions({
                title: "Замовлення за останні дні",
                legend: { position: "bottom" },
            });
        }
    }, [orders]);

    return (
        <div>
            {comments && orders ?
            <div className='adminMainContent'>
                <div className='admMainContentOrders'>
                Останні замовлення
                {/* <div className='admLastOrdersTitle'>
                    <span>Замовлення:</span>
                    <span>Дата:</span>
                    <span>Покупець:</span>
                    <span>Місто:</span>
                    <span>Сума замовлення:</span>
                </div> */}
                {orders ? orders.slice(0, 6).map((item: any) =>
                <div className='admLastOrders' key={item.id_order}>
                    {/* <div className='admLastOrdersItem'>
                        {item.id_order}
                    </div> */}
                    <div className='admLastOrdersItem'>
                        {new Date(item.createdAt).toLocaleString()}
                    </div>
                    <div className='admLastOrdersItem'>
                        {item.customer.name}
                    </div>
                    <div className='admLastOrdersItem'>
                         {item.delivery_city}
                    </div>
                    <div className='admLastOrdersValue'>
                        {item.total_cost}
                    </div>
                </div>
                )
                : <span>Немає даних</span>
                }
                </div>
                <div className='admMainContentComments'>
                Останні коментарі користувачів
                <AdminComment
                    main={true}
                    comments={comments}
                />
                </div>
                <div className='adminMainContentChart'>
                    {dataOrder ?
                    <Chart
                        chartType="LineChart"
                        width="100%"
                        height="280px"
                        data={dataOrder}
                        options={orderOptions}
                    />
                    : null
                    }
                </div>
                <div className='admMainContentMetric'>
                    <div className='admMainContentItem'>  
                    {dataByManager ? 
                    <Chart
                        chartType="Bar"
                        width="100%"
                        height="280px"
                        data={dataByManager}
                        options={byManagerOptions}
                    /> 
                    : null
                    }
                    </div> 
                </div> 
            </div>
            : <SpinnerCarRot/>
            }
        </div>
    );
};

export default AdminMainContent;