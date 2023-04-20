import React from 'react';

const AuthSignUp = ({phoneNumber}:any) => {
    return (
        <div className='authFormMain'>
        <div className="containerAuthForm">
          <form action="">
              <div className='titleAuthForm'>Вхід / Реєстрація</div>
              <div className="vl">
                <span>або</span>
              </div>
            <div className="rowAuthForm">
              <div className="colAuthForm">
                <div className="hide-md-lg">
                  <p>Or sign in manually:</p>
                </div>
                <input className='inputAuthForm' 
                  type="tel" 
                  name="phone" 
                  placeholder="номер телефона"
                  defaultValue={phoneNumber} 
                  required/>
                <input className='inputAuthForm'
                  type="text" 
                  name="lastName" 
                  placeholder="імя'я" 
                  required/>
                <input className='inputAuthForm' 
                  type="password" 
                  name="password" 
                  placeholder="Пароль" 
                  required/>
                <input className='inputAuthForm' 
                  type="submit" 
                  value="Увійти"/>
              </div>
            </div>
          </form>
        </div>
        <div className="bottomContainer">
          <div className="rowAuthForm">
              <a href="/#" className="btnAuthForm" >Зареєструватися</a>
              <a href="/#" className="btnAuthForm">Забули пароль?</a>
          </div>
        </div>
      </div>
    );
};

export default AuthSignUp;