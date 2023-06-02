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

const getTyresByFullName = async (fullname:string) => {
    const {data} = await $hostGet.get('tyres/fullname/:fullname',
     {params: {fullname: fullname}})
    //localStorage.setItem('token', data.token)
    console.log('GET_TYRES_BY_FULL_NAME: ', data )
    return data;
}

const getTyresById = async (id:string) => {
    const {data} = await $hostGet.get('tyres/id',
     {params: {id: id}})
    //localStorage.setItem('token', data.token)
    console.log('GET_TYRES_BY_ID: ', data )
    return data;
}

const getTyresByIdParam = async (id:string) => {
    const {data} = await $hostGet.get(`tyres/paramid/${id ?? '0'}`,
     //{params: {id: id}}
    )
    //localStorage.setItem('token', data.token)
    //console.log('GET_TYRES_BY_IDPARAM: ', data )
    return data;
}




export {
    getTyresOffset,
    getTyresSeason,
    getTyresType,
    getTyresParams,
    getTyresDiameter,
    getTyresById,
    getTyresByFullName,
    getTyresByIdParam
}