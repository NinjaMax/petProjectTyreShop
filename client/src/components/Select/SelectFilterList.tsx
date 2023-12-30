import React from 'react';
import '../../css/SelectCss/SelectFilterList.css';
import { ISelectFilterList } from './interfaces/SelectFilterList.interface';

const SelectFilterList = ({
        items, 
        value,
        id, 
        checked, 
        onChange,
        nameFilter, 
        width}: ISelectFilterList
    ) => {

    return (
    <div className={checked === value ? 'checkedList':'selectFilterList'}
        style={{"--widthBtn":width} as React.CSSProperties}>   
        <input className='selectFilterListInput'
            id={value}
            name={nameFilter}
            type="radio"
            value={value}
            checked={checked === value}
            onChange={onChange}/>
            <label className={checked === value ? 'checkedItem':'selectFilterListItem'} 
                htmlFor={value}>    
            <span>{items}</span>       
            </label>       
    </div>
    );
};

export default SelectFilterList;