import React from 'react';
import '../../css/AdminComponentCss/AdminHeader.css';

type AdminHeaderType = {
    orderOverall: number | undefined | null;
    orderNew: number | undefined | null;
    salesOverAll: number | undefined | null;
    salesToday: any[] | undefined | null;
};

const AdminHeader = ({orderOverall, orderNew, salesOverAll, salesToday}: AdminHeaderType) => {

    const salesPercent: string | null = ((salesOverAll!/orderOverall!) * 100).toFixed(1);
    const getSalesToday = salesToday?.reduce((sum: any, current: any) => sum + current.order.total.cost, 0); 

    return (    
        <div className='adminHeader'>
            <div className='admChartsOrders'>
                <div className='admChartsOrderI'>
                    <i className="fas fa-clipboard-list"></i>   
                </div> 
                <div className='admChartOrdersItem'>
                    <div>Замовлень </div>   
                    <span className='admChartsOrdersCount'>{orderOverall ?? 0}</span> 
                    <div>Нові </div>
                    <div className='admChartsOrdersNew'>
                        <span>{orderNew ?? 0}</span>
                    </div>      
                </div>   
            </div>
            <div className='admChartsSales'> 
                <div className='admChartsSalesI'>
                    <i className="fas fa-donate"></i>
                </div>    
                <div className='admChartSalesItem'>
                    <div>Продажів</div>
                    <span className='admChartsSalesCount'>{salesOverAll ?? 0}</span>
                    <div className='admChartsSalesNew'>
                        <span>{salesPercent !== 'NaN' ? salesPercent : 0} %</span>  
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
                        <span>{getSalesToday ?? 0} <i className="fas fa-hryvnia"></i></span>
                    </div>  
                </div> 
            </div> 
        </div>  
    );
};

export default AdminHeader;