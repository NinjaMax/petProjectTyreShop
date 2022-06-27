import React from 'react';
import Slider from '../components/Slider';
import FilterMain from '../components/FilterMain';
import CategorySlide from '../components/CategorySlide';
import '../css/Main.css'

const Main = () => {
    return (
    <div className='main'>    
        <Slider/>
        <FilterMain/>
        <CategorySlide/>
    </div>   



    );
};

export default Main;