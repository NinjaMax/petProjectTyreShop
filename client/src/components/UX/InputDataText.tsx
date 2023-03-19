import React from 'react';

const InputDataText = ({inputItem}) => {
    return (
        <div>
            <input className='inputDataText' 
                type='text' 
                name={inputItem.name} 
                id={inputItem.name}  
                placeholder={inputItem.discr} 
                minLength="4" 
                maxLength={inputItem.max} 
                size={inputItem.size} 
                required
                autoComplete='true'/> 
        </div>
    );
};

export default InputDataText;