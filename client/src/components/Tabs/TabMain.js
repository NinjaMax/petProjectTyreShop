import React from 'react';
import FilterMain from '../MainFilterButton/FilterMain';
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
            <FilterMain/>
        </div>
        <h5>Популярні розміри і діаметри</h5>
        <div className='popularBox'>
            <div className='popularSizeTyre'>
                <span>175/70 R13</span>
                <span>195/70 R13</span>
                <span>205/60 R16</span>
                <span>215/70 R16</span>
                <span>225/50 R17</span>
                <span>265/60 R18</span>
                <span>225/55 R19</span>
            </div>
            
            <div className='popularDiametrTyre'>    
                <span>R13</span>
                <span>R15</span>
                <span>R16</span>
                <span>R16</span>
                <span>R17</span>
                <span>R18</span>
                <span>R19</span>
            </div>   
        </div>    
    </div>

    );
};

export default TabMain;