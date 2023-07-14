import { $hostGet, $hostPost } from './index';
import { IReviewTyreRestCreate } from './interfaces/ReviewTyreRest.interface';

// const getTyresOffset = async (
//     offset: number,
//     limit: number,
//     width: string,
//     height: string,
//     diameter: string,
//     season: string,
//     brand: string,
//     price: string,
//     type: string,
//     speed_index: string,
//     load_index: string,
//     studded: string,
//     run_flat: string,
//     homologation: string,
//     reinforced: string,
//     // cheap: boolean,
//     // expensive:boolean,
//     // rating: boolean,
//     // oldPrice: boolean,
//     // titleName:boolean,
//     ) => {
//     const {data} = await $hostGet.get('tyres/offset', 
//     {params: {
//         offset: offset ?? 0,
//         limit: limit,
//         width: width,
//         height: height,
//         diameter: diameter,
//         season: season,
//         brand: brand,
//         price: price,
//         type: type,
//         speed_index: speed_index,
//         load_index: load_index,
//         studded: studded,
//         run_flat: run_flat,
//         homologation: homologation,
//         reinforce: reinforced,
//         }
//     })
//     return data;
// }

const getTyresWithoutOffset = async (
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
    sort: string,
    ) => {
    const {data} = await $hostGet.get('tyres/no-offset', 
    {params: {
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
        reinforce: reinforced,
        sort: sort,
        }
    })
    //localStorage.setItem('token', data.token)
    //console.log('GET_TYRES_OFFSET9: ', data )
    return data;
}

const getSession = async () => {
    const {data} = await $hostGet.get('/session')
    //localStorage.setItem('token', data.token)
    //console.log('GET_TYRES_BY_ID: ', data )
    return data;
}

const getTyresAll = async () => {
    const {data} = await $hostGet.get('tyres')
    //localStorage.setItem('token', data.token)
    //console.log('GET_TYRES_BY_ID: ', data )
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

const getTyresCountAll = async (
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
    const {data} = await $hostGet.get('tyres/count/all',
    {params: {
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
        reinforce: reinforced,
    }
    })
    //localStorage.setItem('token', data.token)
    //console.log('GET_TYRES_BY_ID: ', data )
    return data;
}

const addGoodsToBasket = async (
    id: string,
    id_cat: number,
    id_customer?: number,
    goods?: string, 
    //id_user?: number,
    quantity?:number,
    price?: number,

    ) =>
    await $hostPost.post('/basket', {
    id_cat: id_cat,    
    id_goods: id, 
    goods: goods,
    quantity: quantity ?? 4,
    price: price,
    id_customer: id_customer,
    //id_user: id_user,
})
.catch(error => {
        console.log(error)
});  

const likesTyreReview = async (
    id_review: number, 
    likeCount: number,
    dislikeCount: number,
    ) =>
    await $hostPost.patch('/reviews/likes', {
    id_review: id_review, 
    likeCount: likeCount,
    dislikeCount: dislikeCount,   
})
.catch(error => {
    console.log(error)
}); 

const createTyreReview = async (
    data:IReviewTyreRestCreate, 
    id: number,
    id_brand: number,
    id_model: number,
    id_season: number,
    id_customer?: number,    
    //rating_overall?: number,
    rating_dry_road?:number,
    rating_wet_road?: number,
    rating_snow_road?: number,
    rating_ice_road?: number,
    rating_cross_country?: number,
    rating_treadwear?: number,
    rating_price_quality?: number,

    ) =>
    await $hostPost.post('/reviews', {

    email: data?.email,
    description: data?.description,
    positive: data?.positive,
    negative: data?.negative,
    driver_experience: data?.driver_experience,
    car: data?.car,
    name: data?.name,    
    id: id,
    id_brand: id_brand,
    id_model: id_model,
    id_season: id_season,
    id_customer: id_customer,
    rating_overall: data?.rating_overall,
    rating_dry_road: rating_dry_road,
    rating_wet_road: rating_wet_road,
    rating_snow_road: rating_snow_road,
    rating_ice_road: rating_ice_road,
    rating_cross_country: rating_cross_country,
    rating_treadwear: rating_treadwear,
    rating_price_quality: rating_price_quality
})
.catch(error => {
        console.log(error)
}); 

const getTyresModelRatingAvg = async (id_model: number) => {
    const {data} = await $hostGet.get(
        `/ratings/tyres/bymodel/${id_model ?? 0}`,
    )
    //localStorage.setItem('token', data.token)
    //console.log('GET_TYRES_BY_ID: ', data )
    return data;
}

const getTyresBrandRatingAvg = async (id_brand: number) => {
    const {data} = await $hostGet.get(
        `/ratings/tyres/bybrand/${id_brand ?? 0}`,
    )
    //localStorage.setItem('token', data.token)
    //console.log('GET_TYRES_BY_ID: ', data )
    return data;
}

const getTyresBrandRatingAvgSeason = async (
    id_brand: number,
    id_season: number,
    ) => {
    const {data} = await $hostGet.get('/ratings/tyres/bybrand-season/',
    {params: {
        id_brand: id_brand ?? 0,
        id_season: id_season ?? 0,
    }
    })
    //localStorage.setItem('token', data.token)
    //console.log('GET_TYRES_BY_ID: ', data )
    return data;
}

const getTyresCountReviewByBrand = async (
    id_brand: number,
    ) => {
    const {data} = await $hostGet.get('/reviews/count/brand/',
    {params: {
        id_brand: id_brand ?? 0,
    }
    })
    //localStorage.setItem('token', data.token)
    //console.log('GET_TYRES_BY_ID: ', data )
    return data;
}

const getTyresCountReviewByModel = async (
    id_model: number,
    ) => {
    const {data} = await $hostGet.get('/reviews/count/model/',
    {params: {
        id_model: id_model ?? 0,
    }
    })
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
    //getTyresOffset,
    getTyresWithoutOffset,
    //getTyresSeason,
    //getTyresType,
    //getTyresParams,
    //getTyresDiameter,
    getTyresById,
    getTyresAll,
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
    getTyresSeasonPropsAll,
    createTyreReview,
    getTyresModelRatingAvg,
    getTyresBrandRatingAvg,
    getTyresBrandRatingAvgSeason,
    getTyresCountReviewByBrand,
    getTyresCountReviewByModel,
    likesTyreReview,
    addGoodsToBasket,
    getSession
}