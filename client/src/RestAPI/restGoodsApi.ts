import { $hostGet } from './index';

const getTyresOffset = async (offset:number) => {
    const {data} = await $hostGet.get('tyres/offset', {params: {offset: offset ?? 0}})
    //localStorage.setItem('token', data.token)
    console.log('GET_TYRES_OFFSET9: ', data )
    return data;
}

const getTyresSeason = async (season:number) => {
    const {data} = await $hostGet.get('tyres/season/:season',
     {params: {season: season}})
    //localStorage.setItem('token', data.token)
    console.log('GET_TYRES_SEASON: ', data )
    return data;
}

export {
    getTyresOffset,
    getTyresSeason
}