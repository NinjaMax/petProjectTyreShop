export type TyreContent = {
    id_cat: number;
    tyre_brand: {
        id_brand: number;
        brand: string;
    };
    country: {
        country_manufacturer_ua :string
    };
    
    year: {
        manufacture_year: number
    };
    id: string; 
    full_name: string;
    season: {
        id_season: number,
        season_ua: string
    }; 
    manufacture_year: string;
    category: {
        category: string,
        chapter: string,
    };
    vehicle_type: {
        vehicle_type: string,
        vehicle_type_ua: string,
    };
}