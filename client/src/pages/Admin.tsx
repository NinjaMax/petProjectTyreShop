import { Suspense, lazy, useEffect, useState} from 'react';
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
        getAllPayViews,
        getSalesAll,
        getAllLastComment
    } from '../restAPI/restAdminAPI';
import { yieldToMain } from '../restAPI/postTaskAdmin';
import { observer } from 'mobx-react-lite';
import SpinnerCarRot from '../components/spinners/SpinnerCarRot';

const AdminHeader = lazy(() => import('../components/adminComponents/AdminHeader'));
const AdminMainContent = lazy(() => import('../components/adminComponents/AdminMainContent'));
const AdminProfile = lazy(() => import('../components/adminComponents/AdminProfile'));
const AdminSideBar = lazy(() => import('../components/adminComponents/AdminSideBar'));
const AdminCashBoxContent = lazy(() => import('../components/adminComponents/adminContent/AdminCashBoxContent'));
const AdminCustomersContent = lazy(() => import('../components/adminComponents/adminContent/AdminCustomersContent'));
const AdminGoodsContent = lazy(() => import('../components/adminComponents/adminContent/AdminGoodsContent'));
const AdminOptionContent = lazy(() => import('../components/adminComponents/adminContent/AdminOptionContent'));
const AdminOrderContent = lazy(() => import('../components/adminComponents/adminContent/AdminOrderContent'));
const AdminOrderSupContent = lazy(() => import('../components/adminComponents/adminContent/AdminOrderSupContent'));
const AdminPayExpensesContent = lazy(() => import('../components/adminComponents/adminContent/AdminPayExpensesContent'));
const AdminPayIncomesContent = lazy(() => import('../components/adminComponents/adminContent/AdminPayIncomesContent'));
const AdminReportsContent = lazy(() => import('../components/adminComponents/adminContent/AdminReportsContent'));
const AdminSalesContent = lazy(() => import('../components/adminComponents/adminContent/AdminSalesContent'));
const AdminSupplierContent = lazy(() => import('../components/adminComponents/adminContent/AdminSupplierContent'));
const AdminUploaderContent = lazy(() => import('../components/adminComponents/adminContent/AdminUploaderContent'));
const AdminUsersContent = lazy(() => import('../components/adminComponents/adminContent/AdminUsersContent'));

const Admin = observer(() => {
    const [sideBarItem, setSideBarItem] = useState<string>("golovna");
    const [tyreData, setTyreData] = useState(null);
    const [wheelData, setWheelData] = useState(null);
    const [orderSupAllData, setOrderSupAllData] = useState(null);
    const [users, setUsers] = useState(null);
    const [suppliers, setSuppliers] = useState(null);
    const [sales, setSales] = useState<[] | null>(null);
    const [cashBoxAll, setCashBoxAll] = useState(null);
    const [payIncomes, setPayIncomes] = useState(null);
    const [payExpenses, setPayExpenses] = useState(null);
    const [customers, setCustomers] = useState(null);
    const [commentOrder, setCommentOrder] = useState(null);
    const [commentOrderSup, setCommentOrderSup] = useState(null);
    const [orderAllData, setOrderAllData] = useState<[] | null>(null);
    const [storageAll, setStorageAll] = useState(null);
    const [payTypes, setPayTypes] = useState<any[] | null>(null);
    const [payViews, setPayViews] = useState<any[] | null>(null);
    const [lastComments, setLastComments] = useState<any[] | null>(null);
  
    useEffect(()=> {
        let isMounted = false;
            const postTask = async () => {
                const tasks:any[] = [
                    getAllLastComment,
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
                    getAllPayViews,
                    getSalesAll,
                ]
                let i: number = 0;
                while(tasks.length > i) {
                //for (let i = 0; tasks.length > i; i++) {
                    if (!isMounted && tasks[i] === getAllLastComment) {
                        let resultLastComm: any = await tasks[i]();
                        setLastComments(resultLastComm?.data);
                    }
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
                    if (!isMounted && tasks[i] === getSalesAll) {
                        let resultSales: any = await tasks[i]();
                        setSales(resultSales?.data);
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

    return (
        <div className='adminPageMain'>
            <Suspense fallback={<SpinnerCarRot/>}>
            <div className='profileAdmin'>
                <AdminProfile/>
            </div>
            <div className='leftColumn'>
                <AdminSideBar 
                    changeMenuItem={sideBarItem}
                    changeMenu={sideBarItemChange}
                />
            </div>
            <div className='headerAdmin'>
                <AdminHeader 
                    orderOverall={orderAllData?.length} 
                    orderNew={orderAllData?.filter((item: any) => item?.status === 'Новий').length} 
                    salesOverAll={sales?.length} 
                    salesToday={sales?.filter((item: any) => 
                        new Date(item.updatedAt).toLocaleDateString() === new Date().toLocaleDateString())}                    
                />
            </div>
            <div className='rightColumn'>
                {sideBarItem === 'golovna' ?
                    <AdminMainContent
                        orders={orderAllData}
                        comments={lastComments}
                    />
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
                        cashBoxes={cashBoxAll}
                    />
                : null}
                {sideBarItem === 'plategiVih' ?
                    <AdminPayExpensesContent 
                        payExpenses={payExpenses}
                        payTypes={payTypes} 
                        payViews={payViews}
                        cashBoxes={cashBoxAll}
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
            </Suspense>            
        </div>
    );
});

export default Admin;
