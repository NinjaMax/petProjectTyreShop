import axios from "axios";


const $hostPost = axios.create({
    baseURL: process.env.REACT_APP_HOST,
    headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Access-Control-Allow-Origin': `${process.env.CORS}`
    }, withCredentials: true,
})

const $hostGet = axios.create({
    baseURL: process.env.REACT_APP_HOST,
    headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Access-Control-Allow-Origin': `${process.env.CORS}`
    }, withCredentials: true,
})

const $authHostGet = axios.create({
    baseURL: process.env.REACT_APP_HOST,
    headers: { 
        'Access-Control-Allow-Origin': `${process.env.CORS}`
    }, withCredentials: true,
})

const $authHostPost = axios.create({
    baseURL: process.env.REACT_APP_HOST,
    headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Access-Control-Allow-Origin': `${process.env.CORS}`
    }, withCredentials: true,
})

// const authInterceptor = (config: any) => {
//     config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
//     return config
// }

// $authHostPost.interceptors.request.use(authInterceptor)
// $authHostGet.interceptors.request.use(authInterceptor)

export {
    $hostPost,
    $hostGet,
    $authHostGet,
    $authHostPost
}