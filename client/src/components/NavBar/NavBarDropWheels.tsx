import React from 'react';
import '../../css/NavBarCss/NavBarDropTyres.css';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

const NavBarDropWheels = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation<any>();

  return (
    <div className="dropdownNavbar">
      <button className="dropbtnNavbar" >
        {location.pathname.includes('wheels') || location.pathname.includes('tyres') ?
          <>
          <a className='navbarAnchMain' 
            href={i18n.resolvedLanguage === 'uk' ? '/' : '/ru/wheels'}>
            {t('navBar.category_wheels')}&nbsp;
          </a> 
          <i className="fa fa-caret-down"></i>
          </>
          :
          <>
          <a className='navbarAnchMain' 
            href={i18n.resolvedLanguage === 'uk' ? '/wheels' : '/ru/wheels'}>
            {t('navBar.category_wheels')}&nbsp;
          </a> 
          <i className="fa fa-caret-down"></i>
          </>
        }
      </button>
      <div className="dropdownContentNavbar">
        <div className="headerNavbar">
          <h3>{t('navBar.catalog_wheels')}</h3>
        </div>
        <div className="rowNavbar">
        {location.pathname.includes('wheels') || location.pathname.includes('tyres') ?
          <div className="columnNavbar">
            <h4>{t('navBar.catalog_wheels_by_type')}</h4>
            <a className='columnNavbarAnch' href={i18n.resolvedLanguage === 'uk' ? "/stalni" : "/ru/wheels/stalnoi"}>{t('navBar.catalog_wheels_type_steel')}</a>
            <a className='columnNavbarAnch' href={i18n.resolvedLanguage === 'uk' ? "/litoi" : "/ru/wheels/litoi"}>{t('navBar.catalog_wheels_litoi')}</a>
            <a className='columnNavbarAnch' href={i18n.resolvedLanguage === 'uk' ? "/kovani" : "/ru/wheels/kovani"}>{t('navBar.catalog_wheels_kovani')}</a>
          </div>
          :
          <div className="columnNavbar">
            <h4>{t('navBar.catalog_wheels_by_type')}</h4>
            <a className='columnNavbarAnch' href={i18n.resolvedLanguage === 'uk' ? "/wheels/stalni" : "/ru/wheels/stalnoi"}>{t('navBar.catalog_wheels_type_steel')}</a>
            <a className='columnNavbarAnch' href={i18n.resolvedLanguage === 'uk' ? "/wheels/litoi" : "/ru/wheels/litoi"}>{t('navBar.catalog_wheels_litoi')}</a>
            <a className='columnNavbarAnch' href={i18n.resolvedLanguage === 'uk' ? "/wheels/kovani" : "/ru/wheels/kovani"}>{t('navBar.catalog_wheels_kovani')}</a>
          </div>
        }
        {location.pathname.includes('wheels') || location.pathname.includes('tyres') ?
          <div className="columnNavbar">
            <h4>{t('navBar.catalog_wheels_by_diameter')}</h4>
            <a className='columnNavbarAnch' href={i18n.resolvedLanguage === 'uk' ? "/r13" : "/ru/wheels/r13"}>R13</a>
            <a className='columnNavbarAnch' href={i18n.resolvedLanguage === 'uk' ? "/r14" : "/ru/wheels/r14"}>R14</a>
            <a className='columnNavbarAnch' href={i18n.resolvedLanguage === 'uk' ? "/r15" : "/ru/wheels/r15"}>R15</a>
            <a className='columnNavbarAnch' href={i18n.resolvedLanguage === 'uk' ? "/r16" : "/ru/wheels/r16"}>R16</a>
            <a className='columnNavbarAnch' href={i18n.resolvedLanguage === 'uk' ? "/r17" : "/ru/wheels/r17"}>R17</a>
            <a className='columnNavbarAnch' href={i18n.resolvedLanguage === 'uk' ? "/r18" : "/ru/wheels/r18"}>R18</a>
            <a className='columnNavbarAnch' href={i18n.resolvedLanguage === 'uk' ? "/r19" : "/ru/wheels/r19"}>R19</a>
            <a className='columnNavbarAnch' href={i18n.resolvedLanguage === 'uk' ? "/r20" : "/ru/wheels/r20"}>R20</a>
            <a className='columnNavbarAnch' href={i18n.resolvedLanguage === 'uk' ? "/r21" : "/ru/wheels/r21"}>R21</a>
            <a className='columnNavbarAnch' href={i18n.resolvedLanguage === 'uk' ? "/r17.5" : "/ru/wheels/r17.5"}>R17.5</a>
            <a className='columnNavbarAnch' href={i18n.resolvedLanguage === 'uk' ? "/r19.5" : "/ru/wheels/r19.5"}>R19.5</a>
            <a className='columnNavbarAnch' href={i18n.resolvedLanguage === 'uk' ? "/r22.5" : "/ru/wheels/r22.5"}>R22.5</a>
          </div>
          :
          <div className="columnNavbar">
          <h4>{t('navBar.catalog_wheels_by_diameter')}</h4>
          <a className='columnNavbarAnch' href={i18n.resolvedLanguage === 'uk' ? "/wheels/r13" : "/ru/wheels/r13"}>R13</a>
          <a className='columnNavbarAnch' href={i18n.resolvedLanguage === 'uk' ? "/wheels/r14" : "/ru/wheels/r14"}>R14</a>
          <a className='columnNavbarAnch' href={i18n.resolvedLanguage === 'uk' ? "/wheels/r15" : "/ru/wheels/r15"}>R15</a>
          <a className='columnNavbarAnch' href={i18n.resolvedLanguage === 'uk' ? "/wheels/r16" : "/ru/wheels/r16"}>R16</a>
          <a className='columnNavbarAnch' href={i18n.resolvedLanguage === 'uk' ? "/wheels/r17" : "/ru/wheels/r17"}>R17</a>
          <a className='columnNavbarAnch' href={i18n.resolvedLanguage === 'uk' ? "/wheels/r18" : "/ru/wheels/r18"}>R18</a>
          <a className='columnNavbarAnch' href={i18n.resolvedLanguage === 'uk' ? "/wheels/r19" : "/ru/wheels/r19"}>R19</a>
          <a className='columnNavbarAnch' href={i18n.resolvedLanguage === 'uk' ? "/wheels/r20" : "/ru/wheels/r20"}>R20</a>
          <a className='columnNavbarAnch' href={i18n.resolvedLanguage === 'uk' ? "/wheels/r21" : "/ru/wheels/r21"}>R21</a>
          <a className='columnNavbarAnch' href={i18n.resolvedLanguage === 'uk' ? "/wheels/r17.5" : "/ru/wheels/r17.5"}>R17.5</a>
          <a className='columnNavbarAnch' href={i18n.resolvedLanguage === 'uk' ? "/wheels/r19.5" : "/ru/wheels/r19.5"}>R19.5</a>
          <a className='columnNavbarAnch' href={i18n.resolvedLanguage === 'uk' ? "/wheels/r22.5" : "/ru/wheels/r22.5"}>R22.5</a>
        </div>
        }
        </div>
      </div>
    </div>
  );
};

export default NavBarDropWheels;