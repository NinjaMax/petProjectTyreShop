import React from 'react';
import FilterMainTyre from '../MainFilterButton/FilterMainTyres/FilterMainTyre';
import PopularSizeTyre from '../PopularGoods/PopularSizeTyre';
import PopularDiametrTyre from '../PopularGoods/PopularDiametrTyre';
import '../../css/TabsCss/TabMain.css';

const TabMain = () => {

    return (

    <div className='tabMainFilter wheelsTab tyresTab'>
        <div className="tabMain">
            <button className="tablinksTyres" onClick={'tab'}>ШИНЫ</button>
            <button className="tablinksWheel" onClick={'tab'}>ДИСКИ</button>
            <button className="tablinksAkb" onClick={'tab'}>АКБ</button>
            <button className="tablinksSelect" onClick={'tab'}>ПІДБІР ПО АВТО</button>
        </div>
        <div id="filterMain" className="tabContentMain">
            <FilterMainTyre/>
        </div>
        <h5>Популярні розміри і діаметри</h5>
        <div className='popularBox'>
            <PopularSizeTyre/>
            <PopularDiametrTyre/>
        </div>    
    </div>

    );
};

export default TabMain;