import React from 'react';
import '../../css/FilterCatatogCss/PriceRange.css';
import ButtonAction from '../buttons/ButtonAction';

interface IPriceRange {
    filterAction?(arg0: any): void;
    filterActionShown?(arg0: any): void;
}

const PriceRange = (
    {filterAction, filterActionShown}: IPriceRange) => {

    return (
        <div className='containerPriceRangeBox'>
            <div> Ціновий діапазон:</div>
            <div className='priceRangeBox'>
                <input 
                    type="number" 
                    name='vid'
                    placeholder='від 1000'
                    //defaultValue={0}
                    onChange={filterAction}
                />
                <input 
                    type="number" 
                    name='do'
                    placeholder='до 50000'
                    onChange={filterAction}
                />      
            </div>
            <div className='btnPriceRange'>
                <ButtonAction 
                    props={"Показати"} 
                    widthBtn={190} 
                    eventItem={filterActionShown}
                    />    
            </div> 
        </div>
    );
};

export default PriceRange;