import React, { useContext } from 'react';
import '../../css/AuthCss/AuthView.css';
import userImg from '../../assets/icons/customer64.png';
import { observer } from 'mobx-react-lite';
import { Context } from '../../context/Context';

interface IAuthView {
    logOutUser(): void;
}   

const AuthView = observer(({logOutUser}:IAuthView) => {
    const {user} = useContext<any | null>(Context);
    console.log('USER', user._user.name);

    return (
        <div className='authView'>
            <label htmlFor='btnAuth'>
                <img id='imgCustomerAuth' 
                    src={user._user.picture ?? userImg} 
                    alt='imgUser'
                />
                {/* <span>{userData.name ?? 'Користувач'}</span> */}
                <button className='btnAuthView' name='btnAuth' >
                    <span>Мій кабінет</span>
                </button>
                <div className='authApprove'>
                    <div className='authApproveActive'>
                    <span className='authApproveSpan'>Мої покупки</span>
                    <span className='authApproveSpan'>Улюбленні товари</span>
                    <span className='authApproveSpan'>Коментарі</span>
                    <span className='authApproveSpan'>Налаштування</span>
                    <span className='authApproveSpan' onClick={logOutUser}>Вийти</span>
                    <i className='fa fa-caret-down'/>   
                    </div>
                </div>    
            </label>       
            
        </div>
    );
});

export default AuthView;