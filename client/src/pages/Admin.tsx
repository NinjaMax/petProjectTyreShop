import React, {useContext, useEffect, useState} from 'react';
import '../css/Admin.css';
//import axios from 'axios';
import { getTyres, 
        getStockTyres, 
        getPriceTyres, 
        getWheels, 
        getStockWheel,
        getStorageAll,
        getPriceWheels,
        getCommentOrderData,
        getOrderData,
        getCustomers, 
        getCommentOrderSupData,
        getSuppliers,
        getOrderSupData,
        getUsers} from '../restAPI/restAdminAPI';
import { yieldToMain } from '../restAPI/postTaskAdmin';
import { observer } from 'mobx-react-lite';
import { Context } from '../context/Context';
import AdminHeader from '../components/adminComponents/AdminHeader';
import AdminMainContent from '../components/adminComponents/AdminMainContent';
import AdminProfile from '../components/adminComponents/AdminProfile';
import AdminSideBar from '../components/adminComponents/AdminSideBar';
import AdminCashBoxContent from '../components/adminComponents/adminContent/AdminCashBoxContent';
import AdminCustomersContent from '../components/adminComponents/adminContent/AdminCustomersContent';
import AdminGoodsContent from '../components/adminComponents/adminContent/AdminGoodsContent';
import AdminOptionContent from '../components/adminComponents/adminContent/AdminOptionContent';
import AdminOrderContent from '../components/adminComponents/adminContent/AdminOrderContent';
import AdminOrderSupContent from '../components/adminComponents/adminContent/AdminOrderSupContent';
import AdminPayExpensesContent from '../components/adminComponents/adminContent/AdminPayExpensesContent';
import AdminPayIncomesContent from '../components/adminComponents/adminContent/AdminPayIncomesContent';
import AdminReportsContent from '../components/adminComponents/adminContent/AdminReportsContent';
import AdminSalesContent from '../components/adminComponents/adminContent/AdminSalesContent';
import AdminSupplierContent from '../components/adminComponents/adminContent/AdminSupplierContent';
import AdminUploaderContent from '../components/adminComponents/adminContent/AdminUploaderContent';
import AdminUsersContent from '../components/adminComponents/adminContent/AdminUsersContent';
//import { postTask } from '../restAPI/postTaskAdmin';
//import { scheduler } from 'timers/promises';

//import { StockTyre } from './interfaces/stockTyre.interface';

//interface IAdmin {
    // data?: [];
    // result?: void | any;
    //props:[[], ...[][]];
    // customer?:[] | null;
    // comments?:[] | null;
    // storage?:[] | null;
    // sideBarItem?: string;
    // tyreData?:[] | null;
    // tyreStockData?:[] | null;
    // tyrePriceData?:[] | null;
    // wheelData?:[] | null;
    // wheelStockData?:[] | null;
    // wheelPriceData?:[] | null;
    // customers?:[] | null;
    // commentData?:[] | null;
    // commentId?:[] | null;
    // orderAllData?:[] | null;
    // storageAll?:[] | null;
    //result.data: [];
//}

