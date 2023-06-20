import React from 'react';
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
                    onChange={onChange}
                    name={titleName}/>
                <span className="checkmark"></span>
            </label>
        </div>
    );
};

export default CheckboxBtn;