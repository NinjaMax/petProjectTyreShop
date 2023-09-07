import React, { useEffect, useState } from 'react';
import '../../css/TabsCss/TabMain.css';
import PopularSizeTyre from '../popularGoods/PopularSizeTyre';
import PopularDiametrTyre from '../popularGoods/PopularDiametrTyre';
import FilterMainTyre from '../mainFilterButton/filterMainTyres/FilterMainTyre';
import FilterMainWheel from '../mainFilterButton/filterMainTyres/FilterMainWheel';

interface ITabMain {
    filterStateAction(arg0:any):void;
    filterMainState: boolean
}

const TabMain = ({filterMainState, filterStateAction}: ITabMain) => {
    const [filterOpenClose, setFilterOpenClose] = useState<boolean>(false);
    const [filterState, setFilterState] = useState<string>('ШИНИ');
    const [filterTyreState, setFilterTyreState] = useState<boolean>(false);
    const [filterWheeleState, setFilterTWheelState] = useState<boolean>(false);
    //const [filterBatteryState, setFilterBatteryState] = useState<boolean>(false);
    // const [filterOilState, setFilterOilState] = useState<boolean>(false);
    
    useEffect(() =>{
        if (filterState === 'ШИНИ') {
            setFilterTyreState(true);
            setFilterTWheelState(false);
        }
        if (filterState === 'ДИСКИ') {
            setFilterTWheelState(true);
            setFilterTyreState(false);
        }
        // if (filterState === 'АКБ') {
        //     setFilterBatteryState(true);
        //     setFilterTWheelState(true);
        //     setFilterTyreState(false);
        // }
        // if () {

        // }
        // if () {

        // }
    },[filterState]);

    // const filterStateAction = () => {
    //     setFilterOpenClose(!filterOpenClose);
    // };

    const handleSetFilterState = (e: any) => {
        setFilterState(e.currentTarget.value)
    };

    return (
    <div className={
    filterState === 'ШИНИ' ? 'tabMainFilterTyre' : 
    filterState === 'ДИСКИ' ?  'tabMainFilterWheel' : 
    filterState === 'АКБ' ? 'tabMainFilterBattery' : 
    'tabMainFilterTyre'
    }>
        <div className="tabMain">
            <button className="tablinksTyres" 
                value={'ШИНИ'}       
                onClick={handleSetFilterState}>
                ШИНИ<span className='arrowTabTyres'></span>
            </button>
            <button className="tablinksWheel" 
                value={'ДИСКИ'} 
                onClick={handleSetFilterState}>
                ДИСКИ<span className='arrowTabWheels'></span>   
            </button>
            <button className="tablinksAkb" 
                value={'АКБ'} 
                onClick={handleSetFilterState}>
                АКБ<span className='arrowTabAkb'></span>
            </button>
            <button className="tablinksSelect" 
                value={'МАСТИЛА/РІДИНИ'} 
                onClick={handleSetFilterState}>
                МАСЛА ТА РІДИНИ<span className='arrowTabSelect'></span>
            </button>
            
        </div>
        {filterTyreState ?
        <div id="filterMain" className="tabContentMain">
            <FilterMainTyre 
                filterState={filterMainState}
                filterOpenCloseAction={filterStateAction}
            />
        </div> 
        : null
        }
        {filterWheeleState ?
        <div id="filterMain" className="tabContentMain">
            <FilterMainWheel 
                filterState={filterMainState}
                filterOpenCloseAction={filterStateAction}           
            />
        </div> 
        : null
        }
        
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