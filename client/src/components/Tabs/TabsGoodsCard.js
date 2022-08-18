import React from 'react';
import '../../css/TabsCss/TabsGoodsCard.css';
import TabGoodsLabel from '../Tabs/TabGoodsLabel';
//import AllAboutProduct from '../Goods/AllAboutProduct';

const TabsGoodsCard = ({children, titleGoodsTab, value, onChangeTab, checked}) => {
    return (

        <div>
            <div className="tabsGoodsCard">  
                <TabGoodsLabel 
                    titleGoodsTab={titleGoodsTab} 
                    value={value} 
                    onChangeTab={onChangeTab} 
                    checked={checked}/>
                <TabGoodsLabel 
                    titleGoodsTab={titleGoodsTab} 
                    value={value} 
                    onChangeTab={onChangeTab} 
                    checked={checked}/>    
            </div> 
            <div className="tabsContentGoodsCard"> 
                {children}
            </div>  
        </div>  
    );
};

export default TabsGoodsCard;