import React from 'react';
import '../css/Slider.css';

const Slider = () => {
    return (
        <div>
            <div className="slideshow-container">

              <div className="mySlides fade">
                <div className="numbertext">1 / 3</div>
                <img src="img1.jpg" style={{width:'100%'}} alt='slider'/>
                <div className="text">Caption Text</div>
              </div>

              <div className="mySlides fade">
                <div className="numbertext">2 / 3</div>
                <img src="img2.jpg" style={{width: '100%'}} alt='slider'/>
                <div className="text">Caption Two</div>
              </div>

              <div className="mySlides fade">
                <div className="numbertext">3 / 3</div>
                <img src="img3.jpg" style={{width:'100%'}} alt='slider'/>
                <div className="text">Caption Three</div>
              </div>

              <span className="prev" onClick={''}>&#10094;</span>
              <span className="next" onClick={''}>&#10095;</span>
            </div>
            <br/>

            <div style={{textAlign: 'center'}}>
              <span className="dot" onClick={"currentSlide(1)"}></span>
              <span className="dot" onClick={"currentSlide(2)"}></span>
              <span className="dot" onClick={"currentSlide(3)"}></span>
            </div>
        </div>
      
        );
    };

export default Slider;