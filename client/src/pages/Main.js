import React from 'react';
import Slider from '../components/Slider';
import FilterMain from '../components/FilterMain';
import CategorySlide from '../components/CategorySlide';
import NewsCards from '../components/NewsCards';
import Benefits from '../components/Benefits';
import ReviewStore from '../components/Reviews/ReviewStore';
import '../css/Main.css';

const Main = () => {
    return (
    <div className='main'>    
        <Slider/>
        <FilterMain/>
        <CategorySlide/>
        <NewsCards/>
        <Benefits/>
        <ReviewStore/>
    </div>   



    );
};

export default Main;