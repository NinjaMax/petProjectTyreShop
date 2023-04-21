import React from 'react';
import '../../css/AuthCss/AuthForm.css';
import { useForm } from "react-hook-form";

const AuthForm = ({confirmActive, socialGoogle, logIn}: any) => {
  const { register, handleSubmit, formState: { errors } } = useForm();

    return (
          <div className='authFormMain'>
            <div className="containerAuthForm">
              <form onSubmit={handleSubmit(data => logIn(data))}>
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
                    <a href={socialGoogle} className="google btnAuthForm" >
                      <i className="fa fa-google fa-fw"></i> Увійти з Google+
                    </a>
                  </div>

                  <div className="colAuthForm">
                    <input className='inputAuthForm'
                     type="tel" 
                     //name="phone" 
                     placeholder="номер телефона" 
                     {...register("phone", { required: true, maxLength: 12 })} 
                     required/>
                     {errors.phone && <span style={{color : "red"}}>Не вірно вказані данні*</span>}
                    <input className='inputAuthForm' 
                      type="password" 
                      //name="password" 
                      placeholder="Пароль" 
                      {...register("password", { required: true, minLength: 4 })}
                      required/>
                      {errors.password && <span style={{color : "red"}}>Це обов'язкове поле</span>}
                    <input className='inputAuthForm' 
                      type="submit"
                      value="Увійти"
                    />
                  </div>
                </div>
              </form>
            </div>
            <div className="bottomContainer">
              <div className="rowAuthForm">
                  <button type="button" className="btnAuthForm" onClick={confirmActive}>Зареєструватися</button>
                  <a href="/" className="btnAuthForm">Забули пароль?</a>
              </div>
            </div>
          </div>
    );
};

export default AuthForm;