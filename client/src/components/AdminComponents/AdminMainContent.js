import {React, useState, useEffect} from 'react';
import '../../css/AdminComponentCss/AdminMainContent.css';
import Charts from './AdminModalForm/Chart';
import response from './dataMain.json';

const AdminMainContent = () => {

    const [data, setData] = useState(false);
    useEffect(() => {
      //if(data){
        setData(response)
      //}
    }, [data]);

    return (
        <div className='adminMainContent'>
            
            <div className='admMainContentItem'>
                USERS
            </div>
            <div className='admMainContentItem'>
                CHART
            </div>
            <div className='admMainContentItem'>
                OTHERS
            </div>
            <div className='adminMainContentChart'>
                { data ?
                
                    data && data.charts.map((chartData, i) => ( 
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