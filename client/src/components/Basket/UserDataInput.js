import React from 'react';

const UserDataInput = ({inputItem}) => {
    return (
        <div>
            <input className='inputBasketOrderName' 
                type='text' 
                name={inputItem.name} 
                id={inputItem.name}  
                placeholder={inputItem.discr} 
                minLength={inputItem.min} 
                maxLength={inputItem.max} 
                size={inputItem.size} 
                required/> 
        </div>
    );
};

export default UserDataInput;