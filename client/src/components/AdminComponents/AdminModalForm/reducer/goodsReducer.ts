import { ActionReducer, StateReducer } from "../types/OrderReducer.type";

export function reducer (state: StateReducer, action: ActionReducer) {
    switch (action.type) {
        case 'addTyreToOrder': {
            if (action.addTyre) {
                state?.push({...action.addTyre, 
                    "price":{...(action.addTyre.price[action.indexPrice] as object),
                       "quantity": "4"},  
                });
            }
            return state;
        }
        case 'addWheelToOrder': {
            if (action.addWheel) {
                state.push({...action.addWheel, 
                    "price":{...(action.addWheel.price[action.indexPrice] as object),
                        "quantity": "4"}, 
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