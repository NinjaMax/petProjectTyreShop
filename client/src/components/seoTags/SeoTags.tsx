import React from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import { createUaStringFromUrl, translateToRu } from '../../services/stringUrl';

type SeaoTag = {
    paramSeason: string;
    paramVehicleType: string;
    paramCategory: string;
    paramBrand: string;
    lang: string;
    url: { pathname: string | undefined };
    param: {
        brands: string | undefined,
        diameter: string | undefined,
        height: string | undefined,
        loadindex: string | undefined,
        om: string | undefined,
        reinforced: string | undefined,
        ru: string | undefined,
        season: string | undefined,
        speedindex: string | undefined,
        studded: string | undefined,
        type: string | undefined,
        width: string | undefined
    };
};

const SeoCatalogTags = ({
    paramSeason, 
    paramVehicleType, 
    paramCategory, 
    param,
    paramBrand, 
    url,
    lang
}:SeaoTag) => {
    const { t, i18n } = useTranslation();
    console.log('PARAMS: ', param);

    return (
        <>
        {param && !param.season && !param.brands && !param.type && url.pathname?.includes('/tyres') ?
        <Helmet>
            <title>{t('seoCatalog.tyre_title')}</title>
            <meta
                name="description"
                content={t('seoCatalog.tyre_description')}
            />
            <meta
                name="keywords"
                content={t('seoCatalog.tyre_keywords')}
            />
            <link rel="canonical" href={process.env.REACT_APP_CORS! + url.pathname}/>
            <link rel="alternate" hrefLang='ru' href={process.env.REACT_APP_CORS + '/ru' + url.pathname}/>
            <link rel="alternate" hrefLang='uk' href={process.env.REACT_APP_CORS! + url.pathname}/>
        </Helmet>
        : null
        }
        {param && (param.season === 'lіtnya' || param.season === 'letnyaya') && !param.brands && !param.type && url.pathname?.includes('/tyres') ?
        <Helmet>
            <title>{t('seoCatalog.summer_title')}</title>
            <meta
                name="description"
                content={t('seoCatalog.summer_description')}
            />
            <meta
                name="keywords"
                content={t('seoCatalog.summer_keywords')}
            />
            <link rel="canonical" href={process.env.REACT_APP_CORS! + url.pathname}/>
            <link rel="alternate" hrefLang='ru' href={process.env.REACT_APP_CORS + '/ru' + url.pathname}/>
            <link rel="alternate" hrefLang='uk' href={process.env.REACT_APP_CORS! + url.pathname}/>
        </Helmet>
        : null
        }
        {param && (param.season === 'zimova' || param.season === 'zimnyaya') && !param.brands && !param.type && url.pathname?.includes('/tyres') ?
        <Helmet>
            <title>{t('seoCatalog.winter_title')}</title>
            <meta
                name="description"
                content={t('seoCatalog.winter_description')}
            />
            <meta
                name="keywords"
                content={t('seoCatalog.winter_keywords')}
            />
            <link rel="canonical" href={process.env.REACT_APP_CORS! + url.pathname}/>
            <link rel="alternate" hrefLang='ru' href={process.env.REACT_APP_CORS + '/ru' + url.pathname}/>
            <link rel="alternate" hrefLang='uk' href={process.env.REACT_APP_CORS! + url.pathname}/>
        </Helmet>
        : null
        }
        {param && (param.season === 'zimova' || param.season === 'zimnyaya') && !param.brands && !param.type && url.pathname?.includes('/tyres') ?
        <Helmet>
            <title>{t('seoCatalog.winter_title')}</title>
            <meta
                name="description"
                content={t('seoCatalog.winter_description')}
            />
            <meta
                name="keywords"
                content={t('seoCatalog.winter_keywords')}
            />
            <link rel="canonical" href={process.env.REACT_APP_CORS! + url.pathname}/>
            <link rel="alternate" hrefLang='ru' href={process.env.REACT_APP_CORS + '/ru' + url.pathname}/>
            <link rel="alternate" hrefLang='uk' href={process.env.REACT_APP_CORS! + url.pathname}/>
        </Helmet>
        : null
        }
        {param && (param.season === 'zimova' || param.season === 'zimnyaya') && param.studded && !param.brands && !param.type && url.pathname?.includes('/tyres') ?
        <Helmet>
            <title>{t('seoCatalog.winter_stud_title')}</title>
            <meta
                name="description"
                content={t('seoCatalog.winter_stud_description')}
            />
            <meta
                name="keywords"
                content={t('seoCatalog.winter_stud_keywords')}
            />
            <link rel="canonical" href={process.env.REACT_APP_CORS! + url.pathname}/>
            <link rel="alternate" hrefLang='ru' href={process.env.REACT_APP_CORS + '/ru' + url.pathname}/>
            <link rel="alternate" hrefLang='uk' href={process.env.REACT_APP_CORS! + url.pathname}/>
        </Helmet>
        : null
        }
        {param && ( param.season === 'zimova' || param.season === 'zimnyaya') && !param.studded && !param.brands && !param.type && url.pathname?.includes('/tyres') ?
        <Helmet>
            <title>{t('seoCatalog.winter_no_stud_title')}</title>
            <meta
                name="description"
                content={t('seoCatalog.winter_no_stud_description')}
            />
            <meta
                name="keywords"
                content={t('seoCatalog.winter_no_stud_keywords')}
            />
            <link rel="canonical" href={process.env.REACT_APP_CORS! + url.pathname}/>
            <link rel="alternate" hrefLang='ru' href={process.env.REACT_APP_CORS + '/ru' + url.pathname}/>
            <link rel="alternate" hrefLang='uk' href={process.env.REACT_APP_CORS! + url.pathname}/>
        </Helmet>
        : null
        }
        {param && ( param.season === 'vsesezonna' || param.season === 'vsesezonnaya') && !param.brands && !param.type && url.pathname?.includes('/tyres') ?
        <Helmet>
            <title>{t('seoCatalog.allseason_title')}</title>
            <meta
                name="description"
                content={t('seoCatalog.allseason_description')}
            />
            <meta
                name="keywords"
                content={t('seoCatalog.allseason_keywords')}
            />
            <link rel="canonical" href={process.env.REACT_APP_CORS! + url.pathname}/>
            <link rel="alternate" hrefLang='ru' href={process.env.REACT_APP_CORS + '/ru' + url.pathname}/>
            <link rel="alternate" hrefLang='uk' href={process.env.REACT_APP_CORS! + url.pathname}/>
        </Helmet>
        : null
        }
        {param && !param.season && !param.brands && !param.type && url.pathname?.includes('/wheels') ?
        <Helmet>
            <title>{t('seoCatalog.wheels_title')}</title>
            <meta
                name="description"
                content={t('seoCatalog.wheels_description')}
            />
            <meta
                name="keywords"
                content={t('seoCatalog.wheels_keywords')}
            />
            <link rel="canonical" href={process.env.REACT_APP_CORS! + url.pathname}/>
            <link rel="alternate" hrefLang='ru' href={process.env.REACT_APP_CORS + '/ru' + url.pathname}/>
            <link rel="alternate" hrefLang='uk' href={process.env.REACT_APP_CORS! + url.pathname}/>
        </Helmet>
        : null
        }
        {param && !param.season && !param.brands && param.type === 'litoi' && url.pathname?.includes('/wheels') ?
        <Helmet>
            <title>{t('seoCatalog.wheels_litie_title')}</title>
            <meta
                name="description"
                content={t('seoCatalog.wheels_litie_description')}
            />
            <meta
                name="keywords"
                content={t('seoCatalog.wheels_litie_keywords')}
            />
            <link rel="canonical" href={process.env.REACT_APP_CORS! + url.pathname}/>
            <link rel="alternate" hrefLang='ru' href={process.env.REACT_APP_CORS + '/ru' + url.pathname}/>
            <link rel="alternate" hrefLang='uk' href={process.env.REACT_APP_CORS! + url.pathname}/>
        </Helmet>
        : null
        }
        {param && !param.season && !param.brands && param.type === 'stalnoi' && url.pathname?.includes('/wheels') ?
        <Helmet>
            <title>{t('seoCatalog.wheels_steel_title')}</title>
            <meta
                name="description"
                content={t('seoCatalog.wheels_steel_description')}
            />
            <meta
                name="keywords"
                content={t('seoCatalog.wheels_steel_keywords')}
            />
            <link rel="canonical" href={process.env.REACT_APP_CORS! + url.pathname}/>
            <link rel="alternate" hrefLang='ru' href={process.env.REACT_APP_CORS + '/ru' + url.pathname}/>
            <link rel="alternate" hrefLang='uk' href={process.env.REACT_APP_CORS! + url.pathname}/>
        </Helmet>
        : null
        }
        {param && !param.season && !param.brands && param.type === 'kovanii' && url.pathname?.includes('/wheels') ?
        <Helmet>
            <title>{t('seoCatalog.wheels_kov_title')}</title>
            <meta
                name="description"
                content={t('seoCatalog.wheels_kov_description')}
            />
            <meta
                name="keywords"
                content={t('seoCatalog.wheels_kov_keywords')}
            />
            <link rel="canonical" href={process.env.REACT_APP_CORS! + url.pathname}/>
            <link rel="alternate" hrefLang='ru' href={process.env.REACT_APP_CORS + '/ru' + url.pathname}/>
            <link rel="alternate" hrefLang='uk' href={process.env.REACT_APP_CORS! + url.pathname}/>
        </Helmet>
        : null
        }
        {param && (param.season === 'legkovoi' || param.season === 'legkovii') && !param.brands && !param.type && url.pathname?.includes('/tyres') ?
        <Helmet>
            <title>{t('seoCatalog.tyre_passeng_title')}</title>
            <meta
                name="description"
                content={t('seoCatalog.tyre_passeng_description')}
            />
            <meta
                name="keywords"
                content={t('seoCatalog.tyre_passeng_keywords')}
            />
            <link rel="canonical" href={process.env.REACT_APP_CORS! + url.pathname}/>
            <link rel="alternate" hrefLang='ru' href={process.env.REACT_APP_CORS + '/ru' + url.pathname}/>
            <link rel="alternate" hrefLang='uk' href={process.env.REACT_APP_CORS! + url.pathname}/>
        </Helmet>
        : null
        }
        {param && (param.season === 'vnedorozhnik' || param.season === 'pozashlyakhovik') && !param.brands && !param.type && url.pathname?.includes('/tyres') ?
        <Helmet>
            <title>{t('seoCatalog.tyre_suv_title')}</title>
            <meta
                name="description"
                content={t('seoCatalog.tyre_suv_description')}
            />
            <meta
                name="keywords"
                content={t('seoCatalog.tyre_suv_keywords')}
            />
            <link rel="canonical" href={process.env.REACT_APP_CORS! + url.pathname}/>
            <link rel="alternate" hrefLang='ru' href={process.env.REACT_APP_CORS + '/ru' + url.pathname}/>
            <link rel="alternate" hrefLang='uk' href={process.env.REACT_APP_CORS! + url.pathname}/>
        </Helmet>
        : null
        }
        {param && (param.season === 'legkovantazhnii' || param.season === 'legkogruzovoi') && !param.brands && !param.type && url.pathname?.includes('/tyres') ?
        <Helmet>
            <title>{t('seoCatalog.tyre_van_title')}</title>
            <meta
                name="description"
                content={t('seoCatalog.tyre_van_description')}
            />
            <meta
                name="keywords"
                content={t('seoCatalog.tyre_van_keywords')}
            />
            <link rel="canonical" href={process.env.REACT_APP_CORS! + url.pathname}/>
            <link rel="alternate" hrefLang='ru' href={process.env.REACT_APP_CORS + '/ru' + url.pathname}/>
            <link rel="alternate" hrefLang='uk' href={process.env.REACT_APP_CORS! + url.pathname}/>
        </Helmet>
        : null
        }
        {param && (param.season === 'vantazhnі-shini' || param.season === 'gruzovie-shini') && !param.brands && !param.type && url.pathname?.includes('/tyres') ?
        <Helmet>
            <title>{t('seoCatalog.tyre_truck_title')}</title>
            <meta
                name="description"
                content={t('seoCatalog.tyre_truck_description')}
            />
            <meta
                name="keywords"
                content={t('seoCatalog.tyre_truck_keywords')}
            />
            <link rel="canonical" href={process.env.REACT_APP_CORS! + url.pathname}/>
            <link rel="alternate" hrefLang='ru' href={process.env.REACT_APP_CORS + '/ru' + url.pathname}/>
            <link rel="alternate" hrefLang='uk' href={process.env.REACT_APP_CORS! + url.pathname}/>
        </Helmet>
        : null
        }
        {param && param.season === 'moto' && !param.brands && !param.type && url.pathname?.includes('/tyres') ?
        <Helmet>
            <title>{t('seoCatalog.tyre_moto_title')}</title>
            <meta
                name="description"
                content={t('seoCatalog.tyre_moto_description')}
            />
            <meta
                name="keywords"
                content={t('seoCatalog.tyre_moto_keywords')}
            />
            <link rel="canonical" href={process.env.REACT_APP_CORS! + url.pathname}/>
            <link rel="alternate" hrefLang='ru' href={process.env.REACT_APP_CORS + '/ru' + url.pathname}/>
            <link rel="alternate" hrefLang='uk' href={process.env.REACT_APP_CORS! + url.pathname}/>
        </Helmet>
        : null
        }
        {param && (param.season === 's-g' || param.season === 's-kh') && !param.brands && !param.type && url.pathname?.includes('/tyres') ?
        <Helmet>
            <title>{t('seoCatalog.tyre_agri_title')}</title>
            <meta
                name="description"
                content={t('seoCatalog.tyre_agri_description')}
            />
            <meta
                name="keywords"
                content={t('seoCatalog.tyre_agri_keywords')}
            />
            <link rel="canonical" href={process.env.REACT_APP_CORS! + url.pathname}/>
            <link rel="alternate" hrefLang='ru' href={process.env.REACT_APP_CORS + '/ru' + url.pathname}/>
            <link rel="alternate" hrefLang='uk' href={process.env.REACT_APP_CORS! + url.pathname}/>
        </Helmet>
        : null
        }
        {param && (param.season === 'іndustrіalna' || param.season === 'industrialnaya') && !param.brands && !param.type && url.pathname?.includes('/tyres') ?
        <Helmet>
            <title>{t('seoCatalog.tyre_industry_title')}</title>
            <meta
                name="description"
                content={t('seoCatalog.tyre_industry_description')}
            />
            <meta
                name="keywords"
                content={t('seoCatalog.tyre_industry_keywords')}
            />
            <link rel="canonical" href={process.env.REACT_APP_CORS! + url.pathname}/>
            <link rel="alternate" hrefLang='ru' href={process.env.REACT_APP_CORS + '/ru' + url.pathname}/>
            <link rel="alternate" hrefLang='uk' href={process.env.REACT_APP_CORS! + url.pathname}/>
        </Helmet>
        : null
        }
        {param && (param.season === 'karerna' || param.season === 'karernaya') && !param.brands && !param.type && url.pathname?.includes('/tyres') ?
        <Helmet>
            <title>{t('seoCatalog.tyre_career_title')}</title>
            <meta
                name="description"
                content={t('seoCatalog.tyre_career_description')}
            />
            <meta
                name="keywords"
                content={t('seoCatalog.tyre_career_keywords')}
            />
            <link rel="canonical" href={process.env.REACT_APP_CORS! + url.pathname}/>
            <link rel="alternate" hrefLang='ru' href={process.env.REACT_APP_CORS + '/ru' + url.pathname}/>
            <link rel="alternate" hrefLang='uk' href={process.env.REACT_APP_CORS! + url.pathname}/>
        </Helmet>
        : null
        }
        {param && (param.season === 'lіtnya' || param.season === 'letnyaya') && !param.brands && (param.studded === 'legkovoi' || param.studded === 'legkovii') && url.pathname?.includes('/tyres') ?
        <Helmet>
            <title>{t('seoCatalog.tyre_passng_summer_title')}</title>
            <meta
                name="description"
                content={t('seoCatalog.tyre_passng_summer_description')}
            />
            <meta
                name="keywords"
                content={t('seoCatalog.tyre_passng_summer_keywords')}
            />
            <link rel="canonical" href={process.env.REACT_APP_CORS! + url.pathname}/>
            <link rel="alternate" hrefLang='ru' href={process.env.REACT_APP_CORS + '/ru' + url.pathname}/>
            <link rel="alternate" hrefLang='uk' href={process.env.REACT_APP_CORS! + url.pathname}/>
        </Helmet>
        : null
        }
        {param && (param.season === 'zimova' || param.season === 'zimnyaya') && !param.brands && (param.studded === 'legkovoi' || param.studded  === 'legkovii') && url.pathname?.includes('/tyres') ?
        <Helmet>
            <title>{t('seoCatalog.tyre_passng_winter_title')}</title>
            <meta
                name="description"
                content={t('seoCatalog.tyre_passng_winter_description')}
            />
            <meta
                name="keywords"
                content={t('seoCatalog.tyre_passng_winter_keywords')}
            />
            <link rel="canonical" href={process.env.REACT_APP_CORS! + url.pathname}/>
            <link rel="alternate" hrefLang='ru' href={process.env.REACT_APP_CORS + '/ru' + url.pathname}/>
            <link rel="alternate" hrefLang='uk' href={process.env.REACT_APP_CORS! + url.pathname}/>
        </Helmet>
        : null
        }
        {param && (param.season === 'vsesezonna' || param.season === 'vsesezonnaya') && !param.brands && (param.studded === 'legkovoi' || param.studded === 'legkovii') && url.pathname?.includes('/tyres') ?
        <Helmet>
            <title>{t('seoCatalog.tyre_passng_allseason_title')}</title>
            <meta
                name="description"
                content={t('seoCatalog.tyre_passng_allseason_description')}
            />
            <meta
                name="keywords"
                content={t('seoCatalog.tyre_passng_allseason_keywords')}
            />
            <link rel="canonical" href={process.env.REACT_APP_CORS! + url.pathname}/>
            <link rel="alternate" hrefLang='ru' href={process.env.REACT_APP_CORS + '/ru' + url.pathname}/>
            <link rel="alternate" hrefLang='uk' href={process.env.REACT_APP_CORS! + url.pathname}/>
        </Helmet>
        : null
        }
        {param && (param.season === 'lіtnya' || param.season === 'letnyaya') && !param.brands && (param.studded === 'pozashlyakhovik' || param.studded === 'vnedorozhnik') && url.pathname?.includes('/tyres') ?
        <Helmet>
            <title>{t('seoCatalog.tyre_suv_summer_title')}</title>
            <meta
                name="description"
                content={t('seoCatalog.tyre_suv_summer_description')}
            />
            <meta
                name="keywords"
                content={t('seoCatalog.tyre_suv_summer_keywords')}
            />
            <link rel="canonical" href={process.env.REACT_APP_CORS! + url.pathname}/>
            <link rel="alternate" hrefLang='ru' href={process.env.REACT_APP_CORS + '/ru' + url.pathname}/>
            <link rel="alternate" hrefLang='uk' href={process.env.REACT_APP_CORS! + url.pathname}/>
        </Helmet>
        : null
        }
        {param && (param.season === 'zimova' || param.season === 'zimnyaya') && !param.brands && (param.studded === 'pozashlyakhovik' || param.studded === 'vnedorozhnik') && url.pathname?.includes('/tyres') ?
        <Helmet>
            <title>{t('seoCatalog.tyre_suv_winter_title')}</title>
            <meta
                name="description"
                content={t('seoCatalog.tyre_suv_winter_description')}
            />
            <meta
                name="keywords"
                content={t('seoCatalog.tyre_suv_winter_keywords')}
            />
            <link rel="canonical" href={process.env.REACT_APP_CORS! + url.pathname}/>
            <link rel="alternate" hrefLang='ru' href={process.env.REACT_APP_CORS + '/ru' + url.pathname}/>
            <link rel="alternate" hrefLang='uk' href={process.env.REACT_APP_CORS! + url.pathname}/>
        </Helmet>
        : null
        }
        {param && (param.season === 'vsesezonna' || param.season === 'vsesezonnaya') && !param.brands && (param.studded === 'pozashlyakhovik' || param.studded === 'vnedorozhnik') && url.pathname?.includes('/tyres') ?
        <Helmet>
            <title>{t('seoCatalog.tyre_suv_allseason_title')}</title>
            <meta
                name="description"
                content={t('seoCatalog.tyre_suv_allseason_description')}
            />
            <meta
                name="keywords"
                content={t('seoCatalog.tyre_suv_allseason_keywords')}
            />
            <link rel="canonical" href={process.env.REACT_APP_CORS! + url.pathname}/>
            <link rel="alternate" hrefLang='ru' href={process.env.REACT_APP_CORS + '/ru' + url.pathname}/>
            <link rel="alternate" hrefLang='uk' href={process.env.REACT_APP_CORS! + url.pathname}/>
        </Helmet>
        : null
        }

        {param && (param.season === 'lіtnya' || param.season === 'letnyaya') && !param.brands && (param.studded === 'legkovantazhnii' || param.studded === 'legkogruzovoi') && url.pathname?.includes('/tyres') ?
        <Helmet>
            <title>{t('seoCatalog.tyre_van_summer_title')}</title>
            <meta
                name="description"
                content={t('seoCatalog.tyre_van_summer_description')}
            />
            <meta
                name="keywords"
                content={t('seoCatalog.tyre_van_summer_keywords')}
            />
            <link rel="canonical" href={process.env.REACT_APP_CORS! + url.pathname}/>
            <link rel="alternate" hrefLang='ru' href={process.env.REACT_APP_CORS + '/ru' + url.pathname}/>
            <link rel="alternate" hrefLang='uk' href={process.env.REACT_APP_CORS! + url.pathname}/>
        </Helmet>
        : null
        }
        {param && (param.season === 'zimova' || param.season === 'zimnyaya') && !param.brands && (param.studded === 'legkovantazhnii' || param.studded === 'legkogruzovoi') && url.pathname?.includes('/tyres') ?
        <Helmet>
            <title>{t('seoCatalog.tyre_van_winter_title')}</title>
            <meta
                name="description"
                content={t('seoCatalog.tyre_van_winter_description')}
            />
            <meta
                name="keywords"
                content={t('seoCatalog.tyre_van_winter_keywords')}
            />
            <link rel="canonical" href={process.env.REACT_APP_CORS! + url.pathname}/>
            <link rel="alternate" hrefLang='ru' href={process.env.REACT_APP_CORS + '/ru' + url.pathname}/>
            <link rel="alternate" hrefLang='uk' href={process.env.REACT_APP_CORS! + url.pathname}/>
        </Helmet>
        : null
        }
        {param && (param.season === 'vsesezonna' || param.season === 'vsesezonnaya') && !param.brands && (param.studded === 'legkovantazhnii' || param.studded === 'legkogruzovoi') && url.pathname?.includes('/tyres') ?
        <Helmet>
            <title>{t('seoCatalog.tyre_van_allseason_title')}</title>
            <meta
                name="description"
                content={t('seoCatalog.tyre_van_allseason_description')}
            />
            <meta
                name="keywords"
                content={t('seoCatalog.tyre_van_allseason_keywords')}
            />
            <link rel="canonical" href={process.env.REACT_APP_CORS! + url.pathname}/>
            <link rel="alternate" hrefLang='ru' href={process.env.REACT_APP_CORS + '/ru' + url.pathname}/>
            <link rel="alternate" hrefLang='uk' href={process.env.REACT_APP_CORS! + url.pathname}/>
        </Helmet>
        : null
        }
        {param && param.season && !param.brands && !param.studded && url.pathname?.includes('/tyres') ?
        <Helmet>
            <title>{t('seoCatalog.tyre_brand_title', {brand: param.season.slice(0, 1).toUpperCase() + param.season.slice(1, param.season.length), 
                brand_translated: translateToRu(param.season)})}</title>
            <meta
                name="description"
                content={t('seoCatalog.tyre_brand_description', {brand: param.season.slice(0, 1).toUpperCase() + param.season.slice(1, param.season.length), 
                    brand_translated: translateToRu(param.season)})}
            />
            <meta
                name="keywords"
                content={t('seoCatalog.tyre_brand_keywords', {brand: param.season.slice(0, 1).toUpperCase() + param.season.slice(1, param.season.length)})}
            />
            <link rel="canonical" href={process.env.REACT_APP_CORS! + url.pathname}/>
            <link rel="alternate" hrefLang='ru' href={process.env.REACT_APP_CORS + '/ru' + url.pathname}/>
            <link rel="alternate" hrefLang='uk' href={process.env.REACT_APP_CORS! + url.pathname}/>
        </Helmet>
        : null
        }
        {param && (param.season === 'legkovoi' || param.season === 'legkovii')  && param.studded && !param.brands && url.pathname?.includes('/tyres') ?
        <Helmet>
            <title>{t('seoCatalog.tyre_brand_passeng_title', {brand: param.studded.slice(0, 1).toUpperCase() + param.studded.slice(1, param.studded.length)})}</title>
            <meta
                name="description"
                content={t('seoCatalog.tyre_brand_passeng_description', {brand: param.studded.slice(0, 1).toUpperCase() + param.studded.slice(1, param.studded.length)})}
            />
            <meta
                name="keywords"
                content={t('seoCatalog.tyre_brand_passeng_keywords', {brand: param.studded.slice(0, 1).toUpperCase() + param.studded.slice(1, param.studded.length)})}
            />
            <link rel="canonical" href={process.env.REACT_APP_CORS! + url.pathname}/>
            <link rel="alternate" hrefLang='ru' href={process.env.REACT_APP_CORS + '/ru' + url.pathname}/>
            <link rel="alternate" hrefLang='uk' href={process.env.REACT_APP_CORS! + url.pathname}/>
        </Helmet>
        : null
        }
        {param && (param.season === 'pozashlyakhovik' || param.season === 'vnedorozhnik')  && param.studded && !param.brands && url.pathname?.includes('/tyres') ?
        <Helmet>
            <title>{t('seoCatalog.tyre_brand_suv_title', {brand: param.studded.slice(0, 1).toUpperCase() + param.studded.slice(1, param.studded.length)})}</title>
            <meta
                name="description"
                content={t('seoCatalog.tyre_brand_suv_description', {brand: param.studded.slice(0, 1).toUpperCase() + param.studded.slice(1, param.studded.length)})}
            />
            <meta
                name="keywords"
                content={t('seoCatalog.tyre_brand_suv_keywords', {brand: param.studded.slice(0, 1).toUpperCase() + param.studded.slice(1, param.studded.length)})}
            />
            <link rel="canonical" href={process.env.REACT_APP_CORS! + url.pathname}/>
            <link rel="alternate" hrefLang='ru' href={process.env.REACT_APP_CORS + '/ru' + url.pathname}/>
            <link rel="alternate" hrefLang='uk' href={process.env.REACT_APP_CORS! + url.pathname}/>
        </Helmet>
        : null
        }
        {param && (param.season === 'legkovantazhnii' || param.season === 'legkogruzovo')  && param.studded && !param.brands && url.pathname?.includes('/tyres') ?
        <Helmet>
            <title>{t('seoCatalog.tyre_brand_van_title', {brand: param.studded.slice(0, 1).toUpperCase() + param.studded.slice(1, param.studded.length)})}</title>
            <meta
                name="description"
                content={t('seoCatalog.tyre_brand_van_description', {brand: param.studded.slice(0, 1).toUpperCase() + param.studded.slice(1, param.studded.length)})}
            />
            <meta
                name="keywords"
                content={t('seoCatalog.tyre_brand_van_keywords', {brand: param.studded.slice(0, 1).toUpperCase() + param.studded.slice(1, param.studded.length)})}
            />
            <link rel="canonical" href={process.env.REACT_APP_CORS! + url.pathname}/>
            <link rel="alternate" hrefLang='ru' href={process.env.REACT_APP_CORS + '/ru' + url.pathname}/>
            <link rel="alternate" hrefLang='uk' href={process.env.REACT_APP_CORS! + url.pathname}/>
        </Helmet>
        : null
        }
        {param && (param.season === 'vantazhnі-shini' || param.season === 'gruzovie-shini') && param.studded && !param.brands && url.pathname?.includes('/tyres') ?
        <Helmet>
            <title>{t('seoCatalog.tyre_brand_truck_title', {brand: param.studded.slice(0, 1).toUpperCase() + param.studded.slice(1, param.studded.length)})}</title>
            <meta
                name="description"
                content={t('seoCatalog.tyre_brand_truck_description', {brand: param.studded.slice(0, 1).toUpperCase() + param.studded.slice(1, param.studded.length)})}
            />
            <meta
                name="keywords"
                content={t('seoCatalog.tyre_brand_truck_keywords', {brand: param.studded.slice(0, 1).toUpperCase() + param.studded.slice(1, param.studded.length)})}
            />
            <link rel="canonical" href={process.env.REACT_APP_CORS! + url.pathname}/>
            <link rel="alternate" hrefLang='ru' href={process.env.REACT_APP_CORS + '/ru' + url.pathname}/>
            <link rel="alternate" hrefLang='uk' href={process.env.REACT_APP_CORS! + url.pathname}/>
        </Helmet>
        : null
        }
        {param && (param.season === 's-g' || param.season === 's-kh') && param.studded && !param.brands && url.pathname?.includes('/tyres') ?
        <Helmet>
            <title>{t('seoCatalog.tyre_brand_sh_title', {brand: param.studded.slice(0, 1).toUpperCase() + param.studded.slice(1, param.studded.length)})}</title>
            <meta
                name="description"
                content={t('seoCatalog.tyre_brand_sh_description', {brand: param.studded.slice(0, 1).toUpperCase() + param.studded.slice(1, param.studded.length)})}
            />
            <meta
                name="keywords"
                content={t('seoCatalog.tyre_brand_sh_keywords', {brand: param.studded.slice(0, 1).toUpperCase() + param.studded.slice(1, param.studded.length)})}
            />
            <link rel="canonical" href={process.env.REACT_APP_CORS! + url.pathname}/>
            <link rel="alternate" hrefLang='ru' href={process.env.REACT_APP_CORS + '/ru' + url.pathname}/>
            <link rel="alternate" hrefLang='uk' href={process.env.REACT_APP_CORS! + url.pathname}/>
        </Helmet>
        : null
        }
        {param && (param.season === 'іndustrіalna' || param.season === 'industrialnaya') && param.studded && !param.brands && url.pathname?.includes('/tyres') ?
        <Helmet>
            <title>{t('seoCatalog.tyre_brand_industry_title', {brand: param.studded.slice(0, 1).toUpperCase() + param.studded.slice(1, param.studded.length)})}</title>
            <meta
                name="description"
                content={t('seoCatalog.tyre_brand_industry_description', {brand: param.studded.slice(0, 1).toUpperCase() + param.studded.slice(1, param.studded.length)})}
            />
            <meta
                name="keywords"
                content={t('seoCatalog.tyre_brand_industry_keywords', {brand: param.studded.slice(0, 1).toUpperCase() + param.studded.slice(1, param.studded.length)})}
            />
            <link rel="canonical" href={process.env.REACT_APP_CORS! + url.pathname}/>
            <link rel="alternate" hrefLang='ru' href={process.env.REACT_APP_CORS + '/ru' + url.pathname}/>
            <link rel="alternate" hrefLang='uk' href={process.env.REACT_APP_CORS! + url.pathname}/>
        </Helmet>
        : null
        }
        {param && (param.season === 'karerna' || param.season === 'karernaya') && param.studded && !param.brands && url.pathname?.includes('/tyres') ?
        <Helmet>
            <title>{t('seoCatalog.tyre_brand_career_title', {brand: param.studded.slice(0, 1).toUpperCase() + param.studded.slice(1, param.studded.length)})}</title>
            <meta
                name="description"
                content={t('seoCatalog.tyre_brand_career_description', {brand: param.studded.slice(0, 1).toUpperCase() + param.studded.slice(1, param.studded.length)})}
            />
            <meta
                name="keywords"
                content={t('seoCatalog.tyre_brand_career_keywords', {brand: param.studded.slice(0, 1).toUpperCase() + param.studded.slice(1, param.studded.length)})}
            />
            <link rel="canonical" href={process.env.REACT_APP_CORS! + url.pathname}/>
            <link rel="alternate" hrefLang='ru' href={process.env.REACT_APP_CORS + '/ru' + url.pathname}/>
            <link rel="alternate" hrefLang='uk' href={process.env.REACT_APP_CORS! + url.pathname}/>
        </Helmet>
        : null
        }
        {param && param.season === 'moto' && param.studded && !param.brands && url.pathname?.includes('/tyres') ?
        <Helmet>
            <title>{t('seoCatalog.tyre_brand_moto_title', {brand: param.studded.slice(0, 1).toUpperCase() + param.studded.slice(1, param.studded.length)})}</title>
            <meta
                name="description"
                content={t('seoCatalog.tyre_brand_moto_description', {brand: param.studded.slice(0, 1).toUpperCase() + param.studded.slice(1, param.studded.length)})}
            />
            <meta
                name="keywords"
                content={t('seoCatalog.tyre_brand_moto_keywords', {brand: param.studded.slice(0, 1).toUpperCase() + param.studded.slice(1, param.studded.length)})}
            />
            <link rel="canonical" href={process.env.REACT_APP_CORS! + url.pathname}/>
            <link rel="alternate" hrefLang='ru' href={process.env.REACT_APP_CORS + '/ru' + url.pathname}/>
            <link rel="alternate" hrefLang='uk' href={process.env.REACT_APP_CORS! + url.pathname}/>
        </Helmet>
        : null
        }
        {param && (param.season === 'lіtnya' || param.season === 'letnyaya') && param.studded && !param.brands && url.pathname?.includes('/tyres') ?
        <Helmet>
            <title>{t('seoCatalog.tyre_brand_summer_title', {brand: param.studded.slice(0, 1).toUpperCase() + param.studded.slice(1, param.studded.length)})}</title>
            <meta
                name="description"
                content={t('seoCatalog.tyre_brand_summer_description', {brand: param.studded.slice(0, 1).toUpperCase() + param.studded.slice(1, param.studded.length)})}
            />
            <meta
                name="keywords"
                content={t('seoCatalog.tyre_brand_summer_keywords', {brand: param.studded.slice(0, 1).toUpperCase() + param.studded.slice(1, param.studded.length)})}
            />
            <link rel="canonical" href={process.env.REACT_APP_CORS! + url.pathname}/>
            <link rel="alternate" hrefLang='ru' href={process.env.REACT_APP_CORS + '/ru' + url.pathname}/>
            <link rel="alternate" hrefLang='uk' href={process.env.REACT_APP_CORS! + url.pathname}/>
        </Helmet>
        : null
        }
        {param && (param.season === 'zimova' || param.season === 'zimnyaya') && param.studded && !param.brands && url.pathname?.includes('/tyres') ?
        <Helmet>
            <title>{t('seoCatalog.tyre_brand_winter_title', {brand: param.studded.slice(0, 1).toUpperCase() + param.studded.slice(1, param.studded.length)})}</title>
            <meta
                name="description"
                content={t('seoCatalog.tyre_brand_winter_description', {brand: param.studded.slice(0, 1).toUpperCase() + param.studded.slice(1, param.studded.length)})}
            />
            <meta
                name="keywords"
                content={t('seoCatalog.tyre_brand_winter_keywords', {brand: param.studded.slice(0, 1).toUpperCase() + param.studded.slice(1, param.studded.length)})}
            />
            <link rel="canonical" href={process.env.REACT_APP_CORS! + url.pathname}/>
            <link rel="alternate" hrefLang='ru' href={process.env.REACT_APP_CORS + '/ru' + url.pathname}/>
            <link rel="alternate" hrefLang='uk' href={process.env.REACT_APP_CORS! + url.pathname}/>
        </Helmet>
        : null
        }
        {param && (param.season === 'vsesezonna' || param.season === 'vsesezonnaya') && param.studded && !param.brands && url.pathname?.includes('/tyres') ?
        <Helmet>
            <title>{t('seoCatalog.tyre_brand_allseason_title', {brand: param.studded.slice(0, 1).toUpperCase() + param.studded.slice(1, param.studded.length)})}</title>
            <meta
                name="description"
                content={t('seoCatalog.tyre_brand_allseason_winter_description', {brand: param.studded.slice(0, 1).toUpperCase() + param.studded.slice(1, param.studded.length)})}
            />
            <meta
                name="keywords"
                content={t('seoCatalog.tyre_brand_allseason_winter_keywords', {brand: param.studded.slice(0, 1).toUpperCase() + param.studded.slice(1, param.studded.length)})}
            />
            <link rel="canonical" href={process.env.REACT_APP_CORS! + url.pathname}/>
            <link rel="alternate" hrefLang='ru' href={process.env.REACT_APP_CORS + '/ru' + url.pathname}/>
            <link rel="alternate" hrefLang='uk' href={process.env.REACT_APP_CORS! + url.pathname}/>
        </Helmet>
        : null
        }
        {param && (param.season === 'lіtnya' || param.season === 'letnyaya') && (param.studded === 'legkovoi' || param.studded === 'legkovii') && param.type && !param.brands && url.pathname?.includes('/tyres') ?
        <Helmet>
            <title>{t('seoCatalog.tyre_brand_summer_passeng_title', {brand: param.type.slice(0, 1).toUpperCase() + param.type.slice(1, param.type.length)})}</title>
            <meta
                name="description"
                content={t('seoCatalog.tyre_brand_summer_passeng_description', {brand: param.type.slice(0, 1).toUpperCase() + param.type.slice(1, param.type.length)})}
            />
            <meta
                name="keywords"
                content={t('seoCatalog.tyre_brand_summer_passeng_keywords', {brand: param.type.slice(0, 1).toUpperCase() + param.type.slice(1, param.type.length)})}
            />
            <link rel="canonical" href={process.env.REACT_APP_CORS! + url.pathname}/>
            <link rel="alternate" hrefLang='ru' href={process.env.REACT_APP_CORS + '/ru' + url.pathname}/>
            <link rel="alternate" hrefLang='uk' href={process.env.REACT_APP_CORS! + url.pathname}/>
        </Helmet>
        : null
        }
        {param && (param.season === 'zimova' || param.season === 'zimnyaya') && (param.studded === 'legkovoi' || param.studded === 'legkovii') && param.type && !param.brands && url.pathname?.includes('/tyres') ?
        <Helmet>
            <title>{t('seoCatalog.tyre_brand_winter_passeng_title', {brand: param.type.slice(0, 1).toUpperCase() + param.type.slice(1, param.type.length)})}</title>
            <meta
                name="description"
                content={t('seoCatalog.tyre_brand_winter_passeng_description', {brand: param.type.slice(0, 1).toUpperCase() + param.type.slice(1, param.type.length)})}
            />
            <meta
                name="keywords"
                content={t('seoCatalog.tyre_brand_winter_passeng_keywords', {brand: param.type.slice(0, 1).toUpperCase() + param.type.slice(1, param.type.length)})}
            />
            <link rel="canonical" href={process.env.REACT_APP_CORS! + url.pathname}/>
            <link rel="alternate" hrefLang='ru' href={process.env.REACT_APP_CORS + '/ru' + url.pathname}/>
            <link rel="alternate" hrefLang='uk' href={process.env.REACT_APP_CORS! + url.pathname}/>
        </Helmet>
        : null
        }
        {param && (param.season === 'vsesezonna' || param.season === 'vsesezonnaya') && (param.studded === 'legkovoi' || param.studded === 'legkovii') && param.type && !param.brands && url.pathname?.includes('/tyres') ?
        <Helmet>
            <title>{t('seoCatalog.tyre_brand_allseason_passeng_title', {brand: param.type.slice(0, 1).toUpperCase() + param.type.slice(1, param.type.length)})}</title>
            <meta
                name="description"
                content={t('seoCatalog.tyre_brand_allseason_passeng_winter_description', {brand: param.type.slice(0, 1).toUpperCase() + param.type.slice(1, param.type.length)})}
            />
            <meta
                name="keywords"
                content={t('seoCatalog.tyre_brand_allseason_passeng_winter_keywords', {brand: param.type.slice(0, 1).toUpperCase() + param.type.slice(1, param.type.length)})}
            />
            <link rel="canonical" href={process.env.REACT_APP_CORS! + url.pathname}/>
            <link rel="alternate" hrefLang='ru' href={process.env.REACT_APP_CORS + '/ru' + url.pathname}/>
            <link rel="alternate" hrefLang='uk' href={process.env.REACT_APP_CORS! + url.pathname}/>
        </Helmet>
        : null
        }
        {param && (param.season === 'lіtnya' || param.season === 'letnyaya') && (param.studded === 'pozashlyakhovik' || param.studded === 'vnedorozhnik') && param.type && !param.brands && url.pathname?.includes('/tyres') ?
        <Helmet>
            <title>{t('seoCatalog.tyre_brand_summer_suv_title', {brand: param.type.slice(0, 1).toUpperCase() + param.type.slice(1, param.type.length)})}</title>
            <meta
                name="description"
                content={t('seoCatalog.tyre_brand_summer_suv_description', {brand: param.type.slice(0, 1).toUpperCase() + param.type.slice(1, param.type.length)})}
            />
            <meta
                name="keywords"
                content={t('seoCatalog.tyre_brand_summer_suv_keywords', {brand: param.type.slice(0, 1).toUpperCase() + param.type.slice(1, param.type.length)})}
            />
            <link rel="canonical" href={process.env.REACT_APP_CORS! + url.pathname}/>
            <link rel="alternate" hrefLang='ru' href={process.env.REACT_APP_CORS + '/ru' + url.pathname}/>
            <link rel="alternate" hrefLang='uk' href={process.env.REACT_APP_CORS! + url.pathname}/>
        </Helmet>
        : null
        }
        {param && (param.season === 'zimova' || param.season === 'zimnyaya') && (param.studded === 'pozashlyakhovik' || param.studded === 'vnedorozhnik') && param.type && !param.brands && url.pathname?.includes('/tyres') ?
        <Helmet>
            <title>{t('seoCatalog.tyre_brand_winter_suv_title', {brand: param.type.slice(0, 1).toUpperCase() + param.type.slice(1, param.type.length)})}</title>
            <meta
                name="description"
                content={t('seoCatalog.tyre_brand_winter_suv_description', {brand: param.type.slice(0, 1).toUpperCase() + param.type.slice(1, param.type.length)})}
            />
            <meta
                name="keywords"
                content={t('seoCatalog.tyre_brand_winter_suv_keywords', {brand: param.type.slice(0, 1).toUpperCase() + param.type.slice(1, param.type.length)})}
            />
            <link rel="canonical" href={process.env.REACT_APP_CORS! + url.pathname}/>
            <link rel="alternate" hrefLang='ru' href={process.env.REACT_APP_CORS + '/ru' + url.pathname}/>
            <link rel="alternate" hrefLang='uk' href={process.env.REACT_APP_CORS! + url.pathname}/>
        </Helmet>
        : null
        }
        {param && (param.season === 'vsesezonna' || param.season === 'vsesezonnaya') && (param.studded === 'pozashlyakhovik' || param.studded === 'vnedorozhnik') && param.type && !param.brands && url.pathname?.includes('/tyres') ?
        <Helmet>
            <title>{t('seoCatalog.tyre_brand_allseason_suv_title', {brand: param.type.slice(0, 1).toUpperCase() + param.type.slice(1, param.type.length)})}</title>
            <meta
                name="description"
                content={t('seoCatalog.tyre_brand_allseason_suv_winter_description', {brand: param.type.slice(0, 1).toUpperCase() + param.type.slice(1, param.type.length)})}
            />
            <meta
                name="keywords"
                content={t('seoCatalog.tyre_brand_allseason_suv_winter_keywords', {brand: param.type.slice(0, 1).toUpperCase() + param.type.slice(1, param.type.length)})}
            />
            <link rel="canonical" href={process.env.REACT_APP_CORS! + url.pathname}/>
            <link rel="alternate" hrefLang='ru' href={process.env.REACT_APP_CORS + '/ru' + url.pathname}/>
            <link rel="alternate" hrefLang='uk' href={process.env.REACT_APP_CORS! + url.pathname}/>
        </Helmet>
        : null
        }
        {param && (param.season === 'lіtnya' || param.season === 'letnyaya') && (param.studded === 'legkovantazhnii' || param.studded === 'legkogruzovoi') && param.type && !param.brands && url.pathname?.includes('/tyres') ?
        <Helmet>
            <title>{t('seoCatalog.tyre_brand_summer_van_title', {brand: param.type.slice(0, 1).toUpperCase() + param.type.slice(1, param.type.length)})}</title>
            <meta
                name="description"
                content={t('seoCatalog.tyre_brand_summer_van_description', {brand: param.type.slice(0, 1).toUpperCase() + param.type.slice(1, param.type.length)})}
            />
            <meta
                name="keywords"
                content={t('seoCatalog.tyre_brand_summer_van_keywords', {brand: param.type.slice(0, 1).toUpperCase() + param.type.slice(1, param.type.length)})}
            />
            <link rel="canonical" href={process.env.REACT_APP_CORS! + url.pathname}/>
            <link rel="alternate" hrefLang='ru' href={process.env.REACT_APP_CORS + '/ru' + url.pathname}/>
            <link rel="alternate" hrefLang='uk' href={process.env.REACT_APP_CORS! + url.pathname}/>
        </Helmet>
        : null
        }
        {param && (param.season === 'zimova' || param.season === 'zimnyaya') && (param.studded === 'legkovantazhnii' || param.studded === 'legkogruzovoi') && param.type && !param.brands && url.pathname?.includes('/tyres') ?
        <Helmet>
            <title>{t('seoCatalog.tyre_brand_winter_van_title', {brand: param.type.slice(0, 1).toUpperCase() + param.type.slice(1, param.type.length)})}</title>
            <meta
                name="description"
                content={t('seoCatalog.tyre_brand_winter_van_description', {brand: param.type.slice(0, 1).toUpperCase() + param.type.slice(1, param.type.length)})}
            />
            <meta
                name="keywords"
                content={t('seoCatalog.tyre_brand_winter_van_keywords', {brand: param.type.slice(0, 1).toUpperCase() + param.type.slice(1, param.type.length)})}
            />
            <link rel="canonical" href={process.env.REACT_APP_CORS! + url.pathname}/>
            <link rel="alternate" hrefLang='ru' href={process.env.REACT_APP_CORS + '/ru' + url.pathname}/>
            <link rel="alternate" hrefLang='uk' href={process.env.REACT_APP_CORS! + url.pathname}/>
        </Helmet>
        : null
        }
        {param && (param.season === 'vsesezonna' || param.season === 'vsesezonnaya') && (param.studded === 'legkovantazhnii' || param.studded === 'legkogruzovoi') && param.type && !param.brands && url.pathname?.includes('/tyres') ?
        <Helmet>
            <title>{t('seoCatalog.tyre_brand_allseason_van_title', {brand: param.type.slice(0, 1).toUpperCase() + param.type.slice(1, param.type.length)})}</title>
            <meta
                name="description"
                content={t('seoCatalog.tyre_brand_allseason_van_winter_description', {brand: param.type.slice(0, 1).toUpperCase() + param.type.slice(1, param.type.length)})}
            />
            <meta
                name="keywords"
                content={t('seoCatalog.tyre_brand_allseason_van_winter_keywords', {brand: param.type.slice(0, 1).toUpperCase() + param.type.slice(1, param.type.length)})}
            />
            <link rel="canonical" href={process.env.REACT_APP_CORS! + url.pathname}/>
            <link rel="alternate" hrefLang='ru' href={process.env.REACT_APP_CORS + '/ru' + url.pathname}/>
            <link rel="alternate" hrefLang='uk' href={process.env.REACT_APP_CORS! + url.pathname}/>
        </Helmet>
        : null
        }
        {param && (param.season === 'vsesezonna' || param.season === 'vsesezonnaya') && (param.studded === 'vantazhnі-shini' || param.studded === 'gruzovie-shini') && param.type && !param.brands && url.pathname?.includes('/tyres') ?
        <Helmet>
            <title>{t('seoCatalog.tyre_brand_allseason_truck_title', {brand: param.type.slice(0, 1).toUpperCase() + param.type.slice(1, param.type.length)})}</title>
            <meta
                name="description"
                content={t('seoCatalog.tyre_brand_allseason_truck_winter_description', {brand: param.type.slice(0, 1).toUpperCase() + param.type.slice(1, param.type.length)})}
            />
            <meta
                name="keywords"
                content={t('seoCatalog.tyre_brand_allseason_truck_winter_keywords', {brand: param.type.slice(0, 1).toUpperCase() + param.type.slice(1, param.type.length)})}
            />
            <link rel="canonical" href={process.env.REACT_APP_CORS! + url.pathname}/>
            <link rel="alternate" hrefLang='ru' href={process.env.REACT_APP_CORS + '/ru' + url.pathname}/>
            <link rel="alternate" hrefLang='uk' href={process.env.REACT_APP_CORS! + url.pathname}/>
        </Helmet>
        : null
        }
        {param && (param.season === 'lіtnya' || param.season === 'letnyaya') && param.studded && param.type?.includes('w') && param.brands?.includes('h') && param.width?.includes('r') && url.pathname?.includes('/tyres') ?
        <Helmet>
            <title>{t('seoCatalog.tyre_brand_summer_size_title', 
                {
                    brand: param.studded.slice(0, 1).toUpperCase() + param.studded.slice(1, param.studded.length),
                    width: param.type.slice(1, param.studded.length),
                    height: param.brands.slice(1, param.studded.length),
                    diameter: param.width.toUpperCase()
                })}
            </title>
            <meta
                name="description"
                content={t('seoCatalog.tyre_brand_summer_size_description', {
                    brand: param.studded.slice(0, 1).toUpperCase() + param.studded.slice(1, param.studded.length),
                    width: param.type.slice(1, param.studded.length),
                    height: param.brands.slice(1, param.studded.length),
                    diameter: param.width.toUpperCase()
                })}
            />
            <meta
                name="keywords"
                content={t('seoCatalog.tyre_brand_summer_size_keywords', {
                    brand: param.studded.slice(0, 1).toUpperCase() + param.studded.slice(1, param.studded.length),
                    width: param.type.slice(1, param.studded.length),
                    height: param.brands.slice(1, param.studded.length),
                    diameter: param.width.toUpperCase()
                })}
            />
            <link rel="canonical" href={process.env.REACT_APP_CORS! + url.pathname}/>
            <link rel="alternate" hrefLang='ru' href={process.env.REACT_APP_CORS + '/ru' + url.pathname}/>
            <link rel="alternate" hrefLang='uk' href={process.env.REACT_APP_CORS! + url.pathname}/>
        </Helmet>
        : null
        }
        {param && (param.season === 'zimova' || param.season === 'zimnyaya') && param.studded && param.type?.includes('w') && param.brands?.includes('h') && param.width?.includes('r') && url.pathname?.includes('/tyres') ?
        <Helmet>
            <title>{t('seoCatalog.tyre_brand_winter_size_title', 
                {
                    brand: param.studded.slice(0, 1).toUpperCase() + param.studded.slice(1, param.studded.length),
                    width: param.type.slice(1, param.studded.length),
                    height: param.brands.slice(1, param.studded.length),
                    diameter: param.width.toUpperCase()
                })}
            </title>
            <meta
                name="description"
                content={t('seoCatalog.tyre_brand_winter_size_description', {
                    brand: param.studded.slice(0, 1).toUpperCase() + param.studded.slice(1, param.studded.length),
                    width: param.type.slice(1, param.studded.length),
                    height: param.brands.slice(1, param.studded.length),
                    diameter: param.width.toUpperCase()
                })}
            />
            <meta
                name="keywords"
                content={t('seoCatalog.tyre_brand_winter_size_keywords', {
                    brand: param.studded.slice(0, 1).toUpperCase() + param.studded.slice(1, param.studded.length),
                    width: param.type.slice(1, param.studded.length),
                    height: param.brands.slice(1, param.studded.length),
                    diameter: param.width.toUpperCase()
                })}
            />
            <link rel="canonical" href={process.env.REACT_APP_CORS! + url.pathname}/>
            <link rel="alternate" hrefLang='ru' href={process.env.REACT_APP_CORS + '/ru' + url.pathname}/>
            <link rel="alternate" hrefLang='uk' href={process.env.REACT_APP_CORS! + url.pathname}/>
        </Helmet>
        : null
        }
        {param && (param.season === 'vsesezonna' || param.season === 'vsesezonnaya') && param.studded && param.type?.includes('w') && param.brands?.includes('h') && param.width?.includes('r') && url.pathname?.includes('/tyres') ?
        <Helmet>
            <title>{t('seoCatalog.tyre_brand_allseason_size_title', 
                {
                    brand: param.studded.slice(0, 1).toUpperCase() + param.studded.slice(1, param.studded.length),
                    width: param.type.slice(1, param.studded.length),
                    height: param.brands.slice(1, param.studded.length),
                    diameter: param.width.toUpperCase()
                })}
            </title>
            <meta
                name="description"
                content={t('seoCatalog.tyre_brand_allseason_size_description', {
                    brand: param.studded.slice(0, 1).toUpperCase() + param.studded.slice(1, param.studded.length),
                    width: param.type.slice(1, param.studded.length),
                    height: param.brands.slice(1, param.studded.length),
                    diameter: param.width.toUpperCase()
                })}
            />
            <meta
                name="keywords"
                content={t('seoCatalog.tyre_brand_allseason_size_keywords', {
                    brand: param.studded.slice(0, 1).toUpperCase() + param.studded.slice(1, param.studded.length),
                    width: param.type.slice(1, param.studded.length),
                    height: param.brands.slice(1, param.studded.length),
                    diameter: param.width.toUpperCase()
                })}
            />
            <link rel="canonical" href={process.env.REACT_APP_CORS! + url.pathname}/>
            <link rel="alternate" hrefLang='ru' href={process.env.REACT_APP_CORS + '/ru' + url.pathname}/>
            <link rel="alternate" hrefLang='uk' href={process.env.REACT_APP_CORS! + url.pathname}/>
        </Helmet>
        : null
        }
        {param && (param.season === 'lіtnya' || param.season === 'letnyaya') && param.studded && param.type?.includes('w') && param.brands?.includes('h') && !param.width && url.pathname?.includes('/tyres') ?
        <Helmet>
            <title>{t('seoCatalog.tyre_brand_summer_size_title', 
                {
                    brand: param.studded.slice(0, 1).toUpperCase() + param.studded.slice(1, param.studded.length),
                    width: param.type.slice(1, param.studded.length),
                    height: param.brands.slice(1, param.studded.length),
                    diameter: ''
                })}
            </title>
            <meta
                name="description"
                content={t('seoCatalog.tyre_brand_summer_size_description', {
                    brand: param.studded.slice(0, 1).toUpperCase() + param.studded.slice(1, param.studded.length),
                    width: param.type.slice(1, param.studded.length),
                    height: param.brands.slice(1, param.studded.length),
                    diameter: ''
                })}
            />
            <meta
                name="keywords"
                content={t('seoCatalog.tyre_brand_summer_size_keywords', {
                    brand: param.studded.slice(0, 1).toUpperCase() + param.studded.slice(1, param.studded.length),
                    width: param.type.slice(1, param.studded.length),
                    height: param.brands.slice(1, param.studded.length),
                    diameter: ''
                })}
            />
            <link rel="canonical" href={process.env.REACT_APP_CORS! + url.pathname}/>
            <link rel="alternate" hrefLang='ru' href={process.env.REACT_APP_CORS + '/ru' + url.pathname}/>
            <link rel="alternate" hrefLang='uk' href={process.env.REACT_APP_CORS! + url.pathname}/>
        </Helmet>
        : null
        }
        {param && (param.season === 'zimova' || param.season === 'zimnyaya') && param.studded && param.type?.includes('w') && param.brands?.includes('h') && !param.width && url.pathname?.includes('/tyres') ?
        <Helmet>
            <title>{t('seoCatalog.tyre_brand_winter_size_title', 
                {
                    brand: param.studded.slice(0, 1).toUpperCase() + param.studded.slice(1, param.studded.length),
                    width: param.type.slice(1, param.studded.length),
                    height: param.brands.slice(1, param.studded.length),
                    diameter: ''
                })}
            </title>
            <meta
                name="description"
                content={t('seoCatalog.tyre_brand_winter_size_description', {
                    brand: param.studded.slice(0, 1).toUpperCase() + param.studded.slice(1, param.studded.length),
                    width: param.type.slice(1, param.studded.length),
                    height: param.brands.slice(1, param.studded.length),
                    diameter: ''
                })}
            />
            <meta
                name="keywords"
                content={t('seoCatalog.tyre_brand_winter_size_keywords', {
                    brand: param.studded.slice(0, 1).toUpperCase() + param.studded.slice(1, param.studded.length),
                    width: param.type.slice(1, param.studded.length),
                    height: param.brands.slice(1, param.studded.length),
                    diameter: ''
                })}
            />
            <link rel="canonical" href={process.env.REACT_APP_CORS! + url.pathname}/>
            <link rel="alternate" hrefLang='ru' href={process.env.REACT_APP_CORS + '/ru' + url.pathname}/>
            <link rel="alternate" hrefLang='uk' href={process.env.REACT_APP_CORS! + url.pathname}/>
        </Helmet>
        : null
        }
        {param && (param.season === 'vsesezonna' || param.season === 'vsesezonnaya') && param.studded && param.type?.includes('w') && param.brands?.includes('h') && !param.width && url.pathname?.includes('/tyres') ?
        <Helmet>
            <title>{t('seoCatalog.tyre_brand_allseason_size_title', 
                {
                    brand: param.studded.slice(0, 1).toUpperCase() + param.studded.slice(1, param.studded.length),
                    width: param.type.slice(1, param.studded.length),
                    height: param.brands.slice(1, param.studded.length),
                    diameter: ''
                })}
            </title>
            <meta
                name="description"
                content={t('seoCatalog.tyre_brand_allseason_size_description', {
                    brand: param.studded.slice(0, 1).toUpperCase() + param.studded.slice(1, param.studded.length),
                    width: param.type.slice(1, param.studded.length),
                    height: param.brands.slice(1, param.studded.length),
                    diameter: ''
                })}
            />
            <meta
                name="keywords"
                content={t('seoCatalog.tyre_brand_allseason_size_keywords', {
                    brand: param.studded.slice(0, 1).toUpperCase() + param.studded.slice(1, param.studded.length),
                    width: param.type.slice(1, param.studded.length),
                    height: param.brands.slice(1, param.studded.length),
                    diameter: ''
                })}
            />
            <link rel="canonical" href={process.env.REACT_APP_CORS! + url.pathname}/>
            <link rel="alternate" hrefLang='ru' href={process.env.REACT_APP_CORS + '/ru' + url.pathname}/>
            <link rel="alternate" hrefLang='uk' href={process.env.REACT_APP_CORS! + url.pathname}/>
        </Helmet>
        : null
        }


        {param && (param.season === 'lіtnya' || param.season === 'letnyaya') && param.studded && param.type?.includes('w') && !param.brands && !param.width && url.pathname?.includes('/tyres') ?
        <Helmet>
            <title>{t('seoCatalog.tyre_brand_summer_size_title', 
                {
                    brand: param.studded.slice(0, 1).toUpperCase() + param.studded.slice(1, param.studded.length),
                    width: param.type.slice(1, param.studded.length),
                    height: '',
                    diameter: ''
                })}
            </title>
            <meta
                name="description"
                content={t('seoCatalog.tyre_brand_summer_size_description', {
                    brand: param.studded.slice(0, 1).toUpperCase() + param.studded.slice(1, param.studded.length),
                    width: param.type.slice(1, param.studded.length),
                    height: '',
                    diameter: ''
                })}
            />
            <meta
                name="keywords"
                content={t('seoCatalog.tyre_brand_summer_size_keywords', {
                    brand: param.studded.slice(0, 1).toUpperCase() + param.studded.slice(1, param.studded.length),
                    width: param.type.slice(1, param.studded.length),
                    height: '',
                    diameter: ''
                })}
            />
            <link rel="canonical" href={process.env.REACT_APP_CORS! + url.pathname}/>
            <link rel="alternate" hrefLang='ru' href={process.env.REACT_APP_CORS + '/ru' + url.pathname}/>
            <link rel="alternate" hrefLang='uk' href={process.env.REACT_APP_CORS! + url.pathname}/>
        </Helmet>
        : null
        }
        {param && (param.season === 'zimova' || param.season === 'zimnyaya') && param.studded && param.type?.includes('w') && !param.brands && !param.width && url.pathname?.includes('/tyres') ?
        <Helmet>
            <title>{t('seoCatalog.tyre_brand_winter_size_title', 
                {
                    brand: param.studded.slice(0, 1).toUpperCase() + param.studded.slice(1, param.studded.length),
                    width: param.type.slice(1, param.studded.length),
                    height: '',
                    diameter: ''
                })}
            </title>
            <meta
                name="description"
                content={t('seoCatalog.tyre_brand_winter_size_description', {
                    brand: param.studded.slice(0, 1).toUpperCase() + param.studded.slice(1, param.studded.length),
                    width: param.type.slice(1, param.studded.length),
                    height: '',
                    diameter: ''
                })}
            />
            <meta
                name="keywords"
                content={t('seoCatalog.tyre_brand_winter_size_keywords', {
                    brand: param.studded.slice(0, 1).toUpperCase() + param.studded.slice(1, param.studded.length),
                    width: param.type.slice(1, param.studded.length),
                    height: '',
                    diameter: ''
                })}
            />
            <link rel="canonical" href={process.env.REACT_APP_CORS! + url.pathname}/>
            <link rel="alternate" hrefLang='ru' href={process.env.REACT_APP_CORS + '/ru' + url.pathname}/>
            <link rel="alternate" hrefLang='uk' href={process.env.REACT_APP_CORS! + url.pathname}/>
        </Helmet>
        : null
        }
        {param && (param.season === 'vsesezonna' || param.season === 'vsesezonnaya') && param.studded && param.type?.includes('w') && !param.brands && !param.width && url.pathname?.includes('/tyres') ?
        <Helmet>
            <title>{t('seoCatalog.tyre_brand_allseason_size_title', 
                {
                    brand: param.studded.slice(0, 1).toUpperCase() + param.studded.slice(1, param.studded.length),
                    width: param.type.slice(1, param.studded.length),
                    height: '',
                    diameter: ''
                })}
            </title>
            <meta
                name="description"
                content={t('seoCatalog.tyre_brand_allseason_size_description', {
                    brand: param.studded.slice(0, 1).toUpperCase() + param.studded.slice(1, param.studded.length),
                    width: param.type.slice(1, param.studded.length),
                    height: '',
                    diameter: ''
                })}
            />
            <meta
                name="keywords"
                content={t('seoCatalog.tyre_brand_allseason_size_keywords', {
                    brand: param.studded.slice(0, 1).toUpperCase() + param.studded.slice(1, param.studded.length),
                    width: param.type.slice(1, param.studded.length),
                    height: '',
                    diameter: ''
                })}
            />
            <link rel="canonical" href={process.env.REACT_APP_CORS! + url.pathname}/>
            <link rel="alternate" hrefLang='ru' href={process.env.REACT_APP_CORS + '/ru' + url.pathname}/>
            <link rel="alternate" hrefLang='uk' href={process.env.REACT_APP_CORS! + url.pathname}/>
        </Helmet>
        : null
        }
        </>
    )
}

export default SeoCatalogTags