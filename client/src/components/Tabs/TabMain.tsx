import React, { useContext, useEffect, useState } from 'react';
import '../../css/TabsCss/TabMain.css';
import FilterMainTyre from '../mainFilterButton/filterMainTyres/FilterMainTyre';
import FilterMainWheel from '../mainFilterButton/filterMainTyres/FilterMainWheel';
import { Context } from '../../context/Context';

interface ITabMain {
    filterStateAction(arg0:any):void;
    filterMainState: boolean;
    getFilterTitle(arg0:any):void;
}

const TabMain = ({filterMainState, filterStateAction, getFilterTitle}: ITabMain) => {
    const {filter} = useContext<any | null>(Context);
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
    },[filterState]);

    const handleSetFilterState = (e: any) => {
        filter.setWidth('');
        filter.setHeight('');
        filter.setDiameter('');
        filter.setSeason('');
        filter.setBrands('');
        filter.setChipWidth([]);
        filter.setChipHeight([]);
        filter.setChipDiameter([]);
        filter.setChipSeason([]);
        filter.setChipBrands([]);
        setFilterState(e.currentTarget.value);
        getFilterTitle(e.currentTarget.value);
    };

    return (
    <div className={
    filterState === 'ШИНИ' ? 'tabMainFilterTyre' : 
    filterState === 'ДИСКИ' ?  'tabMainFilterWheel' : 
    filterState === 'АКБ' ? 'tabMainFilterBattery' : 
    'tabMainFilterTyre'}
    >   
        {filterState === 'ШИНИ' ?
        <img
            fetchpriority='high'
            className='tabCoverImg'
            src="img/tyres_tab_main_1.webp" 
            srcSet="img/tyres_tab_main_1.webp 1440w,
                img/tyres_tab_main_1_mobile.webp 580w"
            sizes='(max-width: 2560px) 1440px,
                    (max-width: 1440px) 1440px,
                    (max-width: 1024px) 1024px,
                    (max-width: 768px) 768px,
                    (max-width: 580px) 580px,
                    (max-width: 425px) 425px,
                    (max-width: 400px) 400px,
                    (max-width: 375px) 375px,
                    (max-width: 320px) 320px, 100vw'
            alt='tyres_tab_main'
        /> : null 
        }
        {filterState === 'ДИСКИ'  ?
        <img
            fetchpriority='high'
            className='tabCoverImg'
            src="img/wheels_tab_main.webp" 
            srcSet="img/wheels_tab_main.webp 1440w,
                img/tyres_tab_main_1_mobile.webp 580w"
            sizes='(max-width: 2560px) 1440px,
                    (max-width: 1440px) 1440px,
                    (max-width: 1024px) 1024px,
                    (max-width: 768px) 768px,
                    (max-width: 580px) 580px,
                    (max-width: 425px) 425px,
                    (max-width: 400px) 400px,
                    (max-width: 375px) 375px,
                    (max-width: 320px) 320px, 100vw'
            alt='tyres_tab_main'
        /> : null 
        }
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
            {/* <button className="tablinksAkb" 
                value={'АКБ'} 
                onClick={handleSetFilterState}>
                АКБ<span className='arrowTabAkb'></span>
            </button>
            <button className="tablinksSelect" 
                value={'МАСТИЛА/РІДИНИ'} 
                onClick={handleSetFilterState}>
                МАСЛА ТА РІДИНИ<span className='arrowTabSelect'></span>
            </button> */}
            
        </div>
        {filterTyreState ?
        <div id="filterMainTyre" className="tabContentMain">
            <FilterMainTyre 
                filterState={filterMainState}
                filterOpenCloseAction={filterStateAction}
            />
        </div> 
        : null
        }
        {filterWheeleState ?
        <div id="filterMainWheel" className="tabContentMain">
            <FilterMainWheel 
                filterState={filterMainState}
                filterOpenCloseAction={filterStateAction}           
            />
        </div> 
        : null
        }
    </div>
    
    );
};

export default TabMain;