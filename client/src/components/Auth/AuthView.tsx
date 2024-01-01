import React, { useContext } from 'react';
import '../../css/AuthCss/AuthView.css';
//import userImg from './customer64.png';
import { observer } from 'mobx-react-lite';
import { Context } from '../../context/Context';

interface IAuthView {
    logOutUser(): void;
}   

const AuthView = observer(({logOutUser}:IAuthView) => {
    const {customer} = useContext<any | null>(Context);
    // console.log('USER_PHONE_NAME: ', customer._customer?.sub?.name);
    // console.log('USER_SOCIAL_NAME: ', customer._customer?.name);
    // console.log('USER_TWITTER_DATA: ', customer._customer);

    return (
        <div className='authView'>
            {customer.isAuth ? 
            <>
                <img 
                    id='imgCustomerBonus'
                    src='/iconBonus/skyBonus_48_b.png' 
                    width={35}
                    height={35}
                    alt='imgCusomerBonus'
                /> 
                <span>{String(customer._customer?.contract[0]?.bonus)}</span>
            </>
            : null
            }
            <label htmlFor='btnAuth'>
                <img id='imgCustomerAuth' 
                    src={customer._customer.picture ?? 
                            customer._customer.profile_image_url ?? 
                            './customer64.png' ?? ""
                        } 
                    alt='imgUser'
                />
                {customer._customer?.name ?
                <span style={{color : "#444B54", fontSize: "8px"}}>
                    {customer._customer?.name ?? 'Користувач'}
                </span> : null
                }
                {customer._customer?.sub?.name ?
                <span style={{color : "#444B54", fontSize: "8px"}}>
                    {customer._customer?.sub?.name ?? 'Користувач'}
                </span> : null
                }
                <button className='btnAuthView' name='btnAuth' >
                    <span>Мій кабінет</span>
                </button>
                <div className='authApprove'>
                    <div className='authApproveActive'>
                    <span className='authApproveSpan'>
                        <a href='/customer/sales'>Мої покупки</a> 
                    </span>
                    <span className='authApproveSpan'>
                        <a href='/customer/comments'>Коментарі</a> 
                        </span>
                    <span className='authApproveSpan'>
                       <a href='/customer/settings'>Налаштування</a> 
                    </span>
                    <span className='authApproveSpan' onClick={logOutUser}>Вийти</span>
                    <i className='fa fa-caret-down'/>   
                    </div>
                </div>    
            </label>       
            
        </div>
    );
});

export default AuthView;