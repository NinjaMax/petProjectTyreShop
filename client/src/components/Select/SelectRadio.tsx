import React from 'react';
import '../../css/SelectCss/SelectRadio.css';

interface ISelectRadio {
    radioData:{value: string, radioName: string};
    direction: string;
    addOptions?: string | boolean;
    activeOptions?:(arg: any) => void; 
    children?: any;
}

const SelectRadio = (
        {radioData, addOptions, direction, activeOptions, children}: ISelectRadio
    ) => {

    return (
        <div className={addOptions ? 'selectRadioActive':'selectRadio'} 
                data-style={{"--direction": direction}}>   
            <div key={radioData.value}>
                <label className='selectRadioItem'>
                    <input className='inputSelectRadioItem'
                        id={radioData.value}
                        type="radio"
                        value={radioData.value}
                        name="selectRadio" 
                        onChange={activeOptions}
                    /> {radioData.radioName}            
                </label>
            </div>
            {children}
        </div>
    );
};

export default SelectRadio;