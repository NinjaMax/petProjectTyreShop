import {React, useEffect, useState} from 'react';
import '../../css/AdminComponentCss/AdminHeader.css';
import Charts from './AdminModalForm/Chart';
import response from './data.json';

const AdminHeader = () => {

    //const [show, setShow] = useState(false);
    const [data, setData] = useState(false);
    useEffect(() => {
      //if(data){
        setData(response)
      //}
    }, [data]);

    return (    
        <div className='adminHeader'>
            { data ?
                <div className='admChartsItem'>
                    { data && data.charts.map((chartData, i) => (
                        <Charts chart={chartData} key={i}/>
                    ))}
                </div>
                 :
            <span>No charts available </span>
            }
        </div>
    );
};

export default AdminHeader;