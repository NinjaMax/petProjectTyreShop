import React, {useEffect, useState} from 'react';
import '../css/Admin.css';
import axios from 'axios';
import { getTyres } from '../restAPI/restAdminAPI';
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

interface IAdmin {
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
}


const Admin = () => {

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
    const [commentId, setCommentId] = useState(null);
    const [orderAllData, setOrderAllData] = useState(null);
    const [storageAll, setStorageAll] = useState(null);

  
    useEffect(()=> {
        //const getAllTyre = getTyres();
        let isMounted = false;
         const fetchData = async () => {
        //    await getTyres();

            //if (isMounted) {
                //setTyreData(['sdfsdfsdf']); 
                //console.log(
                    //const getTyres = async () => 
                    //{
                    ///const allTyres = async () =>
                    //try {
                    // await axios.get(`http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/tyres`, {
                    //     headers: { 'Access-Control-Allow-Origin': `${process.env.CORS}`},
                    //     withCredentials: true})
                    // .then(response => { 
                    //     //Object.assign()
                    //     //setTyreData(response.data);
                    //     //console.log(response.data);
                    //     if (!isMounted) {
                    //         setTyreData(response.data) 
                    //     }
                        
                    // })
                    // .catch(error => {
                    //  console.log(error)
                    // })
                const result: any = await getTyres();
                //await getTyres().then(data => {
                    if (!isMounted) {
                       //setTyreData(data.data) 
                       setTyreData(result.data);
                       //console.log(result.data);
                    }
                //});
            }
                //getTyres().then(data => console.log(data.data))
                //console.log(getTyres())
                //   );
            //}
        //}

        fetchData();
        //getAllTyre.then(data => setTyreData(data.data));
            //);
        return () => {
            isMounted = true;
        };

    },[])

    // useEffect(() =>{

    // },[])
    
    // useEffect(() =>{
        
    // },[])

    useEffect(() =>{
        axios.get(`http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/stock/tyres/all`, {
            headers: { 'Access-Control-Allow-Origin': `${process.env.CORS}`},
            withCredentials: true,
            //params: {id_tyre: itemIdTyre}
        })
        .then(response => {
            setTyreStockData(response.data);
            //console.log('STOCK TYRE: ',response.data)
        })
        .catch(error => {
          console.log(error)
        });
    },[])

    useEffect(() =>{
        axios.get(`http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/price/tyres/all`, {
            headers: { 'Access-Control-Allow-Origin': `${process.env.CORS}`},
            withCredentials: true,
            //params: {id_tyre: itemIdTyre}
        })
        .then(response => {
            setTyrePriceData(response.data);
            //console.log('PRICE TYRE: ',response.data)
        })
        .catch(error => {
          console.log(error)
        });
    },[])

    useEffect(() => {
        axios.get(`http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/wheels`, {
            headers: { 'Access-Control-Allow-Origin': `${process.env.CORS}`},
            withCredentials: true})
        .then(response => {
            setWheelData(response.data);
            //console.log(response.data);
        })
        .catch(error => {
          console.log(error)
        })
    },[])

    useEffect(() => {
        axios.get(`http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/stock/wheels/all`, {
            headers: { 'Access-Control-Allow-Origin': `${process.env.CORS}`},
            withCredentials: true,
            //params: {id_tyre: itemIdTyre}
        })
        .then(response => {
            setWheelStockData(response.data);
            //console.log('STOCK TYRE: ',response.data)
        })
        .catch(error => {
          console.log(error)
        });
    },[])

    useEffect(() => {
        axios.get(`http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/storage/all`, {
            headers: { 'Access-Control-Allow-Origin': `${process.env.CORS}`},
            withCredentials: true,
            //params: {id_tyre: itemIdTyre}
        })
        .then(response => {
            setStorageAll(response.data);
            //console.log('STOCK TYRE: ',response.data)
        })
        .catch(error => {
          console.log(error)
        });
    },[])

    useEffect(() => {
        axios.get(`http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/price/wheels/all`, {
            headers: { 'Access-Control-Allow-Origin': `${process.env.CORS}`},
            withCredentials: true,
            //params: {id_tyre: itemIdTyre}
        })
        .then(response => {
            setWheelPriceData(response.data);
            //console.log('PRICE TYRE: ',response.data)
        })
        .catch(error => {
          console.log(error)
        });
    },[])

    useEffect(() => {
        axios.get(`http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/comments`, {
            headers: { 'Access-Control-Allow-Origin': `${process.env.CORS}`},
            withCredentials: true,
            params: {id_comment: commentId}
        })
        .then(response => {
            setCommentData(response.data);
            //console.log('COMMENTS',response.data);
        })
        .catch(error => {
          console.log(error)
        })
    },[commentId])

    useEffect(() => {
        axios.get(`http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/orders/all`, {
            headers: { 'Access-Control-Allow-Origin': `${process.env.CORS}`},
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
    },[])
    
    useEffect(() => {

        axios.get(`http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/customers/all`, {
            headers: { 'Access-Control-Allow-Origin': `${process.env.CORS}`},
            withCredentials: true})
        .then(response => {
            setCustomers(response.data);
            //console.log(response.data);
        })
        .catch(error => {
          console.log(error)
        })

    },[commentId])

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
                        storage={storageAll} />
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