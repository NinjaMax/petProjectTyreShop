import React from 'react';
import '../css/PromotionBox.css';
import TyresCard from './cards/TyresCard';

const PromotionBox = () => {
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