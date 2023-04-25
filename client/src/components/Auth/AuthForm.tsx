import React, { useEffect } from 'react';
import '../../css/AuthCss/AuthForm.css';
import { useForm } from "react-hook-form";

const AuthForm = ({confirmActive, socialGoogle, socialFacebook, logIn, formError}: any) => {
  const { register, handleSubmit, setError, formState: { errors } } = useForm({
    criteriaMode: 'all',
  });

  useEffect(() => {
    let isError = false;
    if(!isError && formError) {
      setError('root.serverError', { 
        type: formError,
      })
    }
    return () => {isError = true}
  },[formError, setError]);

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
                    <a href={socialFacebook} className="fb btnAuthForm">
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
                     {errors.phone && 
                      <span style={{color : "red", fontSize: "10px"}}>
                        *номер повинен починатись на 38 та містити взагалі 12 цифр*
                      </span>}
                    <input className='inputAuthForm' 
                      type="password" 
                      //name="password" 
                      placeholder="Пароль" 
                      {...register("password", { required: true, minLength: 4 })}
                      required/>
                      {errors.password && 
                      <span style={{color : "red", fontSize: "10px"}}>
                        Це обов'язкове поле
                      </span>
                      }
                      {errors.root?.serverError.type && 
                        <span style={{color : "red", fontSize: "10px"}}>
                          {formError}
                        </span>
                      }
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
                  <button type="button" className="btnAuthForm">Забули пароль?</button>
              </div>
            </div>
          </div>
    );
};

export default AuthForm;