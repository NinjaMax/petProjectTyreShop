import React from 'react';
import '../css/CategorySlide.css';

const CategorySlide = () => {
    return (
        <div>
            <div className="row">
                <div className="column">
                  <img src="img1.jpg" href="/goods" className="hover-shadow" alt='categorySlider'/>
                </div>
                <div className="column">
                  <img src="img2.jpg" onclick="openModal();currentSlide(2)" className="hover-shadow" alt='categorySlider'/>
                </div>
                <div className="column">
                  <img src="img3.jpg" onclick="openModal();currentSlide(3)" className="hover-shadow" alt='categorySlider'/>
                </div>
            </div>
        </div>
    );
};

export default CategorySlide;