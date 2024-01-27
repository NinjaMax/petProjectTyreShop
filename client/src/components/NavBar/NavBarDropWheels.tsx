import React from 'react';
import '../../css/NavBarCss/NavBarDropTyres.css';
import { useTranslation } from 'react-i18next';

const NavBarDropWheels = () => {
  const { t, i18n } = useTranslation();

  return (
    <div className="dropdownNavbar">
      <button className="dropbtnNavbar" >
        <a className='navbarAnchMain' href="/wheels">
          {t('navBar.category_wheels')}&nbsp;
        </a> 
         <i className="fa fa-caret-down"></i>
      </button>
      <div className="dropdownContentNavbar">
        <div className="headerNavbar">
          <h3>{t('navBar.catalog_wheels')}</h3>
        </div>
        <div className="rowNavbar">
          <div className="columnNavbar">
            <h4>{t('navBar.catalog_wheels_by_type')}</h4>
            <a className='columnNavbarAnch' href="/wheels/stalni">{t('navBar.catalog_wheels_type_steel')}</a>
            <a className='columnNavbarAnch' href="/wheels/litoi">{t('navBar.catalog_wheels_litoi')}</a>
            <a className='columnNavbarAnch' href="/#">{t('navBar.catalog_wheels_kovani')}</a>
          </div>
          <div className="columnNavbar">
            <h4>{t('navBar.catalog_wheels_by_diameter')}</h4>
            <a className='columnNavbarAnch' href="/wheels/r13">R13</a>
            <a className='columnNavbarAnch' href="/wheels/r14">R14</a>
            <a className='columnNavbarAnch' href="/wheels/r15">R15</a>
            <a className='columnNavbarAnch' href="/wheels/r16">R16</a>
            <a className='columnNavbarAnch' href="/wheels/r17">R17</a>
            <a className='columnNavbarAnch' href="/wheels/r18">R18</a>
            <a className='columnNavbarAnch' href="/wheels/r19">R19</a>
            <a className='columnNavbarAnch' href="/wheels/r20">R20</a>
            <a className='columnNavbarAnch' href="/wheels/r21">R21</a>
            <a className='columnNavbarAnch' href="/wheels/r17.5">R17.5</a>
            <a className='columnNavbarAnch' href="/wheels/r19.5">R19.5</a>
            <a className='columnNavbarAnch' href="/wheels/r22.5">R22.5</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBarDropWheels;