import React from 'react';
import '../css/Main.css';
import Slider from '../components/Slider';
import CategorySlide from '../components/CategorySlide';
import TabProdMain from '../components/tabs/TabProdMain';
import Benefits from '../components/Benefits';
import ReviewsMain from '../components/reviews/ReviewsMain';
import TabMain from '../components/tabs/TabMain';
import NewsMainBox from '../components/news/NewsMainBox';
import ReviewStore from '../components/reviews/ReviewStore';
import ReviewsGoods from '../components/reviews/ReviewsGoods';



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
            <ReviewsGoods reviewExtend={false} btnLeft={undefined} btnRight={undefined}/>
        </ReviewsMain>
        <NewsMainBox/>
    </div>   



    );
};

export default Main;