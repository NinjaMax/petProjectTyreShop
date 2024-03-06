export const sortTyres = (e: any, value: [] | null) => {
    console.log(e.target.textContent)
    if (e.target.textContent === 'Код') {
        value?.sort(
        (a:any, b:any) => (+a.id) - (+b.id)); 
    }
    if (e.target.textContent === 'Рік Виробн.') {
        value?.sort(
        (a:any, b:any) => (+a.id) - (+b.id));
    }
    if (e.target.textContent === 'Бренд') {
        value?.sort(
            (a:any, b:any) => {
            const brandA = a.tyre_brand?.brand.toLowerCase();
            const brandB = b.tyre_brand?.brand.toLowerCase();
            if(brandA < brandB) return -1;
            if(brandA > brandB) return 1;
            return 0;
        })
    }
    if (e.target.textContent === 'Сезон') {
        value?.sort(
            (a:any, b:any) => {
            const brandA = a.season?.season_ua.toLowerCase();
            const brandB = b.season?.season_ua.toLowerCase();
            if(brandA < brandB) return -1;
            if(brandA > brandB) return 1;
            return 0;
        })
    }  
    if (e.target.textContent === 'Країна поход.') { 
        value?.sort(
            (a:any, b:any) => {
            const brandA = a.country?.country_manufacturer_ua.toLowerCase();
            const brandB = b.country?.country_manufacturer_ua.toLowerCase();
            if(brandA < brandB) return -1;
            if(brandA > brandB) return 1;
            return 0;
        })
    }
    if (e.target.textContent === 'Категорія') {
        value?.sort(
            (a:any, b:any) => {
            const brandA = a.category?.category.toLowerCase();
            const brandB = b.category?.category.toLowerCase();
            if(brandA < brandB) return -1;
            if(brandA > brandB) return 1;
            return 0;
        })
    }
}