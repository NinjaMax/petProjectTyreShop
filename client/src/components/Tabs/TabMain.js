import React from 'react';
import FilterMain from '../MainFilterButton/FilterMain';
import '../../css/TabsCss/TabMain.css';


const TabMain = () => {
    return (

    <div className='tabMainFilter'>
        <div className="tabMain">
            <button className="tablinks" onClick={'tab'}>ШИНЫ</button>
            <button className="tablinks" onClick={'tab'}>ДИСКИ</button>
            <button className="tablinks" onClick={'tab'}>АКБ</button>
        </div>

        <div id="filterMain" className="tabcontentMain">
            <FilterMain/>
        </div>

    </div>

    );
};

export default TabMain;