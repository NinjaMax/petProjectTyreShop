import React from 'react';
import '../css/CategorySlide.css';
import summerCat from '../assets/img/summer_tyres1.png';
import winterCat from '../assets/img/winter_tyres1.png';
import allseasonCat from '../assets/img/all_seasonstyre1_300.png';
//import akbCat from '../assets/img/akbCatImg300_200.png';
import wheelsCat from '../assets/img/wheelsImg300_200_3_blugrey.png';

const CategorySlide = () => {
    return (
        <div>
            <div className="rowCategoreSlider">
                <div className="columnCategorySlider">
                  <img src={summerCat} className="hover-shadow" alt='categorySlider'/>
                  <div className='contentCategorySlider'>
                    <h2>Літні шини</h2>
                  </div>
                </div>
                <div className="columnCategorySlider">
                  <img src={winterCat} onClick={(e) => console.log(e.currentTarget)} className="hover-shadow" alt='categorySlider'/>
                  <div className='contentCategorySlider'>
                    <h2>Зимові шини</h2>
                  </div>
                </div>
                <div className="columnCategorySlider">
                  <img src={allseasonCat} onClick={(e) => console.log(e.currentTarget)} className="hover-shadow" alt='categorySlider'/>
                  <div className='contentCategorySlider'>
                    <h2>Всесезонні шини</h2>
                  </div>
                </div>
                <div className="columnCategorySlider">
                  <img src={wheelsCat} onClick={(e) => console.log(e.currentTarget)} className="hover-shadow" alt='categorySlider'/>
                  <div className='contentCategorySlider'>
                    <h2>Диски</h2>
                  </div>
                </div>
            </div>
        </div>
    );
};

export default CategorySlide;