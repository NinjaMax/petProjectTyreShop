import React from 'react';
import '../../css/SelectCss/SelectFilter.css';

const SelectFilter = ({children, value}) => {
    return (

        <div className='selectFilter'>
            <label className='selectFilterItem'>
                <input className='inputselectFilterItem' 
                       type="checkbox"
                       value={value} 
                       name="selectItem" /> {children}
            </label>
        </div>
        
    );
};

export default SelectFilter;