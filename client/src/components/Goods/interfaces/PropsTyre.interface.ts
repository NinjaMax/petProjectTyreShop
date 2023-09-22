export interface IPropsTyre {
    countModelReview?: number;
    avgRatingModel?: number;
    product?: { 
        width?: {width:string};
        height?: {height:string};
        diameter?: {diameter:string};
        tyre_brand: {brand: string};
        tyre_model: {model: string};
        country: {
            id_country: number;
            country_manufacturer_ua :string;
            country_manufacturer: string;
        };
        year: {manufacture_year: number};
        id: string; 
        full_name: string; 
        manufacture_year: string;
        category: {
            id_cat: string;
            category_ua: string;
            category: string
        };
        price: [{
            price_wholesale: number;
            price: number;
            delivery_price: number;
            price_plus_delivery: number;
        }];
        vehicle_type: { 
            vehicle_type: string,
            vehicle_type_ua: string,
        };
        season:{
            season: string,
            season_ua: string
        };
        load_index: {
            load_index: string, 
            load_index_with_desc: string,
        };
        speed_index:{
            speed_index: string,
            speed_index_with_desc: string,

        };
        studded: {
            studded: string
        }
        full_name_color?: string;
        pcd?:{
            id_pcd: number,
            pcd: string,
        };
        pcd2?:{
            id_pcd2: number,
            pcd2: string,
        };
        wheel_brand?:{
            brand: string,
            id_brand: number,
            id_description: number | null
        };
        wheel_model?:{
            model: string,
            id_model: number,
            id_description: number | null
        };
        type?:{
            id_description: number | null,
            id_type: string,
            type: string,
            type_ua?: string,
        };
        bolt_count?: {
            bolt_count: string,
            id_bolt_count: number,
        };
        bolt_count_pcd?:{
            bolt_count_pcd: string
            id_bolt_count_pcd: number,
        };
        color?:{
            color: string,
            color_short: string,
            id_color: string
        };
        dia?:{
            dia: string,
            id_dia: number,
        };
        et?:{
            et: string,
            id_et: number,
        };
    };
}