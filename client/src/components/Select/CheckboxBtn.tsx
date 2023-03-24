import React from 'react';
import '../../css/SelectCss/CheckboxBtn.css';

interface ICheckBoxBtn {
    value: string;
    titleCheckbox: string;
    imageSrc?: string;
}

const CheckboxBtn = (
    {value, titleCheckbox, imageSrc}: ICheckBoxBtn
    ) => {
    return (
        <div>
            <label className="containerCheckbox">
                {imageSrc? <img className='imgThorn' 
                    src={imageSrc}
                    alt='imgThorn'/> : null} {titleCheckbox}
                <input className='inputCheckboxBtn' 
                    type="checkbox" 
                    value={value} 
                    name="selectCheckbox"/>
                <span className="checkmark"></span>
            </label>
        </div>
    );
};

export default CheckboxBtn;