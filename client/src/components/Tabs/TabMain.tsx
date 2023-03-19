import React from 'react';
import '../../css/TabsCss/TabMain.css';
import FilterMainTyre from '../MainFilterButton/FilterMainTyres/FilterMainTyre';
import PopularSizeTyre from '../PopularGoods/PopularSizeTyre';
import PopularDiametrTyre from '../PopularGoods/PopularDiametrTyre';


const TabMain = () => {

    return (

    <div className='tabMainFilter wheelsTab tyresTab'>
        <div className="tabMain">
            <button className="tablinksTyres" onClick={'tab'}>
                ШИНЫ<span className='arrowTabTyres'></span>
            </button>
            <button className="tablinksWheel" onClick={'tab'}>
                ДИСКИ<span className='arrowTabWheels'></span>   
            </button>
            <button className="tablinksAkb" onClick={'tab'}>
                АКБ<span className='arrowTabAkb'></span>
            </button>
            <button className="tablinksSelect" onClick={'tab'}>
                ПІДБІР ПО АВТО<span className='arrowTabSelect'></span>
            </button>
            
        </div>
        <div id="filterMain" className="tabContentMain">
            <FilterMainTyre/>
        </div>
        <div className='popularContainer'>
            <div className='popularSpan'>
                <div className='titlePopular'>Популярні розміри</div>
                <div className='popularBox'>
                    <PopularSizeTyre/>   
                </div>
            </div>
            <div className='popularSpan'>
                <div className='titlePopular'>Популярні діаметри</div>
                <div className='popularBox'>
                    <PopularDiametrTyre/>
                </div> 
            </div>
        </div>       
    </div>

    );
};

export default TabMain;