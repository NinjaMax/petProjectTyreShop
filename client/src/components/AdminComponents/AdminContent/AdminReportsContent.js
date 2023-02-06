import {React, useState, useEffect} from 'react';
import Charts from '../AdminModalForm/Chart';
import response from '../data.json';

const AdminReportsContent = () => {

        //const [show, setShow] = useState(false);
        const [data, setData] = useState(false);
        useEffect(() => {
          //if(data){
            setData(response)
          //}
        }, [data]);

    return (
        <div>
            <div className='adminHeader'>
                { data ?
                
                    data && data.charts.map((chartData, i) => ( 
                    <div className='admChartsItem' key={i + 1}>     
                        <Charts chart={chartData} key={i + 1}/>
                    </div>     
                    ))
                
                : <span>No charts available </span>
                } 
            </div> 
             
        </div>
    );
};

export default AdminReportsContent;