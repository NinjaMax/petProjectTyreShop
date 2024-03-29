import React, { useContext, useEffect, useState } from 'react';
import '../../css/AuthCss/AdminAuth.css';
import { useForm } from 'react-hook-form';
import { Context } from '../../context/Context';
import { getCurUser, logInUser } from '../../restAPI/restUsersApi';
import { observer } from 'mobx-react-lite';
import { useHistory } from 'react-router-dom';

const AdminAuth = observer(() => {
  const {user} = useContext<any | null>(Context);
  const history = useHistory();
  const [userAuth, setUserAuth] = useState(false);
  const [formError, setFormError] = useState('');
  const { register, handleSubmit, setError, formState: { errors } } = useForm({
      criteriaMode: 'all',
    });
  useEffect(() => {
    setError('root.serverError', { 
        type: formError,
      })
  },[formError, setError])
  
  const logInAdmin = async(data: any) => {
    try {
      const logIn = await logInUser(data);
      console.log('LOGIN_ADMIN_DATA:', logIn);
      console.log('USER_isAUTH: ',user.isAuth);
      if(logIn) {
        user.setIsAuth(true);
        setUserAuth(true);
      }
    } catch (error: any) {
      setFormError(error.response?.data.message);
      console.log(error.response?.data.message);
    }  
  };
 
  useEffect(() => {
    let isUser = false;
    const getUserAuth = async() => {
    const curUser = await getCurUser();
      if (userAuth || (curUser && !isUser)) {
        user.setUser(curUser);
        user.setIsAuth(true);
        setUserAuth(true);
        history.push('/admin');
      }
    }  
      getUserAuth(); 
    return () => {isUser= true}
  }, [user, history, userAuth])

    return (
      <div className='authFormAdmin'>
        <div className="containerAuthAdmin">
          <form onSubmit={handleSubmit((data:any) => logInAdmin(data))}>
            <div className='titleAuthForm'>Вхід в Адмін сторінку.</div>
              <div className="rowAuthAdmin">
                <div className="colAuthAdmin">
                  <input className='inputAuthAdmin'
                   type="tel" 
                   placeholder="номер телефона 38**" 
                   {...register("phone", { required: true, maxLength: 12 })} 
                   required
                  />
                   {errors.phone && 
                    <span style={{color : "red", fontSize: "10px"}}>
                      *номер повинен починатись на 38 та містити взагалі 12 цифр*
                    </span>}
                  <input className='inputAuthAdmin' 
                    type="password" 
                    placeholder="Пароль" 
                    {...register("password", { required: true, minLength: 4 })}
                    required
                  />
                    {errors.password && 
                    <span style={{color : "red", fontSize: "10px"}}>
                      *Це обов'язкове поле*не менше 4-х символів*
                    </span>
                    }
                    {errors.root?.serverError.type && 
                      <span style={{color : "red", fontSize: "10px"}}>
                        {formError}
                      </span>
                    }
                  <input className='inputAuthAdmin' 
                    type="submit"
                    value="Увійти"
                  />
                </div>
              </div>
          </form>
        </div>
        <div className="bottomContainerAdmin">
          <div className="rowAuthAdmin">
            <button type="button" className="btnAuthAdmin">Зареєструватися</button>
            <button type="button" className="btnAuthAdmin">Забули пароль?</button>
          </div>
        </div>
    </div>
  );
});

export default AdminAuth;