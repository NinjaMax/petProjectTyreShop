import React from 'react';
import '../../css/SelectCss/SelectFilterList.css';

const SelectFilterList = ({items, value, checked, onChange, width}) => {

    return (

    <div className={checked === value? 'checkedList':'selectFilterList'}
        style={{"--widthBtn":width}}>   
        <input className='selectFilterListInput'
            id={value}
            type="radio"
            value={value}
            checked={checked === value}
            onChange={onChange}/>
            <label className={checked === value? 'checkedItem':'selectFilterListItem'} 
                for={value}>    
            <span>{items}</span>       
            </label>       
    </div>

    );
};

export default SelectFilterList;