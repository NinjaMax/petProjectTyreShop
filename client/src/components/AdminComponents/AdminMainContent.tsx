import React, {useState, useEffect} from 'react';
import '../../css/AdminComponentCss/AdminMainContent.css';
import { Chart } from "react-google-charts";
import responseCat from './dataCat.json';
import responseManger from './dataManager.json';
import responseSales from './dataSales.json';
import Charts from './adminModalForm/Chart';
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
    const [lastComments, setLastComments] = useState<[] | null>();
    const [dataCat, setDataCat] = useState<IMainContent>();
    const [dataManager, setDataManager] =useState<IMainContent>();
    const [dataOrders, setDataOrders] =useState<IMainContent>();

    // useEffect(() => {
    //   //if(data){
    //     setDataCat(responseCat);
    //     setDataManager(responseManger);
    //     setDataOrders(responseSales);
    //   //}
    // }, [dataCat, dataManager, dataOrders]);
    const ordersData: any[] = [
        {createdAt: '2023-12-27T12:44:54.721Z'},
        {createdAt: '2023-12-26T10:44:54.721Z'},
        {createdAt: '2023-12-26T09:44:54.721Z'},
        {createdAt: '2023-12-26T13:44:54.721Z'},
        {createdAt: '2023-12-25T12:40:54.721Z'},
        {createdAt: '2023-12-25T12:04:54.721Z'},
    ]



    const ordersToChart: any[] = ordersData!.map((entity: any) => ({date: new Date(entity.createdAt).toLocaleDateString(), count: 1}));
    const filteredOrdersDate = ordersToChart?.map((entity: any, index) => 
    entity.date === (new Date(ordersData[index].createdAt).toLocaleDateString()) ? entity.count + 1 : null)
    const getOrders = [
        ...ordersToChart,
        ['28.12.2023', 1],
        ['28.12.2023', 1],
        ['28.12.2023', 1],
        ['29.12.2023', 1],
        ['29.12.2023', 1],
    ]
    console.log('ORDER_DATA_CHART: ', filteredOrdersDate);

    const data = [
        [
          "Дата",
          "Замовленя",
        ],
        ...getOrders
      ];
    const options = {
        title: "Замовлення за останні дні",
        сurveType: "function",
        legend: { position: "bottom" },
      };
    //console.log(comments);

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
                <div className='admLastOrders'>
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
                    <Chart
                        chartType="LineChart"
                        width="100%"
                        height="280px"
                        data={data}
                        options={options}
                    />
                {/* { dataOrders ?
                    dataOrders && dataOrders.charts.map((chartData, i) => ( 
                    <div className='admMainContentItem' key={i + 1}>     
                        <Charts chart={chartData} key={i + 1}/>
                    </div>     
                    ))
                    : <span>No charts available </span>
                }  */}
                </div>
                <div className='admMainContentMetric'>
                { dataManager ?
                    dataManager && dataManager.charts.map((chartData, i) => ( 
                    <div className='admMainContentItem' key={i + 1}>     
                        <Charts chart={chartData} key={i + 1}/>
                    </div>     
                ))
                : <span>No charts available </span>
                } 
                </div> 
            </div>
            : <SpinnerCarRot/>
            }
        </div>
    );
};

export default AdminMainContent;