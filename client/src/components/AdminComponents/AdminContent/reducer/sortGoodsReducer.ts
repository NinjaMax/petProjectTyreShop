import { ActionGoodsReducer } from "../types/GoodsReducer.type";


export function reducer (state: any [], action: ActionGoodsReducer) {
    switch (action.type) {
        case 'sortByBrand': {
            if (action.sortBrand === 'Бренд') {
                state?.sort(
                    (a:any, b:any) => {
                    const brandA = a.tyre_brand?.brand.toLowerCase();
                    const brandB = b.tyre_brand?.brand.toLowerCase();
                    if(brandA < brandB) return -1;
                    if(brandA > brandB) return 1;
                    return 0;
                })
            }
            return state;
        }
        case 'sortBySeason': {
            if (action.sortSeason === 'Сезон') {
                state?.sort(
                    (a:any, b:any) => {
                    const brandA = a.season?.season_ua.toLowerCase();
                    const brandB = b.season?.season_ua.toLowerCase();
                    if(brandA < brandB) return -1;
                    if(brandA > brandB) return 1;
                    return 0;
                })
            }
            return state;
        }
        case 'sortByCountry': {
            if (action.sortCountry === 'Країна поход.') {
                state?.sort(
                    (a:any, b:any) => {
                    const brandA = a.country?.country_manufacturer_ua.toLowerCase();
                    const brandB = b.country?.country_manufacturer_ua.toLowerCase();
                    if(brandA < brandB) return -1;
                    if(brandA > brandB) return 1;
                    return 0;
                }); 
            }
            return state;
        }
        case 'sortByCategory': {
            if (action.sortCategory === 'Категорія') {
                state?.sort(
                    (a:any, b:any) => {
                    const brandA = a.category?.category.toLowerCase();
                    const brandB = b.category?.category.toLowerCase();
                    if(brandA < brandB) return -1;
                    if(brandA > brandB) return 1;
                    return 0;
                })
            }
            return state;
        }
        case 'sortByYear': {
            if (action.sortYear === 'Рік Виробн.') {
                state?.sort(
                    (a:any, b:any) => 
                    (+a.year?.manufacture_year) - (+b.year?.manufacture_year));
            }
            return state;
        }
        case 'sortByCode': {
            if (action.sortCode === 'Код') {
                state?.sort((a:any, b:any) => (+a.id) - (+b.id));
            }
            return state;
        }
        default: {
            throw Error('Unknown action: ' + action.type);
        } 
    }
    
}