import axios from "axios";

const $hostPost = axios.create({
    baseURL: process.env.REACT_APP_HOST,
    headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Access-Control-Allow-Origin': `${process.env.REACT_APP_CORS}` 
    }, withCredentials: true,
})

const $hostPostUpload = axios.create({
    baseURL: process.env.REACT_APP_HOST,
    headers: {
        'Content-Type': 'multipart/form-data; charset=utf-8',
        'Access-Control-Allow-Origin': `${process.env.REACT_APP_CORS}` 
    }, withCredentials: true,
})

const $hostGet = axios.create({
    baseURL: process.env.REACT_APP_HOST,
    headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Access-Control-Allow-Origin': `${process.env.REACT_APP_CORS}`
    }, withCredentials: true,
})

const $authHostGet = axios.create({
    baseURL: process.env.REACT_APP_HOST,
    headers: { 
        'Access-Control-Allow-Origin': `${process.env.REACT_APP_CORS}`
    }, withCredentials: true,
})

const $authHostPost = axios.create({
    baseURL: process.env.REACT_APP_HOST,
    headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Access-Control-Allow-Origin': `${process.env.REACT_APP_CORS}`
    }, withCredentials: true,
})

const $authHostPostLogIn = axios.create({
    baseURL: process.env.REACT_APP_HOST,
    headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Access-Control-Allow-Origin': `${process.env.REACT_APP_CORS}`
    }, withCredentials: true,
})

const $authHostDeleteLogOut = axios.create({
    baseURL: process.env.REACT_APP_HOST,
    headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Access-Control-Allow-Origin': `${process.env.REACT_APP_CORS}`
    }, withCredentials: true,
})

const $novaPoshtaPost = axios.create({
    baseURL: process.env.REACT_APP_NOVA_POSHTA_API,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  })

const $deliveryPost = axios.create({
    baseURL: process.env.REACT_APP_DELIVERY_API,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
})

export {
    $hostPost,
    $hostGet,
    $authHostGet,
    $authHostPost,
    $authHostPostLogIn,
    $authHostDeleteLogOut,
    $hostPostUpload,
    $novaPoshtaPost,
    $deliveryPost,
}