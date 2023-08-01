import React from 'react';
import '../../css/SelectCss/SelectRadio.css';

interface ISelectRadio {
    radioData:{value: string, radioName: string, name: string};
    direction: string;
    addOptions?: string | boolean;
    activeOptions?:(arg: any) => void; 
    children?: any;
    disabled?: boolean;
}

const SelectRadio = ({
        radioData,
        addOptions, 
        direction, 
        activeOptions,
        disabled, 
        children
    }: ISelectRadio) => {

    return (
        <div className={addOptions ? 'selectRadioActive':'selectRadio'} 
                data-style={{"--direction": direction}}>   
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
                    /> {radioData.radioName}            
                </label>
            </div>
            {children}
        </div>
    );
};

export default SelectRadio;