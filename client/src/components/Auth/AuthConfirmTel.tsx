import React from 'react';

const AuthConfirmTel = ({
    sendSms, 
    signUp,
    inputTelAuth, 
    sendSmsPass, 
    //authNewCustomer
  }: any) => {


    return (
        <div className='authFormMain'>
        <div className="containerAuthForm">
          <form action="">
              <div className='titleAuthForm'>Вхід / Реєстрація</div>
              <div className="colAuthForm">
                <div className="hide-md-lg">
                  <p>Or sign in manually:</p>
                </div>
                <input className='inputAuthForm' 
                  type="text" 
                  name="username" 
                  placeholder="номер телефона"
                  onChange={inputTelAuth} 
                  required/>
                {signUp ?
                  <input className='inputAuthForm' 
                    type="password" name="password" 
                    placeholder="Пароль із SMS" 
                    required/>
                  : null
                }
                {sendSms && !signUp ?
                  <input className='inputAuthForm' 
                    //type="submit" 
                    value="Відправити SMS"
                    onClick={sendSmsPass}/>
                  : null
                }
                {signUp ?
                  <input className='inputAuthForm' 
                    type="submit" 
                    value="Зареєструватися"
                    onClick={authNewCustomer}
                    />
                  : null
                }
              </div>
          </form>
        </div>
        <div className="bottomContainer">
          <div className="rowAuthForm">
              <a href="/#" className="btnAuthForm">Зареєструватися</a>
              <a href="/#" className="btnAuthForm">Забули пароль?</a>
          </div>
        </div>
      </div>
    );
};

export default AuthConfirmTel;