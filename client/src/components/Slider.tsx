import React from 'react';
import '../css/Slider.css';
//import sliderOne from '../assets/michelintyres.jpg';
//import sliderBoxTopImg from '../assets/pexelsJaePark.jpg';
//import sliderBoxBottomImg from '../assets/pexelsVincenzoMalagoli.jpg';
import DotSite from './ux/DotSite';
//import sliderConti from '../../public/sliders/continental_offer_bonus_700_390.webp';
//import ButtonPrevNext from './buttons/ButtonPrevNext';

const Slider = () => {
    return (
      <div className='sliderMain'>
        <div className="slideShowContainer">
          <div id='sliderOne' className="mySlides fade">
            <div className="numbertext">1 / 3</div>
            <a href={'/'} rel="preload" type="image/webp">
              <img 
                fetchpriority="high"
                src="sliders/winter_tire_offer_with_logo_842_385.webp" 
                alt='sliderOne'
              />
            </a> 
          </div>
          <div id="sliderTwo"className="mySlides fade">
            <div className="numbertext">2 / 3</div>
            {/* <img alt='sliderTwo'/> */}
          </div>
          <div id='sliderThree' className="mySlides fade">
            <div className="numbertext">3 / 3</div>
            {/* <img  alt='sliderThree'/> */}
          </div>
            {/* <ButtonPrevNext 
              prevTop={0}
              prevBtnLeft={-8} 
              nextTop={0}
              nextBtnRight={-8}
            /> */}
        </div>
        <div className='dotContainer'>
          <DotSite/>
        </div>
        <div className='sliderImgBoxTop'>
          {/* <a href={'/'} > */}
          <img id='imgSliderBoxTop' 
            fetchpriority="high"
            src="sliders/continental_offer_bonus_700_390.webp" 
            // sizes='(max-width: 2560px) 1440px,
            //         (max-width: 1440px) 1440px,
            //         (max-width: 1024px) 1024px,
            //         (max-width: 768px) 768px,
            //         (max-width: 580px) 580px,
            //         (max-width: 425px) 425px,
            //         (max-width: 400px) 400px,
            //         (max-width: 375px) 375px,
            //         (max-width: 320px) 320px, 100vw'
            alt='sliderBoxTop'
          />
          {/* </a> */}
          {/* <link id='imgSliderBoxTop' rel="preload"  as="image" href='sliders/continental_offer_bonus_700_390.webp' type="image/webp" /> */}
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