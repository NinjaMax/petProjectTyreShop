import React, {useState, useEffect} from 'react';
import Charts from '../adminModalForm/Chart';
import response from '../data.json';

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

const AdminReportsContent = () => {

        //const [show, setShow] = useState(false);
        const [data, setData] = useState<IResponse | null>(null);

        useEffect(() => {
            let getData = true;

          if(data && getData){
                setData(response as IResponse);
          }

          return () => { getData = false;}

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