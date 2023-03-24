import React from 'react';
import '../../css/TabsCss/TabsGoodsCard.css';

interface ITabGoodsCard {
    children: React.ReactNode;
    itemTab: [
        ITabGoodsItem,
        ITabGoodsItem, 
        ITabGoodsItem, 
        ITabGoodsItem 
        // {
        // id:number; 
        // titleGoodsTab?: string; 
        // value?: string;
        // onChangeTab?: (arg: any) => void; 
        // checked?: string;},
    ] 
}

type ITabGoodsItem = {
    id:number,
    titleGoodsTab?: string, 
    value?: string,
    onChangeTab?: (arg: any) => void,
    checked?: string,
}

const TabsGoodsCard = ({children, itemTab}: ITabGoodsCard) => {
   
    return (

        <div>
            <div className="tabsGoodsCard">
                {  itemTab.map((item: ITabGoodsItem)=>  
                <label key={item.value} htmlFor={item.value}>
                    <input className="tabsGoodsCardLinks"
                    value={item.value} 
                    onChange={item.onChangeTab} 
                    id={item?.id.toString()}
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