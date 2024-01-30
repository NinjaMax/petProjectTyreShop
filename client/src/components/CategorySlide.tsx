import React from 'react';
import '../css/CategorySlide.css';
import summerCat from '../assets/img/summer_tyres1.png';
import winterCat from '../assets/img/winter_tyres1.png';
import allseasonCat from '../assets/img/all_seasonstyre1_300.png';
//import akbCat from '../assets/img/akbCatImg300_200.png';
import wheelsCat from '../assets/img/wheelsImg300_200_3_blugrey.png';
import { useTranslation } from 'react-i18next';

const CategorySlide = () => {
  const { t, i18n } = useTranslation();
    
  return (
        <div>
            <div className="rowCategoreSlider">
                <div className="columnCategorySlider">
                  <a href='/tyres/lіtnya'>
                    <img src={summerCat} 
                      className="hover-shadow" 
                      alt='categorySlider'/>
                    <div className='contentCategorySlider'>
                      <h2>{t('categorySlyder.category_summer_tyre')}</h2>
                    </div>
                  </a>
                </div>
                <div className="columnCategorySlider">
                  <a href='/tyres/zimova'>
                    <img src={winterCat}
                      className="hover-shadow" 
                      alt='categorySlider'
                    />
                    <div className='contentCategorySlider'>
                      <h2>{t('categorySlyder.category_winter_tyre')}</h2>
                    </div>
                  </a> 
                </div>
                <div className="columnCategorySlider">
                  <a href='/tyres/vsesezonna'>
                    <img src={allseasonCat} 
                      className="hover-shadow" 
                      alt='categorySlider'
                    />
                    <div className='contentCategorySlider'>
                      <h2>{t('categorySlyder.category_allseason_tyre')}</h2>
                    </div>
                  </a>
                </div>
                <div className="columnCategorySlider">
                  <a href='/wheels'>
                    <img src={wheelsCat} 
                      className="hover-shadow" 
                      alt='categorySlider'
                    />
                    <div className='contentCategorySlider'>
                      <h2>{t('categorySlyder.category_wheels')}</h2>
                    </div>
                  </a>
                </div>
            </div>
        </div>
    );
};

export default CategorySlide;