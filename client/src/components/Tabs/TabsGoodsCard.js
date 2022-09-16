import React from 'react';
import '../../css/TabsCss/TabsGoodsCard.css';

const TabsGoodsCard = ({children, itemTab}) => {
   
    return (

        <div>
            <div className="tabsGoodsCard">
                {  itemTab.map((item)=>  
                <label key={item.value} forhtml={item.value}>
                    <input className="tabsGoodsCardLinks"
                    value={item.value} 
                    onChange={item.onChangeTab} 
                    id={item.id}
                    type="radio"
                    name="radioTab"
                    />{item.titleGoodsTab}
                </label>
                )}
            </div>
            <div className="tabsContentGoodsLabel"> 
                {children}
            </div>  
        </div> 
    );
};

export default TabsGoodsCard;