import React from 'react';
import TyresCard from '../components/Cards/TyresCard';
import '../css/PromotionBox.css';

const PromotionBox = () => {
    return (

        <div className='promotionBox'>
                <TyresCard/>  
                <TyresCard/>  
                <TyresCard/>  
                <TyresCard/>  
        </div>
        
    );
};

export default PromotionBox;