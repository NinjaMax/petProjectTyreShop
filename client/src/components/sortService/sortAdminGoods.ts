export const sortTyres = (e: any, value: [] | null) => {
    console.log(e.target.textContent)
    if (e.target.textContent === 'Код') {
    //const sortTyresByCode = () => {
        //const sortByCode: any = 
        value?.sort(
        (a:any, b:any) => (+a.id) - (+b.id));
        
       // return value;
    //}    
    }
    if (e.target.textContent === 'Рік Виробн.') {
    //const sortTyresByYear = () => {
        //const sortByYear: any = 
        value?.sort(
        (a:any, b:any) => (+a.id) - (+b.id));
        
       // return value;
    //}
    }
    if (e.target.textContent === 'Бренд') {
    //const sortTyresByBrand = () => {
        //const sortByBrand: any = 
        value?.sort(
            (a:any, b:any) => {
            const brandA = a.tyre_brand?.brand.toLowerCase();
            const brandB = b.tyre_brand?.brand.toLowerCase();
            if(brandA < brandB) return -1;
            if(brandA > brandB) return 1;
            return 0;
        })
       // return value;
    //}
    }
    if (e.target.textContent === 'Сезон') {
    //const sortTyresBySeason = () => {
        //const sortBySeason: any = 
        value?.sort(
            (a:any, b:any) => {
            const brandA = a.season?.season_ua.toLowerCase();
            const brandB = b.season?.season_ua.toLowerCase();
            if(brandA < brandB) return -1;
            if(brandA > brandB) return 1;
            return 0;
        })
        //console.log('sort', sortProp);
        //return value;
    //}
    }  
    if (e.target.textContent === 'Країна поход.') { 
    //const sortTyresByCountry = () => {
        //const sortByCountry: any = 
        value?.sort(
            (a:any, b:any) => {
            const brandA = a.country?.country_manufacturer_ua.toLowerCase();
            const brandB = b.country?.country_manufacturer_ua.toLowerCase();
            if(brandA < brandB) return -1;
            if(brandA > brandB) return 1;
            return 0;
        })
        //console.log('sort', sortProp);
        //return value;
    //}
    }
    if (e.target.textContent === 'Категорія') {
    //const sortTyresByCategory = () => {
        //const sortByCategory: any = 
        value?.sort(
            (a:any, b:any) => {
            const brandA = a.category?.category.toLowerCase();
            const brandB = b.category?.category.toLowerCase();
            if(brandA < brandB) return -1;
            if(brandA > brandB) return 1;
            return 0;
        })
        //return value;
        //console.log('sort', sortProp);
    //}
    }
}