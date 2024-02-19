import '../css/CategorySlide.css';
import { useTranslation } from 'react-i18next';

const CategorySlide = () => {
  const { t } = useTranslation();
    
  return (
        <div>
            <div className="rowCategoreSlider">
                <div className="columnCategorySlider">
                  <a href='/tyres/lіtnya'>
                    <img src='img/summer_tyres1.webp' 
                      loading='lazy'
                      decoding='async'
                      width={300}
                      height={200}
                      sizes='(max-width: 2560px) 300px,
                      (max-width: 1440px) 300px,
                      (max-width: 1024px) 300px,
                      (max-width: 768px) 300px,
                      (max-width: 425px) 300px,
                      (max-width: 375px) 280px,
                      (max-width: 320px) 280px, 100vw'
                      className="hover-shadow" 
                      alt='categorySliderSummer'/>
                    <div className='contentCategorySlider'>
                      <h2>{t('categorySlyder.category_summer_tyre')}</h2>
                    </div>
                  </a>
                </div>
                <div className="columnCategorySlider">
                  <a href='/tyres/zimova'>
                    <img src='img/winter_tyres1.webp'
                      loading='lazy'
                      decoding='async'
                      width={300}
                      height={200}
                      sizes='(max-width: 2560px) 300px,
                        (max-width: 1440px) 300px,
                        (max-width: 1024px) 300px,
                        (max-width: 768px) 300px,
                        (max-width: 425px) 300px,
                        (max-width: 375px) 280px,
                        (max-width: 320px) 280px, 100vw'
                      className="hover-shadow" 
                      alt='categorySliderWinter'
                    />
                    <div className='contentCategorySlider'>
                      <h2>{t('categorySlyder.category_winter_tyre')}</h2>
                    </div>
                  </a> 
                </div>
                <div className="columnCategorySlider">
                  <a href='/tyres/vsesezonna'>
                    <img src='img/all_seasonstyre1_300.webp' 
                      loading='lazy'
                      decoding='async'
                      width={300}
                      height={200}
                      sizes='(max-width: 2560px) 300px,
                        (max-width: 1440px) 300px,
                        (max-width: 1024px) 300px,
                        (max-width: 768px) 300px,
                        (max-width: 425px) 300px,
                        (max-width: 375px) 280px,
                        (max-width: 320px) 280px, 100vw'
                      className="hover-shadow" 
                      alt='categorySliderAll'
                    />
                    <div className='contentCategorySlider'>
                      <h2>{t('categorySlyder.category_allseason_tyre')}</h2>
                    </div>
                  </a>
                </div>
                <div className="columnCategorySlider">
                  <a href='/wheels'>
                    <img src='img/wheelsImg300_200_3_blugrey.webp' 
                      loading='lazy'
                      decoding='async'
                      width={300}
                      height={200}
                      sizes='(max-width: 2560px) 300px,
                        (max-width: 1440px) 300px,
                        (max-width: 1024px) 300px,
                        (max-width: 768px) 300px,
                        (max-width: 425px) 300px,
                        (max-width: 375px) 280px,
                        (max-width: 320px) 280px, 100vw'
                      className="hover-shadow" 
                      alt='categorySliderWheel'
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