import React from 'react';
import '../../css/AuthCss/AdminAuth.css';

const Admin = () => {
    return (
        <div className='adminPageAuth'>
            Admin Page
            <div className='adminWindowEnter'>
                    <span>Вхід до адмін панелі</span>
                    <input className='inputAdminForm' type="text" name="username" placeholder="email або телефон" required/>
                    <input className='inputAdminForm' type="password" name="password" placeholder="Пароль" required/>
                    <input className='inputAdminForm' type="submit" value="Увійти"/>
            </div>
        </div>
    );
};

export default Admin;