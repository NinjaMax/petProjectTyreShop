import React from 'react';
import '../../css/AdminComponentCss/AdminSideBar.css';

interface ISideBar {
    changeMenu(e:any): void;
    changeMenuItem:string;
}

const AdminSideBar = ({changeMenu, changeMenuItem}:ISideBar) => {
    return (
        <div className='adminSideBar'>
            <label className={changeMenuItem === 'golovna' ? 
                'admSideBarItem activeSidebarItem' : 'admSideBarItem'}
            >
                <input className='admSideBarItemMenu' 
                onClick={changeMenu} 
                name='sideBar' 
                value='golovna' 
                type="radio"
                defaultChecked/>
                <i className="fas fa-bars"></i>
                Головна 
            </label>
            <label className={changeMenuItem === 'catalog' ? 
                'admSideBarItem activeSidebarItem' : 'admSideBarItem'}
            >
                <input className='admSideBarItemMenu' 
                onClick={changeMenu}
                name='sideBar' 
                value='catalog' 
                type="radio"/>
                <i className="fas fa-archive"></i>
                Каталог Товарів
            </label>
            <label className={changeMenuItem === 'zamovlenia' ? 
                'admSideBarItem activeSidebarItem' : 'admSideBarItem'}
            >
                <input className='admSideBarItemMenu'
                onClick={changeMenu}
                name='sideBar' 
                value='zamovlenia'
                type="radio"/>
                <i className="fas fa-clipboard-list"></i>    
                Замовлення <span></span>
            </label>
            <label className={changeMenuItem === 'prodagi' ? 
                'admSideBarItem activeSidebarItem' : 'admSideBarItem'}
            >
                <input className='admSideBarItemMenu' 
                onClick={changeMenu}
                name='sideBar' 
                value='prodagi'
                type="radio"/>
                <i className="fas fa-clipboard-check"></i>
                Продажі
            </label>
            <label className={changeMenuItem === 'zamovleniaPost' ? 
                'admSideBarItem activeSidebarItem' : 'admSideBarItem'}
            >
                <input className='admSideBarItemMenu' 
                onClick={changeMenu}
                name='sideBar' 
                value='zamovleniaPost'
                type="radio"/>
                <i className="fas fa-dolly-flatbed"></i>
                Замовлення Постачальнику
            </label>
            <label className={changeMenuItem === 'kasi' ? 
                'admSideBarItem activeSidebarItem' : 'admSideBarItem'}
            >
                <input className='admSideBarItemMenu' 
                onClick={changeMenu}
                name='sideBar'  
                value='kasi'
                type="radio"/>
                <i className="fas fa-cash-register"></i>
                Каси
            </label>
            <label className={changeMenuItem === 'plategiVh' ? 
                'admSideBarItem activeSidebarItem' : 'admSideBarItem'}
            >
                <input className='admSideBarItemMenu' 
                onClick={changeMenu}
                name='sideBar' 
                value='plategiVh'
                type="radio"/>
                <i className="fas fa-file-import"></i>
                Платежі вхідні
            </label>
            <label className={changeMenuItem === 'plategiVih' ? 
                'admSideBarItem activeSidebarItem' : 'admSideBarItem'}
            >
                <input className='admSideBarItemMenu' 
                onClick={changeMenu}
                name='sideBar'  
                value='plategiVih'
                type="radio"/>
                <i className="fas fa-file-export"></i>
                Платежі вихідні
            </label>
            <label className={changeMenuItem === 'postachal' ? 
                'admSideBarItem activeSidebarItem' : 'admSideBarItem'}
            >
                <input className='admSideBarItemMenu' 
                onClick={changeMenu}
                name='sideBar'  
                value='postachal'
                type="radio"/>
                <i className="fas fa-user-tie"></i>
                Постачальники
            </label>
            <label className={changeMenuItem === 'pokupci' ? 
                'admSideBarItem activeSidebarItem' : 'admSideBarItem'}
            >
                <input className='admSideBarItemMenu' 
                onClick={changeMenu}
                name='sideBar'  
                value='pokupci'
                type="radio"/>
                <i className="fas fa-address-book"></i>
                Покупці
            </label>
            <label className={changeMenuItem === 'koristuvachi' ? 
                'admSideBarItem activeSidebarItem' : 'admSideBarItem'}
            >
                <input className='admSideBarItemMenu' 
                onClick={changeMenu}
                name='sideBar'  
                value='koristuvachi'
                type="radio"/>
                <i className="fas fa-users"></i>
                Користувачі
            </label>
            <label className={changeMenuItem === 'zavantag' ? 
                'admSideBarItem activeSidebarItem' : 'admSideBarItem'}
            >
                <input className='admSideBarItemMenu' 
                onClick={changeMenu}
                name='sideBar'  
                value='zavantag'
                type="radio"/>
                <i className="fas fa-download"></i>
                Завантаження
            </label>
            <label className={changeMenuItem === 'zviti' ? 
                'admSideBarItem activeSidebarItem' : 'admSideBarItem'}
            >
                <input className='admSideBarItemMenu' 
                onClick={changeMenu}
                name='sideBar'  
                value='zviti'
                type="radio"/>
                <i className="fas fa-chart-line"></i>   
                Звіти
            </label>
            <label className={changeMenuItem === 'nalashtuvania' ? 
                'admSideBarItem activeSidebarItem' : 'admSideBarItem'}
            >
                <input className='admSideBarItemMenu' 
                onClick={changeMenu}
                name='sideBar'  
                value='nalashtuvania'
                type="radio"/>
                <i className="fas fa-cogs"></i>
                Налаштування
            </label>
        </div>
    );
};

export default AdminSideBar;