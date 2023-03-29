// //React Axios Post Request:
import axios from "axios";
import { IRestAdminApi } from "./interfaces/restAdmin.interface";

    const createGoodsToOrder = async (item:IRestAdminApi, id_order: number
        //{ id: string | number; full_name: any; category: { category: any; }; price: { id_supplier: string | number; id_storage: string | number; quantity: string | number; price: string | number; }; }, id_order: number
        ) =>  
            await axios.post(`http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/orders/creategoods`,
            {
                id: +item?.id!,
                full_name: item.full_name,
                category: item.category?.category,
                order_index: id_order,
                id_supplier: +item.price?.id_supplier!,
                storage_index: +item.price?.id_storage!,
                quantity: +item.price?.quantity!,
                price: +item.price?.price!,
                // delivery: 'Flintstone',
            },{headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Access-Control-Allow-Origin': `${process.env.CORS}`
            }, withCredentials: true,
            //})
            //.then(response => {
                
                //setOrderStorage(oldOrdStor => [...oldOrdStor, response.data]);
                //console.log('Order_storage', response.data);
            //return response
            })
            .catch(error => {
                console.log(error)
            }
        )

       
    

    const responseForm = async (data: any) => 
        await axios.post(`http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/orders`, data, {
               headers: {
                   'Content-Type': 'application/json; charset=utf-8',
                   'Access-Control-Allow-Origin': `${process.env.CORS}`
               }, withCredentials: true,
               })
            //    .then(response => {
            //    //setOrderAllData(response.data);
               
            //    alert(`Заказ створено, id ${response.data.id_order}`);
            //    console.log('Order id: ', response.data.id_order);
            //    setOrderId(+response.data.id_order);
   
            //    //if (stateData.length !== 0) {
            //     // for (let i =0; i < stateData.length; i++) {
            //     //     createGoodsToOrder(stateData[i], response.data.id_order)
                    
            //     // }
            //        stateData.forEach((itemGoods) => (
            //          createGoodsToOrder(itemGoods, response.data.id_order)
            //        ));
            //    //}
   
            //    console.log('ORDER ID', response.data.id_order);
            //     //   return response.data;
            //    })
               .catch(error => {
                   console.log(error);
               }
            )

   

const addGoodsToOrder = async (value: IRestAdminApi
    //{ id_order_storage: any; id: any; id_supplier: any; order_index: any; storage_index: any; quantity: any; price: any; }
    ) => 
    await axios.post(`http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/orders/add`,
    {
        // id: +item.id,
        // full_name: item.full_name,
        // category: item.category.category,
        // order_index: +orderId,
        // id_supplier: +item.stock[0].id_supplier,
        // storage_index: +item.stock[0].id_storage,
        // quantity: +item.price.quantity,
        // price: +item.price.price,
        id_order_storage: value?.id_order_storage,
        id: value.id,
        id_supplier: value.id_supplier,
        id_order: value.order_index,
        id_storage: value.storage_index,
        quantity: value.quantity,
        price: value.price
        // delivery: 'Flintstone',
    },{headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Access-Control-Allow-Origin': `${process.env.CORS}`
    },withCredentials: true,
    })
    // .then(response => {
    // //setOrderAllData(response.data);
    // alert(`Заказ ${response.data.id_order} проведено`)

    // console.log('Order Done', response.data);
    // })
    .catch(error => {
        console.log(
            'Не вистачає залишків, або не вірно вказані дані',
             error)
    }
)

const getTyres = async () => 
//{
///const allTyres = async () =>
//try {
    await axios.get(`http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/tyres`, {
    headers: { 'Access-Control-Allow-Origin': `${process.env.CORS}`},
    withCredentials: true})
//.then(response => { 
    //Object.assign()
//    setTyreData(response.data);
    //console.log(response.data);
    
