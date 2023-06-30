export interface IPropsTyre {
    product?: { 
        width?: {width:string};
        height?: {height:string};
        diameter?: {diameter:string};
        tyre_brand: {brand: string};
        tyre_model: {model: string};
        country: {
            country_manufacturer_ua :string;
            country_manufacturer: string;
        };
        year: {manufacture_year: number};
        id: string; 
        full_name: string; 
        manufacture_year: string;
        category: {category: string};
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
    };
}