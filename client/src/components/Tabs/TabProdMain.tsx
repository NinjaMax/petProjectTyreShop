import React from 'react';
import '../../css/TabsCss/TabProdMain.css';

type ITabProd = {
    titleTab: string;
    children: JSX.Element | JSX.Element[] | any;
};

const TabProdMain = ({titleTab, children}: ITabProd) => {
    return (
        <div>
            <div className="tabProdMain">
                <span className="tabProdlinks" 
                    title={titleTab} 
                >
                    {titleTab}
                </span>
            </div>
            <div className="tabContentProdMain">
                {children}
            </div>
        </div>
    );
};

export default TabProdMain;