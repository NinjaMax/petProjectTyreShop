import React from 'react';
import '../../css/SelectCss/SelectFilterList.css';

interface ISelectFilterList {
    value: string;
    items: string;
    checked?: any;
    onChange: (e: any) => void; 
    width?: string;
}

const SelectFilterList = (
        {items, value, checked, onChange, width}: ISelectFilterList
    ) => {

    return (

    <div className={checked === value? 'checkedList':'selectFilterList'}
        data-style={{"--widthBtn":width}}>   
        <input className='selectFilterListInput'
            id={value}
            type="radio"
            value={value}
            checked={checked === value}
            onChange={onChange}/>
            <label className={checked === value? 'checkedItem':'selectFilterListItem'} 
                htmlFor={value}>    
            <span>{items}</span>       
            </label>       
    </div>

    );
};

export default SelectFilterList;