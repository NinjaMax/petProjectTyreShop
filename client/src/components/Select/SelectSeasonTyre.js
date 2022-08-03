import React from 'react';
import '../../css/SelectCss/SelectSeasonTyre.css';

const SelectSeasonTyre = () => {
    return (

        <div className='selectSeasonTyre'>
            <span>Cезон:</span> 
            <label className='selectSeasonTyreItem'>
                <input className='inputSeasonTyreItem' 
                       type="radio" 
                       value="Zima" 
                       name="selectItem" /> Зима
            </label>
            <label className='selectSeasonTyreItem'>
                <input className='inputSeasonTyreItem' 
                       type="radio" 
                       value="Wseseson"
                       name="selectItem"/> Всесезон
            </label>
            <label className='selectSeasonTyreItem'>
                <input className='inputSeasonTyreItem' 
                       type="radio" 
                       value="Lito" 
                       name="selectItem"/> Літо
            </label>
        </div>
        
    );
};

export default SelectSeasonTyre;