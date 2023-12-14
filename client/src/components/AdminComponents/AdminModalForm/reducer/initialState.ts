import { DataGoods } from "../types/DataGoods.type";

export function createInitialState (
    goodsId: any | undefined, 
    ordersData?: DataGoods | null,
    ordersSupData?: DataGoods | null
    ) {        
    let initialState = [];
    if (goodsId) {
        initialState.push({...goodsId, 
            "price": goodsId?.price![0].price,
            "id_tyre": goodsId?.price![0].id_tyre,
            "id_wheel": goodsId?.price![0].id_wheel,
            "price_wholesale": goodsId?.price![0].price_wholesale,
            "old_price": goodsId?.price![0].old_price,
            "id_supplier": goodsId?.price![0].id_supplier,
            "id_storage": goodsId?.price![0].id_storage,
            "delivery_price": goodsId?.price![0].delivery_price,
            "price_plus_delivery": goodsId?.price![0].price_plus_delivery,
            "update_date": goodsId?.price![0].update_date,   
            "category": goodsId?.category?.category, 
            "quantity": "4",  
        });
    } 
    if (ordersData?.order_storage) {
        initialState.push(...ordersData.order_storage ?? []);
    }
    if (ordersData?.orders_sup_storage) {
        initialState.push(...ordersData.orders_sup_storage ?? []);
    }
    if (ordersSupData) {
        initialState.push(...ordersSupData.orders_sup_storage ?? []);
    }

    return initialState;    
};