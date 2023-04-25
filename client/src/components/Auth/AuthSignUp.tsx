import React, { useEffect } from 'react';
import '../../css/AuthCss/AuthSignUp.css';
import { useForm } from "react-hook-form";


const AuthSignUp = ({phoneNumber, signUpAuth, formError}:any) => {
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
        <div className="containerAuthSignUp">
          <form onSubmit={handleSubmit((data) => signUpAuth(data))}>
              <div className='titleAuthSignUp'>Реєстрація</div>
            <div className="rowAuthSignUp">
              <div className="colAuthSignUp">
                <input className='inputAuthSignUp' 
                  type="tel" 
                  //name="phone" 
                  placeholder="номер телефона"
                  defaultValue={phoneNumber} 
                  {...register("phone", { required: true, maxLength: 12 })}
                  required/>
                  {errors.phone && 
                    <span style={{color : "red", fontSize: "10px"}}>
                    *номер повинен починатись на 38 та містити взагалі 12 цифр*
                  </span>}
                <input className='inputAuthSignUp'
                  type="text" 
                  //name="name" 
                  placeholder="імя'я"
                  {...register("name", { required: true, minLength: 2 })} 
                  required/>
                  {errors.name && 
                  <span style={{color : "red", fontSize: "10px"}}>
                    *Мінімальна кількість символів 2*
                  </span>}
                <input className='inputAuthSignUp' 
                  type="password" 
                  //name="password" 
                  placeholder="Пароль" 
                  {...register("password", { required: true, minLength: 4 })}
                  required/>
                  {errors.password && 
                  <span style={{color : "red", fontSize: "10px"}}>
                    *Мінімальна кількість символів 4*
                  </span>}
                  {errors.root?.serverError.type && 
                    <span style={{color : "red", fontSize: "10px"}}>
                      {formError}
                    </span>
                  }
                <input className='inputAuthSignUp' 
                  type="submit" 
                  value="Увійти"/>
              </div>
            </div>
          </form>
        </div>
        <div className="bottomContainer">
          <div className="rowAuthSignUp">
              <a href="/" className="btnAuthSignUp" >Зареєструватися</a>
              <a href="/" className="btnAuthSignUp">Забули пароль?</a>
          </div>
        </div>
      </div>
    );
};

export default AuthSignUp;