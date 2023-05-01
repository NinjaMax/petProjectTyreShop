import React, {useState, useEffect} from 'react';
import '../../css/AdminComponentCss/AdminMainContent.css';
import responseCat from './dataCat.json';
import responseManger from './dataManager.json';
import responseSales from './dataSales.json';
import Charts from './adminModalForm/Chart';


interface IMainContent {
    version: number; 
    totalCharts: number; 
    charts: { name: string; chartType: string; data: (string | number)[][];
    options: { title: string; subtitle?: string;};
    width: string;
    height: string; }[]; 
}

const AdminMainContent = () => {

    const [dataCat, setDataCat] = useState<IMainContent>();
    const [dataManager, setDataManager] =useState<IMainContent>();
    const [dataSales, setDataSales] =useState<IMainContent>();
    useEffect(() => {
      //if(data){
        setDataCat(responseCat);
        setDataManager(responseManger);
        setDataSales(responseSales);
      //}
    }, [dataCat, dataManager, dataSales]);

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
                <div className='admLastComment'>
                    <div className='admLastCommentItem'>Замовлення 1025: Миколай 02.03.2023: Перший коментар.</div>
                    <div className='admLastCommentItem'>Замовлення 1023: Миколай 02.03.2023: Другийкоментар.</div>
                    <div className='admLastCommentItem'>Замовлення 1025: Миколай 02.03.2023: Третій коментар.</div>
                </div>
            </div>
            <div className='adminMainContentChart'>
                { dataSales ?
                
                dataSales && dataSales.charts.map((chartData, i) => ( 
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