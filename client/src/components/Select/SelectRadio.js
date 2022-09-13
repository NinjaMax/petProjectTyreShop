import React from 'react';
import '../../css/SelectCss/SelectRadio.css';

const SelectRadio = ({radioData, titleRadio, direction}) => {
    return (
        <div className='selectRadio' style={{"--direction": direction}}>
            <span>{titleRadio}</span>
            {radioData.map((item) => 
            <div>
                <label className='selectRadioItem'>
                    <input className='inputSelectRadioItem'
                        id={item.value}
                        type="radio"
                        value={item.value}
                        name="selectRadio" /> {item.radioName}
                </label>
            </div>
            )}
     
        </div>
    );
};

export default SelectRadio;