//})
.catch(error => {
 console.log(error)
})
// } catch (error) {
//     console.log(error)
// }
//return allTyres;
//}
const getStockTyres = async () => 
    await axios.get(`http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/stock/tyres/all`, {
        headers: { 'Access-Control-Allow-Origin': `${process.env.CORS}`},
        withCredentials: true,
    //params: {id_tyre: itemIdTyre}
})
// .then(response => {
//     //setTyreStockData(response.data);
//     //console.log('STOCK TYRE: ',response.data)
// })
.catch(error => {
  console.log(error)
});

const getPriceTyres = async () => 
    await axios.get(`http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/price/tyres/all`, {
        headers: { 'Access-Control-Allow-Origin': `${process.env.CORS}`},
        withCredentials: true,
        //params: {id_tyre: itemIdTyre}
    })
    // .then(response => {
    //     setTyrePriceData(response.data);
    //     //console.log('PRICE TYRE: ',response.data)
    // })
    .catch(error => {
      console.log(error)
    });

const getWheels = async () => 
    await axios.get(`http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/wheels`, {
        headers: { 'Access-Control-Allow-Origin': `${process.env.CORS}`},
        withCredentials: true
    })
    // .then(response => {
    //     setWheelData(response.data);
    //     //console.log(response.data);
    // })
    .catch(error => {
      console.log(error)
    })

const getStockWheel = async () =>
    await axios.get(`http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/stock/wheels/all`, {
        headers: { 'Access-Control-Allow-Origin': `${process.env.CORS}`},
        withCredentials: true,
        //params: {id_tyre: itemIdTyre}
    })
    // .then(response => {
    //     setWheelStockData(response.data);
        //console.log('STOCK TYRE: ',response.data)
    //})
    .catch(error => {
      console.log(error)
    });

const getPriceWheels = async () => 
    await axios.get(`http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/price/wheels/all`, {
        headers: { 'Access-Control-Allow-Origin': `${process.env.CORS}`},
        withCredentials: true,
        //params: {id_tyre: itemIdTyre}
    })
    // .then(response => {
    //     setWheelPriceData(response.data);
    //     //console.log('PRICE TYRE: ',response.data)
    // })
    .catch(error => {
      console.log(error)
    });

const getStorageAll = async () => 
    await axios.get(`http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/storage/all`, {
        headers: { 'Access-Control-Allow-Origin': `${process.env.CORS}`},
        withCredentials: true,
        //params: {id_tyre: itemIdTyre}
    })
    //.then(response => {
        //setStorageAll(response.data);
        //console.log('STOCK TYRE: ',response.data)
    //})
    .catch(error => {
      console.log(error)
    });

const getCommentData = async (commentId: number | null) =>
    await axios.get(`http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/comments`, {
        headers: { 'Access-Control-Allow-Origin': `${process.env.CORS}`},
        withCredentials: true,
        params: {id_comment: commentId}
    })
    // .then(response => {
    //     setCommentData(response.data);
    //     //console.log('COMMENTS',response.data);
    // })
    .catch(error => {
      console.log(error)
    })

const getOrderData = async () => 
    await axios.get(`http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/orders/all`, {
        headers: { 'Access-Control-Allow-Origin': `${process.env.CORS}`},
        withCredentials: true,
        //params: {id_comment: commentId}
    })
    // .then(response => {
    //     setOrderAllData(response.data);
    //     //console.log('COMMENTS',response.data);
    // })
    .catch(error => {
      console.log(error)
    })

const getCustomers = async () => 
    await axios.get(`http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/customers/all`, {
        headers: { 'Access-Control-Allow-Origin': `${process.env.CORS}`},
        withCredentials: true
    })
    // .then(response => {
    //     setCustomers(response.data);
    //     //console.log(response.data);
    // })
    .catch(error => {
      console.log(error)
    })



export {addGoodsToOrder,
        createGoodsToOrder,
        responseForm,
        getTyres, 
        getStockTyres, 
        getPriceTyres,
        getWheels,
        getStockWheel,
        getStorageAll,
        getPriceWheels,
        getCommentData,
        getOrderData,
        getCustomers};
