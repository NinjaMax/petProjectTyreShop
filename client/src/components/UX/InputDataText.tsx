import React from 'react';

interface IinputDataTex {
    inputItem: {
        name:string,
        discr:string,
        max:string,
        size: string  
    }
}

const InputDataText = ({inputItem}: IinputDataTex) => {
    return (
        <div>
            <input className='inputDataText' 
                type='text' 
                name={inputItem.name} 
                id={inputItem.name}  
                placeholder={inputItem.discr} 
                minLength={4} 
                maxLength={+inputItem.max} 
                data-size={inputItem.size} 
                required
                autoComplete='true'/> 
        </div>
    );
};

export default InputDataText;