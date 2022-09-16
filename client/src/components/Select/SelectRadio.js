import React from 'react';
import '../../css/SelectCss/SelectRadio.css';

const SelectRadio = ({radioData, addOptions, direction, checked, children}) => {

    return (
        <div className={addOptions ? 'selectRadioActive':'selectRadio'} 
            style={{"--direction": direction}}>   
            <div key={radioData.value}>
                <label className='selectRadioItem'>
                    <input className='inputSelectRadioItem'
                        id={radioData.value}
                        type="radio"
                        value={radioData.value}
                        name="selectRadio" 
                        onChange={checked}
                    /> {radioData.radioName}            
                </label>
            </div>
            {children}
        </div>
    );
};

export default SelectRadio;