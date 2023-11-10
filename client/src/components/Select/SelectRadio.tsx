import React from 'react';
import '../../css/SelectCss/SelectRadio.css';

interface ISelectRadio {
    radioData:{value: string, radioName: string, name: string};
    direction: string;
    addOptions?: string | boolean;
    activeOptions?:(arg: any) => void; 
    children?: any;
    disabled?: boolean;
    checked?: boolean;
}

const SelectRadio = ({
        radioData,
        addOptions, 
        direction, 
        activeOptions,
        disabled, 
        checked,
        children
    }: ISelectRadio) => {

    return (
        <div className={addOptions ? 'selectRadioActive':'selectRadio'} 
                style={{"--direction":direction} as React.CSSProperties}>   
            <div key={radioData.value}>
                <label 
                    className={disabled ? 
                        'selectRadioItemActive' : 
                        'selectRadioItem'}  
                    htmlFor={radioData.value}
                >
                    <input className='inputSelectRadioItem'
                        id={radioData.value}
                        type="radio"
                        data-select={radioData.radioName}
                        value={radioData.value}
                        name={radioData.name} 
                        onChange={activeOptions}
                        disabled={disabled}
                        checked={checked}
                    /> {radioData.radioName}            
                </label>
            </div>
            {children}
        </div>
    );
};

export default SelectRadio;