import React from 'react';
import '../../css/UXcss/InputDataText.css';

interface IinputDataTex {
    inputItem: {
        name:string,
        discr:string,
        max:string,
        size: string  
    };
    inputText(arg0:any):void;
    dataEmail?: string | null;
    dataText?: string;
}

const InputDataText = ({dataEmail, dataText, inputItem, inputText}: IinputDataTex) => {
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
                value={dataEmail ?? dataText ?? ''}
                required
                autoComplete='true'
                onChange={inputText}
                /> 
        </div>
    );
};

export default InputDataText;