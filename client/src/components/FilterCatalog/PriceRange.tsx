import React from 'react';
import '../../css/FilterCatatogCss/PriceRange.css';
import ButtonAction from '../buttons/ButtonAction';
import { useTranslation } from 'react-i18next';

interface IPriceRange {
    filterAction?(arg0: any): void;
    filterActionShown?(arg0: any): void;
}

const PriceRange = (
    {filterAction, filterActionShown}: IPriceRange) => {
    const { i18n } = useTranslation();
    
    return (
        <div className='containerPriceRangeBox'>
            <div>{i18n.resolvedLanguage === 'uk' ? 'Ціновий діапазон:' : 'Ценовой диапазон:'}</div>
            <div className='priceRangeBox'>
                <input 
                    type="number" 
                    name='vid'
                    placeholder='від 1000'
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
                    props={i18n.resolvedLanguage === 'uk' ? "Показати" : "Показать"} 
                    widthBtn={190} 
                    eventItem={filterActionShown}
                    />    
            </div> 
        </div>
    );
};

export default PriceRange;