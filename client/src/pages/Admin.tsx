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
        getCustomers } from '../restAPI/restAdminAPI';
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
    // const [ordeSupAllData, setOrderSupAlldata] = useState(null);
    // const [usersAllData, setUsersAllData] = useState(null);
    // const [supplierAll, setSupplierAll] = useState(null);
    // const [cashBoxAll, setCashBoxAll] = useState(null);
    // const [payIncomesAll, setPayIncomeAll] = useState(null);
    // const [payExpenseAll, setPayExpenseAll] = useState(null);
    const [customers, setCustomers] = useState(null);
    const [commentData, setCommentData] = useState(null);
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
                       // console.log('TYRE DATA', result.data )
                    }

                    if(!isMounted && tasks[i] === getStockTyres) {
                        let result: any = await tasks[i]();
                        setTyreStockData(result.data);
                        //console.log('TYRE STOCK DATA', result.data )
                    } 
                    
                    if(!isMounted && tasks[i] === getPriceTyres) {   
                        let result: any = await tasks[i]();
                        setTyrePriceData(result.data);
                        //console.log('TYRE PRICE DATA', result.data )
                    } 
                    
                    if(!isMounted && tasks[i] === getWheels) {   
                        let result: any = await tasks[i]();
                        setWheelData(result.data);
                        //console.log('WHEELS DATA', result.data )
                    } 
                    
                    if(!isMounted && tasks[i] === getStockWheel) {
                        let result: any = await tasks[i]();
                        setWheelStockData(result.data);
                        //console.log('WHEELS STOCK DATA', result.data )
                    } 
                    
                    if(!isMounted && tasks[i] === getStorageAll) {
                        let result: any = await tasks[i]();
                        setStorageAll(result?.data);
                        //console.log('STORAGE DATA', result.data )
                    } 
                    
                    if(!isMounted && tasks[i] === getPriceWheels) {
                        let result: any = await tasks[i]();
                        setWheelPriceData(result.data);
                        //console.log('WHEELS PRICE DATA', result.data )
                    } 
                    
                    if(!isMounted && tasks[i] === getOrderData) {
                        let result: any = await tasks[i]();
                        setOrderAllData(result?.data);
                        //console.log('ORDERS DATA', result.data )
                    } 
                    
                    if(!isMounted && tasks[i] === getCustomers) {
                        let result: any = await tasks[i]();
                        setCustomers(result.data);
                        //console.log('CUSTOMERS DATA', result.data )
                    } 

                    if(!isMounted && tasks[i] === getCommentOrderData) {
                        //if (commentByOrder) {
                            let result: any = await tasks[i](commentByOrder);
                            setCommentData(result?.data);  
                        //}
                        //console.log('COMMENTS DATA', result.data )
                    } 
                    const task = tasks.shift();
                    // Run the task:
                    task();
                    //i++;
                    await yieldToMain()   
                }
            }
            postTask();
        return () => {
            isMounted = true;
        };
    },[commentByOrder])

    const sideBarItemChange = async (e: any) => {
        setSideBarItem(e.target.value);
        console.log(e.target.value);
    }

    const showCommentOrderData = async (e: any) => {
        if (+e.currentTarget?.getAttribute('data-value') !== 0) {
            setCommentByOrder(+e.currentTarget?.getAttribute('data-value'));
            console.log('COMMIT_BY_ID_ORDER_IF: ', e.currentTarget?.getAttribute('data-value'));
        } else {
            setCommentByOrder(0);
          console.log('COMMIT_BY_ID_ORDER_ELSE: ', e.currentTarget?.getAttribute('data-value'));  
        }
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
                        props={[tyreData, tyreStockData, tyrePriceData,
                            wheelData, wheelPriceData, wheelStockData]}
                        customer={customers}
                        comments={commentData}
                        storage={storageAll}
                        showComment={showCommentOrderData}  
                        />
                : null}
                {sideBarItem === 'zamovlenia' ?
                    <AdminOrderContent 
                        props={[tyreData, tyreStockData, tyrePriceData,
                            wheelData, wheelPriceData, wheelStockData]}
                        showComment={showCommentOrderData}
                        orders={orderAllData}
                        customer={customers} 
                        comments={commentData}
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
                        customer={customers} 
                        comments={commentData}
                        storage={storageAll}
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
                    <AdminSupplierContent />
                : null}
                {sideBarItem === 'pokupci' ?
                    <AdminCustomersContent 
                    customer={customers}/>
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
});

export default Admin;
