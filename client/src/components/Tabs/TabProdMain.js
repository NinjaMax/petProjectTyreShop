import React from 'react';
import PromotionBox from '../PromotionBox';
import '../../css/TabsCss/TabProdMain.css';


const TabProdMain = () => {
    return (
        <div>
            <div className="tabProdMain">
            <button className="tabProdlinks" onClick={'tab'}>АКЦИЯ</button>
            <button className="tabProdlinks" onClick={'tab'}>ЛИДЕР ПРОДАЖ</button>
            <button className="tabProdlinks" onClick={'tab'}>РЕКОМЕНДУЕМ</button>
            <button className="tabProdlinks" onClick={'tab'}>НОВИНКА</button>
        </div>

        <div id="London" className="tabContentProdMain">
            <PromotionBox/>
        </div>

        </div>
    );
};

export default TabProdMain;