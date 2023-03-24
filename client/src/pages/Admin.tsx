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
        let isMounted = false;
         const fetchDataTyre = async () => {
            const result: any = await getTyres();
            //await getTyres().then(data => {
            if (!isMounted) {
                   //setTyreData(data.data) 
                setTyreData(result.data);
                       //console.log(result.data);
            }
        }

        fetchDataTyre();

        return () => {
            isMounted = true;
        };

    },[])

    useEffect(() =>{
        let isMounted = false;

        const fetchDataStockTyre = async () => {

            const result: any = await getStockTyres();
                    //await getTyres().then(data => {
                if (!isMounted) {
                        //setTyreData(data.data) 
                    setTyreStockData(result.data);
                        //console.log(result.data);
                }
            }

            fetchDataStockTyre();

            return () => {
                isMounted = true;
            };
    },[])

    useEffect(() =>{

        let isMounted = false;

        const fetchDataPriceTyre = async () => {

            const result: any = await getPriceTyres();
                    //await getTyres().then(data => {
                if (!isMounted) {
                        //setTyreData(data.data) 
                    setTyrePriceData(result.data);
                        //console.log(result.data);
                }
            }
    
            fetchDataPriceTyre();

            return () => {
                isMounted = true;
            };
    },[])

    useEffect(() => {

        let isMounted = false;

        const fetchDataWheel = async () => {

            const result: any = await getWheels();
                    //await getTyres().then(data => {
                if (!isMounted) {
                        //setTyreData(data.data) 
                    setWheelData(result.data);
                        //console.log(result.data);
                }
            }
    
            fetchDataWheel();

            return () => {
                isMounted = true;
            };
    },[])

    useEffect(() => {

        let isMounted = false;

        const fetchDataStockWheel = async () => {

            const result: any = await getStockWheel();
                    //await getTyres().then(data => {
                if (!isMounted) {
                        //setTyreData(data.data) 
                    setWheelStockData(result.data);
                        //console.log(result.data);
                }
            }
    
            fetchDataStockWheel();

            return () => {
                isMounted = true;
            };
    },[])

    useEffect(() => {

        let isMounted = false;

        const fetchDataPriceWheel = async () => {

            const result: any = await getPriceWheels();
                    //await getTyres().then(data => {
                if (!isMounted) {
                        //setTyreData(data.data) 
                    setWheelPriceData(result.data);
                        //console.log(result.data);
                }
            }
    
            fetchDataPriceWheel();

            return () => {
                isMounted = true;
            };

    },[])

    useEffect(() => {

        let isMounted = false;

        const fetchDataStorage = async () => {

            const result: any = await getStorageAll();
                    //await getTyres().then(data => {
                if (!isMounted) {
                    //setTyreData(data.data) 
                    setStorageAll(result.data);
                    //console.log(result.data);
                }
            }
    
            fetchDataStorage();

        return () => {
            isMounted = true;
        };

    },[])



    useEffect(() => {

        let isMounted = false;

        const fetchDataComment = async () => {

            const result: any = await getCommentData(commentId);
                    //await getTyres().then(data => {
                if (!isMounted) {
                    //setTyreData(data.data) 
                    setCommentData(result.data);
                    //console.log(result.data);
                }
            }
    
            fetchDataComment();

        return () => {
            isMounted = true;
        };
    },[commentId])

    useEffect(() => {

        let isMounted = false;

        const fetchDataOrder = async () => {

            const result: any = await getOrderData();
                    //await getTyres().then(data => {
                if (!isMounted) {
                    //setTyreData(data.data) 
                    setOrderAllData(result.data);
                    //console.log(result.data);
                }
            }
    
            fetchDataOrder();

        return () => {
            isMounted = true;
        };

    },[])
    
    useEffect(() => {

        let isMounted = false;

        const fetchDataCustomers = async () => {

            const result: any = await getCustomers();
                    //await getTyres().then(data => {
                if (!isMounted) {
                    //setTyreData(data.data) 
                    setCustomers(result.data);
                    //console.log(result.data);
                }
            }
    
            fetchDataCustomers();

        return () => {
            isMounted = true;
        };
    },[])

    const sideBarItemChange = async (e: any) => {
        setSideBarItem(e.target.value);
        console.log(e.target.value);
    }

    const showCommentData = async (e: {target: {value: React.SetStateAction<null>;};}) => {
        setCommentId(e.target.value);
    }

    // console.log(`http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/tyres`);
    // console.log('PORT: ',  process.env.REACT_APP_PORT)

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