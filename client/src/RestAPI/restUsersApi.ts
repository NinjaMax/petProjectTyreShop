import { $authHostGet, $authHostPost, $authHostPostLogIn, $authHostDeleteLogOut } from "./index";
import jwt_decode from 'jwt-decode';

export const signUpCustomer = async (dataSignIn: {}) => {
    const {data} = await $authHostPost.post('auth/signup', dataSignIn)
    //localStorage.setItem('token', data.token)phone: string, password: string
    console.log('SIGNUP_CUSTOMER', data);
    return data;
}

export const logInCustm = async (dataLogIn: {}) => {
    const {data} = await $authHostPost.post('auth/login', dataLogIn)
    //localStorage.setItem('token', data.token){phone, password}phone: string, password: string
    console.log('LOGIN: ', data);
    return data;
}

export const logInUser = async (dataLogIn: {}) => {
    const {data} = await $authHostPostLogIn.post('auth/user/login', dataLogIn)
    //localStorage.setItem('token', data.token){phone, password}phone: string, password: string
    console.log('LOGIN_USER: ', data);
    return data;
}

export const getCurUser = async () => {
    const {data} = await $authHostGet.get('/auth/user/admin', 
    )
    //cookie.setItem('token', data.token)
    console.log('CURR_USER: ', data);
    return data;
}

export const signUpUser = async (dataSignIn: {}) => {
    const {data} = await $authHostPost.post('auth/user/signup', dataSignIn)
    //localStorage.setItem('token', data.token)phone: string, password: string
    console.log('SIGNUP_USER', data);
    return data;
}

export const check = async () => {
    const {data} = await $authHostGet.get('auth/user/admin')
    //localStorage.setItem('token', data.token)
    console.log('AUTH_USER_ADMIN: ', data )
    return data;
}

export const preSignUpUser = async (phoneNum: bigint) => 
//{
    //const {data} = 
    await $authHostPost.post('/auth/presignup', {phone: phoneNum})
    .then(res => res.data)
    .catch(error => {
        console.log(error);
    });
    //localStorage.setItem('token', data.token)
    //console.log('PRESIGHIN: ', data);
    //return data;
//}

export const matchPassSms = async (randomPass: number, passMatch: number) => {
    const {data} = await $authHostPost.post('/auth/matchpass', {randomPass, passMatch})
    //localStorage.setItem('token', data.token)
    console.log('MATCH_PASS: ', data);
    return data;
}

// export const signUpUser = async (phoneNum: number, password: number) => {
//     const {data} = await $authHostPost.post('/auth/presignup', 
//     {phoneNum, password})
//     //cookie.setItem('token', data.token)
//     console.log(data);
//     return data;
// }

export const signInGoogle = async () => {
    const {data} = await $authHostGet.get('/auth/google/url', 
    )
    //cookie.setItem('token', data.token)
    console.log('URL_GOOGLE_USER_Auth: ', data);
    return data;
}

export const getGoogleCurUser = async () => {
    const {data} = await $authHostGet.get('/auth/customer/google', 
    )
    //cookie.setItem('token', data.token)
    console.log('CUSTM_GOOGLE: ', data);
    return data;
}

export const getCurCustomer = async () => {
    const {data} = await $authHostGet.get('/auth/customer/phone', 
    )
    //cookie.setItem('token', data.token)
    console.log('CURR_CUSTOMER: ', data);
    return data;
}

export const signInFacebook = async () => {
    const {data} = await $authHostGet.get('/auth/facebook/url', 
    )
    //cookie.setItem('token', data.token)
    console.log('URL_FACEBOOK_USER_Auth: ', data);
    return data;
}

export const getFacebookCurUser = async () => {
    const {data} = await $authHostGet.get('/auth/customer/facebook', 
    )
    //cookie.setItem('token', data.token)
    console.log('CUSTM_FACEBOOK: ', data);
    return data;
}

export const signInTwitter = async () => {
    const {data} = await $authHostGet.get('/auth/twitter/url', 
    )
    //cookie.setItem('token', data.token)
    console.log('URL_TWITTER_USER_Auth: ', data);
    return data;
}

export const getTwitterCurUser = async () => {
    const {data} = await $authHostGet.get('/auth/customer/twitter', 
    )
    //cookie.setItem('token', data.token)
    console.log('CUSTM_TWITTER: ', data);
    return data;
}

export const logOut = async () => {
    const {data} = await $authHostDeleteLogOut.delete('/auth/logout', 
    )
    //cookie.setItem('token', data.token)
    //console.log(data);
    return data;
}

