import React from 'react';
import '../css/Slider.css';
import sliderOne from '../assets/michelintyres.jpg';
import sliderBoxTopImg from '../assets/pexelsJaePark.jpg';
import sliderBoxBottomImg from '../assets/pexelsVincenzoMalagoli.jpg';
import DotSite from './UX/DotSite';

const Slider = () => {
    return (
      <div className='sliderMain'>
        <div className="slideShowContainer">
          <div id='sliderOne' className="mySlides fade">
            <div className="numbertext">1 / 3</div>
            <img src={sliderOne} alt='sliderOne'/>
          </div>
          <div id="sliderTwo"className="mySlides fade">
            <div className="numbertext">2 / 3</div>
            <img src={'one'} alt='sliderTwo'/>
          </div>
          <div id='sliderThree' className="mySlides fade">
            <div className="numbertext">3 / 3</div>
            <img src="img3.jpg"  alt='sliderThree'/>
          </div>
            <span className="prevBtnSlider" onClick={''}>&#10094;</span>
            <span className="nextBtnslider" onClick={''}>&#10095;</span>
        </div>
        <div className='dotContainer'>
          <DotSite/>
        </div>
        <div className='sliderImgBoxTop'>
          <img id='imgSliderBoxTop' src={sliderBoxTopImg} alt='sliderBoxTop'/>
        </div>
        <div className='sliderImgBoxBottom'>
          <img id='imgSliderBoxBottom' src={sliderBoxBottomImg} alt='sliderBoxBottom'/>
        </div>
      </div>
      
      );
    };

export default Slider;