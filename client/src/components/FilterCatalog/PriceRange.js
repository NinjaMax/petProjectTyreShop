import React from 'react';
import '../../css/FilterCatatogCss/PriceRange.css';
import ButtonAction from '../Buttons/ButtonAction';

const PriceRange = () => {
    return (
        <div className='containerPriceRangeBox'>
            <div> Ціновий діапазон:</div>
            <div className='priceRangeBox'>
                <input type="number" placeholder='від 1000'/>
                <input type="number" placeholder='до 50000'/>   
            </div> 
            <ButtonAction props={"Показати"}/>
        </div>
    );
};

export default PriceRange;