import React from 'react';
import '../css/BrandList/BrandListMain.css';
import { tyreBrandLogo } from '../services/tyreBrandImg.service';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

const BrandsListMain = () => {
    const params = useParams<any>();
    const { i18n } = useTranslation();
    
    return (
    <div className='brandListMainContainer'>
        <div className='brandListMainBox'>
            <a className='brandListMainItem' 
                href={i18n.resolvedLanguage === 'uk' && !params.ru ? '/tyres/goodyear' : '/ru/tyres/goodyear'}>
                <img className='imgBrandListMain' 
                src={tyreBrandLogo('Goodyear')}
                width={180}
                height={42}
                sizes='(max-width: 2560px) 180px,
                (max-width: 1440px) 180px,
                (max-width: 1024px) 180px,
                (max-width: 768px) 180px,
                (max-width: 425px) 180px,
                (max-width: 375px) 180px,
                (max-width: 320px) 180px, 100vw'
                loading='lazy'
                decoding='async'
                alt='goodyearimg'
                />
                GoodYear
            </a>
            <a className='brandListMainItem' 
                href={i18n.resolvedLanguage === 'uk' && !params.ru ? '/tyres/continental' : '/ru/tyres/continental'}>
                <img className='imgBrandListMain' 
                src={tyreBrandLogo('Continental')} 
                width={180}
                height={42}
                sizes='(max-width: 2560px) 180px,
                (max-width: 1440px) 180px,
                (max-width: 1024px) 180px,
                (max-width: 768px) 180px,
                (max-width: 425px) 180px,
                (max-width: 375px) 180px,
                (max-width: 320px) 180px, 100vw'
                loading='lazy' 
                decoding='async'
                alt='imgContinental'/>
                Continental
            </a>
            <a className='brandListMainItem' 
                href={i18n.resolvedLanguage === 'uk' && !params.ru ? '/tyres/hankook' : '/ru/tyres/hankook'}>
                <img className='imgBrandListMain' 
                src={tyreBrandLogo('Hankook')} 
                width={180}
                height={42}
                sizes='(max-width: 2560px) 180px,
                (max-width: 1440px) 180px,
                (max-width: 1024px) 180px,
                (max-width: 768px) 180px,
                (max-width: 425px) 180px,
                (max-width: 375px) 180px,
                (max-width: 320px) 180px, 100vw'
                loading='lazy'
                decoding='async'
                alt='imgHankook'/>
                Hankook
            </a>
            <a className='brandListMainItem' 
                href={i18n.resolvedLanguage === 'uk' && !params.ru ? '/tyres/bridgestone' : '/ru/tyres/bridgestone'}>
                <img className='imgBrandListMain' 
                src={tyreBrandLogo('Bridgestone')} 
                width={180}
                height={42}
                sizes='(max-width: 2560px) 180px,
                (max-width: 1440px) 180px,
                (max-width: 1024px) 180px,
                (max-width: 768px) 180px,
                (max-width: 425px) 180px,
                (max-width: 375px) 180px,
                (max-width: 320px) 180px, 100vw'
                loading='lazy'
                decoding='async'
                alt='imgBridgestone'/>
                Bridgestone
            </a>
            <a className='brandListMainItem' 
                href={i18n.resolvedLanguage === 'uk' && !params.ru ? '/tyres/nokian' : '/ru/tyres/nokian'}>
                <img className='imgBrandListMain' 
                src={tyreBrandLogo('Nokian')} 
                width={180}
                height={42}
                sizes='(max-width: 2560px) 180px,
                (max-width: 1440px) 180px,
                (max-width: 1024px) 180px,
                (max-width: 768px) 180px,
                (max-width: 425px) 180px,
                (max-width: 375px) 180px,
                (max-width: 320px) 180px, 100vw'
                loading='lazy'
                decoding='async'
                alt='imgNokian'/>
                Nokian
            </a>
            <a className='brandListMainItem' 
                href={i18n.resolvedLanguage === 'uk' && !params.ru ? '/tyres/michelin' : '/ru/tyres/michelin'}>
                <img className='imgBrandListMain' 
                src={tyreBrandLogo('Michelin')} 
                width={180}
                height={42}
                sizes='(max-width: 2560px) 180px,
                (max-width: 1440px) 180px,
                (max-width: 1024px) 180px,
                (max-width: 768px) 180px,
                (max-width: 425px) 180px,
                (max-width: 375px) 180px,
                (max-width: 320px) 180px, 100vw'
                loading='lazy'
                decoding='async'
                alt='imgMichelin'/>
                Michelin
            </a>
        </div>
    </div>
  )
}

export default BrandsListMain