import { $hostGet, $hostPost } from './index';
import { IReviewTyreRestCreate } from './interfaces/ReviewTyreRest.interface';

const getWheelsMainOffset = async (
    width: string,
    diameter: string,
    bolt_count: string,
    brand: string,
    type: string,
    sort: string,
    ) => {
    const {data} = await $hostGet.get('wheels/main-offset', 
    {params: {
        width: width,
        diameter: diameter,
        bolt_count: bolt_count,
        brand: brand,
        type: type,
        sort: sort,
        }
    })
    return data;
}

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

const getWheelsWithCatOffset = async (
    limit: number,
    offset: number,
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
    const {data} = await $hostGet.get('wheels/cat-offset', 
    {params: {
        limit: limit,
        offset: offset,
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
    price: string,
    type: string,
    speed_index: string,
    load_index: string,
    sort: string,
    ) => {
    const {data} = await $hostGet.get('tyres/no-offset', 
    {params: {
        price: price,
        type: type,
        speed_index: speed_index,
        load_index: load_index,
        sort: sort,
        }
    })
    return data;
}

const getTyresWithoutOffsetProps = async (
        studded: string,
        run_flat: string,
        homologation: string,
        reinforced: string,
        sort: string,
    ) => {
    const {data} = await $hostGet.get('tyres/props-offset', 
    {params: {
        studded: studded,
        run_flat: run_flat,
        homologation: homologation,
        reinforce: reinforced,
        sort: sort,
        }
    })
    return data;
}

const getTyresOffsetMain = async (
    width: string,
    height: string,
    diameter: string,
    season: string,
    brand: string,
    sort: string,
    ) => {
    const {data} = await $hostGet.get('tyres/main-offset', 
    {params: {
        width: width,
        height: height,
        diameter: diameter,
        season: season,
        brand: brand,
        sort: sort,
        }
    })
    return data;
}

const getTyresWithCatOffset = async (
    limit: number,
    offset: number,
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
    const {data} = await $hostGet.get('tyres/cat-offset', 
    {params: {
        limit: limit,
        offset: offset,
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
    return data;
}

const getAllOrdersLeader = async () => {
    const {data} = await $hostGet.get('/orders/all/order-leader')
    return data;
}

const getSession = async () => {
    const {data} = await $hostGet.get('/session')
    return data;
}

const getCompareGoods = async (compareArr: any) => 
     await $hostGet.post('/customers/add-comparison',
    {
        comparison: compareArr
    }).catch(error => {
        console.log(error)
});  

const getFavoritesGoods = async (favoriteArr: any) => 
     await $hostGet.post('/customers/add-favorites',
    {
        favorite: favoriteArr
    }).catch(error => {
        console.log(error)
});  

const getFavorites = async () => {
    const {data} = await $hostGet.get('/customers/get-favorites')
    return data;
}

const getCompare = async () => {
    const {data} = await $hostGet.get('/customers/get-comparison')
    return data;
}

const clearCompare = async () => {
    const {data} = await $hostGet.delete('/customers/clear-comparison')
    return data;
}

const clearFavorites = async () => {
    const {data} = await $hostGet.delete('/customers/clear-favorites')
    return data;
}

const getStorageByIdParam = async (id_storage:number) => {
    const {data} = await $hostGet.get(`storage/idparam/${id_storage ?? '0'}`,
    )
    return data;
}
    
const getTyresAll = async () => {
    const {data} = await $hostGet.get('tyres')
    return data;
}

const getWheelsAll = async () => {
    const {data} = await $hostGet.get('/wheels/all')
    return data;
}

const getTyresById = async (id:string) => {
    const {data} = await $hostGet.get('tyres/id',
     {params: {id: id}})
    return data;
}

const getTyresByModel = async (brand_and_model:string) => {
    const {data} = await $hostGet.get('properties/tyres/by-model',
     {params: {brand_and_model: brand_and_model}})
    return data;
}

const getWheelsByModel = async (brand_and_model:string) => {
    const {data} = await $hostGet.get('properties/wheel/by-model',
     {params: {brand_and_model: brand_and_model}})
    return data;
}

const getWheelsById = async (id:string) => {
    const {data} = await $hostGet.get('/wheels/id',
     {params: {id: id}})
    return data;
}

const getTyresByIdParam = async (id:string) => {
    const {data} = await $hostGet.get(`tyres/paramid/${id ?? '0'}`,
    )
    return data;
}

const getWheelsByIdParam = async (id:string) => {
    const {data} = await $hostGet.get(`wheels/paramid/${id ?? '0'}`,
    )
    return data;
}

const getTyresBrandByName = async (
    brand: string,
) => {
    const {data} = await $hostGet.get(
        `properties/tyres/brandname/${brand}`,
    )
    return data;
}

const getTyresByFullName = async (
    full_name: string,
) => {
    const {data} = await $hostGet.get(
        `tyres/fullname/${full_name}`,
    )
    return data;
}

const getWheelByFullName = async (
    full_name: string,
) => {
    const {data} = await $hostGet.get(
        `wheels/fullname/${full_name}`,
    )
    return data;
}

const getWheelsBrandByName = async (
    brand: string,
) => {
    const {data} = await $hostGet.get(
        `properties/wheels/brandname/${brand}`,
    )
    return data;
}

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
    return data;
}

const getAllWheelsDiametersByBrand = async (
    id_brand: string,
) => {
    const {data} = await $hostGet.get('/properties/wheels/diameter/by-brand',
    {params: {
        brand: id_brand ?? 0,
    }
    })
    return data;
}

const createBasket = async (
    data: {
    name?: string,
    phone?: bigint,
    email?: string,
    address?: string,
    notes?: string,
    storage?: string,
    delivery?: string,
    delivery_dep?: string,
    delivery_dep_ref?: string,
    city_delivery?: string,
    ref_city_delivery?: string,
    pay_view?: string,
    dop_garanty?: string,
    checkedIn?: boolean,
    id_customer?: number,
    }
) =>
await $hostPost.post('/basket', {
    name: data.name,
    phone: data.phone,
    email: data.email,
    address: data.address,
    notes: data.notes,
    storage: data.storage,
    delivery: data.delivery,
    delivery_dep: data.delivery_dep,
    delivery_dep_ref: data.delivery_dep_ref,
    city_delivery: data.city_delivery,
    ref_city_delivery: data.ref_city_delivery,
    pay_view: data.pay_view,
    dop_garanty: data.dop_garanty,
    checkedIn: data.checkedIn,
    id_customer: data.id_customer ?? null,
})
.catch(error => {
    console.log(error)
});  

const addGoodsToBasket = async (
    id: number,
    id_cat: number,
    quantity?:number,
    price_wholesale?: number,
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
    price_wholesale: price_wholesale,
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
    return data;
}

const getBasketById = async (id: number) => {
    const {data} = await $hostGet.get(`/basket/by-id/${id ?? ''}`)
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
    delivery_dep: data?.delivery_dep,
    delivery_dep_ref: data?.delivery_dep_ref,
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
    return data;
}

const getWheelsModelRatingAvg = async (id_model: number) => {
    const {data} = await $hostGet.get(
        `/ratings/wheels/bymodel/${id_model ?? 0}`,
    )
    return data;
}

const getTyresBrandRatingAvg = async (id_brand: number) => {
    const {data} = await $hostGet.get(
        `/ratings/tyres/bybrand/${id_brand ?? 0}`,
    )
    return data;
}

const getWheelsBrandRatingAvg = async (id_brand: number) => {
    const {data} = await $hostGet.get(
        `/ratings/wheels/bybrand/${id_brand ?? 0}`,
    )
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
    return data;
}

const getTyresRatingAvgIdAndIdmodel = async (
    id: number,
    id_model: number,
    ) => {
    const {data} = await $hostGet.get('/ratings/tyres/id-and-idmodel/',
    {params: {
        id: id ?? 0,
        id_model: id_model ?? 0,
    }
    })
    return data;
}

const getWheelsRatingAvgIdAndIdmodel = async (
    id: number,
    id_model: number,
    ) => {
    const {data} = await $hostGet.get('/ratings/wheels/id-and-idmodel/',
    {params: {
        id: id ?? 0,
        id_model: id_model ?? 0,
    }
    })
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
    return data;
}

const getAllStoreReviewLimit = async (
    limit: string,
    offset: string,
    ) => {
    const {data} = await $hostGet.get('/reviews-store/allstores-limit/',
    {params: {
        limit: limit ?? '1',
        offset: offset ?? '0',
    }
    })
    return data;
}

const getTyresReviewLimit = async (
    limit: string,
    offset: string,
    ) => {
    const {data} = await $hostGet.get('/reviews/tyres/limit/',
    {params: {
        limit: limit ?? '1',
        offset: offset ?? '0',
    }
    })
    return data;
}

const getWheelsReviewLimit = async (
    limit: string,
    offset: string,
    ) => {
    const {data} = await $hostGet.get('/reviews/wheels/limit/',
    {params: {
        limit: limit ?? '1',
        offset: offset ?? '0',
    }
    })
    return data;
}

const getArticlesId = async (id: number) => {
    const {data} = await $hostGet.get(`/articles/${id}`)
    return data;
}

const getArticlesImage = async (imageName: string) => {
    const {data} = await $hostGet.get(`/public/imageArticle/${imageName}`)
    return data;
}

const getAllArticles = async () => {
    const {data} = await $hostGet.get('/articles/all')
    return data;
}

const getAllArticlesLimit = async (
    limit: string,
    offset: string,
    ) => {
    const {data} = await $hostGet.get('/articles/all-limit',
    {params: {
        limit: limit ?? '3',
        offset: offset ?? '0',
    }
    })
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
    return data;
}

const getSupplierById = async (id_supplier: number) => {
    const {data} = await $hostGet.get(
        `/suppliers/byid/${id_supplier ?? 0}`,
    )
    return data;
}

export {
    getTyresOffsetMain,
    getTyresWithoutOffset,
    getTyresWithCatOffset,
    getTyresWithoutOffsetProps,
    getTyresById,
    getTyresAll,
    getWheelsAll,
    getTyresReviewLimit,
    getTyresByIdParam,
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
    getWheelsMainOffset,
    getWheelsWithoutOffset,
    getWheelsWithCatOffset,
    likesWheelReview,
    createWheelReview,
    getWheelsById,
    getWheelsReviewLimit,
    getWheelsModelRatingAvg,
    getWheelsBrandRatingAvg,
    getWheelsCountReviewByBrand,
    getWheelsCountReviewByModel,
    getWheelsByIdParam,
    getWheelsParamsBy,
    getWheelsParamsByBrand,
    getAllWheelsModelByBrand,
    getAllWheelsDiametersByBrand,
    getWheelsRatingAvgIdAndIdmodel,
    getTyresRatingAvgIdAndIdmodel,
    getAllOrdersLeader,
    getAllStoreReviewLimit,
    getAllArticlesLimit,
    getAllArticles,
    getArticlesId,
    getArticlesImage,
    getStorageByIdParam,
    getTyresBrandByName,
    getWheelsBrandByName,
    getTyresByFullName,
    getWheelByFullName,
    getWheelsByModel,
    getTyresByModel
}