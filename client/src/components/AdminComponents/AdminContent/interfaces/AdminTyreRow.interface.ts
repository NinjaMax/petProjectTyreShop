export interface IAdmTyreStockPriceRow {
    stockTyres: [
        {
            remainder: number,
            id: number,
            id_tyre: number,
            stock: number,
            reserve: number,
            id_supplier: number,
            id_storage: number,
            update_date: string,
            tyres: {
                id: string,
                id_goods_sup: string,
                full_name: string,
                photo_url: string,
                update_date: string,
                id_brand: number,
                id_model: number,
                id_cat: number,
                id_params: number,
                id_season: number,
                id_width: number,
                id_height: number,
                id_diameter: number,
                id_load_index: number,
                id_speed_index: number,
                id_country: number,
                id_year: number,
                id_vehicle_type: number,
                id_reinforce: number,
                id_run_flat: number,
                id_studded: number,
                id_homologation: number,
                id_demo: number,
                id_size_digits: number,
                id_seal: number,
                id_silent: number,
                id_description: number | null,
                id_euromark: number | null,
                createdAt: string
            },
            supplier: {
                id_supplier: string,
                name: string,
                city: string,
                city_ua: string,
                phone: number | null,
                email: string | null,
                delivery: string | null,
                delivery_city_ref: string | null,
                delivery_dep: string | null,
                delivery_dep_ref: string | null,
                address: string | null,
                createdAt: string
            },
            storage: {
                id_storage: number,
                storage: string
            }
        }, 
        ...{}[],
    ] | undefined; 
    priceTyres: [
        {
        id: number;
        storage: {
            storage: string;
        };
        update_date: Date;
        supplier: {
            name: string;
            city_ua: string;
        };
        stock:[
            {
            id: number,
            id_storage: number,
            id_supplier: number,
            id_tyre: number,
            remainder: number,
            reserve: number,
            stock: number,
            update_date: string,
        }, 
            ...{}[],
        ];
        price:[{
            delivery_price: number,
            id: number,
            id_storage: number,
            id_supplier: number,
            id_tyre: number,
            old_price: number | null,
            price: number,
            price_plus_delivery: number,
            price_wholesale: number,
            update_date: string,
        },
        ...{}[]
        ];
        reserve: number;
        remainder: number;
        }, ...{}[] 
    ] | undefined;  
}