import { ActionReducer, StateReducer } from "../types/OrderReducer.type";

export function reducer (state: StateReducer, action: ActionReducer) {
    switch (action.type) {
        case 'addTyreToOrder': {
            if (action.addTyre) {
                state?.push({...action.addTyre, 
                    "price": action.addTyre.price[+action.indexPrice].price,
                    "id_tyre": action.addTyre.price[+action.indexPrice].id_tyre,
                    "price_wholesale": action.addTyre.price[+action.indexPrice].price_wholesale,
                    "old_price": action.addTyre.price[+action.indexPrice].old_price,
                    "id_supplier": action.addTyre.price[+action.indexPrice].id_supplier,
                    "id_storage": action.addTyre.price[+action.indexPrice].id_storage,
                    "delivery_price": action.addTyre.price[+action.indexPrice].delivery_price,
                    "price_plus_delivery": action.addTyre.price[+action.indexPrice].price_plus_delivery,
                    "update_date": action.addTyre.price[+action.indexPrice].update_date,
                    "category": action.addTyre.category.category,
                    "quantity": "4",
                
                });
            }
            return state;
        }
        case 'addWheelToOrder': {
            if (action.addWheel) {
                state.push({...action.addWheel, 
                    "price": action.addWheel.price[+action.indexPrice].price,
                    "id_wheel": action.addWheel.price[+action.indexPrice].id_wheel,
                    "price_wholesale": action.addWheel.price[+action.indexPrice].price_wholesale,
                    "old_price": action.addWheel.price[+action.indexPrice].old_price,
                    "id_supplier": action.addWheel.price[+action.indexPrice].id_supplier,
                    "id_storage": action.addWheel.price[+action.indexPrice].id_storage,
                    "delivery_price": action.addWheel.price[+action.indexPrice].delivery_price,
                    "price_plus_delivery": action.addWheel.price[+action.indexPrice].price_plus_delivery,
                    "update_date": action.addWheel.price[+action.indexPrice].update_date,   
                    "category": action.addWheel.category.category, 
                    "quantity": "4" ,
                }); 
            }
            return state;
        }
        case 'deleteItemFromOrder': {
            if (state.length > 0) {
                state.splice(action.deleteItem, 1); 
            }
            return state;
        }
        case 'editItemFromOrder': { 
            return [...action.editItem];
        }
        default: {
            throw Error('Unknown action: ' + action.type);
        } 
    }
    
}