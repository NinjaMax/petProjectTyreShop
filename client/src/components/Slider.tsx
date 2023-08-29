import React from 'react';
import '../css/Slider.css';
import sliderOne from '../assets/michelintyres.jpg';
import sliderBoxTopImg from '../assets/pexelsJaePark.jpg';
import sliderBoxBottomImg from '../assets/pexelsVincenzoMalagoli.jpg';
import DotSite from './ux/DotSite';
import ButtonPrevNext from './buttons/ButtonPrevNext';

const Slider = () => {
    return (
      <div className='sliderMain'>
        <div className="slideShowContainer">
          <div id='sliderOne' className="mySlides fade">
            <div className="numbertext">1 / 3</div>
            <img src="/sliders/winter_tire_offer_with_logo_842_385.png" alt='sliderOne'/>
          </div>
          <div id="sliderTwo"className="mySlides fade">
            <div className="numbertext">2 / 3</div>
            <img src={'one'} alt='sliderTwo'/>
          </div>
          <div id='sliderThree' className="mySlides fade">
            <div className="numbertext">3 / 3</div>
            <img src="img3.jpg"  alt='sliderThree'/>
          </div>
            <ButtonPrevNext prevBtnLeft={-8} nextBtnRight={-8}/>
        </div>
        <div className='dotContainer'>
          <DotSite/>
        </div>
        <div className='sliderImgBoxTop'>
          <img id='imgSliderBoxTop' src="/sliders/continental_offer_bonus_700_390.png" alt='sliderBoxTop'/>
        </div> 
        {/* <div className='sliderImgBoxTop'>
          <img id='imgSliderBoxTop' src="/sliders/michelin_tyres_offer_700_473.png" alt='sliderBoxTop'/>
        </div> */}
        {/* <div className='sliderImgBoxBottom'>
          <img id='imgSliderBoxBottom' src="/sliders/continental_offer_bonus_700_390.png" alt='sliderBoxBottom'/>
        </div> */}
      </div>
      
      );
    };

export default Slider;