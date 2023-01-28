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
                PROFILE
                PROFILE PHOTO
                USER NAME
            </div>
            <div className='leftColumn'>
                <AdminSideBar changeMenu={sideBarItemChange}/>
            </div>
            <div className='headerAdmin'>
                HEADER CHARTS
            </div>
            <div className='rightColumn'>
                {sideBarItem === 'golovna' ?
                    <AdminMainContent/>
                : null}
                {sideBarItem === 'catalog' ?
                    <AdminGoodsContent/>
                : null}
                {sideBarItem === 'zamovlenia' ?
                    <AdminOrderContent/>
                : null}
                {sideBarItem === 'prodagi' ?
                    <AdminSalesContent/>
                : null}
                {sideBarItem === 'zamovleniaPost' ?
                    <AdminOrderSupContent/>
                :null}
                {sideBarItem === 'kasi' ?
                    <AdminCashBoxContent/>
                : null}
                {sideBarItem === 'plategiVh' ?
                    <AdminPayIncomesContent/>
                : null}
                {sideBarItem === 'plategiVih' ?
                    <AdminPayExpensesContent/>
                : null}
                {sideBarItem === 'postachal' ?
                    <AdminSupplierContent/>
                : null}
                {sideBarItem === 'pokupci' ?
                    <AdminCustomersContent/>
                : null}
                {sideBarItem === 'koristuvachi' ?
                    <AdminUsersContent/>
                : null}
                {sideBarItem === 'zavantag' ?
                    <AdminUploaderContent/>
                : null}
                {sideBarItem === 'zviti' ?
                    <AdminReportsContent/>
                : null}
                {sideBarItem === 'nalashtuvania' ?
                    <AdminOptionContent/>
                : null} 
            </div>            
        </div>
    );
};

export default Admin;