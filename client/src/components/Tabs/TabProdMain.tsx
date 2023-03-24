import React from 'react';
import '../../css/TabsCss/TabProdMain.css';
import PromotionBox from '../PromotionBox';



const TabProdMain = () => {
    return (
        <div>
            <div className="tabProdMain">
                <button className="tabProdlinks" 
                    value={'АКЦІЯ'} 
                    onClick={(e) => e.currentTarget.value}>АКЦІЯ</button>
                <button className="tabProdlinks" 
                    value={'ЛІДЕРИ ПРОДАЖУ'} 
                    onClick={(e) => e.currentTarget.value}>ЛІДЕРИ ПРОДАЖУ</button>
                <button className="tabProdlinks" 
                    value={'РЕКОМЕНДУЄМО'} 
                    onClick={(e) => e.currentTarget.value}>РЕКОМЕНДУЄМО</button>
                <button className="tabProdlinks" 
                    value={'НОВИНКА'} 
                    onClick={(e) => e.currentTarget.value}>НОВИНКА</button>
            </div>
            <div id="London" className="tabContentProdMain">
                <PromotionBox/>
            </div>
        </div>
    );
};

export default TabProdMain;