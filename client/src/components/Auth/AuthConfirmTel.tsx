import React, { useEffect, useState } from 'react';
import SpinnerWait from '../spinners/SpinnerWait';
import Timer from '../timer/Timer';
import { useForm } from 'react-hook-form';

const AuthConfirmTel = ({
    preSignUp, 
    isSendSms,
    matchUserPass,
    formError
  }: any) => {

  const [writeTel, setWriteTel] = useState<number | null>(null);
  const [passTel, setPassTel] = useState< number| null>(null);
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

  const onSubmit = (data:any) => {
    console.log('PHONE ', data.phone);   
    preSignUp(+data.phone);
  };
  console.log(typeof(writeTel));

    return (
        <div className='authFormMain'>
        <div className="containerAuthForm">
          <form onSubmit={handleSubmit(onSubmit)}>
              <div className='titleAuthForm'>Вхід / Реєстрація</div>
              <div className="colAuthForm">
                <div className="hide-md-lg">
                  <p>Or sign in manually:</p>
                </div>
                {!isSendSms ? 
                  <input className='inputAuthForm' 
                    type="tel" 
                    pattern="[0-9]{12}"
                    maxLength={12}
                    //name="username" 
                    placeholder="номер телефона 38**********"
                    //onChange={(e: any) => setWriteTel(+e.currentTarget.value)}
                    {...register("phone", { required: true, maxLength: 12 })} 
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
                    type="submit" 
                    value="Відправити SMS"
                    //onClick={() => preSignUp(writeTel)}
                  />
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
                {errors.root?.serverError.type && 
                  <span style={{color : "red", fontSize: "10px"}}>
                    {formError}
                  </span>
                }
              </div>
          </form>
        </div>
        <div className="bottomContainer">
          <div className="rowAuthForm">
              <a href="/" className="btnAuthForm">Зареєструватися</a>
              <a href="/" className="btnAuthForm">Забули пароль?</a>
          </div>
        </div>
      </div>
    );
};

export default AuthConfirmTel;