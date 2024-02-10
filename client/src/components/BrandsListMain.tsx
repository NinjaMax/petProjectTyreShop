import React from 'react';
import '../css/BrandList/BrandListMain.css';
import { tyreBrandLogo } from '../services/tyreBrandImg.service';

const BrandsListMain = () => {
  return (
    <div className='brandListMainContainer'>
    <div className='brandListMainBox'>
            <a className='brandListMainItem' href='/tyres/goodyear'>
                <img className='imgBrandListMain' 
                src={tyreBrandLogo('Goodyear')}
                loading='lazy'
                decoding='async'
                alt='goodyearimg'
                />
                GoodYear
            </a>
            <a className='brandListMainItem' href='/tyres/continental'>
                <img className='imgBrandListMain' 
                src={tyreBrandLogo('Continental')} 
                loading='lazy' 
                decoding='async'
                alt='imgContinental'/>
                Continental
            </a>
            <a className='brandListMainItem' href='/tyres/hankook'>
                <img className='imgBrandListMain' 
                src={tyreBrandLogo('Hankook')} 
                loading='lazy'
                decoding='async'
                alt='imgHankook'/>
                Hankook
            </a>
            <a className='brandListMainItem' href='/tyres/bridgestone'>
                <img className='imgBrandListMain' 
                src={tyreBrandLogo('Bridgestone')} 
                loading='lazy'
                decoding='async'
                alt='imgBridgestone'/>
                Bridgestone
            </a>
            <a className='brandListMainItem' href='/tyres/nokian'>
                <img className='imgBrandListMain' 
                src={tyreBrandLogo('Nokian')} 
                loading='lazy'
                decoding='async'
                alt='imgNokian'/>
                Nokian
            </a>
            <a className='brandListMainItem' href='/tyres/michelin'>
                <img className='imgBrandListMain' 
                src={tyreBrandLogo('Michelin')} 
                loading='lazy'
                decoding='async'
                alt='imgMichelin'/>
                Michelin
            </a>
        {/* <div className='brandListMainItem'>
            <img className='imgBrandListMain' 
            src=''/>
            <span>Toyo</span>
        </div>
        <div className='brandListMainItem'>
            <img className='imgBrandListMain' 
            src=''/>
            <span>Lassa</span>
        </div>
        <div className='brandListMainItem'>
            <img className='imgBrandListMain' 
            src=''/>
            <span>Nexen</span>
        </div>
        <div className='brandListMainItem'>
            <img className='imgBrandListMain' 
            src=''/>
            <span>Premiorri</span>
        </div> */}
    </div>
    </div>
  )
}

export default BrandsListMain