import React from 'react';
import '../../css/AdminComponentCss/AdminHeader.css';
//import Charts from './AdminModalForm/Chart';
//import response from './data.json';

const AdminHeader = () => {

 

    return (    
        <div className='adminHeader'>
            <div className='admChartsOrders'>
                <div className='admChartsOrderI'>
                    <i className="fas fa-clipboard-list"></i>   
                </div> 
                <div className='admChartOrdersItem'>
                    <div>Замовлень </div>   
                    <span className='admChartsOrdersCount'>1250</span> 
                    <div>Нові </div>
                    <div className='admChartsOrdersNew'>
                        <span>98</span>
                    </div>      
                </div>   
            </div>
            <div className='admChartsSales'> 
                <div className='admChartsSalesI'>
                    <i className="fas fa-donate"></i>
                </div>    
                <div className='admChartSalesItem'>
                    <div>Продажів</div>
                    <span className='admChartsSalesCount'>1000 </span>
                    <div className='admChartsSalesNew'>
                        <span>12.5%</span>  
                    </div>       
                </div>    
            </div> 
            <div className='admChartsBill'> 
                <div className='admChartBillItem'>
                    <i className="fas fa-money-bill-alt"></i>    
                </div>
                <div className='admChartBillI'>
                    <div>Продажі сьогодні</div>
                    <div>
                        <span>10000 <i className="fas fa-hryvnia"></i></span>
                    </div>  
                </div> 
            </div> 
        </div>  
    );
};

export default AdminHeader;