import React from 'react';

interface IinputDataTex {
    inputItem: {
        name:string,
        discr:string,
        max:string,
        size: string  
    };
    inputText(arg0:any):void;
}

const InputDataText = ({inputItem, inputText}: IinputDataTex) => {
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
                autoComplete='true'
                onChange={inputText}
                /> 
        </div>
    );
};

export default InputDataText;