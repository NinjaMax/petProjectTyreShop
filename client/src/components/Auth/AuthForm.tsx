import React from 'react';
import '../../css/AuthCss/AuthForm.css';

const AuthForm = ({confirmActive}: any) => {

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
                    <a href="/#" className="fb btnAuthForm">
                      <i className="fa fa-facebook fa-fw"></i> Увійти з Facebook
                    </a>
                    <a href="/#" className="twitter btnAuthForm">
                      <i className="fa fa-twitter fa-fw"></i> Увійти з Twitter
                    </a>
                    <a href="/#" className="google btnAuthForm">
                      <i className="fa fa-google fa-fw"></i> Увійти з Google+
                    </a>
                  </div>

                  <div className="colAuthForm">
                    <div className="hide-md-lg">
                      <p>Or sign in manually:</p>
                    </div>
                    <input className='inputAuthForm' type="text" name="username" placeholder="номер телефона" required/>
                    <input className='inputAuthForm' type="password" name="password" placeholder="Пароль" required/>
                    <input className='inputAuthForm' type="submit" value="Увійти"/>
                  </div>
                </div>
              </form>
            </div>
            <div className="bottomContainer">
              <div className="rowAuthForm">
                  <a href="/#" className="btnAuthForm" onClick={confirmActive}>Зареєструватися</a>
                  <a href="/#" className="btnAuthForm">Забули пароль?</a>
              </div>
            </div>
          </div>
    );
};

export default AuthForm;