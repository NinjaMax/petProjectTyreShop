import React from 'react';
import '../../css/TabsCss/TabsGoodsCard.css';

interface ITabGoodsCard {
    children: React.ReactNode;
    itemTab: [
        ITabItem, ...ITabItem[]
    ];
    onChangeTab?:(arg: any) => void;
}

type ITabItem = {
    id:string, 
    titleGoodsTab?: string,
    value?: string,
    checked?: string,
    reviewCount?: number   
}

const TabsGoodsCard = ({
    children, 
    itemTab, 
    onChangeTab
}: ITabGoodsCard) => {
   
    return (
        <div>
            <div className="tabsGoodsCard"> 
            {itemTab ? itemTab.map((item: ITabItem) =>
                <label key={item.value}
                    className={
                    item.checked === item.value ? 
                    ' tabsGoodsCardActive' : 'labelItem' 
                }>
                    <input 
                    className="tabsGoodsCardLinks"
                    id={item.id}
                    type="radio"
                    value={item.value}
                    name="radioTab"
                    onChange={onChangeTab}
                    />{item.titleGoodsTab}
                    {item.reviewCount !== 0 ?
                    <span className='tabCountReview'>
                        {item.reviewCount}
                    </span> 
                    : null
                    }
                </label>
                ) : null
            }
            </div>
            <div className="tabsContentGoodsLabel"> 
                {children}
            </div>  
        </div> 
    );
};

export default TabsGoodsCard;