export interface ITyreCard {
    optionsBox?: boolean;
    forOrder?: boolean;
    goods?: { 
        tyre_brand: {brand: string;};
        country: {
            country_manufacturer_ua :string;
            country_manufacturer: string;
        };
        year: {manufacture_year: number};
        id: string; 
        full_name: string;
        season: {season_ua: string}; 
        manufacture_year: string;
        category: {category: string};
        price: [{
            price_wholesale: number;
            price: number;
            delivery_price: number;
            price_plus_delivery: number;
        }]
    };
    checkOrders?:()=> void | undefined;
}