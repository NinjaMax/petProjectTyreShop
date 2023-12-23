import React, {useContext, useEffect, useState} from 'react';
import '../css/Admin.css';
import { getTyresAdmin, 
        getWheelsAdmin, 
        getCommentOrderData,
        getOrderData,
        getCustomers, 
        getCommentOrderSupData,
        getSuppliers,
        getOrderSupData,
        getUsers,
        getStorageAll,
        getCashboxAll,
        getAllIncomesPay,
        getAllExpensesPay,
        getAllPayTypes,
        getAllPayViews
    } from '../restAPI/restAdminAPI';
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
    const [wheelData, setWheelData] = useState(null);
    const [orderSupAllData, setOrderSupAllData] = useState(null);
    const [users, setUsers] = useState(null);
    const [suppliers, setSuppliers] = useState(null);
    const [sales, setSales] = useState(null);
    const [cashBoxAll, setCashBoxAll] = useState(null);
    const [payIncomes, setPayIncomes] = useState(null);
    const [payExpenses, setPayExpenses] = useState(null);
    const [customers, setCustomers] = useState(null);
    const [commentOrder, setCommentOrder] = useState(null);
    const [commentOrderSup, setCommentOrderSup] = useState(null);
    const [orderAllData, setOrderAllData] = useState(null);
    const [storageAll, setStorageAll] = useState(null);
    const [payTypes, setPayTypes] = useState<any[] | null>(null);
    const [payViews, setPayViews] = useState<any[] | null>(null);
  
    useEffect(()=> {
        let isMounted = false;
            const postTask = async () => {
                const tasks:any[] = [
                    getUsers,
                    getOrderSupData,
                    getSuppliers,
                    getTyresAdmin,
                    getWheelsAdmin,
                    getStorageAll,
                    getOrderData,
                    getCustomers,
                    getCashboxAll,
                    getAllIncomesPay,
                    getAllExpensesPay,
                    getAllPayTypes,
                    getAllPayViews
                ]
                let i: number = 0;
                while(tasks.length > i) {
                //for (let i = 0; tasks.length > i; i++) {
                    if (!isMounted && tasks[i] === getTyresAdmin) {    
                        let resultTyre: any = await tasks[i]();
                        setTyreData(resultTyre?.data);
                    }
                    if (!isMounted && tasks[i] === getWheelsAdmin) {   
                        let resultWheels: any = await tasks[i]();
                        setWheelData(resultWheels?.data);
                    } 
                    if(!isMounted && tasks[i] === getStorageAll) {
                        let resultStorage: any = await tasks[i]();
                        setStorageAll(resultStorage?.data);
                    } 
                    if (!isMounted && tasks[i] === getOrderData) {
                        let resultOrder: any = await tasks[i]();
                        setOrderAllData(resultOrder?.data);
                    }
                    if (!isMounted && tasks[i] === getOrderSupData) {
                        let resultOrderSup: any = await tasks[i]();
                        setOrderSupAllData(resultOrderSup?.data);
                    } 
                    if (!isMounted && tasks[i] === getCustomers) {
                        let resultCustomers: any = await tasks[i]();
                        setCustomers(resultCustomers?.data);
                    }
                    if (!isMounted && tasks[i] === getUsers) {
                        let resultUsers: any = await tasks[i]();
                        setUsers(resultUsers?.data);
                    }  
                    if (!isMounted && tasks[i] === getSuppliers) {
                        let resultSuppliers: any = await tasks[i]();
                        setSuppliers(resultSuppliers?.data);
                    }
                    if (!isMounted && tasks[i] === getCashboxAll) {
                        let resultCashbox: any = await tasks[i]();
                        setCashBoxAll(resultCashbox?.data);
                    }
                    if (!isMounted && tasks[i] === getAllIncomesPay) {
                        let resultPayIncomes: any = await tasks[i]();
                        setPayIncomes(resultPayIncomes?.data);
                    }
                    if (!isMounted && tasks[i] === getAllExpensesPay) {
                        let resultExpenses: any = await tasks[i]();
                        setPayExpenses(resultExpenses?.data);
                    }
                    if (!isMounted && tasks[i] === getAllPayTypes) {
                        let resultPayTypes: any = await tasks[i]();
                        setPayTypes(resultPayTypes?.data);
                    }
                    if (!isMounted && tasks[i] === getAllPayViews) {
                        let resultPayViews: any = await tasks[i]();
                        setPayViews(resultPayViews?.data);
                    }

                    const task = tasks.shift();
                    // Run the task:
                    task();
                    await yieldToMain();   
                }
            }
            postTask();
        return () => {
            isMounted = true;
        };
    },[])

    const sideBarItemChange = async (e: any) => {
        if (e.target?.value) {
            setSideBarItem(e.target.value);  
        }
        //console.log(e.target.value);
    }

    const showCommentOrder = async (e: any) => {
        try {
            if (e.currentTarget?.getAttribute('data-value')){
                const resultComOrder = await getCommentOrderData(+e.currentTarget?.getAttribute('data-value'));
                if (resultComOrder?.data?.length !== 0) {
                    setCommentOrder(resultComOrder?.data);  
                } else {
                    setCommentOrder(null);  
                }
            } else {
                setCommentOrder(null); 
            }
        } catch (error) {
            console.log('ERROR_ORDER_COMMENTS_DATA: ', error);
        }
    };

    const showCommentOrderSup = async (e: any) => {
        try {
            if (e.currentTarget?.getAttribute('data-value')){
                let resultComOrderSup: any = await getCommentOrderSupData(e.currentTarget?.getAttribute('data-value'));
                if (resultComOrderSup?.data?.length !== 0) {
                    setCommentOrderSup(resultComOrderSup?.data);
                } else {
                    setCommentOrderSup(null);
                }
            } 
        } catch (error) {
            console.log('ERROR_ORDER_SUP_COMMENTS_DATA: ', error);    
        }
    };
    // console.log('USERS: ', users);
    // console.log('CUSTOMERS: ',customers);
    //console.log('ORDERS: ', orderAllData);

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
                        props={[tyreData, wheelData]}
                        customer={customers}
                        comments={commentOrder}
                        storage={storageAll}
                        showComment={showCommentOrder}  
                    />
                : null}
                {sideBarItem === 'zamovlenia' ?
                    <AdminOrderContent 
                        props={[tyreData,wheelData]}
                        showComment={showCommentOrder}
                        orders={orderAllData}
                        customer={customers} 
                        comments={commentOrder}
                        storage={storageAll}
                        suppliers={suppliers} 
                    />
                : null}
                {sideBarItem === 'prodagi' ?
                    <AdminSalesContent 
                        sales={sales}
                    />
                : null}
                {sideBarItem === 'zamovleniaPost' ?
                    <AdminOrderSupContent 
                        props={[tyreData, wheelData]}
                        supplier={suppliers} 
                        comments={commentOrderSup}
                        storage={storageAll}
                        ordersSup={orderSupAllData}
                        showComment={showCommentOrderSup}
                    />
                :null}
                {sideBarItem === 'kasi' ?
                    <AdminCashBoxContent 
                        cashboxData={cashBoxAll}
                    />
                : null}
                {sideBarItem === 'plategiVh' ?
                    <AdminPayIncomesContent 
                        payIncomes={payIncomes}
                        payTypes={payTypes} 
                        payViews={payViews}
                    />
                : null}
                {sideBarItem === 'plategiVih' ?
                    <AdminPayExpensesContent 
                        payExpenses={payExpenses}
                        payTypes={payTypes} 
                        payViews={payViews}
                    />
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
