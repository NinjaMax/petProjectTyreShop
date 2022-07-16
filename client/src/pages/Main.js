import React from 'react';
import Slider from '../components/Slider';
import CategorySlide from '../components/CategorySlide';
import TabProdMain from '../components/Tabs/TabProdMain';
import Benefits from '../components/Benefits';
import ReviewsMain from '../components/Reviews/ReviewsMain';
import TabMain from '../components/Tabs/TabMain';
import NewsMainBox from '../components/News/NewsMainBox';
import '../css/Main.css';

const Main = () => {
    return (
    <div className='main'>    
        <Slider/>
        <TabMain/>
        <CategorySlide/>
        <TabProdMain/>
        <Benefits/>
        <ReviewsMain/>
        <NewsMainBox/>
    </div>   



    );
};

export default Main;