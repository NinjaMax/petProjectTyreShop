export type UpdateOrder = {
    id_order?: number; 
    id_user?: number; 
    notes?: string;
    organisation?:string;
    storage?: string;
    order_view?: string;
    delivery?: string;
    status_delivery?: string;
    delivery_ttn?: string;
    status?: string;
    pay_view?: string;
    status_pay?: string;
    dop_garanty?: number; 
    delivery_cost?: number; 
    delivery_city?: string;
    delivery_city_ref?: string;
    delivery_city_depart?: string;
    delivery_city_depart_ref?: string;
    total_cost?: number; 
    bonus_decrease?: number; 
    id_customer?: number; 
    id_contract?: number; 
    mix_store?: any
};