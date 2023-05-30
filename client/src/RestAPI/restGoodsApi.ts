import { $hostGet } from './index';

const getTyresOffset = async (offset:number) => {
    const {data} = await $hostGet.get('tyres/offset', {params: {offset: offset ?? 0}})
    //localStorage.setItem('token', data.token)
    //console.log('GET_TYRES_OFFSET9: ', data )
    return data;
}

const getTyresSeason = async (season:string) => {
    const {data} = await $hostGet.get('tyres/season/:season',
     {params: {season: season}})
    //localStorage.setItem('token', data.token)
    console.log('GET_TYRES_BY_SEASON: ', data )
    return data;
}

const getTyresType = async (type:string) => {
    const {data} = await $hostGet.get('tyres/type/:type',
     {params: {type: type}})
    //localStorage.setItem('token', data.token)
    console.log('GET_TYRES_BY_TYPE: ', data )
    return data;
}

const getTyresDiameter = async (diameter:string) => {
    const {data} = await $hostGet.get('tyres/diameter/:diameter',
     {params: {diameter: diameter}})
    //localStorage.setItem('token', data.token)
    console.log('GET_TYRES_BY_DIAMETER: ', data )
    return data;
}

const getTyresParams = async (params:string) => {
    const {data} = await $hostGet.get('tyres/params/:params',
     {params: {params: params}})
    //localStorage.setItem('token', data.token)
    console.log('GET_TYRES_BY_PARAMS: ', data )
    return data;
}




export {
    getTyresOffset,
    getTyresSeason,
    getTyresType,
    getTyresParams,
    getTyresDiameter
}