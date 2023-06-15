import { $hostGet } from './index';

const getTyresOffset = async (
    offset: number,
    limit: number,
    width: string,
    height: string,
    diameter: string,
    season: string,
    brand: string,
    price: string,
    type: string,
    speed_index: string,
    load_index: string,
    studded: string,
    run_flat: string,
    homologation: string,
    reinforced: string,
    ) => {
    const {data} = await $hostGet.get('tyres/offset', 
    {params: {
        offset: offset ?? 0,
        limit: limit,
        width: width,
        height: height,
        diameter: diameter,
        season: season,
        brand: brand,
        price: price,
        type: type,
        speed_index: speed_index,
        load_index: load_index,
        studded: studded,
        run_flat: run_flat,
        homologation: homologation,
        reinforce: reinforced
        }
    })
    //localStorage.setItem('token', data.token)
    //console.log('GET_TYRES_OFFSET9: ', data )
    return data;
}

// const getTyresSeason = async (season:string) => {
//     const {data} = await $hostGet.get(`tyres/season/${season}`,
//      {params: {season: season}})
//     //localStorage.setItem('token', data.token)
//     console.log('GET_TYRES_BY_SEASON: ', data )
//     return data;
// }

// const getTyresType = async (type:string) => {
//     const {data} = await $hostGet.get(`tyres/type/${type}`,
//      {params: {type: type}})
//     //localStorage.setItem('token', data.token)
//     console.log('GET_TYRES_BY_TYPE: ', data )
//     return data;
// }

// const getTyresDiameter = async (diameter:string) => {
//     const {data} = await $hostGet.get(`tyres/diameter/${diameter}`,
//      {params: {diameter: diameter}})
//     //localStorage.setItem('token', data.token)
//     console.log('GET_TYRES_BY_DIAMETER: ', data )
//     return data;
// }

// const getTyresParams = async (params:string) => {
//     const {data} = await $hostGet.get('tyres/params/:params',
//      {params: {params: params}})
//     //localStorage.setItem('token', data.token)
//     console.log('GET_TYRES_BY_PARAMS: ', data )
//     return data;
// }

// const getTyresByFullName = async (fullname:string) => {
//     const {data} = await $hostGet.get('tyres/fullname/:fullname',
//      {params: {fullname: fullname}})
//     //localStorage.setItem('token', data.token)
//     console.log('GET_TYRES_BY_FULL_NAME: ', data )
//     return data;
// }

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

const getTyresCountAll = async () => {
    const {data} = await $hostGet.get('tyres/count/all')
    //localStorage.setItem('token', data.token)
    //console.log('GET_TYRES_BY_ID: ', data )
    return data;
}

const getTyresBrandPropsAll = async () => {
    const {data} = await $hostGet.get('properties/allbrands')
    //localStorage.setItem('token', data.token)
    //console.log('GET_TYRES_BY_ID: ', data )
    return data;
}
const getTyresDiameterPropsAll = async () => {
    const {data} = await $hostGet.get('properties/alldiameter')
    //localStorage.setItem('token', data.token)
    //console.log('GET_TYRES_BY_ID: ', data )
    return data;
}
const getTyresHeightPropsAll = async () => {
    const {data} = await $hostGet.get('properties/allheight')
    //localStorage.setItem('token', data.token)
    //console.log('GET_TYRES_BY_ID: ', data )
    return data;
}
const getTyresHomologationPropsAll = async () => {
    const {data} = await $hostGet.get('properties/allhomologation')
    //localStorage.setItem('token', data.token)
    //console.log('GET_TYRES_BY_ID: ', data )
    return data;
}
const getTyresLoadIndexPropsAll = async () => {
    const {data} = await $hostGet.get('properties/allloadindex')
    //localStorage.setItem('token', data.token)
    //console.log('GET_TYRES_BY_ID: ', data )
    return data;
}
const getTyresModelPropsAll = async () => {
    const {data} = await $hostGet.get('properties/allmodels')
    //localStorage.setItem('token', data.token)
    //console.log('GET_TYRES_BY_ID: ', data )
    return data;
}
const getTyresReinforcedPropsAll = async () => {
    const {data} = await $hostGet.get('properties/allreinforced')
    //localStorage.setItem('token', data.token)
    //console.log('GET_TYRES_BY_ID: ', data )
    return data;
}
const getTyresRunFlatPropsAll = async () => {
    const {data} = await $hostGet.get('properties/allrunflat')
    //localStorage.setItem('token', data.token)
    //console.log('GET_TYRES_BY_ID: ', data )
    return data;
}
const getTyresSpeedIndexPropsAll = async () => {
    const {data} = await $hostGet.get('properties/allspeedindex')
    //localStorage.setItem('token', data.token)
    //console.log('GET_TYRES_BY_ID: ', data )
    return data;
}
const getTyresStuddedPropsAll = async () => {
    const {data} = await $hostGet.get('properties/allstudded')
    //localStorage.setItem('token', data.token)
    //console.log('GET_TYRES_BY_ID: ', data )
    return data;
}
const getTyresVehicleTypePropsAll = async () => {
    const {data} = await $hostGet.get('properties/allvehicletype')
    //localStorage.setItem('token', data.token)
    //console.log('GET_TYRES_BY_ID: ', data )
    return data;
}
const getTyresWidthPropsAll = async () => {
    const {data} = await $hostGet.get('properties/allwidth')
    //localStorage.setItem('token', data.token)
    //console.log('GET_TYRES_BY_ID: ', data )
    return data;
}
const getTyresSeasonPropsAll = async () => {
    const {data} = await $hostGet.get('properties/allseasons')
    //localStorage.setItem('token', data.token)
    //console.log('GET_TYRES_BY_ID: ', data )
    return data;
}



export {
    getTyresOffset,
    //getTyresSeason,
    //getTyresType,
    //getTyresParams,
    //getTyresDiameter,
    getTyresById,
    //getTyresByFullName,
    getTyresByIdParam,
    getTyresCountAll,
    getTyresBrandPropsAll,
    getTyresDiameterPropsAll,
    getTyresHeightPropsAll,
    getTyresHomologationPropsAll,
    getTyresLoadIndexPropsAll,
    getTyresModelPropsAll,
    getTyresReinforcedPropsAll,
    getTyresRunFlatPropsAll,
    getTyresSpeedIndexPropsAll,
    getTyresStuddedPropsAll,
    getTyresVehicleTypePropsAll,
    getTyresWidthPropsAll,
    getTyresSeasonPropsAll
}