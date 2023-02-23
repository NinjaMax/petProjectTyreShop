import React, {useEffect, useState} from 'react';
import '../css/Admin.css';
import axios from 'axios';
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
    const [sideBarItem, setSideBarItem] = useState("golovna");

    const [tyreData, setTyreData] = useState(null);
    const [wheelData, setWheelData] = useState(null);
    // const [oilData, setOildata] = useState(null);
    // const [batteryData, setBatteryData] = useState(null);
    const [customers, setCustomers] = useState(null);
    const [commentData, setCommentData] = useState(null);
    const [commentId, setCommentId] = useState(null);
    const [orderAllData, setOrderAllData] = useState(null);

  
    useEffect(() => {
        axios.get("http://localhost:4000/tyres", {
            headers: { 'Access-Control-Allow-Origin': 'http://localhost:3000'},
            withCredentials: true})
        .then(response => {
            setTyreData(response.data);
            //console.log(response.data);
        })
        .catch(error => {
          console.log(error)
        })

        axios.get("http://localhost:4000/wheels", {
            headers: { 'Access-Control-Allow-Origin': 'http://localhost:3000'},
            withCredentials: true})
        .then(response => {
            setWheelData(response.data);
            //console.log(response.data);
        })
        .catch(error => {
          console.log(error)
        })

        axios.get("http://localhost:4000/comments", {
            headers: { 'Access-Control-Allow-Origin': 'http://localhost:3000'},
            withCredentials: true,
            params: {id_comment: commentId}
        })
        .then(response => {
            setCommentData(response.data);
            console.log('COMMENTS',response.data);
        })
        .catch(error => {
          console.log(error)
        })

        axios.get("http://localhost:4000/orders/all", {
            headers: { 'Access-Control-Allow-Origin': 'http://localhost:3000'},
            withCredentials: true,
            //params: {id_comment: commentId}
        })
        .then(response => {
            setOrderAllData(response.data);
            //console.log('COMMENTS',response.data);
        })
        .catch(error => {
          console.log(error)
        })

        axios.get("http://localhost:4000/customers/all", {
            headers: { 'Access-Control-Allow-Origin': 'http://localhost:3000'},
            withCredentials: true})
        .then(response => {
            setCustomers(response.data);
            //console.log(response.data);
        })
        .catch(error => {
          console.log(error)
        })

    },[commentId])

    const sideBarItemChange = (e) => {
        setSideBarItem(e.target.value);
        console.log(e.target.value);
    }

    const showCommentData = (e) => {
        setCommentId(e.target.value);
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
                    <AdminMainContent />
                : null}
                {sideBarItem === 'catalog' ?
                    <AdminGoodsContent 
                        tyreData={tyreData} wheelData={wheelData}
                        customer={customers}
                        comments={commentData}/>
                : null}
                {sideBarItem === 'zamovlenia' ?
                    <AdminOrderContent 
                        showComment={showCommentData}
                        orders={orderAllData}
                        customer={customers} 
                        comments={commentData}/>
                : null}
                {sideBarItem === 'prodagi' ?
                    <AdminSalesContent />
                : null}
                {sideBarItem === 'zamovleniaPost' ?
                    <AdminOrderSupContent />
                :null}
                {sideBarItem === 'kasi' ?
                    <AdminCashBoxContent />
                : null}
                {sideBarItem === 'plategiVh' ?
                    <AdminPayIncomesContent />
                : null}
                {sideBarItem === 'plategiVih' ?
                    <AdminPayExpensesContent />
                : null}
                {sideBarItem === 'postachal' ?
                    <AdminSupplierContent />
                : null}
                {sideBarItem === 'pokupci' ?
                    <AdminCustomersContent 
                    customers={customers}/>
                : null}
                {sideBarItem === 'koristuvachi' ?
                    <AdminUsersContent />
                : null}
                {sideBarItem === 'zavantag' ?
                    <AdminUploaderContent />
                : null}
                {sideBarItem === 'zviti' ?
                    <AdminReportsContent />
                : null}
                {sideBarItem === 'nalashtuvania' ?
                    <AdminOptionContent />
                : null} 
            </div>            
        </div>
    );
};

export default Admin;