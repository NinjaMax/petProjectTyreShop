import React from 'react';
import '../../css/TabsCss/TabMain.css';
import PopularSizeTyre from '../popularGoods/PopularSizeTyre';
import PopularDiametrTyre from '../popularGoods/PopularDiametrTyre';
import FilterMainTyre from '../mainFilterButton/filterMainTyres/FilterMainTyre';

const TabMain = () => {

    return (

    <div className='tabMainFilter wheelsTab tyresTab'>
        <div className="tabMain">
            <button className="tablinksTyres" 
                value={'ШИНИ'}       
                onClick={(e) => e.currentTarget.value}>
                ШИНИ<span className='arrowTabTyres'></span>
            </button>
            <button className="tablinksWheel" 
                value={'ДИСКИ'} 
                onClick={(e) => e.currentTarget.value}>
                ДИСКИ<span className='arrowTabWheels'></span>   
            </button>
            <button className="tablinksAkb" 
                value={'АКБ'} 
                onClick={(e) => e.currentTarget.value}>
                АКБ<span className='arrowTabAkb'></span>
            </button>
            <button className="tablinksSelect" 
                value={'МАСТИЛА/РІДИНИ'} 
                onClick={(e) => e.currentTarget.value}>
                МАСЛА ТА РІДИНИ<span className='arrowTabSelect'></span>
            </button>
            
        </div>
        <div id="filterMain" className="tabContentMain">
            <FilterMainTyre/>
        </div>
        {/* <div className='popularContainer'>
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
        </div>        */}
    </div>

    );
};

export default TabMain;