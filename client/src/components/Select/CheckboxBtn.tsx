import React, { useEffect, useState } from 'react';
import '../../css/SelectCss/CheckboxBtn.css';

interface ICheckBoxBtn {
    value: string;
    titleCheckbox: string;
    imageSrc?: string;
    onChange: (e: any) => void; 
    checked?: any;
    titleName?: string;
}

const CheckboxBtn = ({
    value, 
    titleCheckbox, 
    checked, 
    imageSrc,
    titleName,
    onChange
    }: ICheckBoxBtn) => {
    // const [checkedValue, setCheckedValue] = useState<boolean>(false);
    // useEffect(() => {
    //    //const checkedItem = (checked) => {
    //     //if (checked) {
    //     checked?.map((checkedItem: any) =>(
    //         checkedItem === value ? setCheckedValue(true) 
    //         : null
    //     ))
    //     //} 
    // },[checked, value])
    
    // console.log('CHECKED_VALUE: ', value,'CHECKED: ', checkedValue)
    return (
        <div>
            <label className="containerCheckbox">
                {imageSrc ? <img className='imgThorn' 
                    src={imageSrc}
                    alt='imgThorn'/> 
                    : null
                } 
                    {titleCheckbox}
                <input className='inputCheckboxBtn'
                    type="checkbox" 
                    value={value}
                    checked={checked}
                    //onClick={onChange}
                    onChange={onChange}
                    name={titleName}/>
                <span className="checkmark"></span>
            </label>
        </div>
    );
};

export default CheckboxBtn;