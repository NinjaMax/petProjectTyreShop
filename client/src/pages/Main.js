import React from 'react';
import Slider from '../components/Slider';
import CategorySlide from '../components/CategorySlide';
import TabProdMain from '../components/Tabs/TabProdMain';
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
        <TabProdMain/>
        <Benefits/>
        <ReviewStore/>
    </div>   



    );
};

export default Main;