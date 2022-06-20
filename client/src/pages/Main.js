import React from 'react';
import Slider from '../components/Slider';
import FilterMainButton from '../components/FilterMainButton';
import CategorySlide from '../components/CategorySlide';
import '../css/Main.css'

const Main = () => {
    return (
    <div className='main'>    
        <Slider/>
        <FilterMainButton/>
        <CategorySlide/>
    </div>   



    );
};

export default Main;