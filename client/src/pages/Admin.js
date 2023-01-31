import {React, useState} from 'react';
import '../css/Admin.css';
import AdminSideBar from '../components/AdminComponents/AdminSideBar';
import AdminMainContent from '../components/AdminComponents/AdminMainContent';
import AdminGoodsContent from '../components/AdminComponents/AdminContent/AdminGoodsContent';
import AdminOrderContent from '../components/AdminComponents/AdminContent/AdminOrderContent';
import AdminSalesContent from '../components/AdminComponents/AdminContent/AdminSalesContent';
import AdminOrderSupContent from '../components/AdminComponents/AdminContent/AdminOrderSupContent';
import AdminCashBoxContent from '../components/AdminComponents/AdminContent/AdminCashBoxContent';
import AdminPayIncomesContent from '../components/AdminComponents/AdminContent/AdminPayIncomesContent';
import AdminPayExpensesContent from '../components/AdminComponents/AdminContent/AdminPayExpensesContent';
import AdminSupplierContent from '../components/AdminComponents/AdminContent/AdminSupplierContent';
import AdminCustomersContent from '../components/AdminComponents/AdminContent/AdminCustomersContent';
import AdminUsersContent from '../components/AdminComponents/AdminContent/AdminUsersContent';
import AdminUploaderContent from '../components/AdminComponents/AdminContent/AdminUploaderContent';
import AdminReportsContent from '../components/AdminComponents/AdminContent/AdminReportsContent';
import AdminOptionContent from '../components/AdminComponents/AdminContent/AdminOptionContent';
import AdminProfile from '../components/AdminComponents/AdminProfile';
import AdminHeader from '../components/AdminComponents/AdminHeader';

const Admin = () => {
    useState()
    const [sideBarItem, setSideBarItem] = useState("golovna");
  
    const sideBarItemChange = (e) => {
        setSideBarItem(e.target.value);
        console.log(e.target.value);
    }

    return (
        <div className='adminPageMain'>
            <div className='profileAdmin'>
                <AdminProfile/>
            </div>
            <div className='leftColumn'>
                <AdminSideBar changeMenu={sideBarItemChange}/>
            </div>
            <div className='headerAdmin'>
                <AdminHeader/>
            </div>
            <div className='rightColumn'>
                {sideBarItem === 'golovna' ?
                    <AdminMainContent changeMenu={sideBarItemChange}/>
                : null}
                {sideBarItem === 'catalog' ?
                    <AdminGoodsContent changeMenu={sideBarItemChange}/>
                : null}
                {sideBarItem === 'zamovlenia' ?
                    <AdminOrderContent changeMenu={sideBarItemChange}/>
                : null}
                {sideBarItem === 'prodagi' ?
                    <AdminSalesContent changeMenu={sideBarItemChange}/>
                : null}
                {sideBarItem === 'zamovleniaPost' ?
                    <AdminOrderSupContent changeMenu={sideBarItemChange}/>
                :null}
                {sideBarItem === 'kasi' ?
                    <AdminCashBoxContent changeMenu={sideBarItemChange}/>
                : null}
                {sideBarItem === 'plategiVh' ?
                    <AdminPayIncomesContent changeMenu={sideBarItemChange}/>
                : null}
                {sideBarItem === 'plategiVih' ?
                    <AdminPayExpensesContent changeMenu={sideBarItemChange}/>
                : null}
                {sideBarItem === 'postachal' ?
                    <AdminSupplierContent changeMenu={sideBarItemChange}/>
                : null}
                {sideBarItem === 'pokupci' ?
                    <AdminCustomersContent changeMenu={sideBarItemChange}/>
                : null}
                {sideBarItem === 'koristuvachi' ?
                    <AdminUsersContent changeMenu={sideBarItemChange}/>
                : null}
                {sideBarItem === 'zavantag' ?
                    <AdminUploaderContent changeMenu={sideBarItemChange}/>
                : null}
                {sideBarItem === 'zviti' ?
                    <AdminReportsContent changeMenu={sideBarItemChange}/>
                : null}
                {sideBarItem === 'nalashtuvania' ?
                    <AdminOptionContent changeMenu={sideBarItemChange}/>
                : null} 
            </div>            
        </div>
    );
};

export default Admin;