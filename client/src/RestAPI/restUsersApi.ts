import { $authHostGet, $authHostPost, } from "./index";
import jwt_decode from 'jwt-decode';

export const registration = async (email: string, password: string) => {
    const {data} = await $authHostPost.post('api/user/registration', {email, password, role: 'ADMIN'})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const login = async (email: string, password: string) => {
    const {data} = await $authHostPost.post('api/user/login', {email, password})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const check = async () => {
    const {data} = await $authHostGet.get('api/user/auth')
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const preSignUpUser = async (phoneNum: bigint) => {
    const {data} = await $authHostPost.post('/auth/presignup', {phone: phoneNum})
    //localStorage.setItem('token', data.token)
    console.log(data);
    return data;
}

export const matchPassSms = async (randomPass: number, passMatch: number) => {
    const {data} = await $authHostPost.post('/auth/matchpass', {randomPass, passMatch})
    //localStorage.setItem('token', data.token)
    console.log(data);
    return data;
}

export const signUpUser = async (phoneNum: number, password: number) => {
    const {data} = await $authHostPost.post('/auth/presignup', 
    {phoneNum, password})
    //cookie.setItem('token', data.token)
    console.log(data);
    return data;
}