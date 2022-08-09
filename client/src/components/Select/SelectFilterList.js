import React from 'react';
import '../../css/SelectCss/SelectFilterList.css';

const SelectFilterList = ({items, value, checked, onChange}) => {
    //const [checkedItem, setCheckedItem] = useState(false);

    return (

    <div className='selectFilterList'>   
        <input className='selectFilterListInput'
            id={value}
            type="radio"
            value={value}
            checked={checked === value}
            onChange={onChange}/>
            <label className='selectFilterListItem' 
                for={value}>    
            <span>{items}</span>       
            </label>       
    </div>

    );
};

export default SelectFilterList;