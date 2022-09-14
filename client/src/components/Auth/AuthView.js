import React from 'react';
import userImg from '../../assets/icons/customer64.png';
import '../../css/AuthCss/AuthView.css';

const AuthView = ({setActive}) => {
    return (
        <div className='authView'>
            <label htmfor='btnAuth'onClick={setActive}>
                <img id='imgCustomerAuth' src={userImg} alt='imgUser'/>
            
                <button className='btnAuthView' name='btnAuth' >
                    <span>Мій кабінет</span>
                </button>
            </label>       
            <div className='authApprove'>
                <span>Мої покупки</span>
                <span>Улюбленні товари</span>
                <span>Коментарі</span>
                <span>Налаштування</span>
                <i className='fa fa-caret-down'/> 
            </div>
             

        </div>
    );
};

export default AuthView;