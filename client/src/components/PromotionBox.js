import React from 'react';
import TyresCard from '../components/Cards/TyresCard';
import '../css/PromotionBox.css';

const PromotionBox = () => {
    return (

        <div className='promotionBox'>
                <TyresCard optionsBox={false}/>  
                <TyresCard optionsBox={false}/>  
                <TyresCard optionsBox={false}/>  
                <TyresCard optionsBox={false}/>  
        </div>
        
    );
};

export default PromotionBox;