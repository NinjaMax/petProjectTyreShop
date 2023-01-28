import React from 'react';
import '../../css/AdminComponentCss/AdminSideBar.css';

const AdminSideBar = ({changeMenu}) => {
    return (
        <div className='adminSideBar'>
            <label className='admSideBarItem'>
                <input className='admSideBarItemMenu' 
                onClick={changeMenu} 
                name='sideBar' 
                value='golovna' 
                type='radio'/>Головна</label>
            <label className='admSideBarItem'>
                <input className='admSideBarItemMenu' 
                onClick={changeMenu}
                name='sideBar' 
                value='catalog' 
                type='radio'/>Каталог Товарів</label>
            <label className='admSideBarItem'>
                <input className='admSideBarItemMenu'
                onClick={changeMenu}
                name='sideBar' 
                value='catalog'
                type='radio'/>Замовлення</label>
            <label className='admSideBarItem'>
                <input className='admSideBarItemMenu' 
                onClick={changeMenu}
                name='sideBar' 
                value='prodagi'
                type='radio'/>Продажі</label>
            <label className='admSideBarItem'>
                <input className='admSideBarItemMenu' 
                onClick={changeMenu}
                name='sideBar' 
                value='zamovleniaPost'
                type='radio'/>Замовлення Постачальнику</label>
            <label className='admSideBarItem'>
                <input className='admSideBarItemMenu' 
                onClick={changeMenu}
                name='sideBar'  
                value='kasi'
                type='radio'/>Каси</label>
            <label className='admSideBarItem'>
                <input className='admSideBarItemMenu' 
                onClick={changeMenu}
                name='sideBar' 
                value='plategiVh'
                type='radio'/>Платежі вхідні</label>
            <label className='admSideBarItem'>
                <input className='admSideBarItemMenu' 
                onClick={changeMenu}
                name='sideBar'  
                value='plategiVih'
                type='radio'/>Платежі вихідні</label>
            <label className='admSideBarItem'>
                <input className='admSideBarItemMenu' 
                onClick={changeMenu}
                name='sideBar'  
                value='postachal'
                type='radio'/>Постачальники</label>
            <label className='admSideBarItem'>
                <input className='admSideBarItemMenu' 
                onClick={changeMenu}
                name='sideBar'  
                value='pokupci'
                type='radio'/>Покупці</label>
            <label className='admSideBarItem'>
                <input className='admSideBarItemMenu' 
                onClick={changeMenu}
                name='sideBar'  
                value='koristuvachi'
                type='radio'/>Користувачі</label>
            <label className='admSideBarItem'>
                <input className='admSideBarItemMenu' 
                onClick={changeMenu}
                name='sideBar'  
                value='zavantag'
                type='radio'/>Завантаження</label>
            <label className='admSideBarItem'>
                <input className='admSideBarItemMenu' 
                onClick={changeMenu}
                name='sideBar'  
                value='zviti'
                type='radio'/>Звіти</label>
            <label className='admSideBarItem'>
                <input className='admSideBarItemMenu' 
                onClick={changeMenu}
                name='sideBar'  
                value='nalashtuvania'
                type='radio'/>Налаштування</label>
        </div>
    );
};

export default AdminSideBar;