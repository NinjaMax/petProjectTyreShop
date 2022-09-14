import React from 'react';
import '../../css/SelectCss/SelectRadio.css';

const SelectRadio = ({radioData, titleRadio, direction, checked}) => {
    return (
        <div className='selectRadio' style={{"--direction": direction}}>
            <span>{titleRadio}</span>
            {radioData.map((item) => 
            <div key={item.value}>
                <label className='selectRadioItem'>
                    <input className='inputSelectRadioItem'
                        id={item.value}
                        type="radio"
                        value={item.value}
                        name="selectRadio" 
                        onChange={checked}
                        /> {item.radioName}
                </label>
            </div>
            )}
     
        </div>
    );
};

export default SelectRadio;