import React from 'react';
import '../css/CategorySlide.css';
import imgMichelin from '../assets/michelintyres.jpg';
import imgPark from '../assets/pexelsJaePark.jpg';
import imgMalag from '../assets/pexelsVincenzoMalagoli.jpg';

const CategorySlide = () => {
    return (
        <div>
            <div className="rowCategoreSlider">
                <div className="columnCategorySlider">
                  <img src={imgPark} href="/goods" className="hover-shadow" alt='categorySlider'/>
                </div>
                <div className="columnCategorySlider">
                  <img src={imgMichelin} onClick={"openModal();currentSlide(2)"} className="hover-shadow" alt='categorySlider'/>
                </div>
                <div className="columnCategorySlider">
                  <img src={imgMalag} onClick={"openModal();currentSlide(3)"} className="hover-shadow" alt='categorySlider'/>
                </div>
                <div className="columnCategorySlider">
                  <img src={imgMalag} onClick={"openModal();currentSlide(3)"} className="hover-shadow" alt='categorySlider'/>
                </div>
            </div>
        </div>
    );
};

export default CategorySlide;