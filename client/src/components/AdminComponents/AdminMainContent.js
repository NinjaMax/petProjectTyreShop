import {React, useState, useEffect} from 'react';
import '../../css/AdminComponentCss/AdminMainContent.css';
import Charts from './AdminModalForm/Chart';
import responseCat from './dataCat.json';
import responseManger from './dataManager.json';
import responseSales from './dataSales.json';

const AdminMainContent = () => {

    const [dataCat, setDataCat] = useState(false);
    const [dataManager, setDataManager] =useState(false);
    const [dataSales, setDataSales] =useState(false);
    useEffect(() => {
      //if(data){
        setDataCat(responseCat);
        setDataManager(responseManger);
        setDataSales(responseSales);
      //}
    }, [dataCat, dataManager, dataSales]);

    return (
        <div className='adminMainContent'>
            
            <div className='admMainContentUsers'>
                USERS
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
            <div className='admMainContentOthers'>
                OTHERS
            </div>
            <div className='admMainContentComments'>
                COMMENTS
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
            <div>
                
            </div>
        </div>
    );
};

export default AdminMainContent;