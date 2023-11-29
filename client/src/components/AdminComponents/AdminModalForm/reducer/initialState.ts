import { DataGoods } from "../types/DataGoods.type";

export function createInitialState (
    goodsId: any | undefined, 
    ordersData?: DataGoods | null,
    ordersSupData?: DataGoods | null
    ) {        
    let initialState = [];
    if (goodsId) {
        initialState.push({...goodsId, 
            "price": goodsId?.price![0],
            "id_wheel": goodsId?.price![0],
            "price_wholesale": goodsId?.price![0],
            "old_price": goodsId?.price![0],
            "id_supplier": goodsId?.price![0],
            "id_storage": goodsId?.price![0],
            "delivery_price": goodsId?.price![0],
            "price_plus_delivery": goodsId?.price![0],
            "update_date": goodsId?.price![0],   
            "category": goodsId?.price![0], 
            "quantity": "4",  
        });
    } 
    if (ordersData) {
        initialState.push(...ordersData.order_storage ?? []);
    }
    if (ordersSupData) {
        initialState.push(...ordersSupData.order_sup_storage ?? []);
    }

    return initialState;    
};