// //React Ax ios Post Request:
import axios from "axios";

    const createGoodsToOrder = async (item, id_order) => { 
        const createGoods = await axios.post('http://localhost:4000/orders/creategoods',
            {
                id: +item.id,
                full_name: item.full_name,
                category: item.category.category,
                order_index: id_order,
                id_supplier: +item.price.id_supplier,
                storage_index: +item.price.id_storage,
                quantity: +item.price.quantity,
                price: +item.price.price,
                // delivery: 'Flintstone',
            },{headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Access-Control-Allow-Origin': 'http://localhost:3000'
            }
            }, {
                withCredentials: true,  
            },
            )
            .then(response => {
                
            // setOrderStorage([...orderStorage, response.data, ...orderStorage]);
            // console.log('Order_storage', response.data);
                return response.data;
            })
            .catch(error => {
                console.log(error)
            }
        )

        return createGoods;
    }

    const responseForm = async (data) => { 
       const newData = await axios.post('http://localhost:4000/orders', data, {
           headers: {
               'Content-Type': 'application/json; charset=utf-8',
               'Access-Control-Allow-Origin': 'http://localhost:3000'
           },
           withCredentials: true,
           })
           .then(response => 
            {
           //setOrderAllData(response.data);
           
        //    alert(`Заказ створено, id ${response.data.id_order}`);
        //    console.log('Order id: ', response.data);
        //    setOrderId(+response.data.id_order);

        //    if (stateData.length !== 0) {
        //        stateData.map((itemGoods) => (
        //            createGoodsToOrder(itemGoods, response.data.id_order)
        //        ));
        //   }

           //console.log('ORDER ID', response.data.id_order);
               return response.data;
           }
           )
           .catch(error => {
               console.log(error);
           }
       )

       return newData;

   };

const addGoodsToOrder = async (value) => {
    const addGoods = await axios.post('http://localhost:4000/orders/add',
        {
            // id: +item.id,
            // full_name: item.full_name,
            // category: item.category.category,
            // order_index: +orderId,
            // id_supplier: +item.stock[0].id_supplier,
            // storage_index: +item.stock[0].id_storage,
            // quantity: +item.price.quantity,
            // price: +item.price.price,
            id_order_storage: value.id_order_storage,
            id: value.id,
            id_supplier: value.id_supplier,
            id_order: value.order_index,
            id_storage: value.storage_index,
            quantity: value.quantity,
            price: value.price
            // delivery: 'Flintstone',
        },{headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'Access-Control-Allow-Origin': 'http://localhost:3000'
        }
        }, {
            withCredentials: true,  
        },
        )
        .then(response => {
        //setOrderAllData(response.data);
        //alert(`Заказ ${response.data.id_order} проведено`)
        //onsole.log('Order_storage', response.data);
        return response.data;
        })
        .catch(error => {
            console.log(error)
        }
    )

    return addGoods;
}
const getTyres = async () => 
//{
///const allTyres = async () =>
//try {
    await axios.get(`http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/tyres`, {
    headers: { 'Access-Control-Allow-Origin': `${process.env.CORS}`},
    withCredentials: true})
//.then(response => { 
    //Object.assign()
    //setTyreData(response.data);
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


export {addGoodsToOrder, createGoodsToOrder, responseForm, getTyres};
// import React, { useEffect, useState } from 'react'; import axios from 'axios';

// const MyComponent = () => { const [data, setData] = useState(null);

// useEffect(() => { axios .post('/someUrl', { // Data to be sent }) .then(response => { setData(response.data); }); }, []);

// return (

// {data &&
// {data}

// }
// ); };
// export default MyComponent;

// //Axios Interceptors with 
// useEffect: import React, { useEffect } from 'react'; import axios from 'axios';

// const MyComponent = () => { useEffect(() => { 
//     const requestInterceptor = axios.interceptors.request.use(config => {
//          Do something before request is sent 
//          return config; });

// const responseInterceptor = axios.interceptors.response.use(
//   response => {
//     // Do something with response data
//     return response;
//   },
//   error => {
//     // Do something with response error
//     return Promise.reject(error);
//   },
// );

// // Cleanup function
// return () => {
//   axios.interceptors.request.eject(requestInterceptor);
//   axios.interceptors.response.eject(responseInterceptor);
// };
// }, []);

// return

// Interceptors configured
// ; };
// export default MyComponent;


// //You can use the following code to make an Axios post request with an Axios interceptor using useEffect:

// import React, { useEffect } from 'react'; 
// import axios from 'axios';

// const PostRequest = () => { 
//     useEffect(() => { 
//     axios.interceptors.request.use( config => { 
//          Do something before request is sent return config; }, 
//          error => {  Do something with request error return Promise.reject(error); } 
//          );

//     // Add a response interceptor
//     axios.interceptors.response.use(
//     response => {
//     // Do something with response data
//     return response;
//   },
//   error => {
//     // Do something with response error
//     return Promise.reject(error);
//   }
// );

// // Make the request
// axios.post('/users', {
//     firstName: 'Fred',
//     lastName: 'Flintstone'
//   })
//   .then(function(response) {
//     console.log(response);
//   })
//   .catch(function(error) {
//     console.log(error);
//   });
// }, []);

// return

// Request Sent!
// ; };
// export default PostRequest;


// //Sure, here is an example of a React Axios POST request with interceptors using useEffect and useState:

// const [data, setData] = useState(null);

// useEffect(() => {
//   const axiosInstance = axios.create({
//     baseURL: 'http://example.com',
//     timeout: 1000,
//     headers: {'X-Custom-Header': 'foobar'}
//   });
//   axiosInstance.interceptors.request.use(config => {
//     // Do something before request is sent
//     return config;
//   }, error => {
//     // Do something with request error
//     return Promise.reject(error);
//   });
//   axiosInstance.interceptors.response.use(response => {
//     // Do something with response data
//     setData(response.data);
//     return response;
//   }, error => {
//     // Do something with response error
//     return Promise.reject(error);
//   });
//   axiosInstance.post('/user', {
//     firstName: 'John',
//     lastName: 'Doe'
//   })
//   .then(function (response) {
//     console.log(response);
//   })
//   .catch(function (error) {
//     console.log(error);
//   });
// }, );

