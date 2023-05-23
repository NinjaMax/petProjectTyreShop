
export function createInitialState (
    goodsTyreData: any | undefined,
    goodsWheelData?: any | undefined
    ) {        
    let initialState = [];
    if (goodsTyreData) {
        initialState.push(...goodsTyreData);
    } 
    if (goodsWheelData) {
        initialState.push(...goodsWheelData);
    }

    return initialState;    
};