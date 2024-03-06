import { $authHostGet, $authHostPost, $authHostPostLogIn, $authHostDeleteLogOut } from "./index";

export const signUpCustomer = async (dataSignIn: {}) => {
    const {data} = await $authHostPost.post('auth/signup', dataSignIn)
    return data;
}

export const logInCustm = async (dataLogIn: {}) => {
    const {data} = await $authHostPost.post('auth/login', dataLogIn)
    return data;
}

export const logInUser = async (dataLogIn: {}) => {
    const {data} = await $authHostPostLogIn.post('auth/user/login', dataLogIn)
    return data;
}

export const getCurUser = async () => {
    const {data} = await $authHostGet.get('/auth/user/admin', 
    )
    return data;
}

export const signUpUser = async (dataSignIn: {}) => {
    const {data} = await $authHostPost.post('auth/user/signup', dataSignIn)
    return data;
}

export const check = async () => {
    const {data} = await $authHostGet.get('auth/user/admin')
    return data;
}

export const preSignUpUser = async (phoneNum: bigint) => 
    await $authHostPost.post('/auth/presignup', {phone: phoneNum})
    .then(res => res.data)
    .catch(error => {
        console.log(error);
});


export const matchPassSms = async (randomPass: number, passMatch: number) => {
    const {data} = await $authHostPost.post('/auth/matchpass', {randomPass, passMatch})
    return data;
}

export const signInGoogle = async () => {
    const {data} = await $authHostGet.get('/auth/google/url', 
    )
    return data;
}

export const getGoogleCurUser = async () => {
    const {data} = await $authHostGet.get('/auth/customer/google', 
    )
    return data;
}

export const getCurCustomer = async () => {
    const {data} = await $authHostGet.get('/auth/customer/phone', 
    )
    return data;
}

export const signInFacebook = async () => {
    const {data} = await $authHostGet.get('/auth/facebook/url', 
    )
    return data;
}

export const getFacebookCurUser = async () => {
    const {data} = await $authHostGet.get('/auth/customer/facebook', 
    )
    return data;
}

export const signInTwitter = async () => {
    const {data} = await $authHostGet.get('/auth/twitter/url', 
    )
    return data;
}

export const getTwitterCurUser = async () => {
    const {data} = await $authHostGet.get('/auth/customer/twitter', 
    )
    return data;
}

export const logOut = async () => {
    const {data} = await $authHostDeleteLogOut.delete('/auth/logout', 
    )
    return data;
}

