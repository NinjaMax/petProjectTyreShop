export function createInitialState (
    goodsTyreData: any | undefined | null,
    goodsWheelData: any | undefined | null,
    ) {        
    let initialState: any[] = [];
    if (goodsTyreData) {
        initialState.push(...goodsTyreData);
    } 
    if (goodsWheelData) {
        initialState.push(...goodsWheelData);
    }

    return initialState;    
};