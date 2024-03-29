export type IbasketData = {
    name?: string | null,
    phone?: number | null,
    email?: string | null,
    address?: string | null,
    notes?: string | null,
    storage?: string | null,
    delivery?: string | null,
    delivery_dep?: string | null,
    delivery_dep_ref?: string | null,
    city_delivery?: string | null,
    ref_city_delivery?: string,
    pay_view?: string | null,
    dop_garanty?: number | null,
    session_id?: string | null,
    checkedIn?: boolean,
    id_customer?:number | null,
    id_basket?: number | null,
    basket_storage?: any[],
    createdAt?: string | null,
    updatedAt?: string | null,
    DeliveryCity?: string | null,
    MainDescription?: string | null,
    commission_cost?: number | null,
    delivery_cost?: number | null,
    bonus_decrease?: number | null,
    total_cost?: number | null,
    id?: string | null,
    regionName?: string | null,
    regionId?: string | null,
};