import React from 'react';
import '../../css/TabsCss/TabsGoodsCard.css';
import AllAboutProduct from '../Goods/AllAboutProduct';

const TabsGoodsCard = () => {
    return (
        <div>
            <div className="tabsGoodsCard">
                <button className="tabsGoodsCardLinks" onClick={'tab'}>ВСЕ ПРО ТОВАР</button>
                <button className="tabsGoodsCardLinks" onClick={'tab'}>ХАРАКТЕРИСТИКИ</button>
                <button className="tabsGoodsCardLinks" onClick={'tab'}>ФОТО</button>
                <button className="tabsGoodsCardLinks" onClick={'tab'}>ВІДГУКИ</button>
                <button className="tabsGoodsCardLinks" onClick={'tab'}>ПИТАННЯ</button>
            </div>
            <div id="goodsCard" className="tabsContentGoodsCard">
                <AllAboutProduct/>
            </div>
        </div>
    );
};

export default TabsGoodsCard;