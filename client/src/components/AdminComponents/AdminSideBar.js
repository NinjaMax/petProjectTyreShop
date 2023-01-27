import React from 'react';
import '../../css/AdminComponentCss/AdminSideBar.css';

const AdminSideBar = () => {
    return (
        <div className='adminSideBar'>
            <div>Головна</div>
            <div>Каталог Товарів</div>
            <div>Замовлення</div>
            <div>Продажі</div>
            <div>Замовлення Постачальнику</div>
            <div>Каси</div>
            <div>Платежі вхідні</div>
            <div>Платежі вихідні</div>
            <div>Постачальники</div>
            <div>Покупці</div>
            <div>Користувачі</div>
            <div>Завантаження</div>
            <div>Звіти</div>
            <div>Налаштування</div>
        </div>
    );
};

export default AdminSideBar;