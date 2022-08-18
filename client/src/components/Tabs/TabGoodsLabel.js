import React from 'react';
import '../../css/TabsCss/TabGoodsLabel.css';

const TabGoodsLabel = ({value, onChangeTab, titleGoodsTab, checked}) => {
    return (
    
        <div className='tabGoodsLabel'>
            <label>
                <input className="tabsGoodsLabelInput"
                value={value} 
                onChange={onChangeTab}
                id={value}
                type="radio"
                checked={checked === value}/>{titleGoodsTab}
            </label>     
        </div>

    );
};

export default TabGoodsLabel;