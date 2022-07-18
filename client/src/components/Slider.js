import React from 'react';
import '../css/Slider.css';
import sliderOne from '../assets/michelintyres.jpg';
//import sliderTwo from '../assets/pexelsJaePark.jpg';

const Slider = () => {
    return (
      <div className='sliderMain'>
        <div className="slideshowContainer">
          <div id='sliderOne' className="mySlides fade">
            <div className="numbertext">1 / 3</div>
            <img src={sliderOne} alt='sliderOne'/>
            <div className="text">Caption Text</div>
          </div>
          <div id="sliderTwo"className="mySlides fade">
            <div className="numbertext">2 / 3</div>
            <img src={'one'} alt='sliderTwo'/>
            <div className="text">Caption Two</div>
          </div>
          <div id='sliderThree' className="mySlides fade">
            <div className="numbertext">3 / 3</div>
            <img src="img3.jpg"  alt='sliderThree'/>
            <div className="text">Caption Three</div>
          </div>
          <span className="prevBtnSlider" onClick={''}>&#10094;</span>
          <span className="nextBtnslider" onClick={''}>&#10095;</span>
        </div>
        <div className='dotContainer'>
          <span className="dot" onClick={"currentSlide(1)"}></span>
          <span className="dot" onClick={"currentSlide(2)"}></span>
          <span className="dot" onClick={"currentSlide(3)"}></span>
        </div>
      </div>
      
      );
    };

export default Slider;