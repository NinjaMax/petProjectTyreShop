import React from 'react';
import userImg from '../../assets/icons/customer64.png';
import '../../css/AuthCss/AuthView.css';

const AuthView = () => {
    return (
        <div className='authView'>
            <img id='imgCustomerAuth' src={userImg} alt='imgUser'/>
            <button className='btnAuthView'>
              <span>Мій кабінет</span>
              <i className='fa fa-caret-down'/> 
            </button>   
        </div>
    );
};

export default AuthView;