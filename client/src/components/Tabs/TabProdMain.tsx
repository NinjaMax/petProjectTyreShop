import React from 'react';
import '../../css/TabsCss/TabProdMain.css';
import PromotionBox from '../PromotionBox';

type ITabProd = {
    titleTab: string;
    children: JSX.Element | JSX.Element[] | any;
};

const TabProdMain = ({titleTab, children}: ITabProd) => {
    return (
        <div>
            <div className="tabProdMain">
                <span className="tabProdlinks" 
                    title='АКЦІЯ' 
                >
                    {titleTab}
                </span>
            </div>
            <div id="London" className="tabContentProdMain">
                {children}
            </div>
        </div>
    );
};

export default TabProdMain;