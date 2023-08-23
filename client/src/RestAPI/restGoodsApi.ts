import { $hostGet, $hostPost } from './index';
import { IReviewTyreRestCreate } from './interfaces/ReviewTyreRest.interface';

const getWheelsWithoutOffset = async (
    width: string,
    diameter: string,
    bolt_count: string,
    bolt_count_pcd: string,
    brand: string,
    price: string,
    type: string,
    color: string,
    dia: string,
    et: string,
    pcd: string,
    pcd2: string,
    sort: string,
    ) => {
    const {data} = await $hostGet.get('wheels/no-offset', 
    {params: {
        width: width,
        diameter: diameter,
        bolt_count: bolt_count,
        bolt_count_pcd: bolt_count_pcd,
        brand: brand,
        price: price,
        type: type,
        color: color,
        dia: dia,
        et: et,
        pcd: pcd,
        pcd2: pcd2,
        sort: sort,
        }
    })
    return data;
}

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

const getCompareGoods = async (compareArr: any) => 
     await $hostGet.post('/customers/add-comparison',
    {
        comparison: compareArr
    }).catch(error => {
        console.log(error)
    //localStorage.setItem('token', data.token)
    //console.log('GET_TYRES_BY_ID: ', data )
    //return data;
});  

const getFavoritesGoods = async (favoriteArr: any) => 
     await $hostGet.post('/customers/add-favorites',
    {
        favorite: favoriteArr
    }).catch(error => {
        console.log(error)
    //localStorage.setItem('token', data.token)
    //console.log('GET_TYRES_BY_ID: ', data )
    //return data;
});  

const getFavorites = async () => {
    const {data} = await $hostGet.get('/customers/get-favorites')
    //localStorage.setItem('token', data.token)
    //console.log('GET_TYRES_BY_ID: ', data )
    return data;
}

const getCompare = async () => {
    const {data} = await $hostGet.get('/customers/get-comparison')
    //localStorage.setItem('token', data.token)
    //console.log('GET_TYRES_BY_ID: ', data )
    return data;
}

const clearCompare = async () => {
    const {data} = await $hostGet.delete('/customers/clear-comparison')
    //localStorage.setItem('token', data.token)
    //console.log('GET_TYRES_BY_ID: ', data )
    return data;
}

