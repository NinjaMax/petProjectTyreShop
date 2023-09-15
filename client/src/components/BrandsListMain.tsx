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
                alt='goodyearimg'
                />
                GoodYear
            </a>
            <a className='brandListMainItem' href='/tyres/continental'>
                <img className='imgBrandListMain' 
                src={tyreBrandLogo('Continental')} alt='imgContinental'/>
                Continental
            </a>
            <a className='brandListMainItem' href='/tyres/hankook'>
                <img className='imgBrandListMain' 
                src={tyreBrandLogo('Hankook')} alt='imgHankook'/>
                Hankook
            </a>
            <a className='brandListMainItem' href='/tyres/bridgestone'>
                <img className='imgBrandListMain' 
                src={tyreBrandLogo('Bridgestone')} alt='imgBridgestone'/>
                Bridgestone
            </a>
            <a className='brandListMainItem' href='/tyres/nokian'>
                <img className='imgBrandListMain' 
                src={tyreBrandLogo('Nokian')} alt='imgNokian'/>
                Nokian
            </a>
            <a className='brandListMainItem' href='/tyres/michelin'>
                <img className='imgBrandListMain' 
                src={tyreBrandLogo('Michelin')} alt='imgMichelin'/>
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