import { $hostGet } from './index';

const getTyresOffset = async () => {
    const {data} = await $hostGet.get('tyres/offset')
    //localStorage.setItem('token', data.token)
    console.log('GET_TYRES_OFFSET9: ', data )
    return data;
}

export {
    getTyresOffset
}