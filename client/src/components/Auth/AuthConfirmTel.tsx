import React, { useState } from 'react';
import SpinnerCarRot from '../spinners/SpinnerCarRot';
import SpinnerWait from '../spinners/SpinnerWait';
import Timer from '../timer/Timer';

const AuthConfirmTel = ({
    preSignUp, 
    isSendSms,
    matchUserPass
  }: any) => {

    const [writeTel, setWriteTel] = useState<number | null>(null);
    const [passTel, setPassTel] = useState< number| null>(null);

    console.log(typeof(writeTel));

    return (
        <div className='authFormMain'>
        <div className="containerAuthForm">
          <form action="">
              <div className='titleAuthForm'>Вхід / Реєстрація</div>
              <div className="colAuthForm">
                <div className="hide-md-lg">
                  <p>Or sign in manually:</p>
                </div>
                {!isSendSms ? 
                  <input className='inputAuthForm' 
                    type="tel" 
                    pattern="[0-9]{3}"
                    maxLength="12"
                    name="username" 
                    placeholder="номер телефона 38**********"
                    onChange={(e: any) => setWriteTel(+e.currentTarget.value)} 
                    required/>
                  :null
                }
                {isSendSms ?
                  <input className='inputAuthForm' 
                    type="password" 
                    name="passwordSms" 
                    placeholder="Пароль із SMS"
                    onChange={(e: any) => setPassTel(+e.currentTarget.value)} 
                    required/>
                  : null
                }
                {!isSendSms ?
                  <input className='inputAuthForm' 
                    type="button" 
                    value="Відправити SMS"
                    onClick={() => preSignUp(writeTel)}/>
                  : null
                }
                {isSendSms ?
                  <input className='inputAuthForm' 
                    type="button" 
                    value="Підтвердження"
                    onClick={() => matchUserPass(passTel)}
                    />
                  : null
                }
                {isSendSms ?
                  <>
                    <SpinnerWait />
                    <Timer minutes={1} seconds={30} />
                  </>
                  : null
                }
                
                {/* {signUp ?
                  <input className='inputAuthForm' 
                    type="submit" 
                    value="Зареєструватися"
                    onClick={authNewCustomer}
                    />
                  : null
                } */}
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