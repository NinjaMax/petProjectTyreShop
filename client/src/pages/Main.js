import React from 'react';
import '../css/Main.css';
import Slider from '../components/Slider';
import CategorySlide from '../components/CategorySlide';
import TabProdMain from '../components/Tabs/TabProdMain';
import Benefits from '../components/Benefits';
import ReviewsMain from '../components/Reviews/ReviewsMain';
import TabMain from '../components/Tabs/TabMain';
import NewsMainBox from '../components/News/NewsMainBox';
import ReviewStore from '../components/Reviews/ReviewStore';
import ReviewsGoods from '../components/Reviews/ReviewsGoods';

const Main = () => {
    return (
    <div className='main'>    
        <Slider/>
        <TabMain/>
        <CategorySlide/>
        <TabProdMain/>
        <Benefits/>
        <ReviewsMain props={'Відгуки'}>
            <ReviewStore/>
            <ReviewsGoods reviewExtend={false}/>
        </ReviewsMain>
        <NewsMainBox/>
    </div>   



    );
};

export default Main;