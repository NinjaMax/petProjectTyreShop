export interface ITyreCard {
    countModelReview?: number;
    avgRatingModel?: number;
    optionsBox?: boolean;
    forOrder?: boolean;
    goods?: { 
        category:{
            id_cat: string,
            category: string,
            id_description: number,
        };
        country: {
            id_country: number, 
            country_manufacturer: string, 
            country_manufacturer_ua: string
        };
        createdAt: string;
        demo: {
            id_demo: number,
            demo: string
        };
        description: number;
        diameter: {
            id_diameter: number,
            diameter: string
        };
        full_name: string;
        height: {
            id_height: number,
            height: string
        };
        homologation: {
            id_homologation: number,
            homologation: string,
            id_description: number,
        };
        id: string;
        id_brand: number;
        id_cat: number;
        id_country:number;
        id_demo: number;
        id_description: number;
        id_diameter: number;
        id_height: number;
        id_homologation: number;
        id_load_index: number;
        id_model: number;
        id_params:number;
        id_reinforce: number;
        id_run_flat: number;
        id_seal: number;
        id_season: number;
        id_silent:number;
        id_size_digits: number;
        id_speed_index: number;
        id_studded:number;
        id_vehicle_type: number;
        id_width: number;
        id_year: number;
        load_index: {
            id_load_index: number,
            load_index: string,
            load_index_with_desc: string,
        };
        params: {
            id_params:number, 
            params: string,
        };
        photo_url: string;
        price: [ 
            {
            id: number, 
            id_tyre: number, 
            price_wholesale: number, 
            price: number, 
            old_price: number, 
            delivery_price: number,
            id_storage: number,
            id_supplier: number,
            price_plus_delivery: number,
            update_date: string,
            },
        ];
        rating: [];
        reinforce: {
            id_reinforce: number, 
            reinforce: string
        };
        reviews: [];
        run_flat: {
            id_run_flat: number, 
            run_flat: string,
        };
        seal: {
            id_seal: number, 
            seal: string,
        };
        season: {
            id_season: 1,
            season: string,
            season_ua: string,
        };
        silent: {
            id_silent: number,
            silent: string,
        };
        size_digits: {
            id_size_digits: number,
            size_only_digits: string
        };
        speed_index: {
            id_speed_index: number,
            speed_index: string,
            speed_index_with_desc: string
        };
        stock: [{
        id: number;
        id_storage?:number;
        id_supplier?:number;
        id_tyre?:number;
        remainder: number;
        reserve: number;
        stock: number;
        update_date: string;
        },];
        studded?: {
            id_studded: number,
            studded: string,
        };
        tyre_brand?: {
            id_brand: number,
            brand: string,
            id_description: number
        };
        tyre_model?: {
            id_model: number,
            model: string,
            id_description: number,
        };
        update_date?: string;
        vehicle_type?: {
            id_vehicle_type: number,
            vehicle_type: string,
            vehicle_type_ua: string,
            id_description: number,
        };
        width?: {
            id_width: number,
            width: string,
        };
        year?: {
            id_year: number,
            manufacture_year: string,
        };
        reviewCount?: number;
        ratingCount?: number;
        quantity?: number;
        id_basket_storage?: number;  
    };
    priceItem?: number;
    
    countEvent?(arg0: any): void;
    checkOrders?(arg0: any, ...arg:any[]): Promise<void | undefined>;
}