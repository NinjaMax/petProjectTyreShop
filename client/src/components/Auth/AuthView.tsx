import React, { useContext } from 'react';
import '../../css/AuthCss/AuthView.css';
import { observer } from 'mobx-react-lite';
import { Context } from '../../context/Context';

interface IAuthView {
    logOutUser(): void;
}   

const AuthView = observer(({logOutUser}:IAuthView) => {
    const {customer} = useContext<any | null>(Context);

    return (
        <div className='authView'>
            {customer?.isAuth ? 
            <>
                <img 
                    id='imgCustomerBonus'
                    src={customer?._customer?.contract && customer?._customer?.contract![0]?.bonus !== 0 ? 'iconBonus/skyBonus_48_b.webp' : 'iconBonus/skyBonus_48_g.webp'} 
                    width={35}
                    height={35}
                    alt='imgCusomerBonus'
                /> 
                <span>{customer?._customer?.contract ? String(customer?._customer?.contract![0]?.bonus) : '0'}</span>
            </>
            : null
            }
            <label htmlFor='btnAuth'>
                <img id='imgCustomerAuth' 
                    src={customer?._customer.picture ?? 
                            customer?._customer.profile_image_url ?? 
                            'img_main/customer64.webp' ?? ""
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