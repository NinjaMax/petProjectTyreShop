import React, {useEffect, useState} from 'react';
import '../css/Admin.css';
//import axios from 'axios';
import { getTyres, 
        getStockTyres, 
        getPriceTyres, 
        getWheels, 
        getStockWheel,
        getStorageAll,
        getPriceWheels,
        getCommentData,
        getOrderData,
        getCustomers } from '../restAPI/restAdminAPI';
import AdminSideBar from '../components/AdminComponents/AdminSideBar';
import AdminMainContent from '../components/AdminComponents/AdminMainContent';
import AdminGoodsContent from '../components/AdminComponents/adminContent/AdminGoodsContent';
import AdminOrderContent from '../components/AdminComponents/adminContent/AdminOrderContent';
import AdminSalesContent from '../components/AdminComponents/adminContent/AdminSalesContent';
import AdminOrderSupContent from '../components/AdminComponents/adminContent/AdminOrderSupContent';
import AdminCashBoxContent from '../components/AdminComponents/adminContent/AdminCashBoxContent';
import AdminPayIncomesContent from '../components/AdminComponents/adminContent/AdminPayIncomesContent';
import AdminPayExpensesContent from '../components/AdminComponents/adminContent/AdminPayExpensesContent';
import AdminSupplierContent from '../components/AdminComponents/adminContent/AdminSupplierContent';
import AdminCustomersContent from '../components/AdminComponents/adminContent/AdminCustomersContent';
import AdminUsersContent from '../components/AdminComponents/adminContent/AdminUsersContent';
import AdminUploaderContent from '../components/AdminComponents/adminContent/AdminUploaderContent';
import AdminReportsContent from '../components/AdminComponents/adminContent/AdminReportsContent';
import AdminOptionContent from '../components/AdminComponents/adminContent/AdminOptionContent';
import AdminProfile from '../components/AdminComponents/AdminProfile';
import AdminHeader from '../components/AdminComponents/AdminHeader';
import { yieldToMain } from '../restAPI/postTaskAdmin';
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


const Admin = () => {

    const [sideBarItem, setSideBarItem] = useState("golovna");
    const [tyreData, setTyreData] = useState<[] | null>(null);
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
    const [commentId, setCommentId] = useState(null);
    const [orderAllData, setOrderAllData] = useState(null);
    const [storageAll, setStorageAll] = useState(null);

  
    useEffect(()=> {
        //const getAllTyre = getTyres();
        // let isMounted = false;
        //  const fetchDataTyre = async () => {
        //     const result: any = await getTyres();
        //     //await getTyres().then(data => {
        //     if (!isMounted) {
        //            //setTyreData(data.data) 
        //         setTyreData(result.data);
        //                //console.log(result.data);
        //     }
        // }
    
        // fetchDataTyre();


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
                    getStorageAll,
                    getPriceWheels,
                    getCommentData,
                    getOrderData,
                    getCustomers
                ]
                

                for (let i = 0; tasks.length > i; i++) {
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
                        setStorageAll(result.data);
                    } 
                    
                    if(!isMounted && tasks[i] === getPriceWheels) {
                       
                        let result: any = await tasks[i]();
                        setWheelPriceData(result.data);
                    } 
                    
                    if(!isMounted && tasks[i] === getOrderData) {
                        
                        let result: any = await tasks[i]();
                        setOrderAllData(result.data);
                    } 
                    
                    if(!isMounted && tasks[i] === getCustomers) {
                       
                        let result: any = await tasks[i]();
                        setCustomers(result.data);
                    } 

                    if(!isMounted && tasks[i] === getCommentData) {
                       
                        let result: any = await tasks[i](commentId);
                        setCommentData(result.data);
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

    },[commentId])

    

    const sideBarItemChange = async (e: any) => {
        setSideBarItem(e.target.value);
        console.log(e.target.value);
    }

    const showCommentData = async (e: {target: {value: React.SetStateAction<null>;};}) => {
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
                        props={[tyreData, tyreStockData, tyrePriceData,
                            wheelData, wheelPriceData, wheelStockData]}
                        customer={customers}
                        comments={commentData}
                        storage={storageAll}  
                        />
                : null}
                {sideBarItem === 'zamovlenia' ?
                    <AdminOrderContent 
                        props={[tyreData, tyreStockData, tyrePriceData,
                            wheelData, wheelPriceData, wheelStockData]}
                        showComment={showCommentData}
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
};

export default Admin;
