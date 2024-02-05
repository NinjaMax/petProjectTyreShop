import React from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';

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
        {param && ( param.season === 's-g' || param.season === 's-kh') && !param.brands && !param.type && url.pathname?.includes('/tyres') ?
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

        {param && (param.season === 'lіtnya' || param.season === 'letnyaya') && !param.brands && (param.studded === 'legkovantazhnii' || param.studded === 'legkogruzovo') && url.pathname?.includes('/tyres') ?
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
        {param && (param.season === 'zimova' || param.season === 'zimnyaya') && !param.brands && (param.studded === 'legkovantazhnii' || param.studded === 'legkogruzovo') && url.pathname?.includes('/tyres') ?
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
        {param && (param.season === 'vsesezonna' || param.season === 'vsesezonnaya') && !param.brands && (param.studded === 'legkovantazhnii' || param.studded === 'legkogruzovo') && url.pathname?.includes('/tyres') ?
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
        </>
    )
}

export default SeoCatalogTags