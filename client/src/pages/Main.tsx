import React, { useContext, useEffect } from 'react';
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
import { Context } from '../context/Context';
import { getTyresOffset } from '../restAPI/restGoodsApi';
import { yieldToMain } from '../restAPI/postTaskAdmin';
import { observer } from 'mobx-react-lite';

const Main = observer(() => {
    const {goodsTyre} = useContext<any | null>(Context);

    useEffect(() =>{
        let isMounted = false;
        const loadMaintask = async() => {
            const taskLoad: any[] = [
                getTyresOffset
            ];
        let i:number = 0;
        while(taskLoad.length > i) {
        if(!isMounted && taskLoad[i] === getTyresOffset) {
          let tyreGoods: any = await taskLoad[i](1);
          goodsTyre.setTyres(tyreGoods);
          console.log('SET_TYRES_PAGE_1: ', tyreGoods);
        } 
        }
        const task = taskLoad.shift();
        task();
        await yieldToMain(); 
        }
        loadMaintask();
        return () => {
            isMounted = true;
        };
    },[]);

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
});

export default Main;