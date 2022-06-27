import React from 'react';
import '../css/CategorySlide.css';

const CategorySlide = () => {
    return (
        <div>
            <div className="row">
                <div className="column">
                  <img src="../assets/pexelsJaePark.jpg" href="/goods" className="hover-shadow" alt='categorySlider'/>
                </div>
                <div className="column">
                  <img src="../assets/pexelsVincenzoMalagoli.jpg" onClick={"openModal();currentSlide(2)"} className="hover-shadow" alt='categorySlider'/>
                </div>
                <div className="column">
                  <img src="../assets/michelintyres.jpg" onClick={"openModal();currentSlide(3)"} className="hover-shadow" alt='categorySlider'/>
                </div>
            </div>
        </div>
    );
};

export default CategorySlide;