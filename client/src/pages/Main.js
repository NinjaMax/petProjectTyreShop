import React from 'react';
import Slider from '../components/Slider';
import CategorySlide from '../components/CategorySlide';
import NewsCards from '../components/NewsCards';
import Benefits from '../components/Benefits';
import ReviewStore from '../components/Reviews/ReviewStore';
import TabMain from '../components/Tabs/TabMain';
import '../css/Main.css';

const Main = () => {
    return (
    <div className='main'>    
        <Slider/>
        <TabMain/>
        <CategorySlide/>
        <NewsCards/>
        <Benefits/>
        <ReviewStore/>
    </div>   



    );
};

export default Main;