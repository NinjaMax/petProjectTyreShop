import React from 'react';
import '../../css/NavBarCss/NavBarDropTyres.css';
import { useTranslation } from 'react-i18next';
import { useLocation, useParams } from 'react-router-dom';

const NavBarDropTyres = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation<any>();
  const params = useParams<any>();

    return (
    <div className="dropdownNavbar">
      <button className="dropbtnNavbar">
        {location.pathname.includes('tyres') || location.pathname.includes('wheels') ?
          <>
            <a className='navbarAnchMain' 
              href={i18n.resolvedLanguage === 'uk' && !params.ru ? '/' : '/ru/tyres'}>
              {t('navBar.category_tyres')}&nbsp; 
            </a> 
            <i className="fa fa-caret-down"></i>
          </> : 
          <>
            <a className='navbarAnchMain' 
              href={i18n.resolvedLanguage === 'uk' && !params.ru ? '/tyres' : '/ru/tyres'}>
              {t('navBar.category_tyres')}&nbsp; 
            </a> 
            <i className="fa fa-caret-down"></i>
          </>
        }
      </button>
      <div className="dropdownContentNavbar">
        <div className="headerNavbar">
          <h3>{t('navBar.catalog_tyres')}</h3>
        </div>
        <div className="rowNavbar">
        {location.pathname.includes('tyres') || location.pathname.includes('wheels') ?
          <div className="columnNavbar">
            <h4>{t('navBar.catalog_tyres_by_season')}</h4>
            <a className='columnNavbarAnch' 
              href={i18n.resolvedLanguage === 'uk' && !params.ru ? '/litni' : '/ru/tyres/letnyaya'}>
              {t('navBar.catalog_tyres_season_litni')}
            </a>
            <a className='columnNavbarAnch' 
              href={i18n.resolvedLanguage === 'uk' && !params.ru ? '/zimni' : '/ru/tyres/zimnyaya'}>
              {t('navBar.catalog_tyres_season_zimovi')}
            </a>
            <a className='columnNavbarAnch' 
              href={i18n.resolvedLanguage === 'uk' && !params.ru ? '/vsesezon' : '/ru/tyres/vsesezonnaya'}>
              {t('navBar.catalog_tyres_season_vsesozon')}
            </a>
          </div> 
          :
          <div className="columnNavbar">
          <h4>{t('navBar.catalog_tyres_by_season')}</h4>
          <a className='columnNavbarAnch' 
            href={i18n.resolvedLanguage === 'uk' && !params.ru ? '/tyres/litni' : '/ru/tyres/letnyaya'}>
            {t('navBar.catalog_tyres_season_litni')}
          </a>
          <a className='columnNavbarAnch' 
            href={i18n.resolvedLanguage === 'uk' && !params.ru ? '/tyres/zimni' : '/ru/tyres/zimnyaya'}>
            {t('navBar.catalog_tyres_season_zimovi')}
          </a>
          <a className='columnNavbarAnch' 
            href={i18n.resolvedLanguage === 'uk' && !params.ru ? '/tyres/vsesezon' : '/ru/tyres/vsesezonnaya'}>
            {t('navBar.catalog_tyres_season_vsesozon')}
          </a>
        </div>
        }
        {location.pathname.includes('tyres') || location.pathname.includes('wheels') ?
          <div className="columnNavbar">
            <h4>{t('navBar.catalog_tyres_by_type')}</h4>
            <a className='columnNavbarAnch' 
              href={i18n.resolvedLanguage === 'uk' ? '/legkovi' : '/ru/tyres/legkovie'}>
              {t('navBar.catalog_tyres_type_legkovi')}
            </a>
            <a className='columnNavbarAnch' 
              href={i18n.resolvedLanguage === 'uk' ? '/gruzovi' : '/ru/tyres/gruzovie'}>
              {t('navBar.catalog_tyres_type_gruzovi')}
            </a>
            <a className='columnNavbarAnch' 
              href={i18n.resolvedLanguage === 'uk' ? '/vnedorognik' : '/ru/tyres/vnedorognik'}>
              {t('navBar.catalog_tyres_type_pozashliahovik')}
            </a>
            <a className='columnNavbarAnch' 
              href={i18n.resolvedLanguage === 'uk' ? "/legkovantazhnii" : "/ru/tyres/legkogruzovoi"}>{t('navBar.catalog_tyres_type_microavtobus')}</a>
            <a className='columnNavbarAnch' 
              href={i18n.resolvedLanguage === 'uk' ? "/sg" : "/ru/tyres/s-kh"}>{t('navBar.catalog_tyres_type_sh')}</a>
            <a className='columnNavbarAnch' 
              href={i18n.resolvedLanguage === 'uk' ? "/industrialna" : "/ru/tyres/industrialnaya"}>{t('navBar.catalog_tyres_type_spectehnika')}</a>
            <a className='columnNavbarAnch' 
              href={i18n.resolvedLanguage === 'uk' ? "/moto" : "/ru/tyres/moto"}>{t('navBar.catalog_tyres_type_moto')}</a>
          </div>
          : 
          <div className="columnNavbar">
          <h4>{t('navBar.catalog_tyres_by_type')}</h4>
          <a className='columnNavbarAnch' 
            href={i18n.resolvedLanguage === 'uk' ? '/tyres/legkovi' : '/ru/tyres/legkovie'}>
            {t('navBar.catalog_tyres_type_legkovi')}
          </a>
          <a className='columnNavbarAnch' 
            href={i18n.resolvedLanguage === 'uk' ? '/tyres/gruzovi' : '/ru/tyres/gruzovie'}>
            {t('navBar.catalog_tyres_type_gruzovi')}
          </a>
          <a className='columnNavbarAnch' 
            href={i18n.resolvedLanguage === 'uk' ? '/tyres/vnedorognik' : '/ru/tyres/vnedorognik'}>
            {t('navBar.catalog_tyres_type_pozashliahovik')}
          </a>
          <a className='columnNavbarAnch' 
            href={i18n.resolvedLanguage === 'uk' ? "/tyres/legkovantazhnii" : "/ru/tyres/legkogruzovoi"}>{t('navBar.catalog_tyres_type_microavtobus')}</a>
          <a className='columnNavbarAnch' 
            href={i18n.resolvedLanguage === 'uk' ? "/tyres/sg" : "/ru/tyres/s-kh"}>{t('navBar.catalog_tyres_type_sh')}</a>
          <a className='columnNavbarAnch' 
            href={i18n.resolvedLanguage === 'uk' ? "/tyres/industrialna" : "/ru/tyres/industrialnaya"}>{t('navBar.catalog_tyres_type_spectehnika')}</a>
          <a className='columnNavbarAnch' 
            href={i18n.resolvedLanguage === 'uk' ? "/tyres/moto" : "/ru/tyres/moto"}>{t('navBar.catalog_tyres_type_moto')}</a>
        </div>
        }
        {location.pathname.includes('tyres') || location.pathname.includes('wheels') ?
          <div className="columnNavbar">
            <h4>{t('navBar.catalog_tyres_by_diameter')}</h4>
            <a className='columnNavbarAnch' href={i18n.resolvedLanguage === 'uk' ? "/r13": "/ru/tyres/r13"}>R13</a>
            <a className='columnNavbarAnch' href={i18n.resolvedLanguage === 'uk' ? "/r14" : "/ru/tyres/r14"}>R14</a>
            <a className='columnNavbarAnch' href={i18n.resolvedLanguage === 'uk' ? "/r15" : "/ru/tyres/r15"}>R15</a>
            <a className='columnNavbarAnch' href={i18n.resolvedLanguage === 'uk' ? "/r16" : "/ru/tyres/r16"}>R16</a>
            <a className='columnNavbarAnch' href={i18n.resolvedLanguage === 'uk' ? "/r17" : "/ru/tyres/r17"}>R17</a>
            <a className='columnNavbarAnch' href={i18n.resolvedLanguage === 'uk' ? "/r18" : "/ru/tyres/r18"}>R18</a>
            <a className='columnNavbarAnch' href={i18n.resolvedLanguage === 'uk' ? "/r19" : "/ru/tyres/r19"}>R19</a>
            <a className='columnNavbarAnch' href={i18n.resolvedLanguage === 'uk' ? "/r20" : "/ru/tyres/r20"}>R20</a>
            <a className='columnNavbarAnch' href={i18n.resolvedLanguage === 'uk' ? "/r21" : "/ru/tyres/r21"}>R21</a>
            <a className='columnNavbarAnch' href={i18n.resolvedLanguage === 'uk' ? "/r17.5" : "/ru/tyres/r17.5"}>R17.5</a>
            <a className='columnNavbarAnch' href={i18n.resolvedLanguage === 'uk' ? "/r19.5" : "/ru/tyres/r19.5"}>R19.5</a>
            <a className='columnNavbarAnch' href={i18n.resolvedLanguage === 'uk' ? "/r22.5" : "/ru/tyres/r22.5"}>R22.5</a>
          </div>
          :
          <div className="columnNavbar">
          <h4>{t('navBar.catalog_tyres_by_diameter')}</h4>
          <a className='columnNavbarAnch' href={i18n.resolvedLanguage === 'uk' ? "/tyres/r13": "/ru/tyres/r13"}>R13</a>
          <a className='columnNavbarAnch' href={i18n.resolvedLanguage === 'uk' ? "/tyres/r14" : "/ru/tyres/r14"}>R14</a>
          <a className='columnNavbarAnch' href={i18n.resolvedLanguage === 'uk' ? "/tyres/r15" : "/ru/tyres/r15"}>R15</a>
          <a className='columnNavbarAnch' href={i18n.resolvedLanguage === 'uk' ? "/tyres/r16" : "/ru/tyres/r16"}>R16</a>
          <a className='columnNavbarAnch' href={i18n.resolvedLanguage === 'uk' ? "/tyres/r17" : "/ru/tyres/r17"}>R17</a>
          <a className='columnNavbarAnch' href={i18n.resolvedLanguage === 'uk' ? "/tyres/r18" : "/ru/tyres/r18"}>R18</a>
          <a className='columnNavbarAnch' href={i18n.resolvedLanguage === 'uk' ? "/tyres/r19" : "/ru/tyres/r19"}>R19</a>
          <a className='columnNavbarAnch' href={i18n.resolvedLanguage === 'uk' ? "/tyres/r20" : "/ru/tyres/r20"}>R20</a>
          <a className='columnNavbarAnch' href={i18n.resolvedLanguage === 'uk' ? "/tyres/r21" : "/ru/tyres/r21"}>R21</a>
          <a className='columnNavbarAnch' href={i18n.resolvedLanguage === 'uk' ? "/tyres/r17.5" : "/ru/tyres/r17.5"}>R17.5</a>
          <a className='columnNavbarAnch' href={i18n.resolvedLanguage === 'uk' ? "/tyres/r19.5" : "/ru/tyres/r19.5"}>R19.5</a>
          <a className='columnNavbarAnch' href={i18n.resolvedLanguage === 'uk' ? "/tyres/r22.5" : "/ru/tyres/r22.5"}>R22.5</a>
        </div>
        }
        </div>
      </div>
    </div>
  );
};

export default NavBarDropTyres;