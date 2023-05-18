import { DataGoods } from "../types/DataGoods.type";

export function createInitialState (
    goodsId: any | undefined, 
    ordersData?: DataGoods | null,
    ordersSupData?: DataGoods | null
    ) {        
    let initialState = [];
    if (goodsId) {
        initialState.push({...goodsId, 
            "price":{...goodsId.price[0],
               "quantity": "4"},  
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