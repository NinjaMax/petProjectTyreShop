import React from 'react';
import '../css/PromotionBox.css';
import TyresCard from './cards/Card';

type IPromoBox = {
    itemsArray: [] | null;
};

const PromotionBox = ({itemsArray}: IPromoBox) => {
    return (

        <div className='promotionBox'>
                <TyresCard optionsBox={false} checkOrders={undefined}/>  
                <TyresCard optionsBox={false} checkOrders={undefined}/>  
                <TyresCard optionsBox={false} checkOrders={undefined}/>  
                <TyresCard optionsBox={false} checkOrders={undefined}/>  
        </div>
        
    );
};

export default PromotionBox;