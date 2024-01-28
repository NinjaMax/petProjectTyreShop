import React from 'react';
import '../../css/NavBarCss/NavBarDropTyres.css';
import { useTranslation } from 'react-i18next';

const NavBarDropTyres = () => {
  const { t, i18n } = useTranslation();
  
    return (
    <div className="dropdownNavbar">
      <button className="dropbtnNavbar" >
        <a className='navbarAnchMain' 
          href={i18n.resolvedLanguage === 'uk' ? '/tyres' : 'ru/tyres'}>
          {t('navBar.category_tyres')}&nbsp; 
        </a> 
         <i className="fa fa-caret-down"></i>
      </button>
      <div className="dropdownContentNavbar">
        <div className="headerNavbar">
          <h3>{t('navBar.catalog_tyres')}</h3>
        </div>
        <div className="rowNavbar">
          <div className="columnNavbar">
            <h4>{t('navBar.catalog_tyres_by_season')}</h4>
            <a className='columnNavbarAnch' 
              href={i18n.resolvedLanguage === 'uk' ? '/tyres/litni' : 'ru/tyres/letnie'}>
              {t('navBar.catalog_tyres_season_litni')}
            </a>
            <a className='columnNavbarAnch' 
              href={i18n.resolvedLanguage === 'uk' ? '/tyres/zimni' : 'ru/tyres/zimnie'}>
              {t('navBar.catalog_tyres_season_zimovi')}
            </a>
            <a className='columnNavbarAnch' 
              href={i18n.resolvedLanguage === 'uk' ? '/tyres/vsesezon' : 'ru/tyres/vsesezon'}>
              {t('navBar.catalog_tyres_season_vsesozon')}
            </a>
          </div>
          <div className="columnNavbar">
            <h4>{t('navBar.catalog_tyres_by_type')}</h4>
            <a className='columnNavbarAnch' 
              href={i18n.resolvedLanguage === 'uk' ? '/tyres/legkovi' : 'ru/tyres/legkovie'}>
              {t('navBar.catalog_tyres_type_legkovi')}
            </a>
            <a className='columnNavbarAnch' 
              href={i18n.resolvedLanguage === 'uk' ? '/tyres/gruzovi' : 'ru/tyres/gruzovie'}>
              {t('navBar.catalog_tyres_type_gruzovi')}
            </a>
            <a className='columnNavbarAnch' 
              href={i18n.resolvedLanguage === 'uk' ? '/tyres/vnedorognik' : 'ru/tyres/vnedorognik'}>
              {t('navBar.catalog_tyres_type_pozashliahovik')}
            </a>
            <a className='columnNavbarAnch' 
              href="/tyres/microavtobus">{t('navBar.catalog_tyres_type_microavtobus')}</a>
            <a className='columnNavbarAnch' 
              href="/tyres/selhoz">{t('navBar.catalog_tyres_type_sh')}</a>
            <a className='columnNavbarAnch' 
              href="/tyres/spectehnika">{t('navBar.catalog_tyres_type_spectehnika')}</a>
            <a className='columnNavbarAnch' 
              href="/tyres/moto">{t('navBar.catalog_tyres_type_moto')}</a>
          </div>
          <div className="columnNavbar">
            <h4>{t('navBar.catalog_tyres_by_diameter')}</h4>
            <a className='columnNavbarAnch' href="/tyres/r13">R13</a>
            <a className='columnNavbarAnch' href="/tyres/r14">R14</a>
            <a className='columnNavbarAnch' href="/tyres/r15">R15</a>
            <a className='columnNavbarAnch' href="/tyres/r16">R16</a>
            <a className='columnNavbarAnch' href="/tyres/r17">R17</a>
            <a className='columnNavbarAnch' href="/tyres/r18">R18</a>
            <a className='columnNavbarAnch' href="/tyres/r19">R19</a>
            <a className='columnNavbarAnch' href="/tyres/r20">R20</a>
            <a className='columnNavbarAnch' href="/tyres/r21">R21</a>
            <a className='columnNavbarAnch' href="/tyres/r17.5">R17.5</a>
            <a className='columnNavbarAnch' href="/tyres/r19.5">R19.5</a>
            <a className='columnNavbarAnch' href="/tyres/r22.5">R22.5</a>
          </div>
        </div>
      </div>
    </div>
        
    );
};

export default NavBarDropTyres;