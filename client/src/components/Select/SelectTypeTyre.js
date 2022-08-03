import React from 'react';
import '../../css/SelectCss/SelectTypeTyre.css';

const SelectTypeTyre = () => {
    return (
        
        <div className='selectTypeTyre'>
            <span>Тип авто:</span> 
            <label className='selectTypeTyreItem'>
                <input className='inputTypeTyreItem' 
                       type="radio" 
                       value="Legkovie" 
                       name="selectTypeItem" /> Легкові
            </label>
            <label className='selectTypeTyreItem'>
                <input className='inputTypeTyreItem' 
                       type="radio" 
                       value="Vnedorojnik"
                       name="selectTypeItem"/> Позашляховик
            </label>
            <label className='selectTypeTyreItem'>
                <input className='inputTypeTyreItem' 
                       type="radio" 
                       value="Mikroavtobus" 
                       name="selectTypeItem"/> Мікроавтобус
            </label>
            <label className='selectTypeTyreItem'>
                <input className='inputTypeTyreItem' 
                       type="radio" 
                       value="Gruzovi" 
                       name="selectTypeItem"/> Грузові
            </label>
            <label className='selectTypeTyreItem'>
                <input className='inputTypeTyreItem' 
                       type="radio" 
                       value="Selhoz" 
                       name="selectTypeItem"/> С/х
            </label>
            <label className='selectTypeTyreItem'>
                <input className='inputTypeTyreItem' 
                       type="radio" 
                       value="Spec" 
                       name="selectTypeItem"/> Спецтехніка
            </label>
            <label className='selectTypeTyreItem'>
                <input className='inputTypeTyreItem' 
                       type="radio" 
                       value="Moto" 
                       name="selectTypeItem"/> Мото
            </label>
        </div>
    );
};

export default SelectTypeTyre;