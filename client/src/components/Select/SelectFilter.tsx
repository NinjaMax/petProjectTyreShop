import React from 'react';
import '../../css/SelectCss/SelectFilter.css';

interface ISelectFilter {
    children:any; 
    value: any;
}

const SelectFilter = (
        {children, value}: ISelectFilter
    ) => {
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