const clearFavorites = async () => {
    const {data} = await $hostGet.delete('/customers/clear-favorites')
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

const getWheelsAll = async () => {
    const {data} = await $hostGet.get('/wheels/all')
    //localStorage.setItem('token', data.token)
    //console.log('GET_TYRES_BY_ID: ', data )
    return data;
}

const getTyresById = async (id:string) => {
    const {data} = await $hostGet.get('tyres/id',
     {params: {id: id}})
    //localStorage.setItem('token', data.token)
    //console.log('GET_TYRES_BY_ID: ', data )
    return data;
}

const getTyresByIdParam = async (id:string) => {
    const {data} = await $hostGet.get(`tyres/paramid/${id ?? '0'}`,
     //{params: {id: id}}
    )
    return data;
}

const getWheelsByIdParam = async (id:string) => {
    const {data} = await $hostGet.get(`wheels/paramid/${id ?? '0'}`,
     //{params: {id: id}}
    )
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

// const getTyresBrand = async (
//     brand: string,
// ) => {
//     const {data} = await $hostGet.get('tyres/brand',
//     {params: {
//         brand: brand,
//     }
//     })
//     //localStorage.setItem('token', data.token)
//     //console.log('GET_TYRES_BY_ID: ', data )
//     return data;
// }

const getTyresParamsByBrandAndSeason = async (
    params: string,
    brand: string,
    season: string,
) => {
    const {data} = await $hostGet.get('/tyres/params-brand-season',
    {params: {
        params: params ?? '',
        brand: brand ?? '',
        season: season ?? '',
    }
    })
    //localStorage.setItem('token', data.token)
    //console.log('GET_TYRES_BY_ID: ', data )
    return data;
}

const getTyresParamsBySeason = async (
    params: string,
    season: string,
) => {
    const {data} = await $hostGet.get('/tyres/params-season',
    {params: {
        params: params ?? '',
        season: season ?? '',
    }
    })
    //localStorage.setItem('token', data.token)
    //console.log('GET_TYRES_BY_ID: ', data )
    return data;
}

const getWheelsParamsBy = async (
    width: string,
    bolt_count_pcd: string,
    dia: string,
    et: string,
    diameter: string
) => {
    const {data} = await $hostGet.get('/wheels/params',
    {params: {
        width: width ?? '',
        bolt_count_pcd: bolt_count_pcd ?? '',
        dia: dia ?? '',
        et: et ?? '',
        diameter: diameter ?? '',
    }
    })
    //localStorage.setItem('token', data.token)
    //console.log('GET_TYRES_BY_ID: ', data )
    return data;
}

const getWheelsParamsByBrand = async (
    brand: string,
    width: string,
    bolt_count_pcd: string,
    dia: string,
    et: string,
    diameter: string
) => {
    const {data} = await $hostGet.get('/wheels/params-brand',
    {params: {
        brand: brand ?? '',
        width: width ?? '',
        bolt_count_pcd: bolt_count_pcd ?? '',
        dia: dia ?? '',
        et: et ?? '',
        diameter: diameter ?? ''
    }
    })
    //localStorage.setItem('token', data.token)
    //console.log('GET_TYRES_BY_ID: ', data )
    return data;
}

const getAllTyresModelByBrand = async (
    id_brand: string,
) => {
    const {data} = await $hostGet.get('/properties/tyres/model-by-brand',
    {params: {
        brand: id_brand ?? 0,
    }
    })
    //localStorage.setItem('token', data.token)
    //console.log('GET_TYRES_BY_ID: ', data )
    return data;
}

const getAllWheelsModelByBrand = async (
    id_brand: string,
) => {
    const {data} = await $hostGet.get('/properties/wheel/model-by-brand',
    {params: {
        brand: id_brand ?? 0,
    }
    })
    //localStorage.setItem('token', data.token)
    //console.log('GET_TYRES_BY_ID: ', data )
    return data;
}

const getAllTyresParamsByModel = async (
    id_model: string,
) => {
    const {data} = await $hostGet.get('/properties/tyres/params/by-model',
    {params: {
        model: id_model ?? 0,
    }
    })
    //localStorage.setItem('token', data.token)
    //console.log('GET_TYRES_BY_ID: ', data )
    return data;
}

const getAllTyresDiametersByModel = async (
    id_model: string,
) => {
    const {data} = await $hostGet.get('/properties/tyres/diameter/by-model',
    {params: {
        model: id_model ?? 0,
    }
    })
    //localStorage.setItem('token', data.token)
    //console.log('GET_TYRES_BY_ID: ', data )
    return data;
}

const getAllWheelsDiametersByModel = async (
    id_model: string,
) => {
    const {data} = await $hostGet.get('/properties/wheels/diameter/by-model',
    {params: {
        model: id_model ?? 0,
    }
    })
    //localStorage.setItem('token', data.token)
    //console.log('GET_TYRES_BY_ID: ', data )
    return data;
}

const createBasket = async (
    name?: string,
    phone?: bigint,
    email?: string,
    address?: string,
    notes?: string,
    storage?: string,
    delivery?: string,
    city_delivery?: string,
    ref_city_delivery?: string,
    pay_view?: string,
    dop_garanty?: string,
    checkedIn?: boolean,
    id_customer?: number,
) =>
await $hostPost.post('/basket', {
    name: name,
    phone: phone,
    email: email,
    address: address,
    notes: notes,
    storage: storage,
    delivery: delivery,
    city_delivery: city_delivery,
    ref_city_delivery: ref_city_delivery,
    pay_view: pay_view,
    dop_garanty: dop_garanty,
    checkedIn: checkedIn,
    id_customer: id_customer ?? null,
})
.catch(error => {
    console.log(error)
});  

const addGoodsToBasket = async (
    id: number,
    id_cat: number,
    quantity?:number,
    price?: number,
    id_supplier?: number,
    id_storage?: number,
    category?: string,
    id_basket?: number,
    full_name?: string,
    season?: string,
    ratingCount?: number,
    reviewCount?: number,
    diameter?: string,
    ref_diameter?: string,
    weight?: string,
    ref_weight?: string,
    ) =>
    await $hostPost.post('/basket/add-goods', {
    id: id,     
    id_cat: id_cat,
    quantity: quantity ?? 4,
    price: price,
    id_supplier: id_supplier,
    id_storage: id_storage,
    category: category,
    id_basket: id_basket,
    full_name: full_name,
    season: season,
    ratingCount: ratingCount,
    reviewCount: reviewCount,
    diameter: diameter,
    ref_diameter: ref_diameter,
    weight: weight,
    ref_weight: ref_weight,
})
.catch(error => {
        console.log(error)
});  

const getBasketOrder = async () => {
    const {data} = await $hostGet.get('/basket/by-session')
    //localStorage.setItem('token', data.token)
    //console.log('GET_TYRES_BY_ID: ', data )
    return data;
}

const getBasketById = async (id: number) => {
    const {data} = await $hostGet.get(`/basket/by-id/${id ?? ''}`)
    //localStorage.setItem('token', data.token)
    //console.log('GET_TYRES_BY_ID: ', data )
    return data;
}

const updateBasket = async (data: any) => 
await $hostPost.patch('/basket/update', 
 {
    name: String(data?.name),
    phone: data?.phone,
    email: data?.email,
    address: data?.address,
    notes: data?.notes,
    storage: data?.storage,
    delivery: data?.delivery,
    city_delivery: data?.city_delivery,
    ref_city_delivery: data?.ref_city_delivery,
    pay_view: data?.pay_view,
    dop_garanty: data?.dop_garanty,
    checkedIn: data?.checkedIn,
    delivery_cost: data?.delivery_cost,
    commission_cost: data?.commission_cost,
    bonus_decrease: data?.bonus_decrease,
    total_cost: data?.total_cost,
    id_customer: data?.id_customer,
    id_basket: +data?.id_basket,
}
)
.catch(error => {
    console.log(error);
});

const updateBasketStorageGoods = async (
    data: any, 
    //basketStorageId: number
) => 
await $hostPost.patch('/basket/update/basketstorage', data)
.catch(error => {
    console.log(error);
});

const removeBasketStorageGoods = async (
    id_basket_storage: number, 
) => 
await $hostPost.delete(`/basket/remove/basketstorage/${id_basket_storage}`,  
)
.catch(error => {
    console.log(error);
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

const likesWheelReview = async (
    id_review: number, 
    likeCount: number,
    dislikeCount: number,
    ) =>
    await $hostPost.patch('/reviews/likes/wheel', {
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
    customer_pictures?: string,   
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
    customer_pictures: customer_pictures,
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

const createWheelReview = async (
    data:IReviewTyreRestCreate, 
    id: number,
    id_brand: number,
    id_model: number,
    id_customer?: number, 
    customer_pictures?: string,   
    ) =>
    await $hostPost.post('/reviews/createwheel', {

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
    id_customer: id_customer,
    customer_pictures: customer_pictures,
    rating_overall: data?.rating_overall,
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

const getWheelsModelRatingAvg = async (id_model: number) => {
    const {data} = await $hostGet.get(
        `/ratings/wheels/bymodel/${id_model ?? 0}`,
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

const getWheelsBrandRatingAvg = async (id_brand: number) => {
    const {data} = await $hostGet.get(
        `/ratings/wheels/bybrand/${id_brand ?? 0}`,
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

const getWheelsCountReviewByBrand = async (
    id_brand: number,
    ) => {
    const {data} = await $hostGet.get('/reviews/count/wheel-brand/',
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

const getWheelsCountReviewByModel = async (
    id_model: number,
    ) => {
    const {data} = await $hostGet.get('/reviews/count/wheel-model/',
    {params: {
        id_model: id_model ?? 0,
    }
    })
    //localStorage.setItem('token', data.token)
    //console.log('GET_TYRES_BY_ID: ', data )
    return data;
}

const createStoreReview = async (
    data?: any, 
    id_customer?: number, 
    customer_pictures?: string,   
    rating?:number,
    ) =>
    await $hostPost.post('/reviews-store', {
    email: data?.email,
    description: data?.description,
    positive: data?.positive,
    negative: data?.negative,
    name: data?.name,    
    id_customer: id_customer,
    customer_pictures: customer_pictures,
    rating: rating,
})
.catch(error => {
        console.log(error)
}); 

const getAllStoreReview = async () => {
    const {data} = await $hostGet.get('/reviews-store/allstores')
    //localStorage.setItem('token', data.token)
    //console.log('GET_TYRES_BY_ID: ', data )
    return data;
}

const createQuestion = async (
    data:any, 
    id: number,
    id_brand: number,
    id_model: number,
    id_customer?: number,
    id_user?: number, 
    customer_pictures?: string,   
    ) =>
    await $hostPost.post('/questions', {
    email: data?.email,
    description: data?.description,
    name: data?.name,    
    id: id,
    id_brand: id_brand,
    id_model: id_model,
    id_customer: id_customer,
    id_user: id_user,
    customer_pictures: customer_pictures,
})
.catch(error => {
        console.log(error)
}); 

const getAllQuestionsModel = async (id_model: number) => {
    const {data} = await $hostGet.get(
        `/questions/all-bymodel/${id_model ?? 0}`
        )
    //localStorage.setItem('token', data.token)
    //console.log('GET_TYRES_BY_ID: ', data )
    return data;
}

const getSupplierById = async (id_supplier: number) => {
    const {data} = await $hostGet.get(
        `/suppliers/byid/${id_supplier ?? 0}`,
    )
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
    getWheelsAll,
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
    createBasket,
    getSession,
    getBasketOrder,
    getSupplierById,
    updateBasketStorageGoods,
    removeBasketStorageGoods,
    updateBasket,
    getBasketById,
    getCompareGoods,
    getFavoritesGoods,
    getTyresParamsByBrandAndSeason,
    getTyresParamsBySeason,
    getAllTyresModelByBrand,
    getAllTyresParamsByModel,
    getAllTyresDiametersByModel,
    getCompare,
    getFavorites,
    clearFavorites,
    clearCompare,
    createQuestion,
    createStoreReview,
    getAllStoreReview,
    getAllQuestionsModel,
    getWheelsWithoutOffset,
    likesWheelReview,
    createWheelReview,
    getWheelsModelRatingAvg,
    getWheelsBrandRatingAvg,
    getWheelsCountReviewByBrand,
    getWheelsCountReviewByModel,
    getWheelsByIdParam,
    getWheelsParamsBy,
    getWheelsParamsByBrand,
    getAllWheelsModelByBrand,
    getAllWheelsDiametersByModel
}