import { $authHostGet, $authHostPost, } from "./index";
import jwt_decode from 'jwt-decode';

export const registration = async (email: string, password: string) => {
    const {data} = await $hostPost.post('api/user/registration', {email, password, role: 'ADMIN'})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const login = async (email: string, password: string) => {
    const {data} = await $hostGet.post('api/user/login', {email, password})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const check = async () => {
    const {data} = await $authHostGet.get('api/user/auth')
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}