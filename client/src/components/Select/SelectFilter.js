import React from 'react';
import '../../css/SelectCss/SelectSeasonTyre.css';

const SelectFilter = ({children, value}) => {
    return (

        <div className='selectSeasonTyre'>
            <label className='selectSeasonTyreItem'>
                <input className='inputSeasonTyreItem' 
                       type="radio"
                       value={value} 
                       name="selectItem" /> {children}
            </label>
        </div>
        
    );
};

export default SelectFilter;