const Admin = observer(() => {
    const {user} = useContext<any | null>(Context);
    const [sideBarItem, setSideBarItem] = useState("golovna");
    const [tyreData, setTyreData] = useState(null);
    const [tyreStockData, setTyreStockData] = useState(null);
    const [tyrePriceData, setTyrePriceData] = useState(null);
    const [wheelData, setWheelData] = useState(null);
    const [wheelStockData, setWheelStockData] = useState(null);
    const [wheelPriceData, setWheelPriceData] = useState(null);
    // const [oilData, setOildata] = useState(null);
    // const [oilStockData, setOilStockData] = useState(null);
    // const [oilPriceData, setOilPriceData] = useState(null);
    // const [batteryData, setBatteryData] = useState(null);
    // const [batteryStockData, setBatteryStockData] = useState(null);
    // const [batteryPriceData, setBatteryPriceData] = useState(null);
    const [orderSupAllData, setOrderSupAllData] = useState(null);
    const [users, setUsers] = useState(null);
    const [suppliers, setSuppliers] = useState(null);
    // const [cashBoxAll, setCashBoxAll] = useState(null);
    // const [payIncomesAll, setPayIncomeAll] = useState(null);
    // const [payExpenseAll, setPayExpenseAll] = useState(null);
    const [customers, setCustomers] = useState(null);
    const [commentOrder, setCommentOrder] = useState(null);
    const [commentOrderSup, setCommentOrderSup] = useState(null);
    const [commentByOrderSup, setCommentByOrderSup] = useState<number>(0);
    const [commentByOrder, setCommentByOrder] = useState<number>(0);
    const [orderAllData, setOrderAllData] = useState(null);
    const [storageAll, setStorageAll] = useState(null);
  
    useEffect(()=> {
        let isMounted = false;
            const postTask = async() => {
                const tasks:any[] = [
                    //addGoodsToOrder,
                    //createGoodsToOrder,
                    //responseForm,
                    getUsers,
                    getOrderSupData,
                    getSuppliers,
                    getTyres,
                    getStockTyres,
                    getPriceTyres,
                    getWheels,
                    getStockWheel,
                    getPriceWheels,
                    getStorageAll,
                    getCommentOrderData,
                    getOrderData,
                    getCustomers
                ]
                let i: number = 0;
                while(tasks.length > i) {
                //for (let i = 0; tasks.length > i; i++) {
                    if(!isMounted && tasks[i] === getTyres) {    
                        let result: any = await tasks[i]();
                        setTyreData(result.data);
                    }
                    if(!isMounted && tasks[i] === getStockTyres) {
                        let result: any = await tasks[i]();
                        setTyreStockData(result.data);
                    } 
                    if(!isMounted && tasks[i] === getPriceTyres) {   
                        let result: any = await tasks[i]();
                        setTyrePriceData(result.data);
                    } 
                    if(!isMounted && tasks[i] === getWheels) {   
                        let result: any = await tasks[i]();
                        setWheelData(result.data);
                    } 
                    if(!isMounted && tasks[i] === getStockWheel) {
                        let result: any = await tasks[i]();
                        setWheelStockData(result.data);
                    } 
                    if(!isMounted && tasks[i] === getStorageAll) {
                        let result: any = await tasks[i]();
                        setStorageAll(result?.data);
                    } 
                    if(!isMounted && tasks[i] === getPriceWheels) {
                        let result: any = await tasks[i]();
                        setWheelPriceData(result.data);
                    } 
                    if(!isMounted && tasks[i] === getOrderData) {
                        let result: any = await tasks[i]();
                        setOrderAllData(result?.data);
                    }
                    if(!isMounted && tasks[i] === getOrderSupData) {
                        let result: any = await tasks[i]();
                        setOrderSupAllData(result?.data);
                    } 
                    if(!isMounted && tasks[i] === getCustomers) {
                        let result: any = await tasks[i]();
                        setCustomers(result.data);
                    }
                    if(!isMounted && tasks[i] === getUsers) {
                        let result: any = await tasks[i]();
                        setUsers(result.data);
                    }  
                    if(!isMounted && tasks[i] === getSuppliers) {
                        let result: any = await tasks[i]();
                        setSuppliers(result.data);
                    }
                    if(!isMounted && tasks[i] === getCommentOrderData) {
                        let result: any = await tasks[i](commentByOrder);
                        setCommentOrder(result?.data);  
                    }
                    if(!isMounted && tasks[i] === getCommentOrderSupData) {
                        let result: any = await tasks[i](commentByOrderSup);
                        setCommentOrderSup(result?.data);
                    }
                    const task = tasks.shift();
                    // Run the task:
                    task();
                    await yieldToMain()   
                }
            }
            postTask();
        return () => {
            isMounted = true;
        };
    },[commentByOrder, commentByOrderSup])

    const sideBarItemChange = async (e: any) => {
        setSideBarItem(e.target.value);
        console.log(e.target.value);
    }

    const showCommentOrder = async (e: any) => {
        if (e.target.value) {
            setCommentByOrder(+e.target.value);
        } 
        if (e.target.value === '0') {
            setCommentByOrder(0); 
        }
        if (e.currentTarget?.getAttribute('data-value')){
            setCommentByOrder(+e.currentTarget?.getAttribute('data-value'));
        } 
        if (e.currentTarget?.getAttribute('data-value') === '0') {
            setCommentByOrder(0); 
        }
    }

    const showCommentOrderSup = async (e: any) => {
        if (e.target.value) {
            setCommentByOrderSup(+e.target.value);
        } 
        if (e.target.value === '0') {
            setCommentByOrderSup(0); 
        }
        if (e.currentTarget?.getAttribute('data-value')){
            setCommentByOrderSup(+e.currentTarget?.getAttribute('data-value'));
        } 
        if (e.currentTarget?.getAttribute('data-value') === '0') {
            setCommentByOrderSup(0); 
        }
    }
    console.log('USERS: ', users);
    console.log('CUSTOMERS: ',customers);
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
                        props={[tyreData, tyreStockData, tyrePriceData,
                            wheelData, wheelPriceData, wheelStockData]}
                        customer={customers}
                        comments={commentOrder}
                        storage={storageAll}
                        showComment={showCommentOrder}  
                        />
                : null}
                {sideBarItem === 'zamovlenia' ?
                    <AdminOrderContent 
                        props={[tyreData, tyreStockData, tyrePriceData,
                            wheelData, wheelPriceData, wheelStockData]}
                        showComment={showCommentOrder}
                        orders={orderAllData}
                        customer={customers} 
                        comments={commentOrder}
                        storage={storageAll}
                    />
                : null}
                {sideBarItem === 'prodagi' ?
                    <AdminSalesContent />
                : null}
                {sideBarItem === 'zamovleniaPost' ?
                    <AdminOrderSupContent 
                        props={[tyreData, tyreStockData, tyrePriceData,
                            wheelData, wheelPriceData, wheelStockData]}
                        supplier={suppliers} 
                        comments={commentOrderSup}
                        storage={storageAll}
                        ordersSup={orderSupAllData}
                        showComment={showCommentOrderSup}
                    />
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
                    <AdminSupplierContent
                        suppliers={suppliers}
                    />
                : null}
                {sideBarItem === 'pokupci' ?
                    <AdminCustomersContent 
                        customers={customers}
                    />
                : null}
                {sideBarItem === 'koristuvachi' ?
                    <AdminUsersContent 
                            users={users}
                    />
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
});

export default Admin;
