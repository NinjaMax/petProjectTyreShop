import React from 'react';
import '../../css/AuthCss/AuthView.css';
import userImg from '../../assets/icons/customer64.png';

interface IAuthView {
    logOutUser(): void;
    userData:{
        name: string;
        picture: string | undefined;
    };
}   

const AuthView = ({userData, logOutUser}:IAuthView) => {
    return (
        <div className='authView'>
            <label htmlFor='btnAuth'>
                <img id='imgCustomerAuth' 
                    src={userImg ?? userData.picture} 
                    alt='imgUser'
                />
                <span>{userData.name}</span>
            
                <button className='btnAuthView' name='btnAuth' >
                    <span>Мій кабінет</span>
                </button>
            </label>       
            <div className='authApprove'>
                <span>Мої покупки</span>
                <span>Улюбленні товари</span>
                <span>Коментарі</span>
                <span>Налаштування</span>
                <span onClick={() => logOutUser}>Вийти</span>
                <i className='fa fa-caret-down'/> 
            </div>    
        </div>
    );
};

export default AuthView;