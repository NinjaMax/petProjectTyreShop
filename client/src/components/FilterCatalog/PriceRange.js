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
            <div className='btnPriceRange'>
                <ButtonAction props={"Показати"} widthBtn={190}/>    
            </div> 
            
        </div>
    );
};

export default PriceRange;