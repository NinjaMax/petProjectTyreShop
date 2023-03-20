import React from 'react';
import TyresCard from './cards/TyresCard';
import '../css/PromotionBox.css';

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