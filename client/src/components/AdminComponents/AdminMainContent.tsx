import React, {useState, useEffect} from 'react';
import '../../css/AdminComponentCss/AdminMainContent.css';
import responseCat from './dataCat.json';
import responseManger from './dataManager.json';
import responseSales from './dataSales.json';
import Charts from './adminModalForm/Chart';
import AdminComment from './adminContent/AdminComment';


interface IMainContent {
    comments: [] | null;
    version: number; 
    totalCharts: number; 
    charts: { name: string; chartType: string; data: (string | number)[][];
    options: { title: string; subtitle?: string;};
    width: string;
    height: string; }[]; 
}

const AdminMainContent = ({comments}: any) => {
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

    //console.log(comments);

    return (
        <div className='adminMainContent'>
            
            <div className='admMainContentOrders'>
                Останні замовлення
                <div className='admLastOrders'>
                    <div className='admLastOrdersItem'>
                        Користувачі  1250
                    </div>
                    <div className='admLastOrdersValue'>
                        Сума замовленя 13210
                    </div>
                </div>

            </div>
            <div className='admMainContentComments'>
                Останні коментарі користувачів
                <AdminComment
                    comments={comments?.splice(0, 4)}
                />
            </div>
            <div className='adminMainContentChart'>
                { dataOrders ?
                    dataOrders && dataOrders.charts.map((chartData, i) => ( 
                    <div className='admMainContentItem' key={i + 1}>     
                        <Charts chart={chartData} key={i + 1}/>
                    </div>     
                    ))
                    : <span>No charts available </span>
                } 
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
    );
};

export default AdminMainContent;